const TEAMS = [
  { id: 1, name: "Team Rex", manager: "Peter Rex", division: "West", divisionOrder: 2 },
  { id: 2, name: "Wet Willies", manager: "Will Cordonnier", division: "East", divisionOrder: 6 },
  { id: 3, name: "Juulio Jones", manager: "Seamus Mulcahy", division: "East", divisionOrder: 5 },
  { id: 4, name: "Shayshawn Broccoli", manager: "Ethan Ashley", division: "West", divisionOrder: 6 },
  { id: 5, name: "Meet The Robinson's", manager: "Tomotaka Cho", division: "East", divisionOrder: 1 },
  { id: 6, name: "Eat The Boutte Like Groceries", manager: "Tim Harris", division: "West", divisionOrder: 1 },
  { id: 7, name: "OnlyFannins", manager: "Jack Coffman", division: "East", divisionOrder: 3 },
  { id: 8, name: "Pukana Matatas", manager: "Jackson Herz", division: "West", divisionOrder: 3 },
  { id: 9, name: "Rex On Rex", manager: "Liam Rex", division: "East", divisionOrder: 4 },
  { id: 10, name: "Two-Point Conversion Therapy", manager: "Parker Sikora", division: "West", divisionOrder: 5 },
  { id: 11, name: "Goff Balls", manager: "Drew Eckler · Andrew Eckler", division: "East", divisionOrder: 2 },
  { id: 12, name: "Kittle League", manager: "John Olson", division: "West", divisionOrder: 4 },
];

const EMOJIS = ["👍", "❤️", "😂", "🔥", "🏈", "👀"];
const SAMPLE_POWER_RANKINGS = [
  {
    rank: 1, teamId: 8, score: 92.4, record: "1–0", movement: "NEW", movementTone: "up",
    result: "Won 143.8–118.6 vs Wet Willies",
    headline: "A first-week statement with very few soft spots.",
    blurb: "Pukana Matatas set the pace with an explosive ceiling and the kind of balanced scoring profile that travels. The model loves both the result and the lack of obvious lineup weakness, making this the sample standard everyone else is chasing.",
    stars: "Bijan Robinson · 27.4; Puka Nacua · 22.1",
    shortfall: "Caleb Williams · 12.8",
    moment: "Bijan’s late touchdown turned a competitive matchup into the week’s biggest margin."
  },
  {
    rank: 2, teamId: 5, score: 89.7, record: "1–0", movement: "+2", movementTone: "up",
    result: "Won 137.1–124.5 vs Goff Balls",
    headline: "The stars delivered, and the supporting cast held the line.",
    blurb: "Meet The Robinson’s got premium output at the top of the lineup and survived one quiet veteran performance. The roster already looks difficult to outscore when its centerpiece players hit together, though the depth will face a tougher test in a closer week.",
    stars: "Ja’Marr Chase · 29.6; Jonathan Taylor · 20.4",
    shortfall: "Mike Evans · 7.8",
    moment: "A fourth-quarter scoring burst created the separation in an otherwise tight matchup."
  },
  {
    rank: 3, teamId: 1, score: 87.9, record: "1–0", movement: "+3", movementTone: "up",
    result: "Won 132.6–117.4 vs OnlyFannins",
    headline: "Elite backfield speed gives Team Rex a real weekly hammer.",
    blurb: "Team Rex paired a strong quarterback result with efficient running-back production and never gave the opponent a clean opening. The ceiling is clear; the next checkpoint is whether the pass catchers can make this lineup less dependent on two superstars.",
    stars: "Jahmyr Gibbs · 24.8; Josh Allen · 25.2",
    shortfall: "Dalton Kincaid · 5.1",
    moment: "The Allen–Gibbs combination erased an early deficit before the late window."
  },
  {
    rank: 4, teamId: 4, score: 84.6, record: "1–0", movement: "+1", movementTone: "up",
    result: "Won 129.9–126.8 vs Juulio Jones",
    headline: "A narrow escape still revealed a lineup with real teeth.",
    blurb: "Shayshawn Broccoli won the week’s closest sample matchup behind a dominant WR1 and a timely flex contribution. The model is impressed by the usable depth but keeps this team outside the top three because the victory required nearly every late break.",
    stars: "CeeDee Lamb · 25.7; Bucky Irving · 18.3",
    shortfall: "Jordan Addison · 6.2",
    moment: "A final-drive reception flipped the projected winner with minutes left."
  },
  {
    rank: 5, teamId: 11, score: 81.8, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 124.5–137.1 vs Meet The Robinson’s",
    headline: "The record says loss; the underlying score says contender.",
    blurb: "Goff Balls drew one of the week’s strongest opponents and still posted a score that would have beaten much of the league. There is no panic here: the model rewards the performance while flagging a thin margin for error at tight end.",
    stars: "Amon-Ra St. Brown · 23.9; Lamar Jackson · 24.6",
    shortfall: "Travis Kelce · 7.0",
    moment: "A strong Sunday night rally made the final score far more respectable."
  },
  {
    rank: 6, teamId: 12, score: 79.3, record: "1–0", movement: "+4", movementTone: "up",
    result: "Won 121.7–116.3 vs Two-Point Conversion Therapy",
    headline: "Good structure, timely scoring, and just enough star power.",
    blurb: "Kittle League did not post a fireworks show, but it built points steadily across the lineup and avoided a fatal zero. That sturdy floor earns a meaningful rise; unlocking another explosive option would push the model score into the next tier.",
    stars: "Saquon Barkley · 21.8; Nico Collins · 17.6",
    shortfall: "Deebo Samuel · 8.1",
    moment: "The defense sealed the matchup with a late turnover."
  },
  {
    rank: 7, teamId: 2, score: 76.8, record: "0–1", movement: "−6", movementTone: "down",
    result: "Lost 118.6–143.8 vs Pukana Matatas",
    headline: "A brutal opponent obscures an otherwise playable opening week.",
    blurb: "Wet Willies ran into the highest-scoring team in the sample, so the fall is more about the rest of the league moving up than a total collapse. The core held up, but the flex production has to improve before this roster can win shootouts.",
    stars: "Justin Jefferson · 20.9; Derrick Henry · 17.2",
    shortfall: "David Montgomery · 6.4",
    moment: "A promising comeback ended when the opponent answered with consecutive touchdowns."
  },
  {
    rank: 8, teamId: 6, score: 74.4, record: "1–0", movement: "+1", movementTone: "up",
    result: "Won 119.4–114.2 vs Rex On Rex",
    headline: "The win counts, but the model wants a little more proof.",
    blurb: "Eat The Boutte Like Groceries found just enough production from its young core to bank the result. There are exciting ingredients here, especially at receiver, but one inefficient backfield performance kept the projected rest-of-season strength in the middle tier.",
    stars: "Jaxon Smith-Njigba · 19.8; Drake Maye · 23.1",
    shortfall: "James Cook · 8.0",
    moment: "A bold fourth-down conversion protected the lead late."
  },
  {
    rank: 9, teamId: 10, score: 71.9, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 116.3–121.7 vs Kittle League",
    headline: "Close enough to compete, not clean enough to finish.",
    blurb: "Two-Point Conversion Therapy stayed within striking distance but could not overcome a quiet receiving slot. The roster still carries speed and weekly upside, so this ranking could reverse quickly if its secondary options earn more volume.",
    stars: "Malik Nabers · 18.7; De’Von Achane · 16.8",
    shortfall: "Jaylen Waddle · 7.3",
    moment: "A missed Monday-night opportunity left the comeback one score short."
  },
  {
    rank: 10, teamId: 3, score: 68.5, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 126.8–129.9 vs Shayshawn Broccoli",
    headline: "The process looked better than the result.",
    blurb: "Juulio Jones lost by a field goal despite producing one of the stronger losing scores. The model sees a competitive roster with immediate rebound potential, but a low tight-end output and a late lineup decision proved costly in a matchup decided at the margins.",
    stars: "Ashton Jeanty · 17.9; Tee Higgins · 15.2",
    shortfall: "George Kittle · 6.5",
    moment: "One bench decision represented more points than the final margin."
  },
  {
    rank: 11, teamId: 9, score: 64.2, record: "0–1", movement: "—", movementTone: "flat",
    result: "Lost 114.2–119.4 vs Eat The Boutte Like Groceries",
    headline: "There is enough talent here, but the lineup needs another gear.",
    blurb: "Rex On Rex remained competitive without receiving a true week-winning performance. A steady floor keeps the team out of last, while the model waits for its running backs to create more explosive plays and improve the weekly ceiling.",
    stars: "Brock Bowers · 16.4; Garrett Wilson · 15.9",
    shortfall: "RJ Harvey · 5.0",
    moment: "A late red-zone target narrowly missed what could have been the winning score."
  },
  {
    rank: 12, teamId: 7, score: 59.8, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 117.4–132.6 vs Team Rex",
    headline: "One week is not a verdict, but the warning lights are on.",
    blurb: "OnlyFannins produced respectable top-line numbers, yet too many lineup spots failed to beat replacement level. The roster needs either a volume shift or a waiver-wire hit before the model will buy a quick climb out of the basement.",
    stars: "Josh Jacobs · 15.4; Terry McLaurin · 14.2",
    shortfall: "Rashee Rice · 4.8",
    moment: "Two early red-zone trips produced no touchdowns and set the tone."
  },
];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  config: null,
  session: null,
  user: null,
  profile: null,
  league: null,
  selectedWeek: 1,
  posts: [],
  comments: [],
  reactions: [],
  profiles: [],
  powerComments: [],
  powerReactions: [],
  activePowerReplyKey: null,
  activePowerReactionKey: null,
  powerLoaded: false,
  activeReplyPostId: null,
  activeReactionPostId: null,
  feedTimer: null,
  authJustCompleted: false,
  authError: "",
};

