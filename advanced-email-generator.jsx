import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

/* ===========================
   SEEDED RANDOM (DETERMINISTIC)
   - Stable per index, no “jumping”
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
  // deterministic-ish expansion across a batch
  const r = mulberry32(seedNum * 99991 + 1337);
  let i = 0;
  return str.replace(/\{([^{}]+)\}/g, (_, group) => {
    const options = group.split("|");
    const idx = Math.floor((r() + i++ * 0.07) * options.length) % options.length;
    return options[idx];
  });
}

/* ===========================
   SUBJECT POOL (SPINTAX) – NO [%%FEmailUser%%]
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
  "{This might change everything|What comes next is big|This could be the moment|It’s about to shift}",
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
   CONTENT LIBRARY (BODY/HEADLINES/etc.)
=========================== */
const BRAND_DEFAULT = "CASINO BRAND";

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
  // balanced mix: light, dark, colorful accents
  { name: "Gold Dark", bg: "#0b0b0f", card: "#12121a", text: "#f5f5f7", muted: "#b8b8c3", accent: "#f5c542", accent2: "#d89a1e" },
  { name: "Ocean Light", bg: "#f5fbff", card: "#ffffff", text: "#0e1a24", muted: "#4a5c6b", accent: "#1aa3ff", accent2: "#0f6fb5" },
  { name: "Ruby", bg: "#14070a", card: "#1d0a10", text: "#fff5f6", muted: "#e3b8be", accent: "#ff2d55", accent2: "#b30022" },
  { name: "Mint", bg: "#f3fff9", card: "#ffffff", text: "#0c2b1e", muted: "#3e6b57", accent: "#20c997", accent2: "#0e7d5a" },
  { name: "Violet", bg: "#0d0618", card: "#150a2a", text: "#fbf7ff", muted: "#cdbcf5", accent: "#a855f7", accent2: "#6d28d9" },
  { name: "Sunset", bg: "#fff7f0", card: "#ffffff", text: "#2a1608", muted: "#6f4b33", accent: "#ff7a18", accent2: "#ff3d00" },
  { name: "Steel", bg: "#f7f8fb", card: "#ffffff", text: "#101826", muted: "#54637a", accent: "#334155", accent2: "#0f172a" },
  { name: "Neon", bg: "#050508", card: "#0b0b12", text: "#f4f4ff", muted: "#9aa0c6", accent: "#22c55e", accent2: "#06b6d4" }
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
   BLOCK RENDERER (VISUAL ENGINE)
=========================== */
function Pill({ text, bg, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: bg,
        color
      }}
    >
      {text}
    </span>
  );
}

