const express = require("express");
const { decisions } = require("./data/decisions");

const MAX_PAGE = 1000;
const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 10;

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("tr-TR");
}

function includesQueryText(decision, q) {
  if (!q) return true;
  const normalizedQuery = normalizeText(q);
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

function matchesOffenseType(value, offenseTypeFilter) {
  if (!offenseTypeFilter) return true;
  const normalizedFilter = normalizeText(offenseTypeFilter);
  if (!normalizedFilter) return true;
  return normalizeText(value).includes(normalizedFilter);
}

function filterDecisions(items, { q, offenseType, chamber, year }) {
  return items.filter((decision) => {
    if (!matchesOffenseType(decision.offenseType, offenseType)) return false;
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
    const page = Number.isNaN(requestedPage) || requestedPage < 1
      ? 1
      : Math.min(requestedPage, MAX_PAGE);
    const pageSize = Number.isNaN(requestedPageSize)
      ? 10
      : Math.min(Math.max(requestedPageSize, 1), 100);
    const yearInput = req.query.year;
    const year = yearInput ? Number.parseInt(yearInput, 10) : undefined;

    if (yearInput && (Number.isNaN(year) || year < MIN_YEAR || year > MAX_YEAR)) {
      return res.status(400).json({
        error: `year ${MIN_YEAR}-${MAX_YEAR} aralığında bir sayı olmalıdır.`,
      });
    }

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