document.addEventListener("DOMContentLoaded", bootstrap);

async function bootstrap() {
  populateStaticTeams();
  populateWeekSelect();
  renderFallbackOverview();
  bindNavigation();
  bindInterface();

  state.config = await loadRuntimeConfig();
  await restoreSession();
  renderAuth();

  if (state.session) {
    await Promise.all([loadProfile(), loadLeagueData()]);
    await loadFeed();
    await loadPowerRankingActivity();
  } else {
    renderFeedSignedOut();
    renderPowerRankings();
  }

  routeFromHash();
  if (state.authJustCompleted && state.user) {
    const name = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email;
    toast(`Signed in successfully as ${name}.`);
  } else if (state.authError) {
    toast(state.authError);
  }
}

function bindNavigation() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  window.addEventListener("hashchange", routeFromHash);
}

function routeFromHash() {
  const route = window.location.hash.replace("#", "");
  if (["overview", "power", "feed"].includes(route)) switchView(route, false);
}

function switchView(view, updateHash = true) {
  $$("[data-view]").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  $$("[data-view-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
  if (updateHash) history.replaceState(null, "", `#${view}`);
  if (view === "feed" && state.session) {
    loadFeed();
    clearInterval(state.feedTimer);
    state.feedTimer = setInterval(() => {
      if ($('[data-view-panel="feed"]').classList.contains("is-active")) loadFeed(true);
    }, 15000);
  } else {
    clearInterval(state.feedTimer);
  }
  if (view === "power") {
    if (state.session) loadPowerRankingActivity(true);
    else renderPowerRankings();
  }
}

function bindInterface() {
  $("#auth-actions").addEventListener("click", (event) => {
    const action = event.target.closest("[data-auth]")?.dataset.auth;
    if (action === "login" || action === "signup") beginGoogleAuth();
    if (action === "logout") signOut();
    if (action === "profile") openProfileModal();
  });

  $("#refresh-espn").addEventListener("click", () => loadLeagueData(true));
  $("#week-select").addEventListener("change", (event) => {
    state.selectedWeek = Number(event.target.value);
    renderSchedule();
  });
  $("#post-form").addEventListener("submit", createPost);
  $("#post-input").addEventListener("input", autoGrowComposer);
  $("#post-input").addEventListener("keydown", handleComposerKeydown);
  $("#profile-form").addEventListener("submit", saveProfile);
  $("#profile-avatar").addEventListener("change", previewProfileAvatar);
  $("#profile-cancel").addEventListener("click", closeProfileModal);
  $("#profile-close").addEventListener("click", closeProfileModal);
  $("#profile-modal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeProfileModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("#profile-modal").hidden) closeProfileModal();
  });
  $("#message-list").addEventListener("click", handleMessageClick);
  $("#message-list").addEventListener("submit", handleReplySubmit);
  $("#power-rankings-list").addEventListener("click", handlePowerRankingClick);
  $("#power-rankings-list").addEventListener("submit", handlePowerReplySubmit);
  $("#toggle-members").addEventListener("click", () => $("#member-rail").classList.add("is-open"));
  $("#close-members").addEventListener("click", () => $("#member-rail").classList.remove("is-open"));
}

