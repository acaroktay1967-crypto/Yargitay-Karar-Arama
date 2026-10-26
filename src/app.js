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

function decorateDecisionWithLinks(decision) {
  const encodedId = encodeURIComponent(decision.id);
  return {
    ...decision,
    detailUrl: `/api/decisions/${encodedId}`,
    shareUrl: `/decisions/${encodedId}/share`,
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSharePage(decision) {
  const safeId = escapeHtml(decision.id);
  const safeSummary = escapeHtml(decision.summary);
  const safeContent = escapeHtml(decision.content);
  const safeChamber = escapeHtml(decision.chamber);
  const safeOffenseType = escapeHtml(decision.offenseType);
  const safeLawArticles = (decision.lawArticles || [])
    .map((article) => escapeHtml(article))
    .join(", ");

  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Karar Paylaş - ${safeId}</title>
  </head>
  <body>
    <h1>${safeId}</h1>
    <p><strong>Daire:</strong> ${safeChamber}</p>
    <p><strong>Yıl:</strong> ${decision.year}</p>
    <p><strong>Suç Türü:</strong> ${safeOffenseType}</p>
    <p><strong>Kanun Maddeleri:</strong> ${safeLawArticles}</p>
    <p>${safeSummary}</p>
    <button id="select-all" type="button">Tümünü Seç</button>
    <button id="copy" type="button">Kopyala</button>
    <button id="save" type="button">Kaydet (.txt)</button>
    <button id="share" type="button">Kararı Paylaş</button>
    <p>Karar metnine tıklayarak tamamını seçebilirsiniz.</p>
    <textarea id="decision-content" data-decision-id="${safeId}" rows="16" cols="120" readonly>${safeContent}</textarea>
    <script>
      const content = document.getElementById("decision-content");
      const selectAllButton = document.getElementById("select-all");
      const copyButton = document.getElementById("copy");
      const saveButton = document.getElementById("save");
      const shareButton = document.getElementById("share");

      function selectAllText() {
        content.focus();
        content.select();
      }

      async function copyDecisionText() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content.value);
          alert("Karar metni kopyalandı.");
          return;
        }

        selectAllText();
      }

      function saveDecisionText() {
        const rawId = content.getAttribute("data-decision-id") || "karar";
        const safeFileId = rawId.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = new Blob([content.value], { type: "text/plain;charset=utf-8" });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = safeFileId + ".txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
      }

      selectAllButton.addEventListener("click", selectAllText);
      copyButton.addEventListener("click", copyDecisionText);
      saveButton.addEventListener("click", saveDecisionText);
      content.addEventListener("click", selectAllText);

      shareButton.addEventListener("click", async () => {
        if (navigator.share) {
          await navigator.share({
            title: document.title,
            text: content.value,
            url: window.location.href,
          });
          return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
          alert("Paylaşım bağlantısı kopyalandı.");
          return;
        }

        selectAllText();
      });
    </script>
  </body>
</html>`;
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
    const pagedItems = filtered.slice(start, end).map(decorateDecisionWithLinks);

    res.json({
      total: filtered.length,
      page,
      pageSize,
      items: pagedItems,
    });
  });

  app.get("/api/decisions/:id", (req, res) => {
    const decision = decisions.find((item) => item.id === req.params.id);
    if (!decision) {
      return res.status(404).json({ error: "Karar bulunamadı." });
    }

    res.json(decorateDecisionWithLinks(decision));
  });

  app.get("/decisions/:id/share", (req, res) => {
    const decision = decisions.find((item) => item.id === req.params.id);
    if (!decision) {
      return res.status(404).json({ error: "Karar bulunamadı." });
    }

    res.type("html").send(renderSharePage(decision));
  });

  return app;
}

module.exports = { createApp, filterDecisions };
