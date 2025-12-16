import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

/* ===========================
   SEEDED RANDOM (DETERMINISTIC)
=========================== */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a += 0x6D2B79F5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickSeeded(arr, r) {
  return arr[Math.floor(r() * arr.length)];
}
function shuffleSeeded(arr, r) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickManySeeded(arr, r, n) {
  return shuffleSeeded(arr, r).slice(0, n);
}

/* ===========================
   SPINTAX
=========================== */
function expandSpintax(str, seedNum) {
  const r = mulberry32(seedNum * 99991 + 1337);
  let i = 0;
  return str.replace(/\{([^{}]+)\}/g, (_, group) => {
    const options = group.split("|");
    const idx = Math.floor((r() + i++ * 0.07) * options.length) % options.length;
    return options[idx];
  });
}

/* ===========================
   SUBJECT POOL – NO [%%FEmailUser%%]
=========================== */
const SPINTAX_SUBJECTS = [
  "Fwd: {Have you heard this yet?|Did you hear?|Have you seen this?|This just came out!}",
  "🎁 {No one told you this…|Nobody mentioned this before…|You haven't heard this yet…|This was kept from you…}",
  "Fwd: {Something big is happening|Something's going on|A major shift is coming|An event is unfolding} {behind the scenes|in the background|right now|that you don’t know about}",
  "{You won’t believe what’s inside|Wait until you see this|This is shocking|Unreal content inside}",
  "{Only for|Just for|Exclusively for} {sharp eyes|the curious ones|those who notice|true observers} 👀 🔒",
  "Re: {Don’t open this…|Avoid this email…|You might regret clicking…|Only click if you're brave} {unless you’re ready|if you dare|unless you're sure|if you can handle it}",
  "{A secret|Something hidden|A mystery|An untold story} {everyone’s hiding|no one is talking about|just surfaced|is finally revealed}",
  "Fwd: {Why is nobody talking about this?|Why is this being ignored?|Why the silence?|No one is mentioning this, but...}",
  "{Finally uncovered…|At last revealed…|The truth is out…|No longer hidden…}",
  "🗓️ {Click before it disappears|Vanishing soon|This won’t last|Here today, gone tomorrow}",
  "{Hidden in plain sight…|Right under your nose|It was here all along|You’ve seen it—but didn’t see it}",
  "🔥 {Only for you – take a look|Exclusively for you – check this out|Just for you – have a look}",
  "Re: {This is not your average email|This breaks the pattern|Not your typical message|This stands out} ⏰",
  "{Blink and you’ll miss it|Act fast|A short window|Gone before you know it}",
  "{Don’t ignore this one|This is important|Pay attention|Not to be skipped}",
  "{Open if you're curious|Curiosity required|Only for the intrigued|This needs your attention} {if you dare|if you're bold enough|if you’re curious enough|or brave}",
  "{The missing piece you’ve been looking for|It all makes sense now|The puzzle is complete|Here’s what was missing}"
];

function subjectFor(seed, content) {
  // ~70% spintax, 30% calmer/safer structured
  const useSpintax = seed % 10 !== 0 && seed % 10 !== 7 && seed % 10 !== 8;

  if (useSpintax) {
    const base = SPINTAX_SUBJECTS[seed % SPINTAX_SUBJECTS.length];
    return expandSpintax(base, seed).trim();
  }

  const hook = content.headline
    .replace(/DETECTED|CONFIRMED|GRANTED|UNLOCKED/gi, "")
    .trim();

  const safer = [
    `Exclusive update: ${hook}`,
    "Something new is waiting inside",
    "A limited-time reward is now live",
    "A fresh bonus is ready when you are",
    "Your account has something new"
  ];

  return safer[seed % safer.length];
}

/* ===========================
   CONTENT LIBRARY
=========================== */
const greetings = [
  "Greetings,",
  "Hello,",
  "Hi there,",
  "Hey,",
  "Welcome back,",
  "Checking in with a quick note,",
  "Reaching out today,"
];

const headlines = [
  "THE VIP RED CARPET WELCOME",
  "YOUR EXCLUSIVE BONUS AWAITS",
  "SYSTEM UPGRADE DETECTED",
  "HIGH ROLLER ACCESS GRANTED",
  "WELCOME TO THE WINNERS CIRCLE",
  "YOUR PREMIUM OFFER IS READY",
  "EXCLUSIVE PLAYER BENEFITS UNLOCKED",
  "A NEW REWARD EXPERIENCE",
  "YOUR NEXT BIG OPPORTUNITY",
  "ELITE STATUS CONFIRMED"
];

