export default async (request) => {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);

  const apiKey = process.env.GIPHY_API_KEY || "";
  if (!apiKey) return json({ error: "In-app GIF search is not configured yet. Use the GIF-link option for now." }, 503);

  const query = new URL(request.url).searchParams.get("q")?.trim().slice(0, 80);
  if (!query) return json({ error: "Enter a GIF search term." }, 400);

  try {
    const endpoint = new URL("https://api.giphy.com/v1/gifs/search");
    endpoint.searchParams.set("api_key", apiKey);
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("limit", "18");
    endpoint.searchParams.set("rating", "pg-13");
    endpoint.searchParams.set("lang", "en");
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) return json({ error: "GIPHY search is temporarily unavailable." }, 502);
    const payload = await response.json();
    const data = (payload.data || []).map((gif) => ({
      title: gif.title || "GIPHY GIF",
      preview: gif.images?.fixed_width_small?.url || gif.images?.fixed_width?.url || gif.images?.original?.url || "",
      url: gif.images?.original?.url || gif.images?.fixed_width?.url || "",
    })).filter((gif) => gif.preview && gif.url);
    return json({ data, results: data }, 200);
  } catch {
    return json({ error: "GIPHY search is temporarily unavailable." }, 502);
  }
};

async function requireLeagueMember(request) {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const anonKey = process.env.SUPABASE_ANON_KEY || "";
  const authorization = request.headers.get("authorization") || "";
  if (!supabaseUrl || !anonKey || !authorization.startsWith("Bearer ")) {
    const error = new Error("Sign in as a league member to search GIFs.");
    error.status = 401;
    throw error;
  }
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: authorization },
  });
  if (!response.ok) {
    const error = new Error("Your session expired. Sign in again to search GIFs.");
    error.status = 401;
    throw error;
  }
}

function normalizeSupabaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "").replace(/\/(rest|auth|storage)\/v1.*$/i, "");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