function populateStaticTeams() {
  renderPowerRankings();

  $("#member-list").innerHTML = TEAMS.map((team) => `
    <div class="member">
      <span class="member-dot">${initials(team.name)}</span>
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(team.manager)}</small></span>
    </div>`).join("");

  $("#profile-team").innerHTML = `<option value="">Select your team</option>${TEAMS.map((team) =>
    `<option value="${team.id}">${escapeHtml(team.name)} · ${escapeHtml(team.manager)}</option>`).join("")}`;

  $("#draft-order-list").innerHTML = [...TEAMS]
    .sort((a, b) => a.id - b.id)
    .map((team) => `<div class="draft-order-entry${team.id === 5 ? " is-user-team" : ""}">
      <span class="draft-slot">${team.id}</span>
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(team.manager)}</small></span>
    </div>`).join("");
}

function populateWeekSelect() {
  $("#week-select").innerHTML = Array.from({ length: 18 }, (_, i) => `<option value="${i + 1}">Week ${i + 1}</option>`).join("");
}

async function loadRuntimeConfig() {
  try {
    const response = await fetch("/.netlify/functions/runtime-config", { cache: "no-store" });
    if (!response.ok) throw new Error("Runtime configuration is unavailable.");
    return await response.json();
  } catch {
    return { supabaseUrl: "", supabaseAnonKey: "", allowedDomain: "", configured: false };
  }
}

async function restoreSession() {
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const query = new URLSearchParams(window.location.search);
  const oauthError = hash.get("error_description") || query.get("error_description") || hash.get("error") || query.get("error");
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");

  if (oauthError) {
    state.authError = `Google sign-in did not finish: ${oauthError}`;
    clearOAuthCallback();
    return;
  }

  if (accessToken) {
    state.session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Math.floor(Date.now() / 1000) + Number(hash.get("expires_in") || 3600),
    };
    localStorage.setItem("rowfast_session", JSON.stringify(state.session));
    state.authJustCompleted = true;
    clearOAuthCallback();
  } else if (query.get("code")) {
    state.authError = "Google approved the login, but the Supabase session could not be completed. Start sign-in again from this page.";
    clearOAuthCallback();
    return;
  } else {
    try { state.session = JSON.parse(localStorage.getItem("rowfast_session")); } catch { state.session = null; }
  }

  if (!state.session) return;
  if (!state.config?.configured) {
    state.authError = "Google returned successfully, but SUPABASE_ANON_KEY is missing or unavailable in Netlify.";
    localStorage.removeItem("rowfast_session");
    state.session = null;
    return;
  }
  if (state.session.expires_at < Math.floor(Date.now() / 1000) + 90) await refreshSession();
  if (!state.session) return;

  try {
    const response = await fetch(`${state.config.supabaseUrl}/auth/v1/user`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      let detail = "Session validation failed.";
      try {
        const payload = await response.json();
        detail = payload.msg || payload.message || payload.error_description || detail;
      } catch {}
      throw new Error(detail);
    }
    state.user = await response.json();
    const domain = state.user.email?.split("@")[1]?.toLowerCase();
    if (state.config.allowedDomain && domain !== state.config.allowedDomain.toLowerCase()) {
      await signOut();
      toast(`Use your ${state.config.allowedDomain} Google account to enter this league.`);
    }
  } catch (error) {
    localStorage.removeItem("rowfast_session");
    state.session = null;
    state.user = null;
    state.authError = /api key/i.test(error.message)
      ? "Google approved the login, but Netlify is missing a valid SUPABASE_ANON_KEY. Add the public publishable/anon key and redeploy."
      : `Google approved the login, but the session could not be verified: ${error.message}`;
  }
}

function clearOAuthCallback() {
  history.replaceState(null, "", `${location.pathname}#overview`);
}