const subheadlines = [
  "Boost your bankroll with added value today",
  "Limited-time rewards for active players",
  "Extra playtime is waiting inside",
  "Enjoy enhanced value on your next session",
  "Designed for players who want more",
  "Unlock additional benefits instantly",
  "A smarter way to extend your play",
  "Take advantage while it’s available"
];

const bodyFlows = [
  [
    "We’ve prepared something special to enhance your next session.",
    "This offer is designed to give you more flexibility and added playtime.",
    "Simply log in, activate the reward, and enjoy the experience."
  ],
  [
    "As a valued player, you now have access to an exclusive bonus.",
    "It’s a great way to explore more games without changing how you play.",
    "Everything is ready whenever you are."
  ],
  [
    "This reward is available for a limited time only.",
    "It’s our way of adding extra value to your next visit.",
    "Make the most of it while it’s live."
  ],
  [
    "We’re rewarding continued play with a little something extra.",
    "Use it across eligible games and extend your session.",
    "No complications. Just added enjoyment."
  ],
  [
    "Your account has been selected for an enhanced offer.",
    "It’s easy to activate and simple to enjoy.",
    "Jump in and make the most of it today."
  ]
];

const featureTitles = [
  "Why Play With Us?",
  "What’s Included",
  "Your Player Benefits",
  "Exclusive Features",
  "Member Advantages",
  "Premium Highlights"
];

const featureBullets = [
  "Fast and reliable payouts",
  "Hundreds of premium games",
  "Live dealer experiences",
  "24/7 customer support",
  "Exclusive player promotions",
  "Mobile-friendly gameplay",
  "Secure and trusted platform",
  "Flexible deposit options",
  "Smooth gaming experience",
  "Instant bonus activation",
  "Enhanced account security",
  "Seamless user experience"
];

const closings = [
  "Enjoy your play,",
  "Best of luck,",
  "Good luck and have fun,",
  "Wishing you a great session,",
  "Happy gaming,"
];

const footerPromo = [
  "This is a promotional offer. Please play responsibly.",
  "Promotional offer. Always play within your limits.",
  "Limited-time promotion. Play responsibly.",
  "This offer is for promotional purposes only. Play responsibly."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here.",
  "To stop receiving these emails, please unsubscribe here.",
  "You can unsubscribe from future emails here.",
  "You may unsubscribe at any time using this link."
];

const colorSchemes = [
  { name: "Gold Dark", bg: "#0b0b0f", card: "#12121a", text: "#f5f5f7", muted: "#b8b8c3", accent: "#f5c542" },
  { name: "Ocean Light", bg: "#f5fbff", card: "#ffffff", text: "#0e1a24", muted: "#4a5c6b", accent: "#1aa3ff" },
  { name: "Ruby", bg: "#14070a", card: "#1d0a10", text: "#fff5f6", muted: "#e3b8be", accent: "#ff2d55" },
  { name: "Mint", bg: "#f3fff9", card: "#ffffff", text: "#0c2b1e", muted: "#3e6b57", accent: "#20c997" },
  { name: "Violet", bg: "#0d0618", card: "#150a2a", text: "#fbf7ff", muted: "#cdbcf5", accent: "#a855f7" },
  { name: "Sunset", bg: "#fff7f0", card: "#ffffff", text: "#2a1608", muted: "#6f4b33", accent: "#ff7a18" },
  { name: "Steel", bg: "#f7f8fb", card: "#ffffff", text: "#101826", muted: "#54637a", accent: "#334155" },
  { name: "Neon", bg: "#050508", card: "#0b0b12", text: "#f4f4ff", muted: "#9aa0c6", accent: "#22c55e" }
];

/* ===========================
   EXPORT HELPERS
=========================== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function downloadCSV(filename, rows) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ===========================
   NEW: ESP HTML EXPORT HELPERS (ADDED ONLY)
=========================== */
function downloadHTML(filename, html) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ===========================
   NEW: ESP-READY HTML RENDERER (ADDED ONLY)
   - table-based
   - inline CSS
   - 600px
   - single column
   - centered CTA + footer
