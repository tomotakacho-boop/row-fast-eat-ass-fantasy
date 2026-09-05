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
  } else {
    renderFeedSignedOut();
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
  $("#toggle-members").addEventListener("click", () => $("#member-rail").classList.add("is-open"));
  $("#close-members").addEventListener("click", () => $("#member-rail").classList.remove("is-open"));
}

function populateStaticTeams() {
  $("#power-team-grid").innerHTML = TEAMS.map((team, index) => `
    <article class="team-preview">
      <span>PRESEASON · ${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(team.name)}</strong>
      <small>${escapeHtml(team.manager)} · ranking pending</small>
    </article>`).join("");

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
