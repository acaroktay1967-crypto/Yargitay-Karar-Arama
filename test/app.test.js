const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");

test("health endpoint returns ok", async () => {
  const app = createApp();
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("decision search supports text query", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ q: "uyuşturucu" });

  assert.equal(response.status, 200);
  assert.equal(response.body.total, 1);
  assert.equal(response.body.items[0].offenseType, "Uyuşturucu Madde Ticareti");
  assert.equal(response.body.items[0].shareUrl, "/decisions/2022-8CD-3310/share");
  assert.equal(response.body.items[0].detailUrl, "/api/decisions/2022-8CD-3310");
});

test("decision search supports offense type (partial, case-insensitive) and year filters", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ offenseType: "hIRSIz", year: 2023 });

  assert.equal(response.status, 200);
  assert.equal(response.body.total, 1);
  assert.equal(response.body.items[0].id, "2023-3CD-2044");
});

test("decision search offense type filter handles Turkish locale case conversion", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ offenseType: "HIRSIZLIK" });

  assert.equal(response.status, 200);
  assert.equal(response.body.total, 1);
  assert.equal(response.body.items[0].offenseType, "Hırsızlık");
});

test("decision search clamps invalid pagination values", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ page: 99999, pageSize: 999 });

  assert.equal(response.status, 200);
  assert.equal(response.body.page, 1000);
  assert.equal(response.body.pageSize, 100);
});

test("decision search supports chamber filter", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ chamber: "12. Ceza Dairesi" });

  assert.equal(response.status, 200);
  assert.equal(response.body.total, 1);
  assert.equal(response.body.items[0].offenseType, "Cinsel Saldırı");
});

test("decision search rejects invalid year values", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ year: "abc" });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /year/);
});

test("decision search rejects unrealistic future year values", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ year: new Date().getFullYear() + 11 });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /year/);
});

test("decision detail endpoint returns decision by id", async () => {
  const app = createApp();
  const response = await request(app).get("/api/decisions/2024-1CD-1001");

  assert.equal(response.status, 200);
  assert.equal(response.body.id, "2024-1CD-1001");
  assert.equal(response.body.shareUrl, "/decisions/2024-1CD-1001/share");
});

test("decision detail endpoint returns 404 for unknown id", async () => {
  const app = createApp();
  const response = await request(app).get("/api/decisions/unknown-id");

  assert.equal(response.status, 404);
  assert.match(response.body.error, /Karar bulunamadı/);
});

test("decision share page returns html with select and share actions", async () => {
  const app = createApp();
  const response = await request(app).get("/decisions/2023-3CD-2044/share");

  assert.equal(response.status, 200);
  assert.match(response.headers["content-type"], /html/);
  assert.match(response.text, /Tümünü Seç/);
  assert.match(response.text, /Kopyala/);
  assert.match(response.text, /Kaydet \(\.txt\)/);
  assert.match(response.text, /Kararı Paylaş/);
  assert.match(response.text, /textarea id="decision-content"/);
});