async function refreshSession() {
  if (!state.session?.refresh_token) return signOut();
  try {
    const response = await fetch(`${state.config.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: state.config.supabaseAnonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: state.session.refresh_token }),
    });
    if (!response.ok) throw new Error("Refresh failed");
    const session = await response.json();
    state.session = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + session.expires_in,
    };
    localStorage.setItem("rowfast_session", JSON.stringify(state.session));
  } catch {
    localStorage.removeItem("rowfast_session");
    state.session = null;
  }
}

function beginGoogleAuth() {
  if (!state.config?.configured) {
    toast("Google sign-in needs both SUPABASE_URL and SUPABASE_ANON_KEY in Netlify, followed by a new deploy.");
    return;
  }
  const redirectTo = `${location.origin}${location.pathname}`;
  location.assign(`${state.config.supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`);
}

async function signOut() {
  if (state.session && state.config?.supabaseUrl) {
    fetch(`${state.config.supabaseUrl}/auth/v1/logout`, { method: "POST", headers: authHeaders() }).catch(() => {});
  }
  state.session = null;
  state.user = null;
  state.profile = null;
  state.authJustCompleted = false;
  state.authError = "";
  localStorage.removeItem("rowfast_session");
  renderAuth();
  renderFallbackOverview();
  renderFeedSignedOut();
  state.powerComments = [];
  state.powerReactions = [];
  state.powerLoaded = false;
  renderPowerRankings();
}

function renderAuth() {
  const root = $("#auth-actions");
  if (!state.user) {
    root.innerHTML = `<button class="button button-ghost" data-auth="login">Log in</button><button class="button button-gold" data-auth="signup">Sign up</button>${state.authError ? `<span class="auth-alert" title="${escapeAttr(state.authError)}">Sign-in incomplete</span>` : ""}`;
    return;
  }
  const name = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email;
  const avatar = state.profile?.avatar_url || state.user.user_metadata?.avatar_url;
  root.innerHTML = `<div class="user-chip" aria-label="Signed in as ${escapeAttr(name)}"><span class="user-presence" aria-hidden="true"></span><button class="user-profile-button" data-auth="profile" aria-label="Edit profile"><span class="user-identity"><small>Signed in · Edit profile</small><strong>${escapeHtml(name)}</strong></span>${avatar ? `<img class="avatar" src="${escapeAttr(avatar)}" alt="" />` : `<span class="avatar-fallback">${initials(name)}</span>`}</button><button class="logout-button" data-auth="logout">Log out</button></div>`;
  const input = $("#post-input");
  input.disabled = false;
  input.placeholder = "Message #league-feed";
  $(".send-button").disabled = false;
  $("#composer-note").textContent = "Press Enter to post · Shift + Enter for a new line.";
}

async function loadProfile() {
  if (!state.user) return;
  try {
    const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(state.user.id)}&select=*`);
    state.profile = profiles?.[0] || null;
    if (!state.profile?.team_id) openProfileModal();
    renderAuth();
  } catch (error) {
    toast(readableError(error, "Profile setup is waiting for the database schema."));
  }
}

function openProfileModal() {
  if (!state.user) return;
  $("#profile-name").value = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email?.split("@")[0] || "";
  $("#profile-team").value = state.profile?.team_id ? String(state.profile.team_id) : "";
  $("#profile-avatar").value = "";
  renderProfileAvatarPreview(state.profile?.avatar_url || state.user.user_metadata?.avatar_url, $("#profile-name").value);
  $("#profile-cancel").hidden = false;
  $("#profile-modal").hidden = false;
}

function closeProfileModal() {
  $("#profile-modal").hidden = true;
  switchView("overview");
}

function previewProfileAvatar(event) {
  const file = event.target.files?.[0];
  if (!file) return renderProfileAvatarPreview(state.profile?.avatar_url, $("#profile-name").value);
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type) || file.size > 4 * 1024 * 1024) {
    event.target.value = "";
    toast("Choose a JPG, PNG, WebP, or GIF no larger than 4 MB.");
    return;
  }
  renderProfileAvatarPreview(URL.createObjectURL(file), $("#profile-name").value);
}

function renderProfileAvatarPreview(url, name = "") {
  $("#profile-avatar-preview").innerHTML = url
    ? `<img src="${escapeAttr(url)}" alt="Profile preview" />`
    : escapeHtml(initials(name));
}

async function saveProfile(event) {
  event.preventDefault();
  const teamId = Number($("#profile-team").value);
  const team = TEAMS.find((item) => item.id === teamId);
  const displayName = $("#profile-name").value.trim();
  const avatarFile = $("#profile-avatar").files?.[0];
  if (!team || !displayName) return;

  try {
    const saveButton = $("#profile-save");
    saveButton.disabled = true;
    saveButton.textContent = avatarFile ? "Uploading…" : "Saving…";
    const avatarUrl = avatarFile
      ? await uploadProfileAvatar(avatarFile)
      : state.profile?.avatar_url || state.user.user_metadata?.avatar_url || null;
    const rows = await supabaseRequest("/rest/v1/profiles?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        id: state.user.id,
        email: state.user.email,
        display_name: displayName,
        avatar_url: avatarUrl,
        team_id: team.id,
        team_name: team.name,
      }),
    });
    state.profile = rows?.[0];
    $("#profile-modal").hidden = true;
    renderAuth();
    await loadFeed(true);
    renderPowerRankings();
    toast("Profile saved. Your picture now appears throughout the league feed.");
  } catch (error) {
    toast(readableError(error, "Could not save your team profile."));
  } finally {
    const saveButton = $("#profile-save");
    saveButton.disabled = false;
    saveButton.textContent = "Save profile";
  }
}

async function uploadProfileAvatar(file) {
  const extension = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" })[file.type];
  if (!extension || file.size > 4 * 1024 * 1024) throw new Error("Choose a supported image no larger than 4 MB.");
  const path = `${state.user.id}/avatar.${extension}`;
  const response = await fetch(`${state.config.supabaseUrl}/storage/v1/object/profile-images/${path}`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": file.type, "x-upsert": "true" },
    body: file,
  });
  if (!response.ok) {
    let message = `Profile image upload failed (${response.status}).`;
    try { message = (await response.json()).message || message; } catch {}
    if (/bucket not found/i.test(message)) {
      message = "Profile storage is not set up yet. Run supabase/profile-images-setup.sql once in the Supabase SQL Editor, then try again.";
    }
    throw new Error(message);
  }
  return `${state.config.supabaseUrl}/storage/v1/object/public/profile-images/${path}?v=${Date.now()}`;
}

function authHeaders(extra = {}) {
  return {
    apikey: state.config?.supabaseAnonKey || "",
    Authorization: `Bearer ${state.session?.access_token || state.config?.supabaseAnonKey || ""}`,
    ...extra,
  };
}