function Button({ label, href, variant, scheme, shape }) {
  const radius = shape === "round" ? 999 : 10;
  const base = {
    display: "inline-block",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 14,
    letterSpacing: 0.2,
    padding: "12px 16px",
    borderRadius: radius
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

  // text
  return (
    <a
      href={href}
      style={{
        ...base,
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

function Divider({ scheme, styleType }) {
  const h = styleType === "thick" ? 3 : 1;
  const opacity = styleType === "soft" ? 0.18 : 0.35;
  return (
    <div
      style={{
        height: h,
        background: scheme.accent,
        opacity,
        borderRadius: 999,
        margin: "18px 0"
      }}
    />
  );
}

function StatRow({ scheme, stats }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 14,
        flexWrap: "wrap"
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: "1 1 140px",
            padding: 12,
            borderRadius: 14,
            border: `1px solid rgba(255,255,255,0.08)`,
            background: scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9"
              ? "rgba(0,0,0,0.03)"
              : "rgba(255,255,255,0.06)"
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.8 }}>{s.label}</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureGrid({ scheme, items, dense }) {
  const cols = dense ? 2 : 1;
  return (
    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: 10 }}>
      <tbody>
        {Array.from({ length: Math.ceil(items.length / cols) }, (_, row) => (
          <tr key={row}>
            {Array.from({ length: cols }, (_, col) => {
              const idx = row * cols + col;
              const it = items[idx];
              return (
                <td key={col} style={{ verticalAlign: "top", padding: "6px 8px" }}>
                  {it ? (
                    <div
                      style={{
                        borderRadius: 14,
                        padding: 12,
                        border:
                          scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9"
                            ? "1px solid rgba(0,0,0,0.08)"
                            : "1px solid rgba(255,255,255,0.10)",
                        background:
                          scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9"
                            ? "rgba(0,0,0,0.02)"
                            : "rgba(255,255,255,0.05)"
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 800 }}>{it}</div>
                      <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
                        Designed to keep the experience smooth.
                      </div>
                    </div>
                  ) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PromoBox({ scheme, title, lines }) {
  const lightBg =
    scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";
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
        <div style={{ fontWeight: 900 }}>{title}</div>
        <Pill text="Limited" bg={scheme.accent} color={scheme.bg} />
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

function Footer({ scheme, brand, footer1, footer2 }) {
  const lightBg =
    scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";
  return (
    <div style={{ marginTop: 18, paddingTop: 14 }}>
      <Divider scheme={scheme} styleType="soft" />
      <div style={{ fontSize: 11, opacity: 0.85, lineHeight: 1.45 }}>
        {footer1}
        <br />
        {footer2}{" "}
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>unsubscribe here</span>.
      </div>
      <div style={{ fontSize: 11, opacity: 0.75, marginTop: 10 }}>
        © 2026 {brand}. All rights reserved.
        <br />
        Please gamble responsibly.
      </div>
      {!lightBg ? (
        <div style={{ fontSize: 11, opacity: 0.55, marginTop: 8 }}>
          Privacy · Terms · Help
        </div>
      ) : (
        <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>
          Privacy · Terms · Help
        </div>
      )}
    </div>
  );
}

/* ===========================
   EMAIL SHELL
=========================== */
function EmailShell({ scheme, children, styleVariant }) {
  const lightBg =
    scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";

  const radius = styleVariant === "sharp" ? 10 : 22;

  return (
    <div
      style={{
        background: scheme.bg,
        padding: 24,
        minHeight: 520,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        color: scheme.text
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          borderRadius: radius,
          background: scheme.card,
          border: lightBg ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: lightBg
            ? "0 12px 40px rgba(0,0,0,0.08)"
            : "0 12px 40px rgba(0,0,0,0.35)",
          padding: 22
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ===========================
   BLOCK COMPOSER (COHERENT RANDOMNESS)
=========================== */
function buildBlocks({ r, scheme, content }) {
  const emojiAllowed = r() > 0.75; // occasional, restrained
  const dense = r() > 0.6;

  const ctaShape = r() > 0.5 ? "round" : "square";
  const ctaVariantPrimary = r() > 0.5 ? "solid" : "outline";
  const ctaVariantSecondary = r() > 0.6 ? "outline" : "text";
  const twoCTAs = r() > 0.55;

  const badges = ["VIP", "EXCLUSIVE", "LIMITED", "NEW", "PRIORITY"];
  const badge = pickSeeded(badges, r);

  const heroStyle = r() > 0.55 ? "big" : "standard";
  const dividerStyle = pickSeeded(["soft", "thin", "thick"], r);

  const stats = [
    { label: "Reward", value: pickSeeded(["+50% Value", "Extra Spins", "Bonus Boost", "VIP Perk"], r) },
    { label: "Activation", value: pickSeeded(["Instant", "1-Click", "Auto-ready", "No hassle"], r) },
    { label: "Window", value: pickSeeded(["Limited", "Short run", "Today", "This week"], r) }
  ];

  const blocks = [];

  // Header / branding block
  blocks.push({
    type: "brand",
    render: () => (
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 900, letterSpacing: 1.2, fontSize: 12, opacity: 0.9 }}>
          {content.brand}
        </div>
        <Pill text={badge} bg={scheme.accent} color={scheme.bg} />
      </div>
    )
  });

  // Hero block
  blocks.push({
    type: "hero",
    render: () => (
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: heroStyle === "big" ? 28 : 22, fontWeight: 950, letterSpacing: 0.2, lineHeight: 1.08 }}>
          {content.headline}
        </div>
        <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>
          {emojiAllowed ? "✨ " : ""}{content.subheadline}
        </div>
      </div>
    )
  });

  // Editorial intro block (optional)
  if (r() > 0.35) {
    blocks.push({
      type: "editorialIntro",
      render: () => (
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, opacity: 0.92 }}>
          <strong style={{ display: "block", marginBottom: 6 }}>{content.greeting}</strong>
          <span style={{ opacity: 0.95 }}>{content.body[0]}</span>
        </div>
      )
    });
  }

  // Divider (optional)
  if (r() > 0.45) {
    blocks.push({
      type: "divider",
      render: () => <Divider scheme={scheme} styleType={dividerStyle} />
    });
  }

  // Promo box (optional)
  if (r() > 0.25) {
    blocks.push({
      type: "promoBox",
      render: () => (
        <PromoBox
          scheme={scheme}
          title={pickSeeded(["Offer details", "What you get", "Reward summary", "Unlocked perks"], r)}
          lines={pickManySeeded(
            [
              content.body[1] || "Everything is ready whenever you are.",
              content.body[2] || "Make the most of it while it’s live.",
              "Activate in your account and start immediately.",
              "Available across eligible games and sessions."
            ],
            r,
            3
          )}
        />
      )
    });
  }

  // Stats row (optional)
  if (r() > 0.5) {
    blocks.push({
      type: "stats",
      render: () => <StatRow scheme={scheme} stats={dense ? stats.slice(0, 2) : stats} />
    });
  }

  // Features (almost always)
  blocks.push({
    type: "features",
    render: () => (
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 900 }}>{content.featureTitle}</div>
        <FeatureGrid scheme={scheme} items={content.features} dense={dense} />
      </div>
    )
  });

  // CTA block
  blocks.push({
    type: "cta",
    render: () => (
      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Button
            label={pickSeeded(["Activate Reward", "Claim Now", "Unlock Offer", "Start Playing"], r)}
            href="#"
            variant={ctaVariantPrimary}
            scheme={scheme}
            shape={ctaShape}
          />
          {twoCTAs ? (
            <Button
              label={pickSeeded(["View Details", "See Eligible Games", "Learn More"], r)}
              href="#"
              variant={ctaVariantSecondary}
              scheme={scheme}
              shape={ctaShape === "round" ? "square" : "round"}
            />
          ) : null}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.82 }}>
          {pickSeeded(
            [
              "No extra steps. Simple activation.",
              "Limited window. Don’t leave it sitting.",
              "Designed to fit seamlessly into your play.",
              "Use it when it suits you."
            ],
            r
          )}
        </div>
      </div>
    )
  });

  // Closing
  blocks.push({
    type: "closing",
    render: () => (
      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.92 }}>
        <strong>{content.closing}</strong>
      </div>
    )
  });

  // Footer
  blocks.push({
    type: "footer",
    render: () => (
      <Footer
        scheme={scheme}
        brand={content.brand}
        footer1={content.footer1}
        footer2={content.footer2}
      />
    )
  });

  return blocks;
}

/* ===========================
   10 DISTINCT LAYOUT WRAPPERS
   (Balanced mix: promo + editorial + magazine + newsletter vibes)
=========================== */
function LayoutClassic({ scheme, blocks }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      {blocks.map((b, i) => <div key={i}>{b.render()}</div>)}
    </EmailShell>
  );
}

function LayoutVIP({ scheme, blocks }) {
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <div style={{ borderRadius: 18, padding: 16, border: `1px solid rgba(255,255,255,0.10)`, background: "rgba(255,255,255,0.04)" }}>
        {blocks.map((b, i) => <div key={i}>{b.render()}</div>)}
      </div>
    </EmailShell>
  );
}

function LayoutModernCard({ scheme, blocks }) {
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ padding: 16, borderRadius: 14, background: "transparent" }}>
        {blocks.map((b, i) => <div key={i}>{b.render()}</div>)}
      </div>
    </EmailShell>
  );
}

