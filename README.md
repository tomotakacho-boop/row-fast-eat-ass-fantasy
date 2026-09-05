# Row Fast Eat Ass · League Hub

A private, mobile-friendly league website with:

- live ESPN East/West standings with member pictures, matchup schedules, and the confirmed 2026 draft order;
- the $2,100 prize-pool breakdown;
- a Power Rankings “coming soon” workspace;
- a Discord-style league feed with Google login, persistent profile pictures, clean messages, hover-to-reply controls, on-demand emoji reactions, and threaded replies.

The repository contains no ESPN cookies, Google secrets, or database secrets. Those values stay in Netlify and Supabase.

## Deploy to Netlify

1. Create a new GitHub repository and upload this folder's contents to the repository root.
2. In Netlify, choose **Add new site → Import an existing project**, select the repository, and deploy. There is no build command; the publish directory is `public` (already set in `netlify.toml`).
3. Keep the generated Netlify URL handy. You will add it to the Google/Supabase redirect allow-list below.

## Create the feed database and Google login

1. Create a free Supabase project at `supabase.com`.
2. Open **SQL Editor**, paste all of [`supabase/schema.sql`](supabase/schema.sql), and run it once. The script also creates the public `profile-images` Storage bucket and secure per-user upload policies. It is safe to rerun after an update.

If profile uploads report **Bucket not found**, run only [`supabase/profile-images-setup.sql`](supabase/profile-images-setup.sql) in the same Supabase project's SQL Editor. The final query must return one public bucket named `profile-images`.
3. Open **Authentication → Providers → Google** and enable Google. Supabase will show the callback URL to place in the Google Cloud OAuth client.
4. In Google Cloud, create an OAuth 2.0 Web Client and add Supabase's callback URL as an authorized redirect URI. Paste the Google Client ID and Client Secret back into Supabase.
5. In **Authentication → URL Configuration**, set the Site URL to the Netlify URL and add both the production URL and `http://localhost:8888` to Redirect URLs.
6. In Netlify **Site configuration → Environment variables**, add:

   - `SUPABASE_URL` — use only the project origin, such as `https://xxxxx.supabase.co`; do not include `/rest/v1`
   - `SUPABASE_ANON_KEY` (Supabase's public publishable/anon key)

7. Restrict sign-in with either or both of these Netlify variables:

   - `ALLOWED_GOOGLE_DOMAIN` — one Google Workspace domain, such as `company.com`
   - `ALLOWED_EMAILS` — a comma-separated list of exact Google account emails

8. In Supabase, replace the commented example at the bottom of `schema.sql` with the owners' Google emails and run only those `insert` lines. Once `allowed_members` has an active row, database access is restricted to listed accounts.

The **Log in** and **Sign up** buttons both use Google's secure OAuth screen. On a member's first visit, the site asks them to choose their Row Fast team. After setup, clicking the signed-in badge opens the profile editor, where they can change their display name, team, or feed picture. Images are stored in Supabase and therefore follow the member across devices.

After Google redirects back, the header must show a green **Signed in** indicator with the member's Google name or email. If the header still shows Log in / Sign up, confirm that `SUPABASE_ANON_KEY` contains the public publishable/anon key (not a URL), then trigger a fresh Netlify deploy. The site surfaces incomplete OAuth callbacks instead of silently returning to Overview.

## Connect the private ESPN league

Add these variables in Netlify:

- `ESPN_LEAGUE_ID=416026` — the confirmed Row Fast league ID (also built in as the safe default)
- `ESPN_SEASON=2026`
- `ESPN_S2` — required when the ESPN league is private
- `ESPN_SWID` — required when the ESPN league is private

`ESPN_S2` and `ESPN_SWID` are private session cookies. Never commit them to GitHub, paste them into browser-side code, or share them. They can expire; if ESPN begins returning an authorization error, replace both values in Netlify. The live bridge keeps them server-side and returns only normalized standings and matchups to an authenticated league member.

After adding or changing Netlify environment variables, trigger a new deploy.

## Local preview

Install the Netlify CLI and run:

```bash
netlify dev
```

Then open the exact local URL shown by Netlify. A plain file preview will display the visual shell, but authentication and ESPN functions require `netlify dev` or a deployed site.

## Updating the team list

The confirmed twelve teams and managers are defined once at the top of `public/app.js`. ESPN supplies the live records and schedule; this local list supplies the preseason fallback and member directory.

## Security notes

- Feed tables use Supabase Row Level Security. Only authenticated, allowed members can read or write feed content.
- Post and reply author information is stamped from the signed-in member's profile by database triggers.
- The ESPN function validates the Supabase login before returning private league data.
- `SUPABASE_ANON_KEY` is designed to be public and is safe in browser configuration when Row Level Security remains enabled. Never use a Supabase service-role key in this site.
