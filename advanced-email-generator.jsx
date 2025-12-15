import React, { useState, useMemo, useRef } from "react";
import html2canvas from "html2canvas";

/* ================= CONTENT ================= */

const greetings = [
  "Greetings,",
  "Hello,",
  "Hi there,",
  "Hey,",
  "Hope all is well,",
  "Trust this finds you well,"
];

const headlines = [
  "SYSTEM UPGRADE DETECTED",
  "YOUR EXCLUSIVE BONUS AWAITS",
  "HIGH ROLLER ACCESS GRANTED",
  "WELCOME TO THE WINNERS CIRCLE",
  "ELITE STATUS CONFIRMED",
  "A NEW REWARD EXPERIENCE",
  "YOUR ACCOUNT JUST GOT BETTER",
  "EXCLUSIVE PLAYER BENEFITS UNLOCKED"
];

const subheadlines = [
  "Boost your bankroll with added value today",
  "Limited-time rewards for active players",
  "Extra playtime is waiting inside",
  "Enjoy enhanced value on your next session",
  "Designed for players who want more"
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
    "Your account has been selected for a limited upgrade.",
    "This enhancement is available for a short time only.",
    "Make the most of it while it’s active."
  ]
];

const featureTitles = ["Your Player Benefits", "What’s Included", "Why Play With Us?"];

const featureBullets = [
  "Fast and reliable payouts",
  "Hundreds of premium games",
  "24/7 customer support",
  "Secure and trusted platform",
  "Exclusive player promotions",
  "Mobile-friendly gameplay"
];

const closings = ["Happy gaming,", "Best of luck,", "Enjoy your play,"];

const footerPromo = [
  "This is a promotional offer. Please play responsibly.",
  "Promotional content. Always play within your limits."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here.",
  "You can unsubscribe from future emails here."
];

/* ================= SUBJECT ENGINE =================
   Deterministic, index-aligned, 50+ unique combos
*/
const subjPrefix = [
  "Exclusive", "Limited-Time", "VIP", "Member-Only", "Just for You", "Unlocked", "Priority"
];
const subjValue = [
  "Reward", "Offer", "Bonus", "Upgrade", "Perk", "Boost", "Advantage"
];
const subjAction = [
  "Activate now", "Claim today", "Available now", "Inside", "Ready", "Live", "Waiting"
];
const subjUrgency = [
  "Ends soon", "Tonight only", "Limited availability", "Don’t miss out", "Before it expires"
];

const sanitize = (s) => s.replace(/\s+/g, " ").trim();

/* ================= HELPERS ================= */

const pick = (arr, seed) => arr[seed % arr.length];
const pickMany = (arr, seed, n) =>
  [...arr]
    .sort((a, b) => (a > b ? 1 : -1))
    .slice(seed % (arr.length - n), seed % (arr.length - n) + n);

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

/* ================= LAYOUTS ================= */

function EmailShell({ children }) {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        border: "1px solid #ddd",
        background: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
      }}
    >
      {children}
    </div>
  );
}

function Footer({ c }) {
  return (
    <>
      <hr />
      <small>{c.footer1}</small>
      <br />
      <small>
        {c.footer2}{" "}
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>unsubscribe here</span>.
      </small>
    </>
  );
}

