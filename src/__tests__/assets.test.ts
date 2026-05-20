import request from "supertest";
import app from "../app";
import * as assetService from "../services/assetService";

jest.mock("../services/assetService");

const mockedService = assetService as jest.Mocked<typeof assetService>;

describe("GET /assets", () => {
  it("returns an empty list", async () => {
    mockedService.listAssets.mockResolvedValue([]);
    const res = await request(app).get("/assets");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: [] });
  });
});

describe("GET /assets/:id", () => {
  it("returns 404 when asset not found", async () => {
    mockedService.getAssetById.mockResolvedValue(null);
    const res = await request(app).get("/assets/unknown-id");
    expect(res.status).toBe(404);
  });
});

describe("POST /assets/:id/signup", () => {
  it("returns 400 when person is missing", async () => {
    const res = await request(app).post("/assets/some-id/signup").send({});
    expect(res.status).toBe(400);
  });

  it("returns 201 on successful sign-up", async () => {
    mockedService.signUpForAsset.mockResolvedValue({
      id: "test-signup-id",
      person: { id: "test-person-id", firstName: "Test", lastName: "User", jobTitle: "Engineer", companyName: "Acme", email: "test@acme.com" },
      signupDate: new Date(),
      assetId: "some-id",
    });
    const res = await request(app)
      .post("/assets/some-id/signup")
      .send({ person: {} });
    expect(res.status).toBe(201);
  });
});
