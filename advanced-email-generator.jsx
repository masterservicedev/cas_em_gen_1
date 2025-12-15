import React, { useState, useRef, useMemo } from "react";
import html2canvas from "html2canvas";

/* =========================
   SPINTAX ENGINE
========================= */

function expandSpintax(str, seed = Math.random()) {
  let i = 0;
  return str.replace(/\{([^{}]+)\}/g, (_, group) => {
    const options = group.split("|");
    const pick =
      options[Math.floor(((seed + i++) * 997) % options.length)];
    return pick;
  });
}

/* =========================
   SUBJECT LIBRARY (SPINTAX)
========================= */

const SPINTAX_SUBJECTS = [
  "Fwd: {Have you heard this yet?|Did you hear?|Have you seen this?|This just came out!}",
  "{You won’t believe what’s inside|Wait until you see this|This is shocking|Unreal content inside}",
  "{Only for|Just for|Exclusively for} {sharp eyes|the curious ones|those who notice|true observers} 👀",
  "Re: {Don’t open this…|Avoid this email…|Only click if you're brave}",
  "{A secret|Something hidden|A mystery} {just surfaced|is finally revealed}",
  "Fwd: {Something big is happening|A major shift is coming} {behind the scenes|right now}",
  "{Hidden in plain sight…|Right under your nose|You’ve seen it—but didn’t see it}",
  "🔥 {Only for those who notice|Not for everyone|Rare opportunity}",
  "📆 {Here today, gone tomorrow|Vanishing soon|This won’t last}",
  "{This isn’t random|Specifically chosen|Made just for you}",
  // you can keep extending this list safely
];

/* =========================
   CONTENT LIBRARY
========================= */

const greetings = [
  "Greetings,",
  "Hello,",
  "Hi there,",
  "Welcome back,",
  "Checking in with a quick note,"
];

const headlines = [
  "THE VIP RED CARPET WELCOME",
  "EXCLUSIVE PLAYER BENEFITS UNLOCKED",
  "SYSTEM UPGRADE DETECTED",
  "HIGH ROLLER ACCESS GRANTED",
  "YOUR PREMIUM OFFER IS READY"
];

const subheadlines = [
  "Boost your bankroll with added value today",
  "Limited-time rewards for active players",
  "Extra playtime is waiting inside",
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
  ]
];

const featureTitles = [
  "Why Play With Us?",
  "What’s Included",
  "Your Player Benefits"
];

const featureBullets = [
  "Fast and reliable payouts",
  "Hundreds of premium games",
  "24/7 customer support",
  "Secure and trusted platform",
  "Exclusive player promotions"
];

const closings = [
  "Enjoy your play,",
  "Best of luck,",
  "Happy gaming,"
];

const footerPromo = [
  "This is a promotional offer. Please play responsibly.",
  "Limited-time promotion. Play responsibly."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here.",
  "You may unsubscribe at any time using this link."
];

/* =========================
   HELPERS
========================= */

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

/* =========================
   SUBJECT GENERATOR
========================= */

function subjectFor(seed, content) {
  const useSpintax = seed % 3 !== 0;

  if (useSpintax) {
    const base =
      SPINTAX_SUBJECTS[seed % SPINTAX_SUBJECTS.length];
    return expandSpintax(base, seed).trim();
  }

  const structured = [
    "Exclusive update just dropped",
    "Something new worth seeing",
    "A change you’ll want to notice",
    "This wasn’t meant to be shared",
    "Only a few will catch this"
  ];

  return structured[seed % structured.length];
}

/* =========================
   COMPONENT
========================= */

export default function AdvancedEmailGenerator() {
  const previewRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const content = useMemo(() => {
    return {
      greeting: rand(greetings),
      headline: rand(headlines),
      subheadline: rand(subheadlines),
      body: rand(bodyFlows),
      featureTitle: rand(featureTitles),
      features: pickMany(featureBullets, 3),
      closing: rand(closings),
      footer1: rand(footerPromo),
      footer2: rand(footerUnsub)
    };
  }, [index]);

  const generateSubjects = () => {
    const list = Array.from({ length: 100 }, (_, i) =>
      subjectFor(i + index * 17, content)
    );
    setSubjects(list);
  };

  const downloadImage = async (count = 1) => {
    if (!previewRef.current) return;
    for (let i = 0; i < count; i++) {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `email-${Date.now()}-${i + 1}.png`;
      a.click();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Email Generator</h2>

      <button onClick={() => setIndex(index + 1)}>Next Template</button>
      <button onClick={generateSubjects}>Generate 100 Subjects</button>
      <button onClick={() => downloadImage(10)}>Download 10 Images</button>

      <div ref={previewRef} style={{ marginTop: 20, padding: 20, border: "1px solid #ccc" }}>
        <h1>{content.headline}</h1>
        <h3>{content.subheadline}</h3>
        <p>{content.greeting}</p>

        {content.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h4>{content.featureTitle}</h4>
        <ul>
          {content.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <p>{content.closing}</p>
        <small>{content.footer1}</small><br />
        <small>{content.footer2}</small>
      </div>

      <pre style={{ marginTop: 20, maxHeight: 300, overflow: "auto" }}>
        {subjects.join("\n")}
      </pre>
    </div>
  );
}