=========================== */
function renderESPHTML({ content, campaign, scheme, primaryCtaLabel, secondaryCtaLabel }) {
  const safeBrand = campaign.brand || "CASINO BRAND";
  const depositBonus = campaign.depositBonus || "";
  const freeSpins = campaign.freeSpins || "";
  const game = campaign.game || "";

  const offerParts = [];
  if (depositBonus) offerParts.push(`Deposit bonus: ${depositBonus}`);
  if (freeSpins) offerParts.push(`${freeSpins}${game ? ` on ${game}` : ""}`);
  const offerLine = offerParts.length ? offerParts.join(" • ") : "A reward is available in your account.";

  const bodyHtml = (content.body || [])
    .map((p) => `<p style="margin:0 0 12px 0;line-height:1.6;">${p}</p>`)
    .join("");

  const featureHtml = (content.features || [])
    .map((b) => `<li style="margin:0 0 8px 0;line-height:1.5;">${b}</li>`)
    .join("");

  const footer1 = content.footer1 || "This is a promotional offer. Please play responsibly.";
  const footer2 = content.footer2 || "If you no longer wish to receive these emails, please unsubscribe here.";

  const accent = scheme?.accent || "#111111";
  const bg = scheme?.bg || "#f2f2f2";
  const card = scheme?.card || "#ffffff";
  const text = scheme?.text || "#111111";
  const muted = scheme?.muted || "#555555";

  // CTA label fallbacks
  const cta1 = primaryCtaLabel || "Activate Reward";
  const cta2 = secondaryCtaLabel || "";

  // Classic email-safe button pattern (table)
  const button1 = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
    <tr>
      <td bgcolor="${accent}" style="border-radius:12px;">
        <a href="#" style="display:inline-block;padding:14px 22px;font-weight:800;font-size:14px;color:${bg};text-decoration:none;border:1px solid ${accent};border-radius:12px;">
          ${cta1}
        </a>
      </td>
    </tr>
  </table>`;

  const button2 = cta2
    ? `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:10px auto 0;">
    <tr>
      <td style="border-radius:12px;">
        <a href="#" style="display:inline-block;padding:12px 20px;font-weight:800;font-size:14px;color:${accent};text-decoration:none;border:2px solid ${accent};border-radius:12px;">
          ${cta2}
        </a>
      </td>
    </tr>
  </table>`
    : "";

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${safeBrand}</title>
</head>
<body style="margin:0;padding:0;background:${bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${bg};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${card};border-radius:18px;overflow:hidden;">
          <tr>
            <td style="padding:22px 22px 10px 22px;font-family:Arial,Helvetica,sans-serif;color:${text};text-align:center;">
              <div style="font-size:12px;font-weight:800;letter-spacing:1.2px;color:${muted};">${safeBrand}</div>
              <h1 style="margin:14px 0 0 0;font-size:24px;line-height:1.1;font-weight:900;color:${text};">${content.headline}</h1>
              <p style="margin:10px 0 0 0;font-size:14px;line-height:1.5;color:${muted};">${content.subheadline}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px 0 22px;font-family:Arial,Helvetica,sans-serif;color:${text};">
              <p style="margin:0 0 12px 0;line-height:1.6;"><strong>${content.greeting}</strong></p>
              <p style="margin:0 0 12px 0;line-height:1.6;color:${muted};">${offerLine}</p>
              ${bodyHtml}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 22px 0 22px;font-family:Arial,Helvetica,sans-serif;">
              <div style="border-top:1px solid rgba(0,0,0,0.08);margin:10px 0;"></div>
              <div style="font-size:14px;font-weight:900;color:${text};margin:0 0 10px 0;">${content.featureTitle}</div>
              <ul style="margin:0;padding:0 0 0 18px;color:${text};font-size:14px;">
                ${featureHtml}
              </ul>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 22px 8px 22px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
              ${button1}
              ${button2}
              <div style="margin-top:12px;font-size:12px;color:${muted};line-height:1.5;">
                ${content.closing}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 22px 20px 22px;text-align:center;font-family:Arial,Helvetica,sans-serif;color:${muted};font-size:12px;line-height:1.6;">
              <div style="border-top:1px solid rgba(0,0,0,0.08);margin:0 0 14px 0;"></div>
              ${footer1}<br>
              ${footer2} <span style="text-decoration:underline;">unsubscribe here</span>.
              <div style="margin-top:10px;font-size:12px;color:${muted};">
                © 2026 ${safeBrand}. All rights reserved.
              </div>
            </td>
          </tr>
        </table>

        <!-- mobile note (clients may ignore max-width; this is still safe) -->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ===========================
   UI ATOMS
=========================== */
function Pill({ text, bg, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        background: bg,
        color
      }}
    >
      {text}
    </span>
  );
}

function CTAButton({ label, href, variant, scheme, shape }) {
  const radius = shape === "round" ? 999 : 10;
  const base = {
    display: "block",
    width: "fit-content",
    maxWidth: "100%",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 14,
    padding: "13px 18px",
    borderRadius: radius,
    margin: "0 auto", // CENTER ALWAYS
    textAlign: "center"
  };

  if (variant === "solid") {
    return (
      <a
        href={href}
        style={{
          ...base,
          background: scheme.accent,
          color: scheme.bg,
          border: `1px solid ${scheme.accent}`
        }}
      >
        {label}
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={href}
        style={{
          ...base,
          background: "transparent",
          color: scheme.accent,
          border: `2px solid ${scheme.accent}`
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      style={{
        ...base,
        display: "inline-block",
        margin: "0 auto",
        padding: 0,
        borderRadius: 0,
        color: scheme.accent,
        textDecoration: "underline",
        border: "none"
      }}
    >
      {label}
    </a>
  );
}

function Divider({ scheme }) {
  return (
    <div
      style={{
        height: 1,
        background: scheme.accent,
        opacity: 0.25,
        borderRadius: 999,
        margin: "18px 0"
      }}
    />
  );
}

function Footer({ scheme, brand, footer1, footer2 }) {
  return (
    <div style={{ marginTop: 18, paddingTop: 10, textAlign: "center" }}>
      <Divider scheme={scheme} />
      <div style={{ fontSize: 11, opacity: 0.9, lineHeight: 1.55 }}>
        {footer1}
        <br />
        {footer2}{" "}
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          unsubscribe here
        </span>
        .
      </div>
      <div style={{ fontSize: 11, opacity: 0.75, marginTop: 10, lineHeight: 1.45 }}>
        © 2026 {brand}. All rights reserved.
        <br />
        Please gamble responsibly.
      </div>
      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>
        Privacy · Terms · Help
      </div>
    </div>
  );
}

/* ===========================
   EMAIL SHELL (600px)
=========================== */
function EmailShell({ scheme, children, styleVariant }) {
  const lightBg = scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";
  const radius = styleVariant === "sharp" ? 10 : 22;

  return (
    <div
      style={{
        background: scheme.bg,
        padding: 24,
        minHeight: 520,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        color: scheme.text
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600, // LOCKED
          margin: "0 auto",
          borderRadius: radius,
          background: scheme.card,
          border: lightBg ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: lightBg ? "0 12px 40px rgba(0,0,0,0.08)" : "0 12px 40px rgba(0,0,0,0.35)",
          padding: 22
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ===========================
   CAMPAIGN-AWARE COPY
=========================== */
function offerLine1({ depositBonus, freeSpins, game }) {
  const parts = [];
  if (depositBonus) parts.push(`Deposit bonus: ${depositBonus}`);
  if (freeSpins) parts.push(`${freeSpins}${game ? ` on ${game}` : ""}`);
  if (!parts.length) return "A limited-time reward is now available in your account.";
  return parts.join(" • ");
}
function offerLine2({ depositBonus, freeSpins }) {
  if (depositBonus && freeSpins) return "Claim both rewards and extend your session instantly.";
  if (depositBonus) return "Boost your balance and enjoy more flexibility today.";
  if (freeSpins) return "Enjoy extra playtime with a quick activation.";
  return "Activate in one click and start playing.";
}
function ctaPrimaryLabel({ depositBonus, freeSpins }) {
  if (depositBonus && freeSpins) return "Claim Bonus + Spins";
  if (depositBonus) return "Claim Deposit Bonus";
  if (freeSpins) return "Claim Free Spins";
  return "Activate Reward";
}

/* ===========================
   BLOCKS (SINGLE-COLUMN ONLY)
=========================== */
function FeatureStack({ scheme, items }) {
  const lightBg = scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";
  return (
    <div style={{ marginTop: 10 }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            padding: 12,
            borderRadius: 14,
            marginBottom: 10,
            border: lightBg ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.10)",
            background: lightBg ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.05)"
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 900 }}>{it}</div>
          <div style={{ fontSize: 12, opacity: 0.82, marginTop: 6 }}>
            Designed to keep the experience smooth.
          </div>
        </div>
      ))}
    </div>
  );
}

function PromoBox({ scheme, title, lines }) {
  const lightBg = scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";
  return (
    <div
      style={{
        marginTop: 14,
        padding: 14,
        borderRadius: 16,
        border: lightBg ? "1px solid rgba(0,0,0,0.10)" : `1px solid rgba(255,255,255,0.12)`,
        background: lightBg ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div style={{ fontWeight: 950 }}>{title}</div>
        <Pill text="LIMITED" bg={scheme.accent} color={scheme.bg} />
      </div>
      <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
        {lines.map((l, i) => (
          <li key={i} style={{ marginBottom: 6, opacity: 0.92 }}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CenteredCTAGroup({ scheme, campaign, r }) {
  const shape = r() > 0.5 ? "round" : "square";
  const primaryVariant = r() > 0.5 ? "solid" : "outline";
  const secondaryVariant = r() > 0.65 ? "outline" : "text";
  const twoCTAs = r() > 0.55;

  return (
    <div style={{ marginTop: 18, textAlign: "center" }}>
      <CTAButton
        label={ctaPrimaryLabel(campaign)}
        href="#"
        variant={primaryVariant}
        scheme={scheme}
        shape={shape}
      />
      {twoCTAs ? (
        <div style={{ marginTop: 10 }}>
          <CTAButton
            label={pickSeeded(["View Details", "See Eligible Games", "Learn More"], r)}
            href="#"
            variant={secondaryVariant}
            scheme={scheme}
            shape={shape === "round" ? "square" : "round"}
          />
        </div>
      ) : null}
      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.82 }}>
        {pickSeeded(
          [
            "Limited window. Don’t leave it sitting.",
            "No extra steps. Simple activation.",
            "Designed to fit seamlessly into your play.",
            "Use it when it suits you."
          ],
          r
        )}
      </div>
    </div>
  );
}

/* ===========================
   10 DISTINCT (SINGLE-COLUMN) LAYOUTS
=========================== */
function LayoutA({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <Pill text={pickSeeded(["VIP", "NEW", "LIMITED", "PRIORITY"], r)} bg={scheme.accent} color={scheme.bg} />
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 980, lineHeight: 1.08 }}>{content.headline}</div>
        <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, opacity: 0.94 }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
        <div>{offerLine1(campaign)}</div>
        <div style={{ marginTop: 10 }}>{content.body[0]}</div>
      </div>

      <PromoBox
        scheme={scheme}
        title={pickSeeded(["Offer details", "Reward summary", "What you get"], r)}
        lines={[
          offerLine2(campaign),
          content.body[1],
          campaign.game ? `Try it on ${campaign.game} and explore more.` : content.body[2]
        ].filter(Boolean)}
      />

      <div style={{ marginTop: 16, fontWeight: 950 }}>{content.featureTitle}</div>
      <FeatureStack scheme={scheme} items={content.features} />

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.92 }}>
        <strong>{content.closing}</strong>
      </div>

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutB({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 10, fontSize: 28, fontWeight: 1000, lineHeight: 1.05 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.88 }}>{content.subheadline}</div>
      </div>

      <Divider scheme={scheme} />

      <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.94 }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
        <div>{offerLine1(campaign)}</div>
        <div style={{ marginTop: 10 }}>{content.body[0]}</div>
        <div style={{ marginTop: 10 }}>{content.body[1]}</div>
      </div>

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <div style={{ marginTop: 16, fontWeight: 950 }}>{content.featureTitle}</div>
      <FeatureStack scheme={scheme} items={content.features} />

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.92 }}>
        <strong>{content.closing}</strong>
      </div>

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutC({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <Pill text="LIMITED" bg={scheme.accent} color={scheme.bg} />
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 980 }}>{content.headline}</div>
        <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>✨ {content.subheadline}</div>
      </div>

      <PromoBox
        scheme={scheme}
        title="Highlights"
        lines={[
          offerLine1(campaign),
          offerLine2(campaign),
          campaign.freeSpins ? "Free spins are subject to eligible games." : "Rewards are subject to eligibility."
        ].filter(Boolean)}
      />

      <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, opacity: 0.94 }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
        <div>{content.body[0]}</div>
        <div style={{ marginTop: 10 }}>{content.body[2]}</div>
      </div>

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <div style={{ marginTop: 16, fontWeight: 950 }}>{content.featureTitle}</div>
      <FeatureStack scheme={scheme} items={content.features} />

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.92 }}>
        <strong>{content.closing}</strong>
      </div>

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutD({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 10, fontSize: 24, fontWeight: 1000 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>
      </div>

      <Divider scheme={scheme} />

      <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.94 }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
        <div>{offerLine1(campaign)}</div>
        <div style={{ marginTop: 10 }}>{content.body[0]}</div>
      </div>

      <Divider scheme={scheme} />

      <PromoBox
        scheme={scheme}
        title={pickSeeded(["Today’s reward", "This week’s perk", "Unlocked benefit"], r)}
        lines={[offerLine2(campaign), content.body[1], content.body[2]].filter(Boolean)}
      />

      <Divider scheme={scheme} />

      <div style={{ marginTop: 6, fontWeight: 950 }}>{content.featureTitle}</div>
      <FeatureStack scheme={scheme} items={content.features} />

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutE({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ fontSize: 12, letterSpacing: 1.2, opacity: 0.85, textAlign: "center" }}>
        EDITORIAL
      </div>

      <div style={{ marginTop: 10, textAlign: "center" }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 10, fontSize: 26, fontWeight: 1000, lineHeight: 1.06 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, opacity: 0.94 }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
        <div>{content.body[0]}</div>
        <div style={{ marginTop: 12, fontWeight: 900 }}>{offerLine1(campaign)}</div>
        <div style={{ marginTop: 12 }}>{content.body[1]}</div>
      </div>

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutF({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <Pill text={pickSeeded(["NEW", "VIP", "LIMITED"], r)} bg={scheme.accent} color={scheme.bg} />
      </div>

      <div style={{ marginTop: 16, padding: 14, borderRadius: 16, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 24, fontWeight: 1000 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>
        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>{offerLine1(campaign)}</div>
      </div>

      <PromoBox scheme={scheme} title="What to do next" lines={[offerLine2(campaign), content.body[2], content.body[1]].filter(Boolean)} />

      <div style={{ marginTop: 16, fontWeight: 950 }}>{content.featureTitle}</div>
      <FeatureStack scheme={scheme} items={content.features} />

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutG({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ border: `2px dashed ${scheme.accent}`, borderRadius: 18, padding: 16 }}>
        <div style={{ textAlign: "center", fontWeight: 1000, marginBottom: 8 }}>🎟️ REWARD TICKET</div>
        <div style={{ textAlign: "center", fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 10, textAlign: "center", fontSize: 24, fontWeight: 1000 }}>{content.headline}</div>
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>

        <Divider scheme={scheme} />

        <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.94 }}>
          <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
          <div>{offerLine1(campaign)}</div>
          <div style={{ marginTop: 10 }}>{content.body[0]}</div>
        </div>

        <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

        <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
      </div>
    </EmailShell>
  );
}

function LayoutH({ scheme, content, campaign, r }) {
  const stages = [
    { t: "Stage 1", d: pickSeeded(["Activate the reward", "Open your account", "Confirm eligibility"], r) },
    { t: "Stage 2", d: pickSeeded(["Start your session", "Choose eligible games", "Use the added value"], r) },
    { t: "Stage 3", d: pickSeeded(["Enjoy extended play", "Maximise the experience", "Keep playing your way"], r) }
  ];
  const lightBg = scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";

  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <Pill text="NEW" bg={scheme.accent} color={scheme.bg} />
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 1000 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>✨ {content.subheadline}</div>
      </div>

      <div style={{ marginTop: 12, fontSize: 13, opacity: 0.92, fontWeight: 900, textAlign: "center" }}>
        {offerLine1(campaign)}
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 950, marginBottom: 10 }}>How it works</div>
        {stages.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 14,
              marginBottom: 10,
              border: lightBg ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.10)",
              background: lightBg ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.05)"
            }}
          >
            <div style={{ fontWeight: 1000, color: scheme.accent, minWidth: 78 }}>{s.t}</div>
            <div style={{ opacity: 0.92 }}>{s.d}</div>
          </div>
        ))}
      </div>

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutI({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 14, fontSize: 22, fontWeight: 1000 }}>{content.headline}</div>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>{content.subheadline}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, opacity: 0.94, textAlign: "center" }}>
        <div style={{ fontWeight: 900 }}>{offerLine1(campaign)}</div>
        <div style={{ marginTop: 10 }}>{offerLine2(campaign)}</div>
      </div>

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

function LayoutJ({ scheme, content, campaign, r }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ textAlign: "center" }}>
        <Pill text={pickSeeded(["EXCLUSIVE", "VIP", "LIMITED"], r)} bg={scheme.accent} color={scheme.bg} />
        <div style={{ marginTop: 10, fontWeight: 950, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>{content.brand}</div>
        <div style={{ marginTop: 14, fontSize: 30, fontWeight: 1000, lineHeight: 1.02 }}>{content.headline}</div>
        <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>✨ {content.subheadline}</div>
      </div>

      <PromoBox
        scheme={scheme}
        title="Your reward"
        lines={[
          offerLine1(campaign),
          offerLine2(campaign),
          content.body[2]
        ].filter(Boolean)}
      />

      <CenteredCTAGroup scheme={scheme} campaign={campaign} r={r} />

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.92, textAlign: "center" }}>
        <strong>{pickSeeded(closings, r)}</strong>
      </div>

      <Footer scheme={scheme} brand={content.brand} footer1={content.footer1} footer2={content.footer2} />
    </EmailShell>
  );
}

/* ===========================
   MAIN COMPONENT
=========================== */
export default function AdvancedEmailGenerator() {
  const previewRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [isBatching, setIsBatching] = useState(false);

  // Campaign controls (GLOBAL)
  const [brand, setBrand] = useState("CASINO BRAND");
  const [depositBonus, setDepositBonus] = useState("");
  const [freeSpins, setFreeSpins] = useState("");
  const [game, setGame] = useState("");

  const campaign = useMemo(
    () => ({
      brand: brand?.trim() || "CASINO BRAND",
      depositBonus: depositBonus?.trim(),
      freeSpins: freeSpins?.trim(),
      game: game?.trim()
    }),
    [brand, depositBonus, freeSpins, game]
  );

  const content = useMemo(() => {
    const r = mulberry32(index * 10007 + 42);
    const scheme = pickSeeded(colorSchemes, r);
    const body = pickSeeded(bodyFlows, r);

    return {
      seed: index,
      brand: campaign.brand,
      scheme,
      greeting: pickSeeded(greetings, r),
      headline: pickSeeded(headlines, r),
      subheadline: pickSeeded(subheadlines, r),
      body,
      featureTitle: pickSeeded(featureTitles, r),
      features: pickManySeeded(featureBullets, r, 4),
      closing: pickSeeded(closings, r),
      footer1: pickSeeded(footerPromo, r),
      footer2: pickSeeded(footerUnsub, r)
    };
  }, [index, campaign.brand]);

  const layouts = useMemo(
    () => [
      LayoutA,
      LayoutB,
      LayoutC,
      LayoutD,
      LayoutE,
      LayoutF,
      LayoutG,
      LayoutH,
      LayoutI,
      LayoutJ
    ],
    []
  );

  const Layout = layouts[index % layouts.length];

  const generateSubjects = () => {
    const list = Array.from({ length: 100 }, (_, i) =>
      subjectFor(i + index * 17, content)
    );
    setSubjects(list);
  };

  const exportSubjectsTXT = () => {
    if (!subjects.length) return;
    downloadText("subjects.txt", subjects.join("\n"));
  };

  const exportSubjectsCSV = () => {
    if (!subjects.length) return;
    downloadCSV("subjects.csv", [["Subject Line"], ...subjects.map((s) => [s])]);
  };

  const exportSheetsIndexCSV = () => {
    if (!subjects.length) return;
    const rows = [["Template #", "Subject Line", "Image Filename"]];
    subjects.slice(0, 10).forEach((s, i) => rows.push([String(i + 1), s, `email-${i + 1}.png`]));
    downloadCSV("google-sheets-index.csv", rows);
  };

  const downloadCurrentImage = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `email-${index + 1}.png`;
    a.click();
  };

  const download10Images = async () => {
    if (isBatching) return;
    setIsBatching(true);
    const start = index;

    for (let i = 0; i < 10; i++) {
      setIndex(start + i);
      await sleep(260);
      if (!previewRef.current) continue;

      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `email-${i + 1}.png`;
      a.click();
      await sleep(180);
    }

    setIndex(start);
    setIsBatching(false);
  };

  const rUI = useMemo(() => mulberry32(index * 7777 + 99), [index]);

  /* ===========================
     NEW: HTML EDITOR STATE (ADDED ONLY)
  =========================== */
  const [htmlEditorOpen, setHtmlEditorOpen] = useState(false);
  const [htmlDraft, setHtmlDraft] = useState("");
  const [htmlCopied, setHtmlCopied] = useState(false);

  const buildESPHTMLFromCurrent = () => {
    // Use deterministic UI RNG for CTA label selection so export matches view style vibes
    const primaryLabel = ctaPrimaryLabel(campaign);
    const secondaryLabel = pickSeeded(["View Details", "See Eligible Games", "Learn More", ""], rUI);

    return renderESPHTML({
      content,
      campaign,
      scheme: content.scheme,
      primaryCtaLabel: primaryLabel,
      secondaryCtaLabel: secondaryLabel
    });
  };

  const openHTMLEditor = () => {
    const html = buildESPHTMLFromCurrent();
    setHtmlDraft(html);
    setHtmlCopied(false);
    setHtmlEditorOpen(true);
  };

  const downloadHTMLFromEditor = () => {
    if (!htmlDraft) return;
    downloadHTML(`email-esp-${index + 1}.html`, htmlDraft);
  };

  const copyHTMLFromEditor = async () => {
    if (!htmlDraft) return;
    const ok = await copyToClipboard(htmlDraft);
    setHtmlCopied(ok);
    setTimeout(() => setHtmlCopied(false), 1200);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Campaign Controls */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-end",
          marginBottom: 14
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Brand Name</div>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ padding: 8, width: 220 }}
            placeholder="CASINO BRAND"
          />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Deposit Bonus</div>
          <input
            value={depositBonus}
            onChange={(e) => setDepositBonus(e.target.value)}
            style={{ padding: 8, width: 220 }}
            placeholder="e.g. 100% up to €500"
          />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Free Spins</div>
          <input
            value={freeSpins}
            onChange={(e) => setFreeSpins(e.target.value)}
            style={{ padding: 8, width: 160 }}
            placeholder="e.g. 50 Free Spins"
          />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Game (optional)</div>
          <input
            value={game}
            onChange={(e) => setGame(e.target.value)}
            style={{ padding: 8, width: 160 }}
            placeholder="e.g. Starburst"
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button disabled={isBatching} onClick={() => setIndex((i) => Math.max(0, i - 1))}>Prev</button>
          <button disabled={isBatching} onClick={() => setIndex((i) => i + 1)}>Next</button>

          <button disabled={isBatching} onClick={downloadCurrentImage}>Download Image</button>
          <button disabled={isBatching} onClick={download10Images}>Download 10 Images</button>

          <button disabled={isBatching} onClick={generateSubjects}>Generate 100 Subjects</button>
          <button disabled={!subjects.length || isBatching} onClick={exportSubjectsTXT}>Export TXT</button>
          <button disabled={!subjects.length || isBatching} onClick={exportSubjectsCSV}>Export CSV</button>
          <button disabled={!subjects.length || isBatching} onClick={exportSheetsIndexCSV}>Sheets Index CSV</button>

          {/* NEW: ESP HTML Export + Editor (ADDED ONLY) */}
          <button disabled={isBatching} onClick={openHTMLEditor}>Export / Edit HTML (ESP)</button>
        </div>
      </div>

      <div style={{ opacity: 0.7, marginBottom: 10 }}>
        Template #{index + 1} (Layout {(index % 10) + 1}) · Scheme: {content.scheme.name}
      </div>

      {subjects.length > 0 && (
        <div style={{ marginTop: 14, maxWidth: 980 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Subjects (first 12 shown)</div>
          <ol style={{ marginTop: 0 }}>
            {subjects.slice(0, 12).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}

      <div ref={previewRef} style={{ marginTop: 24 }}>
        <Layout
          scheme={content.scheme}
          content={content}
          campaign={campaign}
          r={rUI}
        />
      </div>

      {/* ===========================
          NEW: HTML EDITOR MODAL (ADDED ONLY)
      ============================ */}
      {htmlEditorOpen && (
        <div
          onClick={() => setHtmlEditorOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1100px, 100%)",
              maxHeight: "88vh",
              overflow: "hidden",
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                padding: 14,
                borderBottom: "1px solid rgba(0,0,0,0.10)",
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ fontWeight: 900 }}>
                ESP HTML Editor (Template #{index + 1})
                <span style={{ marginLeft: 10, fontWeight: 700, opacity: 0.7 }}>
                  (edit if your ESP needs tweaks)
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setHtmlDraft(buildESPHTMLFromCurrent())}>
                  Regenerate from current
                </button>
                <button onClick={copyHTMLFromEditor}>
                  {htmlCopied ? "Copied ✅" : "Copy HTML"}
                </button>
                <button onClick={downloadHTMLFromEditor}>
                  Download HTML
                </button>
                <button onClick={() => setHtmlEditorOpen(false)}>
                  Close
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, padding: 14, overflow: "auto" }}>
              <div style={{ flex: 1, minWidth: 520 }}>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>
                  HTML (editable)
                </div>
                <textarea
                  value={htmlDraft}
                  onChange={(e) => setHtmlDraft(e.target.value)}
                  spellCheck={false}
                  style={{
                    width: "100%",
                    height: "60vh",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: 12,
                    lineHeight: 1.45,
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.15)"
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 520 }}>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>
                  Preview (basic)
                </div>
                <div
                  style={{
                    height: "60vh",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.15)",
                    overflow: "auto",
                    background: "#f2f2f2"
                  }}
                >
                  <iframe
                    title="ESP HTML Preview"
                    style={{ width: "100%", height: "100%", border: "0" }}
                    srcDoc={htmlDraft}
                  />
                </div>
                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 8, lineHeight: 1.4 }}>
                  Note: iframe preview is “close enough” for quick edits. Real rendering should be checked in your ESP + inbox tests.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
