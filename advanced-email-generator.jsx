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

const featureTitles = [
  "Your Player Benefits",
  "What’s Included",
  "Why Play With Us?"
];

const featureBullets = [
  "Fast and reliable payouts",
  "Hundreds of premium games",
  "24/7 customer support",
  "Secure and trusted platform",
  "Exclusive player promotions",
  "Mobile-friendly gameplay"
];

const closings = [
  "Happy gaming,",
  "Best of luck,",
  "Enjoy your play,"
];

const footerPromo = [
  "This is a promotional offer. Please play responsibly.",
  "Promotional content. Always play within your limits."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here.",
  "You can unsubscribe from future emails here."
];

/* ================= HELPERS ================= */

const pick = (arr, seed) => arr[seed % arr.length];
const pickMany = (arr, seed, n) =>
  [...arr]
    .sort((a, b) => (a > b ? 1 : -1))
    .slice(seed % (arr.length - n), seed % (arr.length - n) + n);

/* ================= LAYOUTS ================= */

const layouts = [
  // 1. Classic
  (c) => (
    <EmailShell>
      <h1>{c.headline}</h1>
      <h3>{c.subheadline}</h3>
      <p>{c.greeting}</p>
      {c.body.map((p, i) => <p key={i}>{p}</p>)}
      <h4>{c.featureTitle}</h4>
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <p>{c.closing}</p>
      <Footer c={c} />
    </EmailShell>
  ),

  // 2. Editorial
  (c) => (
    <EmailShell>
      <small>EDITORIAL</small>
      <h1>{c.headline}</h1>
      {c.body.map((p, i) => <p key={i}>{p}</p>)}
      <Footer c={c} />
    </EmailShell>
  ),

  // 3. Newsletter
  (c) => (
    <EmailShell>
      <h2>{c.headline}</h2>
      <p><strong>{c.subheadline}</strong></p>
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <Footer c={c} />
    </EmailShell>
  ),

  // 4. Minimal
  (c) => (
    <EmailShell>
      <h2>{c.headline}</h2>
      <p>{c.body[0]}</p>
      <Footer c={c} />
    </EmailShell>
  ),

  // 5. Feature-led
  (c) => (
    <EmailShell>
      <h1>{c.headline}</h1>
      <h4>{c.featureTitle}</h4>
      <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <Footer c={c} />
    </EmailShell>
  ),

  // 6–10 reuse structure but will diverge visually later
  (c) => layouts[0](c),
  (c) => layouts[1](c),
  (c) => layouts[2](c),
  (c) => layouts[3](c),
  (c) => layouts[4](c)
];

/* ================= COMPONENT ================= */

export default function AdvancedEmailGenerator() {
  const [index, setIndex] = useState(0);
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

  const downloadImage = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `email-${index + 1}.png`;
    a.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setIndex(i => i + 1)}>Next</button>
      <button onClick={() => setIndex(i => Math.max(0, i - 1))}>Prev</button>
      <button onClick={downloadImage}>Download Image</button>

      <div ref={previewRef} style={{ marginTop: 30 }}>
        <Layout {...content} />
      </div>
    </div>
  );
}

/* ================= SHARED ================= */

function EmailShell({ children }) {
  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      padding: 24,
      border: "1px solid #ddd",
      background: "#fff"
    }}>
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
