import React, { useState, useRef, useMemo } from "react";
import html2canvas from "html2canvas";

/* -------------------- CONTENT LIBRARY -------------------- */

const greetings = [
  "Greetings,",
  "Hello,",
  "Hi there,",
  "Hey,",
  "Hope all is well,",
  "Trust this finds you well,",
  "Good day,",
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
  "This is a promotional offer. Please play responsibly."
];

const footerUnsub = [
  "If you no longer wish to receive these emails, please unsubscribe here."
];

/* -------------------- HELPERS -------------------- */

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

/* -------------------- COMPONENT -------------------- */

export default function AdvancedEmailGenerator() {
  const previewRef = useRef(null);
  const [index, setIndex] = useState(0);

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

  const layouts = [
    (c) => (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, border: "1px solid #ddd" }}>
        <h1>{c.headline}</h1>
        <h3>{c.subheadline}</h3>
        <p>{c.greeting}</p>
        {c.body.map((p, i) => <p key={i}>{p}</p>)}
        <h4>{c.featureTitle}</h4>
        <ul>{c.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
        <p>{c.closing}</p>
        <small>{c.footer1}</small><br />
        <small>{c.footer2}</small>
      </div>
    )
  ];

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
      <button onClick={() => setIndex(index + 1)}>Next</button>
      <button onClick={() => downloadImage(10)}>Download 10 Images</button>

      <div ref={previewRef} style={{ marginTop: 20 }}>
        {layouts[index % layouts.length](content)}
      </div>
    </div>
  );
}