const layouts = [
  // 1. Classic
  (c) => (
    <EmailShell>
      <h1 style={{ margin: "0 0 10px" }}>{c.headline}</h1>
      <h3 style={{ margin: "0 0 14px" }}>{c.subheadline}</h3>
      <p><strong>{c.greeting}</strong></p>
      {c.body.map((p, i) => (
        <p key={i} style={{ lineHeight: 1.5 }}>{p}</p>
      ))}
      <h4 style={{ marginTop: 18 }}>{c.featureTitle}</h4>
      <ul>
        {c.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <p style={{ marginTop: 18 }}><strong>{c.closing}</strong></p>
      <Footer c={c} />
    </EmailShell>
  ),

  // 2. Editorial
  (c) => (
    <EmailShell>
      <small style={{ letterSpacing: 1 }}>EDITORIAL</small>
      <h1 style={{ margin: "8px 0 12px" }}>{c.headline}</h1>
      <p style={{ fontStyle: "italic" }}>{c.subheadline}</p>
      {c.body.map((p, i) => (
        <p key={i} style={{ lineHeight: 1.6 }}>{p}</p>
      ))}
      <Footer c={c} />
    </EmailShell>
  ),

  // 3. Newsletter
  (c) => (
    <EmailShell>
      <h2 style={{ margin: "0 0 10px" }}>{c.headline}</h2>
      <p><strong>{c.subheadline}</strong></p>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: 12 }}>
        <tbody>
          <tr>
            <td width="50%" style={{ verticalAlign: "top", paddingRight: 10 }}>
              <h4 style={{ margin: "0 0 6px" }}>{c.featureTitle}</h4>
              <ul>
                {c.features.slice(0, 2).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </td>
            <td width="50%" style={{ verticalAlign: "top", paddingLeft: 10 }}>
              <h4 style={{ margin: "0 0 6px" }}>Highlights</h4>
              <ul>
                {c.features.slice(1, 3).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <Footer c={c} />
    </EmailShell>
  ),

  // 4. Minimal
  (c) => (
    <EmailShell>
      <h2 style={{ margin: "0 0 10px" }}>{c.headline}</h2>
      <p style={{ margin: "0 0 14px" }}>{c.subheadline}</p>
      <p style={{ lineHeight: 1.6 }}>{c.body[0]}</p>
      <Footer c={c} />
    </EmailShell>
  ),

  // 5. Feature-led
  (c) => (
    <EmailShell>
      <h1 style={{ margin: "0 0 12px" }}>{c.headline}</h1>
      <h4 style={{ margin: "0 0 10px" }}>{c.featureTitle}</h4>
      <ul>
        {c.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      {c.body.slice(0, 2).map((p, i) => (
        <p key={i} style={{ lineHeight: 1.5 }}>{p}</p>
      ))}
      <Footer c={c} />
    </EmailShell>
  ),

  // 6–10 reserved for next step (visual divergence)
  (c) => layouts[0](c),
  (c) => layouts[1](c),
  (c) => layouts[2](c),
  (c) => layouts[3](c),
  (c) => layouts[4](c)
];

/* ================= COMPONENT ================= */

export default function AdvancedEmailGenerator() {
  const [index, setIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [isBatching, setIsBatching] = useState(false);
  const previewRef = useRef(null);

  const content = useMemo(() => {
    return {
      greeting: pick(greetings, index),
      headline: pick(headlines, index),
      subheadline: pick(subheadlines, index),
      body: pick(bodyFlows, index),
      featureTitle: pick(featureTitles, index),
      features: pickMany(featureBullets, index, 3),
      closing: pick(closings, index),
      footer1: pick(footerPromo, index),
      footer2: pick(footerUnsub, index)
    };
  }, [index]);

  const Layout = layouts[index % layouts.length];

  const subjectFor = (seed, c) => {
    const p = pick(subjPrefix, seed);
    const v = pick(subjValue, seed + 7);
    const a = pick(subjAction, seed + 13);
    const u = pick(subjUrgency, seed + 19);
    // tie to headline subtly
    const hook = sanitize(c.headline.replace(/DETECTED|CONFIRMED|GRANTED|UNLOCKED/gi, "").trim());
    return sanitize(`${p} ${v}: ${hook} | ${a} (${u})`);
  };

  const generate50Subjects = () => {
    const list = Array.from({ length: 50 }, (_, i) => subjectFor(i + index * 3, content));
    setSubjects(list);
  };

  const exportSubjectsTXT = () => {
    if (!subjects.length) return;
    downloadText("subjects.txt", subjects.join("\n"));
  };

  const exportSubjectsCSV = () => {
    if (!subjects.length) return;
    const rows = [["Subject Line"], ...subjects.map((s) => [s])];
    downloadCSV("subjects.csv", rows);
  };

  // Google Sheets “works” = importable CSV + matching image names
  const exportSheetsIndexCSV = () => {
    if (!subjects.length) return;
    const rows = [["Template #", "Subject Line", "Image Filename"]];
    subjects.slice(0, 10).forEach((s, i) => {
      rows.push([String(i + 1), s, `email-${i + 1}.png`]);
    });
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
      // allow React to render
      await sleep(250);
      if (!previewRef.current) continue;

      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `email-${i + 1}.png`;
      a.click();
      await sleep(200);
    }

    setIndex(start);
    setIsBatching(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button disabled={isBatching} onClick={() => setIndex((i) => Math.max(0, i - 1))}>Prev</button>
        <button disabled={isBatching} onClick={() => setIndex((i) => i + 1)}>Next</button>

        <button disabled={isBatching} onClick={downloadCurrentImage}>Download Image</button>
        <button disabled={isBatching} onClick={download10Images}>Download 10 Images</button>

        <button disabled={isBatching} onClick={generate50Subjects}>Generate 50 Subjects</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSubjectsTXT}>Export TXT</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSubjectsCSV}>Export CSV</button>
        <button disabled={!subjects.length || isBatching} onClick={exportSheetsIndexCSV}>Sheets Index CSV</button>

        <span style={{ marginLeft: 10, opacity: 0.7 }}>
          Template #{index + 1} (Layout {(index % layouts.length) + 1})
        </span>
      </div>

      {subjects.length > 0 && (
        <div style={{ marginTop: 14, maxWidth: 900 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Subjects (first 10 shown)</div>
          <ol style={{ marginTop: 0 }}>
            {subjects.slice(0, 10).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}

      <div ref={previewRef} style={{ marginTop: 24 }}>
        <Layout {...content} />
      </div>
    </div>
  );
}
