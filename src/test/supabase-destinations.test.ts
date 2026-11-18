import { describe, expect, it } from "vitest";

const url = process.env["SUPABASE_URL"];
const key = process.env["SUPABASE_PUBLISHABLE_KEY"];

describe.skipIf(!url || !key)("Live public destination access", () => {
  async function request(method: string, filter = "", body?: object) {
    if (!url || !key) throw new Error("Public Supabase connection missing");
    return fetch(`${url.replace(/\/$/, "")}/rest/v1/destinations${filter}`, {
      method,
      headers: { apikey: key, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
  }

  it("allows visitors to read the destination catalogue", async () => {
    const response = await request("GET", "?select=id&limit=1");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(expect.any(Array));
  });

  it("blocks visitors from adding destinations", async () => {
    // Duplicate ID: no existing data can change even if permissions regress.
    const response = await request("POST", "", { id: "kodiveri" });
    expect([401, 403]).toContain(response.status);
  });

  it("blocks visitors from editing destinations", async () => {
    const response = await request("PATCH", "?id=eq.nonexistent-permission-probe", {
      note: "Access probe",
    });
    expect([401, 403]).toContain(response.status);
  });

  it("blocks visitors from removing destinations", async () => {
    const response = await request("DELETE", "?id=eq.nonexistent-permission-probe");
    expect([401, 403]).toContain(response.status);
  });
});
