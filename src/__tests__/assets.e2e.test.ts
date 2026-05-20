/**
 * E2E tests — no service mock, real stub data is loaded from src/data/.
 * Mirrors the manual session: server spin-up → GET /assets → POST signup.
 */
import request from "supertest";
import app from "../app";
import assetsData from "../data/assets.json";
import personsData from "../data/persons.json";

// Convenience handles into stub data — avoids hardcoding values that may change.
const FIRST_ASSET = assetsData[0];
const FIRST_PERSON = personsData[0];
// A well-formed but deliberately absent id used to exercise 404 paths.
const UNKNOWN_ID = "00000000000000000000000000000000000000000000000000000000deadbeef";

describe("GET /assets", () => {
  it("returns 200 with all stub assets", async () => {
    const res = await request(app).get("/assets");
    expect(res.status).toBe(200);
    // Count must match the fixture file so new stub rows are automatically covered.
    expect(res.body.data).toHaveLength(assetsData.length);
  });

  it("each asset contains required fields", async () => {
    const res = await request(app).get("/assets");
    // Validate the public contract for every asset — catches partial serialization bugs.
    for (const asset of res.body.data) {
      expect(asset).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        sponsorName: expect.any(String),
        assetType: expect.any(String),
        createdDate: expect.any(String),
        createdBy: expect.any(String),
        lastModifiedDate: expect.any(String),
        lastModifiedBy: expect.any(String),
      });
    }
  });
});

describe("GET /assets/:id", () => {
  it("returns 200 with the correct asset for a known id", async () => {
    const res = await request(app).get(`/assets/${FIRST_ASSET.id}`);
    expect(res.status).toBe(200);
    // Spot-check key fields to ensure the right record is returned, not just any record.
    expect(res.body.data.id).toBe(FIRST_ASSET.id);
    expect(res.body.data.name).toBe(FIRST_ASSET.name);
    expect(res.body.data.sponsorName).toBe(FIRST_ASSET.sponsorName);
    expect(res.body.data.assetType).toBe(FIRST_ASSET.assetType);
  });

  it("returns 404 for an unknown id", async () => {
    const res = await request(app).get(`/assets/${UNKNOWN_ID}`);
    expect(res.status).toBe(404);
    // Error key must be present so clients can surface a user-facing message.
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /assets/:id/signup", () => {
  it("returns 400 when person is missing from body", async () => {
    // Guard against callers that omit the required `person` field entirely.
    const res = await request(app)
      .post(`/assets/${FIRST_ASSET.id}/signup`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 201 and generates a person id when none is provided", async () => {
    // New visitors won't have an id yet; the service must mint one deterministically.
    const person = {
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "CFO",
      companyName: "Acme Health",
      email: "jane.smith@acme.com",
    };
    const res = await request(app)
      .post(`/assets/${FIRST_ASSET.id}/signup`)
      .send({ person });

    expect(res.status).toBe(201);
    // Response must embed the full signup record with a nested person object.
    expect(res.body.data).toMatchObject({
      id: expect.any(String),
      assetId: FIRST_ASSET.id,
      signupDate: expect.any(String),
      person: {
        id: expect.any(String),
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
      },
    });
  });

  it("preserves an existing person id when one is provided", async () => {
    // Known contacts submit their id so they aren't assigned a new identity on re-signup.
    const person = {
      id: FIRST_PERSON.id,
      firstName: FIRST_PERSON.firstName,
      lastName: FIRST_PERSON.lastName,
      jobTitle: FIRST_PERSON.jobTitle,
      companyName: FIRST_PERSON.companyName,
      email: FIRST_PERSON.email,
    };
    const res = await request(app)
      .post(`/assets/${FIRST_ASSET.id}/signup`)
      .send({ person });

    expect(res.status).toBe(201);
    expect(res.body.data.person.id).toBe(FIRST_PERSON.id);
  });

  it("two signups for the same person+asset produce the same signup id", async () => {
    // Idempotency check: duplicate submissions (e.g. double-click) must not create two records.
    const person = {
      firstName: "Repeat",
      lastName: "User",
      jobTitle: "Analyst",
      companyName: "Demo Corp",
      email: "repeat.user@demo.com",
    };
    const [res1, res2] = await Promise.all([
      request(app).post(`/assets/${FIRST_ASSET.id}/signup`).send({ person }),
      request(app).post(`/assets/${FIRST_ASSET.id}/signup`).send({ person }),
    ]);

    expect(res1.status).toBe(201);
    expect(res2.status).toBe(201);
    // Both the signup id and the person id must be identical across concurrent requests.
    expect(res1.body.data.id).toBe(res2.body.data.id);
    expect(res1.body.data.person.id).toBe(res2.body.data.person.id);
  });
});
