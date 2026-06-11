const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const {
  classifyOffenseType,
  fetchSourceDecisions,
  ingestOpenSourceDecisions,
  slugify,
} = require("../src/ingest/openSourceIngest");
const { parseArgs } = require("../src/cli/ingest");

test("slugify converts Turkish characters for file names", () => {
  assert.equal(slugify("Görevi Kötüye Kullanma"), "gorevi-kotuye-kullanma");
});

test("classify offense from text when offenseType not provided", () => {
  const offenseType = classifyOffenseType({
    title: "Sanığın hırsızlık suçundan cezalandırılması",
  });
  assert.equal(offenseType, "Hırsızlık");
});

test("parseArgs parses sources, query and output", () => {
  const args = parseArgs([
    "--source",
    "https://example.org/api/decisions",
    "--source",
    "https://demo.test/results",
    "--query",
    "hırsızlık",
    "--output",
    "tmp/out",
  ]);

  assert.equal(args.sourceUrls.length, 2);
  assert.equal(args.query, "hırsızlık");
  assert.ok(args.outputDir.endsWith(path.join("tmp", "out")));
});

test("fetchSourceDecisions reads items and normalizes values", async (t) => {
  const originalFetch = global.fetch;
  t.after(() => {
    global.fetch = originalFetch;
  });

  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      items: [
        {
          id: "A-1",
          chamber: "3. Ceza Dairesi",
          year: "2024",
          title: "Hırsızlık dosyası",
          text: "Nitelikli hırsızlık hükümleri uygulanmıştır.",
        },
      ],
    }),
  });

  const items = await fetchSourceDecisions("https://example.org/decisions", "hırsızlık");
  assert.equal(items.length, 1);
  assert.equal(items[0].offenseType, "Hırsızlık");
  assert.equal(items[0].year, 2024);
  assert.equal(items[0].source, "example.org");
});

test("fetchSourceDecisions preserves invalid source year as metadata", async (t) => {
  const originalFetch = global.fetch;
  t.after(() => {
    global.fetch = originalFetch;
  });

  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      items: [
        {
          id: "B-2",
          title: "Belirsiz yıl içeren kayıt",
          text: "Görevi kötüye kullanma suçu değerlendirilmiştir.",
          year: "yok",
        },
      ],
    }),
  });

  const items = await fetchSourceDecisions("https://example.org/decisions", "gorev");
  assert.equal(items.length, 1);
  assert.equal(items[0].sourceYearRaw, "yok");
});

test("ingestOpenSourceDecisions saves decisions grouped by offense", async (t) => {
  const originalFetch = global.fetch;
  t.after(() => {
    global.fetch = originalFetch;
  });

  global.fetch = async () => ({
    ok: true,
    json: async () => ([
      {
        id: "K-1",
        title: "Kasten yaralama hakkında karar",
        text: "Sanığın darp eylemi nedeniyle...",
        year: 2023,
      },
      {
        id: "U-2",
        title: "Uyuşturucu ticareti dosyası",
        text: "TCK 188 kapsamında değerlendirme",
        year: 2022,
      },
    ]),
  });

  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), "yargitay-ingest-"));
  const result = await ingestOpenSourceDecisions({
    sourceUrls: ["https://open.example/api"],
    query: "karar",
    outputDir,
  });

  assert.equal(result.fetchedCount, 2);
  assert.equal(result.groupCount, 2);
  assert.equal(result.savedFiles.length, 2);

  const yaralamaFile = path.join(outputDir, "kasten-yaralama.json");
  const uyuFile = path.join(outputDir, "uyusturucu-madde-ticareti.json");

  const yaralama = JSON.parse(await fs.readFile(yaralamaFile, "utf8"));
  const uyusturucu = JSON.parse(await fs.readFile(uyuFile, "utf8"));

  assert.equal(yaralama.length, 1);
  assert.equal(uyusturucu.length, 1);
});
