const el = (id) => document.getElementById(id);

const title = el("title");
const subtitle = el("subtitle");
const content = el("content");
const actions = el("actions");
const photoWrap = el("photoWrap");
const noBtn = el("noBtn");

// sounds
const sClick = el("sClick");
const sSuccess = el("sSuccess");
const sNope = el("sNope");
const sSad = el("sSad");


// modal
const modalBackdrop = el("modalBackdrop");
const modalText = el("modalText");
const modalOk = el("modalOk");

function play(sound) {
  try { sound.currentTime = 0; sound.play(); } catch (e) {}
}

function showModal(message, onClose) {
  modalText.textContent = message;
  modalBackdrop.style.display = "flex";

  const close = () => {
    modalBackdrop.style.display = "none";
    modalOk.removeEventListener("click", close);
    if (onClose) onClose();
  };

  modalOk.addEventListener("click", close);
}

const nopeReplies = [
  "That button is for decoration 😌 try again.",
  "Hmm… interesting choice. Wrong, but interesting.",
  "No is not an option here 😏",
  "Nice try. Let’s pretend that didn’t happen.",
  "Be serious for one second pls 🙄",
  "You really thought that would work? Cute.",
  "Error 404: Free will not found.",
  "Shaurya… we both know the answer 😌"
];

// photos per step
function renderPhotos(st) {
  photoWrap.classList.remove("has-grid");
  photoWrap.innerHTML = "";

  if (!st.photos || st.photos.length === 0) {
    photoWrap.style.display = "none";
    return;
  }

  photoWrap.style.display = "block";

  // single
  if (!st.photoLayout || st.photoLayout === "single") {
    photoWrap.innerHTML = `<img class="single" alt="" src="${st.photos[0]}" />`;
    return;
  }

  // grid (2 or 4)
  photoWrap.classList.add("has-grid");
  const layoutClass = st.photoLayout === "2" ? "grid-2" : "grid-4";

  photoWrap.innerHTML = `
    <div class="photo-grid ${layoutClass}">
      ${st.photos.map((src) => `<img src="${src}" alt="photo" />`).join("")}
    </div>
  `;
}

// ✅ EDIT THESE 2 THINGS LATER:
// 1) Step 7 popup message
const STEP7_POPUP_MESSAGE = "I'm really sorry bb, i'll try my best 🥺🥹🥹";

// 2) Step 9 letter HTML (paste your long letter here)
const LETTER_HTML = `
  <div style="text-align:left; max-height: 240px; overflow-y:auto; padding:10px;">
    <p><b>Hey Shaurya,
    I don’t even know where to begin, um sooo 
    If someone ever looked at our chats, they’d probably see a lot of nonsense — stickers flying everywhere, half sentences, random teasing, food talks, sleepy replies, and those little moments where we’re just… us. 
    But what they wouldn’t see is how much comfort lives between those lines. How safe it feels to check in with you. How natural it feels to care about each other.
    One moment we’re joking around, calling each other names, laughing over nothing, and the next moment there’s this quiet softness where I just know you’re there. No pretending. No pressure. Just you being you, and me being me.
    You don’t even try to be special — you just are.
In the way you reply.
In the way you tease back.
In the way you show care without making a big deal out of it.

Somehow, in the middle of everyday conversations, you’ve become one of my favorite parts of the day. Talking to you feels like a break from the noise. Like something steady. Like something I look forward to, even when I don’t say it out loud.
And maybe that’s the thing I like the most about us — it doesn’t feel forced or dramatic. It feels warm. Familiar. Comfortable. 
So this is me, finally saying it properly — not with a sticker, not with a joke, not by pretending it’s casual.

I really, really like you.
I like who you are.
I like how you make me feel.
I like the little world we’re building in between messages.

And if I’m being completely honest — I hope I get to keep talking to you, annoying you, checking in on you, and sharing these small moments with you for a long time.

So… with all my heart, and just a tiny bit of nervousness —
(next page)

</b></p>
  </div>
`;

