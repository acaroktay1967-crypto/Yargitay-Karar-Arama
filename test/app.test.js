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
});

test("decision search supports offense type and year filters", async () => {
  const app = createApp();
  const response = await request(app)
    .get("/api/decisions")
    .query({ offenseType: "Hırsızlık", year: 2023 });

  assert.equal(response.status, 200);
  assert.equal(response.body.total, 1);
  assert.equal(response.body.items[0].id, "2023-3CD-2044");
});
