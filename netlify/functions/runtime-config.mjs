export default async () => {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
  return new Response(JSON.stringify({
    supabaseUrl,
    supabaseAnonKey,
    giphyConfigured: Boolean(process.env.GIPHY_API_KEY),
    allowedDomain: process.env.ALLOWED_GOOGLE_DOMAIN || "",
    configured: Boolean(supabaseUrl && supabaseAnonKey),
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};

function normalizeSupabaseUrl(value) {
  return String(value)
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/i, "");
}
