const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getAllowedOrigins,
  getHealthStatus
} = require("../../server/app");

test("getHealthStatus returns ok with an ISO timestamp", () => {
  const body = getHealthStatus();

  assert.equal(body.ok, true);
  assert.match(body.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test("getAllowedOrigins supports comma-separated client origins", () => {
  const originalClientOrigin = process.env.CLIENT_ORIGIN;

  process.env.CLIENT_ORIGIN =
    "http://localhost:3000, https://client.example.com ";

  const origins = getAllowedOrigins();

  assert.deepEqual(origins, [
    "http://localhost:3000",
    "https://client.example.com"
  ]);

  if (originalClientOrigin === undefined) {
    delete process.env.CLIENT_ORIGIN;
  } else {
    process.env.CLIENT_ORIGIN = originalClientOrigin;
  }
});