async function supabaseRequest(path, options = {}) {
  if (!state.config?.supabaseUrl || !state.session) throw new Error("Sign in is not configured.");
  const response = await fetch(`${state.config.supabaseUrl}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    let message = `Database request failed (${response.status}).`;
    try { message = (await response.json()).message || message; } catch {}
    throw new Error(message);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function loadLeagueData(force = false) {
  if (!state.session) return renderFallbackOverview();
  const refresh = $("#refresh-espn");
  refresh.classList.add("is-loading");
  try {
    const response = await fetch(`/.netlify/functions/espn-league${force ? `?refresh=${Date.now()}` : ""}`, {
      headers: { Authorization: `Bearer ${state.session.access_token}` },
      cache: force ? "no-store" : "default",
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "ESPN sync failed.");
    state.league = payload;
    state.selectedWeek = payload.currentWeek || 1;
    $("#week-select").value = String(state.selectedWeek);
    renderLeagueOverview();
    $("#sync-label").textContent = payload.leagueName || "ESPN league connected";
    $("#sync-time").textContent = `Updated ${formatDate(payload.updatedAt)}`;
    $(".status-dot").classList.remove("is-offline");
  } catch (error) {
    renderFallbackOverview();
    $("#sync-label").textContent = "ESPN setup needed";
    $("#sync-time").textContent = error.message;
    $(".status-dot").classList.add("is-offline");
  } finally {
    refresh.classList.remove("is-loading");
  }
}

function renderFallbackOverview() {
  state.league = {
    currentWeek: 1,
    teams: TEAMS.map((team, index) => ({ ...team, divisionName: team.division, rank: index + 1, wins: 0, losses: 0, ties: 0, pointsFor: 0, pointsAgainst: 0, streak: "—" })),
    matchups: Array.from({ length: 6 }, (_, index) => ({
      week: 1,
      home: TEAMS[index],
      away: TEAMS[TEAMS.length - 1 - index],
      homeScore: null,
      awayScore: null,
      status: "Scheduled",
    })),
  };
  state.selectedWeek = 1;
  $("#week-select").value = "1";
  renderLeagueOverview();
}

function renderLeagueOverview() {
  renderStandings();
  renderSchedule();
}

function renderStandings() {
  const teams = state.league?.teams || [];
  renderDivisionStandings("East", "#standings-east-body", teams);
  renderDivisionStandings("West", "#standings-west-body", teams);
}

function renderDivisionStandings(division, selector, teams) {
  const divisionTeams = teams
    .filter((team) => (team.divisionName || divisionFor(team.name)) === division)
    .sort(compareStandings);
  $(selector).innerHTML = divisionTeams.map((team, index) => {
    const profile = profileForTeam(team);
    const avatar = profile?.avatar_url;
    return `
    <tr>
      <td class="rank-number">${index + 1}</td>
      <td><div class="team-cell">${avatar ? `<span class="team-seed team-photo"><img src="${escapeAttr(avatar)}" alt="${escapeAttr(team.name)} profile picture" /></span>` : `<span class="team-seed">${initials(team.name)}</span>`}<span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(profile?.display_name || team.manager || managerFor(team.name))}</small></span></div></td>
      <td>${team.wins || 0}-${team.losses || 0}-${team.ties || 0}</td>
      <td>${formatNumber(team.pointsFor)}</td>
      <td>${formatNumber(team.pointsAgainst)}</td>
      <td>${escapeHtml(team.streak || "—")}</td>
    </tr>`;
  }).join("");
}

function compareStandings(a, b) {
  const gamesA = (a.wins || 0) + (a.losses || 0) + (a.ties || 0);
  const gamesB = (b.wins || 0) + (b.losses || 0) + (b.ties || 0);
  const percentageA = gamesA ? ((a.wins || 0) + (a.ties || 0) * .5) / gamesA : 0;
  const percentageB = gamesB ? ((b.wins || 0) + (b.ties || 0) * .5) / gamesB : 0;
  return percentageB - percentageA || (b.pointsFor || 0) - (a.pointsFor || 0) || divisionOrderFor(a.name) - divisionOrderFor(b.name);
}

function renderSchedule() {
  const week = state.selectedWeek || 1;
  const matchups = (state.league?.matchups || []).filter((matchup) => Number(matchup.week) === week);
  $("#schedule-title").textContent = `Week ${week} slate`;

  $("#schedule-list").innerHTML = matchups.length ? matchups.map((matchup) => `
    <div class="schedule-item">
      <div class="schedule-team">${escapeHtml(matchup.home?.name || "TBD")}<small>${scoreSingle(matchup.homeScore)}</small></div>
      <span class="versus">VS</span>
      <div class="schedule-team">${escapeHtml(matchup.away?.name || "TBD")}<small>${scoreSingle(matchup.awayScore)}</small></div>
    </div>`).join("") : `<div class="empty-state">No schedule is available for Week ${week}.</div>`;
}

function scoreSingle(value) { return value == null ? "Scheduled" : `${Number(value).toFixed(1)} pts`; }

async function loadFeed(silent = false) {
  if (!state.session) return renderFeedSignedOut();
  if (!silent) $("#message-list").insertAdjacentHTML("beforeend", `<div class="feed-loading">Loading league messages…</div>`);
  try {
    const posts = await supabaseRequest("/rest/v1/feed_posts?select=*&order=created_at.desc&limit=75");
    const ids = (posts || []).map((post) => post.id);
    const filter = ids.length ? `&post_id=in.(${ids.join(",")})` : "&post_id=eq.-1";
    const [comments, reactions, profiles] = await Promise.all([
      supabaseRequest(`/rest/v1/feed_comments?select=*&order=created_at.asc${filter}`),
      supabaseRequest(`/rest/v1/feed_reactions?select=*${filter}`),
      supabaseRequest("/rest/v1/profiles?select=id,display_name,avatar_url,team_id,team_name"),
    ]);
    state.posts = (posts || []).reverse();
    state.comments = comments || [];
    state.reactions = reactions || [];
    state.profiles = profiles || [];
    renderMembers();
    renderStandings();
    renderFeed();
  } catch (error) {
    if (!silent) renderFeedError(error);
  }
}

function renderFeedSignedOut() {
  $("#message-list").innerHTML = `
    <div class="feed-welcome"><span class="hash-orb">#</span><h2>Welcome to the league feed.</h2><p>This is the start of the Row Fast Season 10 conversation.</p></div>
    <div class="feed-loading">Sign in with Google to read and join the conversation.</div>`;
  const input = $("#post-input");
  input.disabled = true;
  input.placeholder = "Sign in to post in #league-feed";
  $(".send-button").disabled = true;
}

function renderFeedError(error) {
  $("#message-list").innerHTML = `
    <div class="feed-welcome"><span class="hash-orb">#</span><h2>Welcome to the league feed.</h2><p>This is the start of the Row Fast Season 10 conversation.</p></div>
    <div class="feed-loading">${escapeHtml(readableError(error, "The feed is waiting for its database setup."))}</div>`;
}

function renderFeed() {
  const root = $("#message-list");
  const wasNearBottom = root.scrollHeight - root.scrollTop - root.clientHeight < 100;
  const previousScrollTop = root.scrollTop;
  const messages = state.posts.map((post) => {
    const postProfile = profileFor(post.user_id);
    const postAuthor = postProfile?.display_name || post.author_name;
    const postAvatar = postProfile?.avatar_url || post.author_avatar;
    const postTeam = postProfile?.team_name || post.author_team_name;
    const comments = state.comments.filter((comment) => comment.post_id === post.id);
    const reactions = state.reactions.filter((reaction) => reaction.post_id === post.id);
    const reactionButtons = EMOJIS.map((emoji) => {
      const matching = reactions.filter((reaction) => reaction.emoji === emoji);
      if (!matching.length) return "";
      const mine = matching.some((reaction) => reaction.user_id === state.user?.id);
      return `<button class="reaction ${mine ? "is-mine" : ""}" data-reaction="${emoji}" data-post-id="${post.id}" aria-label="${mine ? "Remove" : "Add"} ${emoji} reaction">${emoji} ${matching.length}</button>`;
    }).join("");
    const replyIsOpen = state.activeReplyPostId === post.id;
    const reactionPickerIsOpen = state.activeReactionPostId === post.id;

    return `<article class="message" data-post-id="${post.id}">
      ${postAvatar ? `<img class="avatar" src="${escapeAttr(postAvatar)}" alt="" />` : `<span class="avatar-fallback">${initials(postAuthor)}</span>`}
      <div>
        <div class="message-meta"><span class="message-author">${escapeHtml(postAuthor)}</span>${postTeam ? `<span class="message-team">${escapeHtml(postTeam)}</span>` : ""}<time class="message-time">${formatMessageTime(post.created_at)}</time></div>
        <p class="message-body">${escapeHtml(post.body)}</p>
        ${reactionButtons ? `<div class="reaction-row">${reactionButtons}</div>` : ""}
        ${comments.length ? `<div class="thread">${comments.map((comment) => { const commentProfile = profileFor(comment.user_id); return `<div class="comment"><strong>${escapeHtml(commentProfile?.display_name || comment.author_name)}</strong>${escapeHtml(comment.body)}<small>${formatMessageTime(comment.created_at)}</small></div>`; }).join("")}</div>` : ""}
        ${replyIsOpen ? `<form class="reply-form" data-reply-form="${post.id}"><input maxlength="500" placeholder="Reply to ${escapeAttr(postAuthor)}" aria-label="Reply to ${escapeAttr(postAuthor)}" required /><button type="submit">Reply</button><button class="reply-cancel" type="button" data-cancel-reply>Cancel</button></form>` : ""}
      </div>
      <div class="message-tools" aria-label="Message actions">
        <button data-add-reaction="${post.id}" title="Add reaction" aria-label="Add reaction">☺<span class="tool-plus">+</span></button>
        <button data-reply="${post.id}" title="Reply" aria-label="Reply">↩</button>
      </div>
      ${reactionPickerIsOpen ? `<div class="reaction-picker" role="group" aria-label="Choose a reaction">${EMOJIS.map((emoji) => `<button data-reaction="${emoji}" data-post-id="${post.id}" aria-label="React ${emoji}">${emoji}</button>`).join("")}<button class="reaction-picker-close" data-close-reactions aria-label="Close reaction picker">×</button></div>` : ""}
    </article>`;
  }).join("");

  root.innerHTML = `<div class="feed-welcome"><span class="hash-orb">#</span><h2>Welcome to the league feed.</h2><p>This is the start of the Row Fast Season 10 conversation.</p></div>${messages || `<div class="feed-loading">No messages yet. Be the first to post.</div>`}`;
  root.scrollTop = wasNearBottom ? root.scrollHeight : previousScrollTop;
}

