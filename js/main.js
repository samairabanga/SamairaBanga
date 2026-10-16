const pad = (n) => String(n).padStart(2, "0");

function renderProjectList() {
  const list = document.getElementById("project-list");
  if (!list) return;

  list.innerHTML = PROJECTS.map((p, i) => `
    <li>
      <a class="row" href="project.html?slug=${encodeURIComponent(p.slug)}">
        <span class="row-key">${pad(i + 1)}</span>
        <span><span class="row-title">${p.title}</span><br /><span class="muted">${p.meta}</span></span>
        <span class="arrow">&rarr;</span>
      </a>
    </li>
  `).join("");
}

const paragraphs = (arr) => (arr || []).map((t) => `<p>${t}</p>`).join("");

// One figure: an image (optionally linking out) with its caption below.
function figure({ image, url, text, portrait }) {
  const img = `<img src="${image}" alt="" loading="lazy" />`;
  const site = url && /instagram\.com/.test(url) ? "Instagram" : "LinkedIn";
  const media = url
    ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${img}</a>`
    : img;
  const view = url
    ? `<a class="view" href="${url}" target="_blank" rel="noopener noreferrer">View on ${site} <span class="arrow">&rarr;</span></a>`
    : "";
  const caption = paragraphs(text) + view;

  return `
    <figure class="${portrait ? "portrait-thumb" : ""}">
      ${media}
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>
  `;
}

function renderDetail() {
  const el = document.getElementById("project-detail");
  if (!el) return;

  const slug = new URLSearchParams(window.location.search).get("slug");
  const index = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
  const project = PROJECTS[index];
  document.title = `${project.title} — Samaira Banga`;
  document.getElementById("project-index").textContent = pad(index + 1);

  // Every project's media, whatever shape it was entered in, becomes the
  // same simple grid of figures.
  const figures = [
    ...(project.photos || []).map((p) => figure({ image: p.image, url: p.url, text: p.caption ? [p.caption] : [] })),
    ...(project.videos || []).map((v) => figure({ image: v.thumbnail, url: v.url, text: v.text, portrait: true })),
    ...(project.gallery || []).map((g) => figure(g)),
    ...(project.sections || []).flatMap((s) => (s.images || []).map((src) => figure({ image: src })))
  ];

  const bodyText = [
    ...(project.sections || []).flatMap((s) => s.text || []),
    ...(project.body || [])
  ];

  el.innerHTML = `
    <h1 class="detail-title">${project.heading || project.title}</h1>
    ${project.kicker ? `<div class="label">${project.kicker}</div>` : ""}
    ${project.tagline ? `<p class="detail-tagline">${project.tagline}</p>` : ""}
    ${figures.length ? `<div class="media">${figures.join("")}</div>` : ""}
    ${bodyText.length ? `<div class="body">${paragraphs(bodyText)}</div>` : ""}
  `;
}

// Touch-to-ink: hovering or tapping a line splashes ink out from the
// point touched, holds it for a few seconds, then draws it back in.
function setupInk() {
  document.querySelectorAll(".ink").forEach((el) => {
    el.dataset.text = el.textContent;
    let timer;
    const ink = (e) => {
      if (!el.classList.contains("inked")) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }
      el.classList.add("inked");
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("inked"), 2500);
    };
    el.addEventListener("mouseenter", ink);
    el.addEventListener("click", ink);
  });
}

// ---------- Sounds, synthesised with Web Audio (no files to load) ----------

let audio;
function audioCtx() {
  if (!audio) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audio = new Ctx();
  }
  if (audio.state === "suspended") audio.resume();
  return audio;
}

// A short burst of filtered noise: the building block of both sounds.
function noiseBurst(ctx, at, { duration, type, freq, q = 1, gain }) {
  const len = Math.ceil(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const amp = ctx.createGain();
  amp.gain.value = gain;
  src.connect(filter).connect(amp).connect(ctx.destination);
  src.start(at);
}

// Camera shutter: mirror slap, then the shutter curtain a beat later.
function playShutter() {
  const ctx = audioCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  noiseBurst(ctx, t, { duration: 0.05, type: "bandpass", freq: 2400, q: 0.8, gain: 1.2 });
  noiseBurst(ctx, t, { duration: 0.08, type: "lowpass", freq: 400, gain: 0.8 });
  noiseBurst(ctx, t + 0.09, { duration: 0.04, type: "bandpass", freq: 3800, q: 1.2, gain: 1 });
  noiseBurst(ctx, t + 0.09, { duration: 0.06, type: "lowpass", freq: 600, gain: 0.5 });
}

// Rubber stamp: a heavy low thump with a papery slap on top.
function playStamp(delay = 0) {
  const ctx = audioCtx();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(45, t + 0.15);
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(1.1, t + 0.005);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.25);
  noiseBurst(ctx, t, { duration: 0.07, type: "lowpass", freq: 1800, gain: 0.9 });
}

// Restart a CSS animation class even if it is mid-play.
function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// Browsers only allow sound after the visitor has clicked, tapped or typed
// somewhere on the page, so start the audio engine on the first such action.
["pointerdown", "keydown", "touchstart"].forEach((evt) =>
  window.addEventListener(evt, audioCtx, { once: true, passive: true })
);

// Fire on hover (mouse), tap (touch) or Enter/Space (keyboard). A short
// cooldown stops a tap, which also counts as a hover, from firing twice.
function onActivate(el, fn) {
  let last = 0;
  const run = () => {
    const now = Date.now();
    if (now - last < 600) return;
    last = now;
    fn();
  };
  el.addEventListener("mouseenter", run);
  el.addEventListener("click", run);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); run(); }
  });
}

function setupCamera() {
  const camera = document.getElementById("camera");
  if (!camera) return;
  const flash = document.createElement("span");
  flash.className = "flash";
  camera.appendChild(flash);
  onActivate(camera, () => {
    playShutter();
    replay(camera, "snap");
  });
}

function setupStamp() {
  const stamp = document.getElementById("stamp");
  const page = document.querySelector(".wrap");
  if (!stamp) return;
  onActivate(stamp, () => {
    // The thump lands when the stamp hits the page, ~0.3s into the motion.
    playStamp(0.3);
    replay(stamp, "stamping");
    replay(page, "thud");
  });
}

renderProjectList();
renderDetail();
setupInk();
setupCamera();
setupStamp();
