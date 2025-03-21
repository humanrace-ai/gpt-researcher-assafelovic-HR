import api from "./emergencyPlan";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Emergency Plan API", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test("successful GET request", async () => {
    const testData = { message: "Success" };
    mock.onGet("/test").reply(200, testData);

    const response = await api.get("/test");
    expect(response).toEqual(testData);
  });

  test("successful POST request", async () => {
    const testData = { message: "Created" };
    mock.onPost("/test").reply(201, testData);

    const response = await api.post("/test", { data: "test" });
    expect(response).toEqual(testData);
  });

  test("handles network errors", async () => {
    mock.onGet("/test").networkError();

    const response = await api.get("/test");
    expect(response).toEqual({ error: "Service temporarily unavailable" });
  });

  test("caches successful responses", async () => {
    const testData = { message: "Cached" };
    mock.onGet("/test").reply(200, testData);

    const response1 = await api.get("/test");
    const response2 = await api.get("/test");

    expect(response1).toEqual(testData);
    expect(response2).toEqual(testData);
    expect(mock.history.get.length).toBe(1);
  });
});
