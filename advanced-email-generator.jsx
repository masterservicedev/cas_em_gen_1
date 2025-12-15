import React, { useState, useMemo, useRef } from "react";
import html2canvas from "html2canvas";

/* ================= SPINTAX ================= */

function expandSpintax(str, seed) {
  let i = 0;
  return str.replace(/\{([^{}]+)\}/g, (_, group) => {
    const options = group.split("|");
    const pick = options[Math.floor((seed + i++) * 997) % options.length];
    return pick;
  });
}

/* ================= SUBJECT SPINTAX POOL ================= */

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
  "{Only you will understand this|This message is meant for you|You were meant to see this|You’ll get it when no one else will}",
  "{Hidden in plain sight…|Right under your nose|It was here all along|You’ve seen it—but didn’t see it}",
  "🎁 {We weren’t supposed to show you this|This slipped through|We broke the rules for this|This wasn’t meant to be shared}",
  "Fwd: {Not your typical email|This stands out|Unusual message alert|This breaks the pattern}",
  "{Blink and you’ll miss it|Act fast|A short window|Gone before you know it}",
  "{This might be your only chance|Last shot at this|Once-in-a-lifetime?|Won’t happen again}",
  "{Can you crack the code?|A riddle for you|Something to solve|There’s a pattern here} 🎯",
  "{Open at your own risk|Not for the faint-hearted|Warning: intense stuff}",
  "{The missing piece you’ve been looking for|It all makes sense now|The puzzle is complete}",
  "{Everything led to this moment|It all comes together now|This is the point}",
  "🔥 {Only for you – take a look|Exclusively for you – check this out|Just for you – have a look}"
];

/* ================= CONTENT ================= */

const headlines = [
  "SYSTEM UPGRADE DETECTED",
  "YOUR EXCLUSIVE BONUS AWAITS",
  "HIGH ROLLER ACCESS GRANTED",
  "WELCOME TO THE WINNERS CIRCLE",
  "ELITE STATUS CONFIRMED",
  "A NEW REWARD EXPERIENCE",
  "YOUR ACCOUNT JUST GOT BETTER"
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
  ]
];

const featureBullets = [
  "Fast and reliable payouts",
  "Hundreds of premium games",
  "24/7 customer support",
  "Secure and trusted platform",
  "Exclusive player promotions"
];

const footerPromo = [
  "This is a promotional offer. Please play responsibly."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here."
];

/* ================= HELPERS ================= */

const pick = (arr, seed) => arr[seed % arr.length];
const pickMany = (arr, seed, n) =>
  [...arr].slice(seed % (arr.length - n), seed % (arr.length - n) + n);

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

/* ================= SUBJECT ENGINE ================= */

function subjectFor(seed, content) {
  // 2/3 spintax, 1/3 structured fallback
  if (seed % 3 !== 0) {
    const base = SPINTAX_SUBJECTS[seed % SPINTAX_SUBJECTS.length];
    return expandSpintax(base, seed).trim();
  }

  const hook = content.headline
    .replace(/DETECTED|CONFIRMED|GRANTED|UNLOCKED/gi, "")
    .trim();

  const structured = [
    `Exclusive update: ${hook}`,
    `Something new just dropped`,
    `This wasn’t supposed to be shared`,
    `Only a few will notice this`,
    `A change worth checking out`
  ];

  return structured[seed % structured.length];
}

/* ================= LAYOUT (UNCHANGED) ================= */

function EmailShell({ children }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, border: "1px solid #ddd", background: "#fff" }}>
      {children}
    </div>
  );
}

function Footer({ c }) {
  return (
    <>
      <hr />
      <small>{c.footer1}</small><br />
      <small>{c.footer2}</small>
    </>
  );
}

const layouts = [
  (c) => (
    <EmailShell>
      <h1>{c.headline}</h1>
      {c.body.map((p, i) => <p key={i}>{p}</p>)}
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <Footer c={c} />
    </EmailShell>
  )
];

/* ================= COMPONENT ================= */

export default function AdvancedEmailGenerator() {
  const [index, setIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const previewRef = useRef(null);

  const content = useMemo(() => ({
    headline: pick(headlines, index),
    body: pick(bodyFlows, index),
    features: pickMany(featureBullets, index, 3),
    footer1: pick(footerPromo, index),
    footer2: pick(footerUnsub, index)
  }), [index]);

  const generateSubjects = () => {
    const list = Array.from({ length: 50 }, (_, i) =>
      subjectFor(i + index * 7, content)
    );
    setSubjects(list);
  };

  const exportTXT = () => downloadText("subjects.txt", subjects.join("\n"));
  const exportCSV = () =>
    downloadCSV("subjects.csv", [["Subject"], ...subjects.map((s) => [s])]);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setIndex(i => i + 1)}>Next</button>
      <button onClick={generateSubjects}>Generate 50 Subjects</button>
      <button disabled={!subjects.length} onClick={exportTXT}>Export TXT</button>
      <button disabled={!subjects.length} onClick={exportCSV}>Export CSV</button>

      <div style={{ marginTop: 12 }}>
        {subjects.slice(0, 10).map((s, i) => <div key={i}>{s}</div>)}
      </div>

      <div ref={previewRef} style={{ marginTop: 24 }}>
        {layouts[0](content)}
      </div>
    </div>
  );
}