function LayoutSplit({ scheme, blocks }) {
  // split feel: hero on left, details on right (table-based)
  const left = blocks.slice(0, 3);
  const right = blocks.slice(3);
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td width="45%" style={{ verticalAlign: "top", paddingRight: 10 }}>
              {left.map((b, i) => <div key={i}>{b.render()}</div>)}
            </td>
            <td width="55%" style={{ verticalAlign: "top", paddingLeft: 10 }}>
              {right.map((b, i) => <div key={i}>{b.render()}</div>)}
            </td>
          </tr>
        </tbody>
      </table>
    </EmailShell>
  );
}

function LayoutMinimal({ scheme, blocks }) {
  // fewer blocks shown for minimal layout
  const keep = blocks.filter((b) => ["brand", "hero", "features", "cta", "footer"].includes(b.type));
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      {keep.map((b, i) => <div key={i}>{b.render()}</div>)}
    </EmailShell>
  );
}

function LayoutNewsletter({ scheme, blocks }) {
  // newsletter: sections separated with dividers
  const sections = blocks.map((b) => ({
    ...b,
    renderWrapped: () => (
      <div style={{ padding: "10px 0" }}>
        {b.render()}
      </div>
    )
  }));
  return (
    <EmailShell scheme={scheme} styleVariant="round">
      {sections.map((b, i) => (
        <div key={i}>
          {b.renderWrapped()}
          {i < sections.length - 1 ? <Divider scheme={scheme} styleType="soft" /> : null}
        </div>
      ))}
    </EmailShell>
  );
}