// ✅ 10 steps (with your requested structure)
// IMPORTANT: update photo filenames to match your real assets/photos.
const steps = [
  // 1) 4 photos + single next
  {
    t: "hi mere chatpate mard 🥟🐧",
    s: "",
    c: "",
    photos: ["assets/photos/1.jpg","assets/photos/2.jpg","assets/photos/3.jpg","assets/photos/4.jpg"],
    photoLayout: "4",
    buttons: [{ label: "Next 😌", type: "next" }]
  },

  // 2) 2 photos + yes/no -> branch to reply pages
  {
    t: "mere bihari 🫶 hope you are doing fine",
    s: "paani pee rhe ho na? 🥤",
    c: "",
    photos: ["assets/photos/5.jpg","assets/photos/6.jpg"],
    photoLayout: "2",
    buttons: [
      { label: "Yes 🥹", type: "go", goTo: 2 },
      { label: "No 😤", type: "go", goTo: 3 }
    ]
  },

  // 3) YES reply page (good boy)
  {
    t: "Good boy 😌",
    s: "",
    c: "ab aur paani pee lo. proud of you 💖",
    photos: ["assets/photos/7.jpg"],
    photoLayout: "single",
    buttons: [{ label: "Next", type: "next" }]
  },

  // 4) NO reply page (my bihari)
  {
    t: "MY BIHARI 😭",
    s: "",
    c: "paani piya karo pls 😤💖",
    photos: ["assets/photos/8.jpg"],
    photoLayout: "single",
    buttons: [{ label: "Okay okay 😳", type: "next" }]
  },

  // 5) serious reassurance survey
  {
    t: "This is a serious survey 🐧 → my bihari 🥟",
    s: "P.S. are you ready for it? (I need reassurance and I realllly like you)",
    c: "Ready?",
    photos: ["assets/photos/9.jpg"],
    photoLayout: "single",
    buttons: [
      { label: "Yes 💖", type: "next" },
      { label: "No", type: "nope" }
    ]
  },

  // 6) hoodie tease
  {
    t: "Be honest 😏",
    s: "I’ll know if you lie.",
    c: "If I steal your hoodie, will you let me keep it?",
    photos: ["assets/photos/10.jpg"],
    photoLayout: "single",
    buttons: [
      { label: "It’s yours now", type: "next" },
      { label: "No", type: "nope" }
    ]
  },

  // 7) membership tease
  {
    t: "Critical question 🚨",
    s: "Choose wisely.",
    c: "Am I allowed to annoy you for the rest of this year for a start (my membership renews next year)?",
    photos: ["assets/photos/11.jpg"],
    photoLayout: "single",
    buttons: [
      { label: "Unfortunately yes", type: "next" },
      { label: "No", type: "nope" }
    ]
  },

  // 8) safe being yourself
  {
    t: "Just curious 💭",
    s: "No pressure.",
    c: "Do you feel safe being yourself with me?",
    photos: ["assets/photos/12.jpg"],
    photoLayout: "single",
    buttons: [
      { label: "Yes 💕", type: "next" },
      { label: "No", type: "nope" }
    ]
  },

  // 9) popup step (both buttons show same popup then continue)
  {
    t: "One more thing… 🥹",
    s: "I mean this.",
    c: "Do you know how much you mean to me?",
    photos: ["assets/photos/13.jpg"],
    photoLayout: "single",
    buttons: [
      { label: "I do now 💖", type: "popupNext" },
      { label: "No 😳", type: "popupNext" }
    ]
  },

  // 10) last prompt -> letter -> final valentine
  // (We keep this as a single step with letter and final yes)
  // If you want letter and final as two separate steps, tell me and I’ll split it.
  {
    t: "Read this before you answer 🥹",
    s: "",
    c: "",
    contentHTML: LETTER_HTML,
    photos: ["assets/photos/15.jpg"],
    photoLayout: "single",
    buttons: [{ label: "Next 😭💖", type: "nextToFinal" }]
  },

  // FINAL (mouse tracking NO only here)
  {
    t: "Final 💖",
    s: "Okay… here we go.",
    c: "Will you be my Valentine? 💕",
    photos: ["assets/photos/16.jpg"],
    photoLayout: "single",
    buttons: [{ label: "YESSS 🥰", type: "yes" }]
  }
];

let step = 0;
let dodgeActive = false;

