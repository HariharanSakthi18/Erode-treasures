import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Public catalogue only: this client never has elevated database privileges.
export const getPublicDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Destination connection is not configured.");

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers, signal: AbortSignal.timeout(10000) });
      },
    },
  });

  const rows: Database["public"]["Tables"]["destinations"]["Row"][] = [];
  // Page explicitly so a future catalogue is not silently cut off at 1,000 rows.
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await client
      .from("destinations")
      .select(
        "id,name,category,location,description,tagline,note,source,image,map_query,photo_alt,photo_source,photo_credit,sort_order,created_at,updated_at",
      )
      .order("sort_order")
      .order("id")
      .range(offset, offset + 999);
    if (error) {
      console.error("Destination catalogue read failed:", error.code, error.message);
      throw new Error("Destination information is temporarily unavailable.");
    }
    rows.push(...data);
    if (data.length < 1000) break;
  }
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    location: row.location,
    description: row.description,
    tagline: row.tagline,
    note: row.note,
    source: row.source,
    image: row.image,
    mapQuery: row.map_query,
    photoAlt: row.photo_alt ?? undefined,
    photoSource: row.photo_source ?? undefined,
    photoCredit: row.photo_credit ?? undefined,
  }));
});