function powerRankingKey(teamId) {
  return `sample-week-1-team-${teamId}`;
}

async function loadPowerRankingActivity(silent = false) {
  if (!state.session) {
    state.powerComments = [];
    state.powerReactions = [];
    return renderPowerRankings();
  }
  const rankingKeys = new Set(SAMPLE_POWER_RANKINGS.map((ranking) => powerRankingKey(ranking.teamId)));
  try {
    const [comments, reactions] = await Promise.all([
      supabaseRequest("/rest/v1/power_ranking_comments?select=*&order=created_at.asc"),
      supabaseRequest("/rest/v1/power_ranking_reactions?select=*"),
    ]);
    state.powerComments = (comments || []).filter((comment) => rankingKeys.has(comment.ranking_key));
    state.powerReactions = (reactions || []).filter((reaction) => rankingKeys.has(reaction.ranking_key));
    state.powerLoaded = true;
    renderPowerRankings();
  } catch (error) {
    state.powerLoaded = false;
    renderPowerRankings();
    const status = $("#power-social-status");
    if (status) status.textContent = "Sample rankings are ready. Run the included Power Rankings SQL once to enable reactions and replies.";
    if (!silent) toast(readableError(error, "Power Ranking conversations need their database setup."));
  }
}

function renderPowerRankings() {
  const root = $("#power-rankings-list");
  if (!root) return;
  const status = $("#power-social-status");
  if (status) {
    status.textContent = state.user
      ? "React or reply to any ranking. Conversation follows your league profile."
      : "Sign in to react and reply to each team’s write-up.";
  }

  root.innerHTML = SAMPLE_POWER_RANKINGS.map((ranking) => {
    const team = TEAMS.find((item) => item.id === ranking.teamId);
    const profile = profileForTeam(team);
    const avatar = profile?.avatar_url;
    const key = powerRankingKey(ranking.teamId);
    const comments = state.powerComments.filter((comment) => comment.ranking_key === key);
    const reactions = state.powerReactions.filter((reaction) => reaction.ranking_key === key);
    const reactionButtons = EMOJIS.map((emoji) => {
      const matching = reactions.filter((reaction) => reaction.emoji === emoji);
      if (!matching.length) return "";
      const mine = matching.some((reaction) => reaction.user_id === state.user?.id);
      return `<button class="power-reaction ${mine ? "is-mine" : ""}" data-power-reaction="${emoji}" data-ranking-key="${key}" aria-label="${mine ? "Remove" : "Add"} ${emoji} reaction">${emoji} ${matching.length}</button>`;
    }).join("");
    const replyIsOpen = state.activePowerReplyKey === key;
    const pickerIsOpen = state.activePowerReactionKey === key;

    return `<article class="power-ranking-card" id="power-rank-${ranking.rank}" data-ranking-key="${key}">
      <aside class="power-rank-rail">
        <span class="power-rank-label">Rank</span>
        <strong>${ranking.rank}</strong>
        <span class="power-movement is-${ranking.movementTone}">${escapeHtml(ranking.movement)}</span>
      </aside>
      <div class="power-card-body">
        <header class="power-card-header">
          <div class="power-team-identity">
            ${avatar ? `<span class="power-avatar"><img src="${escapeAttr(avatar)}" alt="${escapeAttr(team.name)} profile picture" /></span>` : `<span class="power-avatar">${initials(team.name)}</span>`}
            <span><small>${escapeHtml(team.division)} · ${escapeHtml(profile?.display_name || team.manager)}</small><h3>${escapeHtml(team.name)}</h3></span>
          </div>
          <div class="power-score-block"><span>Model score</span><strong>${ranking.score.toFixed(1)}</strong><small>of 100 · sample</small></div>
        </header>
        <div class="power-result-bar"><strong>${ranking.record}</strong><span>${escapeHtml(ranking.result)}</span><small>Previous matchup · sample</small></div>
        <section class="power-editorial">
          <p class="power-kicker">The read</p>
          <h4>${escapeHtml(ranking.headline)}</h4>
          <p>${escapeHtml(ranking.blurb)}</p>
        </section>
        <div class="power-insight-grid">
          <div class="power-insight is-star"><span>Top performers</span><strong>${escapeHtml(ranking.stars)}</strong></div>
          <div class="power-insight is-short"><span>Fell short</span><strong>${escapeHtml(ranking.shortfall)}</strong></div>
          <div class="power-insight is-moment"><span>Week-defining moment</span><strong>${escapeHtml(ranking.moment)}</strong></div>
        </div>
        <div class="power-social">
          <div class="power-social-left">
            ${reactionButtons ? `<div class="power-reaction-row">${reactionButtons}</div>` : `<span class="power-no-reactions">No reactions yet</span>`}
            <button class="power-action" data-power-add-reaction="${key}" type="button"><span>☺+</span> Add reaction</button>
            <button class="power-action" data-power-reply="${key}" type="button"><span>↩</span> Reply${comments.length ? ` (${comments.length})` : ""}</button>
          </div>
          ${pickerIsOpen ? `<div class="power-reaction-picker" role="group" aria-label="Choose a reaction">${EMOJIS.map((emoji) => `<button data-power-reaction="${emoji}" data-ranking-key="${key}" aria-label="React ${emoji}">${emoji}</button>`).join("")}<button data-power-close-reactions aria-label="Close reaction picker">×</button></div>` : ""}
        </div>
        ${comments.length ? `<div class="power-thread">${comments.map((comment) => { const author = profileFor(comment.user_id); const authorName = author?.display_name || comment.author_name; const authorAvatar = author?.avatar_url || comment.author_avatar; return `<div class="power-comment">${authorAvatar ? `<img src="${escapeAttr(authorAvatar)}" alt="" />` : `<span>${initials(authorName)}</span>`}<div><strong>${escapeHtml(authorName)}</strong><p>${escapeHtml(comment.body)}</p><small>${formatMessageTime(comment.created_at)}</small></div></div>`; }).join("")}</div>` : ""}
        ${replyIsOpen ? `<form class="power-reply-form" data-power-reply-form="${key}"><input maxlength="500" placeholder="Reply to this ranking" aria-label="Reply to ${escapeAttr(team.name)} ranking" required /><button type="submit">Reply</button><button type="button" data-power-cancel-reply>Cancel</button></form>` : ""}
      </div>
    </article>`;
  }).join("");
}