function LayoutEditorial({ scheme, blocks }) {
  // editorial: hero + paragraphs more prominent
  const brand = blocks.find((b) => b.type === "brand");
  const hero = blocks.find((b) => b.type === "hero");
  const intro = blocks.find((b) => b.type === "editorialIntro");
  const promo = blocks.find((b) => b.type === "promoBox");
  const features = blocks.find((b) => b.type === "features");
  const cta = blocks.find((b) => b.type === "cta");
  const footer = blocks.find((b) => b.type === "footer");

  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div style={{ fontSize: 12, letterSpacing: 1.2, opacity: 0.85 }}>EDITORIAL</div>
      {brand?.render()}
      {hero?.render()}
      {intro?.render()}
      {promo?.render()}
      {features?.render()}
      {cta?.render()}
      {footer?.render()}
    </EmailShell>
  );
}

function LayoutMagazine({ scheme, blocks }) {
  // magazine: big hero + “tiles”
  const tiles = blocks.filter((b) => ["promoBox", "stats", "features"].includes(b.type));
  const header = blocks.filter((b) => ["brand", "hero"].includes(b.type));
  const tail = blocks.filter((b) => ["cta", "footer"].includes(b.type));

  return (
    <EmailShell scheme={scheme} styleVariant="round">
      {header.map((b, i) => <div key={i}>{b.render()}</div>)}
      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {tiles.map((b, i) => (
          <div key={i} style={{ borderRadius: 16, padding: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}>
            {b.render()}
          </div>
        ))}
      </div>
      {tail.map((b, i) => <div key={i}>{b.render()}</div>)}
    </EmailShell>
  );
}

function LayoutCoupon({ scheme, blocks }) {
  // coupon: “ticket” style border
  const inner = blocks.filter((b) => b.type !== "divider");
  return (
    <EmailShell scheme={scheme} styleVariant="sharp">
      <div
        style={{
          border: `2px dashed ${scheme.accent}`,
          borderRadius: 18,
          padding: 16
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 8 }}>
          {pickSeeded(["YOUR TICKET", "REWARD PASS", "PROMO COUPON", "VIP ENTRY"], mulberry32(999))} 🎟️
        </div>
        {inner.map((b, i) => <div key={i}>{b.render()}</div>)}
      </div>
    </EmailShell>
  );
}

function LayoutTimeline({ scheme, blocks, r }) {
  // timeline: stage list + CTA + footer
  const brand = blocks.find((b) => b.type === "brand");
  const hero = blocks.find((b) => b.type === "hero");
  const cta = blocks.find((b) => b.type === "cta");
  const footer = blocks.find((b) => b.type === "footer");

  const stages = [
    { t: "Stage 1", d: pickSeeded(["Activate the reward", "Open your account", "Confirm eligibility"], r) },
    { t: "Stage 2", d: pickSeeded(["Choose eligible games", "Start your session", "Use the added value"], r) },
    { t: "Stage 3", d: pickSeeded(["Keep playing your way", "Enjoy extended play", "Maximise the experience"], r) }
  ];

  const lightBg =
    scheme.bg === "#f7f8fb" || scheme.bg === "#f5fbff" || scheme.bg === "#fff7f0" || scheme.bg === "#f3fff9";

  return (
    <EmailShell scheme={scheme} styleVariant="round">
      {brand?.render()}
      {hero?.render()}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>How it works</div>
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
            <div style={{ fontWeight: 900, color: scheme.accent, minWidth: 78 }}>{s.t}</div>
            <div style={{ opacity: 0.9 }}>{s.d}</div>
          </div>
        ))}
      </div>
      {cta?.render()}
      {footer?.render()}
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

  // deterministic per template index
  const content = useMemo(() => {
    const r = mulberry32(index * 10007 + 42);
    const scheme = pickSeeded(colorSchemes, r);
    const body = pickSeeded(bodyFlows, r);

    return {
      seed: index,
      brand: BRAND_DEFAULT,
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
  }, [index]);

  const blocks = useMemo(() => {
    const r = mulberry32(index * 7777 + 99);
    return buildBlocks({ r, scheme: content.scheme, content });
  }, [index, content]);

  const layouts = useMemo(() => ([
    (props) => <LayoutClassic {...props} />,
    (props) => <LayoutVIP {...props} />,
    (props) => <LayoutModernCard {...props} />,
    (props) => <LayoutSplit {...props} />,
    (props) => <LayoutMinimal {...props} />,
    (props) => <LayoutNewsletter {...props} />,
    (props) => <LayoutEditorial {...props} />,
    (props) => <LayoutMagazine {...props} />,
    (props) => <LayoutCoupon {...props} />,
    (props) => <LayoutTimeline {...props} r={mulberry32(index * 3333 + 7)} />
  ]), [index]);

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

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button disabled={isBatching} onClick={() => setIndex((i) => Math.max(0, i - 1))}>Prev</button>
        <button disabled={isBatching} onClick={() => setIndex((i) => i + 1)}>Next</button>

        <button disabled={isBatching} onClick={downloadCurrentImage}>Download Image</button>
        <button disabled={isBatching} onClick={download10Images}>Download 10 Images</button>

        <button disabled={isBatching} onClick={generateSubjects}>Generate 100 Subjects</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSubjectsTXT}>Export TXT</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSubjectsCSV}>Export CSV</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSheetsIndexCSV}>Sheets Index CSV</button>

        <span style={{ marginLeft: 10, opacity: 0.7 }}>
          Template #{index + 1} (Layout {(index % 10) + 1}) · Scheme: {content.scheme.name}
        </span>
      </div>

      {subjects.length > 0 && (
        <div style={{ marginTop: 14, maxWidth: 980 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Subjects (first 12 shown)</div>
          <ol style={{ marginTop: 0 }}>
            {subjects.slice(0, 12).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}

      <div ref={previewRef} style={{ marginTop: 24 }}>
        <Layout scheme={content.scheme} blocks={blocks} />
      </div>
    </div>
  );
}