// Render
function render() {
  const st = steps[step];

  title.textContent = st.t || "";
  subtitle.textContent = st.s || "";

  if (st.contentHTML) content.innerHTML = st.contentHTML;
  else content.textContent = st.c || "";

  renderPhotos(st);

  actions.innerHTML = "";
  (st.buttons || []).forEach((b) => {
    const btn = document.createElement("button");
    btn.className = "btn " + (b.type === "yes" ? "btn-yes" : "btn-next");
    btn.textContent = b.label;
    btn.addEventListener("click", () => handle(b));
    actions.appendChild(btn);
  });

  // show runaway NO only on FINAL step (last item in steps array)
  const isFinal = (step === steps.length - 1);
  noBtn.style.display = isFinal ? "block" : "none";

  if (isFinal) activateDodge();
  else dodgeActive = false;
}

function goNext() {
  step = Math.min(step + 1, steps.length - 1);
  render();
}

function handle(b) {
  play(sClick);

  if (b.type === "next") {
    goNext();
    return;
  }

  if (b.type === "go") {
    step = b.goTo;
    render();
    return;
  }

  if (b.type === "popupNext") {
    showModal(STEP7_POPUP_MESSAGE, () => goNext());
    return;
  }

  if (b.type === "nextToFinal") {
    // move from letter step to final step
    step = steps.length - 1;
    render();
    return;
  }

  if (b.type === "nope") {
    play(sSad);
    const randomReply = nopeReplies[Math.floor(Math.random() * nopeReplies.length)];
    content.textContent = randomReply;

    content.classList.remove("shake");
    void content.offsetWidth;
    content.classList.add("shake");
    return;
  }

  if (b.type === "yes") {
    play(sSuccess);
    confettiBurst();
    victoryScreen();
  }
}

function victoryScreen() {
  dodgeActive = false;
  noBtn.style.display = "none";


  title.textContent = "YAYYYYY 💕";
  subtitle.textContent = "You just made me ridiculously happy.";
  content.innerHTML = `<p>Now you owe me hugs + a cute date 💌</p>`;
  actions.innerHTML = "";

  const btn = document.createElement("button");
  btn.className = "btn btn-yes";
  btn.textContent = "Send me a kiss 😚";
  btn.onclick = () => alert("💋 accepted.");
  actions.appendChild(btn);
}

// Runaway NO logic
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function randomizeNoPosition() {
  const rect = noBtn.getBoundingClientRect();
  const x = Math.random() * (window.innerWidth - rect.width);
  const y = Math.random() * (window.innerHeight - rect.height);
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

function activateDodge() {
  if (dodgeActive) return;
  dodgeActive = true;
  randomizeNoPosition();
}

document.addEventListener("mousemove", (e) => {
  if (!dodgeActive) return;

  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = cx - e.clientX;
  const dy = cy - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < 170) {
    const push = 18;
    let nx = rect.left + (dx / (dist || 1)) * push;
    let ny = rect.top + (dy / (dist || 1)) * push;

    nx = clamp(nx, 8, window.innerWidth - rect.width - 8);
    ny = clamp(ny, 8, window.innerHeight - rect.height - 8);

    noBtn.style.left = nx + "px";
    noBtn.style.top = ny + "px";
  }
});

// mobile tap
noBtn.addEventListener("touchstart", (e) => {
  if (!dodgeActive) activateDodge();
  play(sNope);
  randomizeNoPosition();
  e.preventDefault();
});

// if he clicks it somehow
noBtn.addEventListener("click", () => {
  play(sNope);
  content.textContent = "Nice try 😌 but we both know the answer.";
  randomizeNoPosition();
});



function confettiBurst() {
  const count = 120;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.style.position = "fixed";
    piece.style.left = (window.innerWidth / 2) + "px";
    piece.style.top = (window.innerHeight / 2) + "px";
    piece.style.width = "8px";
    piece.style.height = "12px";
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    piece.style.opacity = "0.9";
    piece.style.borderRadius = "2px";
    piece.style.zIndex = "20000";
    piece.style.pointerEvents = "none";

    const angle = Math.random() * Math.PI * 2;
    const velocity = 6 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    document.body.appendChild(piece);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gravity = 0.35;
    let life = 0;

    const tick = () => {
      life += 1;
      x += vx;
      y += vy + gravity * life;

      piece.style.transform = `translate(${x - window.innerWidth/2}px, ${y - window.innerHeight/2}px) rotate(${life * 12}deg)`;

      if (life < 45) requestAnimationFrame(tick);
      else piece.remove();
    };

    requestAnimationFrame(tick);
  }
}

// start
render();
