const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const OFFENSE_KEYWORDS = [
  { offenseType: "Hırsızlık", keywords: ["hırsızlık", "çalma", "nitelikli hırsızlık"] },
  { offenseType: "Kasten Yaralama", keywords: ["yaralama", "darp", "kasten yaralama"] },
  {
    offenseType: "Uyuşturucu Madde Ticareti",
    keywords: ["uyuşturucu", "madde ticareti", "tck 188"],
  },
  { offenseType: "Cinsel Saldırı", keywords: ["cinsel saldırı", "cinsel istismar", "tck 102"] },
  {
    offenseType: "Görevi Kötüye Kullanma",
    keywords: ["görevi kötüye kullanma", "tck 257", "kamu görevlisi"],
  },
  {
    offenseType: "Terör Örgütü Üyeliği",
    keywords: ["terör örgütü", "örgüt üyeliği", "tck 314"],
  },
];

function slugify(input) {
  return input
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function classifyOffenseType(raw) {
  const text = `${raw.title || ""} ${raw.summary || ""} ${raw.content || ""}`.toLocaleLowerCase(
    "tr-TR",
  );
  const matched = OFFENSE_KEYWORDS.find((entry) =>
    entry.keywords.some((keyword) => text.includes(keyword.toLocaleLowerCase("tr-TR"))),
  );
  return matched ? matched.offenseType : "Diğer";
}

function normalizeDecision(raw, sourceName, index) {
  const idCandidate = raw.id || raw.decisionId || raw.no || `${sourceName}-${index}-${randomUUID()}`;
  const id = String(idCandidate);
  const summary = String(raw.summary || raw.title || "").trim();
  const content = String(raw.content || raw.text || "").trim();
  const yearValue = Number.parseInt(raw.year, 10);

  return {
    id,
    source: sourceName,
    chamber: String(raw.chamber || raw.daire || "Bilinmiyor"),
    year: Number.isNaN(yearValue) ? new Date().getFullYear() : yearValue,
    offenseType: String(raw.offenseType || classifyOffenseType(raw)),
    lawArticles: Array.isArray(raw.lawArticles)
      ? raw.lawArticles.map((item) => String(item))
      : [],
    summary,
    content,
  };
}

function extractItems(responseBody) {
  if (Array.isArray(responseBody)) return responseBody;
  if (Array.isArray(responseBody.items)) return responseBody.items;
  if (Array.isArray(responseBody.results)) return responseBody.results;
  throw new Error("Kaynak yanıtında karar listesi bulunamadı.");
}

async function fetchSourceDecisions(sourceUrl, query) {
  const url = new URL(sourceUrl);
  if (query) {
    url.searchParams.set("q", query);
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Kaynak isteği başarısız: ${sourceUrl} (${response.status})`);
  }

  const body = await response.json();
  const sourceName = url.hostname;
  const items = extractItems(body);
  return items.map((raw, index) => normalizeDecision(raw, sourceName, index));
}

function groupByOffenseType(decisions) {
  return decisions.reduce((acc, decision) => {
    const key = decision.offenseType || "Diğer";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(decision);
    return acc;
  }, {});
}

async function readExistingDecisions(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function dedupeById(decisions) {
  const map = new Map();
  for (const decision of decisions) {
    map.set(decision.id, decision);
  }
  return Array.from(map.values());
}

async function saveGroupedDecisions(grouped, outputDir) {
  await fs.mkdir(outputDir, { recursive: true });
  const savedFiles = [];

  for (const [offenseType, decisions] of Object.entries(grouped)) {
    const fileName = `${slugify(offenseType || "diger") || "diger"}.json`;
    const filePath = path.join(outputDir, fileName);
    const existing = await readExistingDecisions(filePath);
    const merged = dedupeById([...existing, ...decisions]);
    await fs.writeFile(filePath, JSON.stringify(merged, null, 2), "utf8");
    savedFiles.push(filePath);
  }

  return savedFiles;
}

async function ingestOpenSourceDecisions({ sourceUrls, query, outputDir }) {
  if (!Array.isArray(sourceUrls) || sourceUrls.length === 0) {
    throw new Error("En az bir source URL verilmelidir.");
  }

  const allDecisions = [];
  for (const sourceUrl of sourceUrls) {
    const fetched = await fetchSourceDecisions(sourceUrl, query);
    allDecisions.push(...fetched);
  }

  const grouped = groupByOffenseType(allDecisions);
  const savedFiles = await saveGroupedDecisions(grouped, outputDir);

  return {
    fetchedCount: allDecisions.length,
    groupCount: Object.keys(grouped).length,
    savedFiles,
  };
}

module.exports = {
  classifyOffenseType,
  dedupeById,
  extractItems,
  fetchSourceDecisions,
  groupByOffenseType,
  ingestOpenSourceDecisions,
  normalizeDecision,
  saveGroupedDecisions,
  slugify,
};
