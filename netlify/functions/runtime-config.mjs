export default async () => {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
  return new Response(JSON.stringify({
    supabaseUrl,
    supabaseAnonKey,
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