async function handlePowerRankingClick(event) {
  const reply = event.target.closest("[data-power-reply]");
  const addReaction = event.target.closest("[data-power-add-reaction]");
  const reaction = event.target.closest("[data-power-reaction]");
  const cancelReply = event.target.closest("[data-power-cancel-reply]");
  const closeReactions = event.target.closest("[data-power-close-reactions]");
  if (!reply && !addReaction && !reaction && !cancelReply && !closeReactions) return;
  if (!state.user) {
    toast("Sign in with Google to react or reply to Power Rankings.");
    return;
  }
  if (!state.profile?.team_id) {
    openProfileModal();
    return;
  }
  if (reply) {
    const key = reply.dataset.powerReply;
    state.activePowerReplyKey = state.activePowerReplyKey === key ? null : key;
    state.activePowerReactionKey = null;
    renderPowerRankings();
    $(`[data-power-reply-form="${key}"] input`)?.focus();
    return;
  }
  if (addReaction) {
    const key = addReaction.dataset.powerAddReaction;
    state.activePowerReactionKey = state.activePowerReactionKey === key ? null : key;
    state.activePowerReplyKey = null;
    renderPowerRankings();
    return;
  }
  if (cancelReply) {
    state.activePowerReplyKey = null;
    renderPowerRankings();
    return;
  }
  if (closeReactions) {
    state.activePowerReactionKey = null;
    renderPowerRankings();
    return;
  }
  await togglePowerReaction(reaction.dataset.rankingKey, reaction.dataset.powerReaction);
}

