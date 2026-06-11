const express = require("express");
const { decisions } = require("./data/decisions");

function includesQueryText(decision, q) {
  if (!q) return true;
  const normalizedQuery = q.trim().toLocaleLowerCase("tr-TR");
  if (!normalizedQuery) return true;

  const haystack = [
    decision.id,
    decision.chamber,
    decision.offenseType,
    decision.summary,
    decision.content,
    ...(decision.lawArticles || []),
  ]
    .join(" ")
    .toLocaleLowerCase("tr-TR");

  return haystack.includes(normalizedQuery);
}

function filterDecisions(items, { q, offenseType, chamber, year }) {
  return items.filter((decision) => {
    if (offenseType && decision.offenseType !== offenseType) return false;
    if (chamber && decision.chamber !== chamber) return false;
    if (year && decision.year !== year) return false;
    return includesQueryText(decision, q);
  });
}

function createApp() {
  const app = express();

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/decisions", (req, res) => {
    const requestedPage = Number.parseInt(req.query.page, 10);
    const requestedPageSize = Number.parseInt(req.query.pageSize, 10);
    const page = Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;
    const pageSize = Number.isNaN(requestedPageSize)
      ? 10
      : Math.min(Math.max(requestedPageSize, 1), 100);
    const year = req.query.year ? Number.parseInt(req.query.year, 10) : undefined;

    const filtered = filterDecisions(decisions, {
      q: req.query.q,
      offenseType: req.query.offenseType,
      chamber: req.query.chamber,
      year: Number.isNaN(year) ? undefined : year,
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    res.json({
      total: filtered.length,
      page,
      pageSize,
      items: filtered.slice(start, end),
    });
  });

  return app;
}

module.exports = { createApp, filterDecisions };