async function togglePowerReaction(rankingKey, emoji) {
  const existing = state.powerReactions.find((reaction) => reaction.ranking_key === rankingKey && reaction.user_id === state.user.id && reaction.emoji === emoji);
  try {
    if (existing) {
      await supabaseRequest(`/rest/v1/power_ranking_reactions?id=eq.${existing.id}`, { method: "DELETE" });
    } else {
      await supabaseRequest("/rest/v1/power_ranking_reactions", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ ranking_key: rankingKey, user_id: state.user.id, emoji }),
      });
    }
    state.activePowerReactionKey = null;
    await loadPowerRankingActivity(true);
  } catch (error) { toast(readableError(error, "Could not save that Power Ranking reaction.")); }
}

async function handlePowerReplySubmit(event) {
  const form = event.target.closest("[data-power-reply-form]");
  if (!form) return;
  event.preventDefault();
  const body = $("input", form).value.trim();
  if (!body || !state.user || !state.profile) return;
  try {
    await supabaseRequest("/rest/v1/power_ranking_comments", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        ranking_key: form.dataset.powerReplyForm,
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        body,
      }),
    });
    state.activePowerReplyKey = null;
    await loadPowerRankingActivity(true);
  } catch (error) { toast(readableError(error, "Could not post that Power Ranking reply.")); }
}

async function createPost(event) {
  event.preventDefault();
  const input = $("#post-input");
  const body = input.value.trim();
  if (!body || !state.profile) {
    if (!state.profile) openProfileModal();
    return;
  }
  try {
    await supabaseRequest("/rest/v1/feed_posts", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        author_team_id: state.profile.team_id,
        author_team_name: state.profile.team_name,
        body,
      }),
    });
    input.value = "";
    input.style.height = "auto";
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not post that message.")); }
}

async function handleMessageClick(event) {
  const reply = event.target.closest("[data-reply]");
  if (reply) {
    const postId = Number(reply.dataset.reply);
    state.activeReplyPostId = state.activeReplyPostId === postId ? null : postId;
    state.activeReactionPostId = null;
    renderFeed();
    const form = $(`[data-reply-form="${postId}"]`);
    if (form) $("input", form).focus();
    return;
  }
  const addReaction = event.target.closest("[data-add-reaction]");
  if (addReaction) {
    const postId = Number(addReaction.dataset.addReaction);
    state.activeReactionPostId = state.activeReactionPostId === postId ? null : postId;
    state.activeReplyPostId = null;
    renderFeed();
    return;
  }
  if (event.target.closest("[data-cancel-reply]")) {
    state.activeReplyPostId = null;
    renderFeed();
    return;
  }
  if (event.target.closest("[data-close-reactions]")) {
    state.activeReactionPostId = null;
    renderFeed();
    return;
  }
  const reaction = event.target.closest("[data-reaction]");
  if (!reaction) return;
  await toggleReaction(Number(reaction.dataset.postId), reaction.dataset.reaction);
}

async function toggleReaction(postId, emoji) {
  if (!state.user) return;
  const existing = state.reactions.find((reaction) => reaction.post_id === postId && reaction.user_id === state.user.id && reaction.emoji === emoji);
  try {
    if (existing) {
      await supabaseRequest(`/rest/v1/feed_reactions?id=eq.${existing.id}`, { method: "DELETE" });
    } else {
      await supabaseRequest("/rest/v1/feed_reactions", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ post_id: postId, user_id: state.user.id, emoji }),
      });
    }
    state.activeReactionPostId = null;
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not save that reaction.")); }
}

async function handleReplySubmit(event) {
  const form = event.target.closest("[data-reply-form]");
  if (!form) return;
  event.preventDefault();
  const body = $("input", form).value.trim();
  if (!body) return;
  try {
    await supabaseRequest("/rest/v1/feed_comments", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        post_id: Number(form.dataset.replyForm),
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        body,
      }),
    });
    state.activeReplyPostId = null;
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not post that reply.")); }
}

function autoGrowComposer(event) {
  event.target.style.height = "auto";
  event.target.style.height = `${Math.min(event.target.scrollHeight, 150)}px`;
}

function handleComposerKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  $("#post-form").requestSubmit();
}

function profileFor(userId) {
  return state.profiles.find((profile) => profile.id === userId) || null;
}

function profileForTeam(team) {
  const localTeam = TEAMS.find((item) => normalize(item.name) === normalize(team?.name));
  const localTeamId = localTeam?.id ?? Number(team?.id);
  return state.profiles.find((profile) =>
    Number(profile.team_id) === Number(localTeamId)
    || normalize(profile.team_name) === normalize(team?.name)
  ) || null;
}

function renderMembers() {
  $("#member-list").innerHTML = TEAMS.map((team) => {
    const profile = state.profiles.find((item) => Number(item.team_id) === team.id);
    const name = profile?.display_name || team.manager;
    return `<div class="member">
      ${profile?.avatar_url ? `<span class="member-dot member-photo"><img src="${escapeAttr(profile.avatar_url)}" alt="" /></span>` : `<span class="member-dot">${initials(team.name)}</span>`}
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(name)}</small></span>
    </div>`;
  }).join("");
}

function managerFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.manager || "";
}

function divisionFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.division || "West";
}

function divisionOrderFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.divisionOrder || 99;
}

function formatNumber(value) { return Number(value || 0).toFixed(1); }
function formatDate(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
function formatMessageTime(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
function normalize(value = "") { return String(value).toLowerCase().replace(/[^a-z0-9]/g, ""); }
function initials(value = "") { return String(value).split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "RF"; }
function readableError(error, fallback) { return error?.message && !/failed \(\d+\)/i.test(error.message) ? error.message : fallback; }

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}
function escapeAttr(value = "") { return escapeHtml(value).replace(/`/g, "&#96;"); }

let toastTimer;
function toast(message) {
  const root = $("#toast");
  root.textContent = message;
  root.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => root.classList.remove("is-visible"), 4300);
}
