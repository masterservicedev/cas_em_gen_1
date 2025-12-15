import React, { useState, useRef } from 'react';
import { Download, Mail, Wand2, Image as ImageIcon, FileText, Shuffle, FileSpreadsheet, Sheet } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function AdvancedEmailGenerator() {
  const [formData, setFormData] = useState({
    brandName: 'CASINO BRAND',
    bonusAmount: '500',
    freeSpins: '50',
    gameName: 'Starburst',
    reloadPercent: '50',
    validDays: '7',
    depositBonus: '200',
    tagline: 'WHERE WINNERS PLAY'
  });

  const [currentVariation, setCurrentVariation] = useState(0);
  const [generatedSubjects, setGeneratedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchDownloading, setBatchDownloading] = useState(false);
  const previewRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Greetings
  const greetings = [
    "Greetings,", "Hello,", "Hi,", "Hey,", "Hi there,",
    "Hope you're doing well,", "Good day,", "Warm greetings,",
    "Welcome back,", "Great to connect,", "Quick hello,",
    "Reaching out today,", "Checking in,", "Hope all is well,"
  ];

  // MASSIVE CONTENT LIBRARY
  const content = {
    headlines: [
      "THE VIP RED CARPET WELCOME", "YOUR EXCLUSIVE BONUS AWAITS", "PREMIUM PLAYER PACKAGE ACTIVATED",
      "HIGH ROLLER ACCESS GRANTED", "SYSTEM UPGRADE DETECTED", "WELCOME TO THE WINNERS CIRCLE",
      "ELITE MEMBER BONUS UNLOCKED", "YOUR PREMIUM OFFER IS READY", "EXCLUSIVE RELOAD BONUS AWAITS",
      "NEW PLAYER PACK DETECTED", "VIP STATUS CONFIRMED", "LUXURY GAMING EXPERIENCE",
      "JACKPOT HUNTER'S WELCOME", "FIRST CLASS GAMING AWAITS", "ROYAL TREATMENT ACTIVATED",
      "MEGA BONUS PACKAGE READY", "PREMIUM ACCESS GRANTED", "YOUR WINNING STREAK STARTS HERE",
      "EXCLUSIVE OFFER UNLOCKED", "HIGH STAKES WELCOME BONUS"
    ],
    subheadlines: [
      "Get Up to 50% Extra on Your Next Deposit!", "Plus Free Spins on Premium Slots!",
      "Limited Time Offer for Elite Players", "Double Your Playing Power Today",
      "Claim Your Welcome Package Now", "Exclusive Benefits Start Immediately",
      "Unlock Massive Winning Potential", "Your Journey to Big Wins Begins",
      "Premium Rewards Await Inside", "Experience True VIP Treatment",
      "Boost Your Bankroll Instantly", "More Games, More Wins, More Fun"
    ],
    intros: [
      "We've added a free spins offer to your account, available on selected games for a limited time.",
      "Your account has been credited with complimentary spins on our most popular titles.",
      "Exclusive free spins are now active on your account - ready when you are.",
      "We're thrilled to welcome you with an exceptional bonus package designed for serious players.",
      "Your VIP experience starts now with our exclusive welcome offer.",
      "Get ready for the red carpet treatment with our premium welcome bonus.",
      "If you're planning another visit, we've prepared a reload bonus that adds value to your next session.",
      "We appreciate your loyalty - here's a special reload offer just for returning players.",
      "Your next deposit comes with a boost. We value your continued play.",
      "Ready for another round? We're adding extra value to your next deposit."
    ],
    bodies: [
      "It's a relaxed way to explore new titles without changing how you usually play. Simply log in, choose the eligible game, and enjoy the spins.",
      "Dive into exciting gameplay at no extra cost. Just log in, pick your game, and start spinning.",
      "Your first deposit instantly qualifies you for the ultimate bonus package. Don't wait, this offer is strictly limited.",
      "Claim your bonus now and experience what separates us from the rest. This premium offer won't last long.",
      "It's available on selected deposits and can be used across popular games on the platform, from high-stakes tables to thrilling slots.",
      "Use it on your favorite games - whether that's table games, slots, or live casino.",
      "Join our community of winners and maximize your playing power from day one.",
      "This is your chance to play big with extra funds. Limited time offer for new members only."
    ],
    features: [
      "Exclusive High-Roller Jackpots", "Instant Payouts & 24/7 Support",
      "Play Hundreds of Premium Slots & Table Games", "Lightning-Fast Withdrawals",
      "Dedicated VIP Account Manager", "Weekly Reload Bonuses",
      "Cashback on Every Bet", "Live Dealer Tables 24/7",
      "Exclusive Tournament Access", "Loyalty Rewards Program"
    ],
    footers1: [
      "This is a promotional offer. Please play responsibly.",
      "Promotional offer. Play responsibly and within your limits.",
      "Limited time promotional offer. Always gamble responsibly.",
      "Special promotional offer. Remember to play responsibly.",
      "Exclusive promotional offer. Play responsibly at all times."
    ],
    footers2: [
      "If you no longer wish to receive these emails, please unsubscribe here.",
      "To stop receiving these emails, please unsubscribe here.",
      "You can unsubscribe from these emails at any time here.",
      "Don't want these emails? Unsubscribe here.",
      "To opt out of future emails, unsubscribe here."
    ],
    closings: ["Best of luck,", "Good luck and enjoy,", "Wishing you winning spins,", "Happy gaming,", "Enjoy the action,"]
  };

  const colorSchemes = [
    { primary: '#d4af37', secondary: '#1a1a1a', accent: '#2d2d2d', text: '#ffffff' },
    { primary: '#ff0000', secondary: '#000000', accent: '#1a0000', text: '#ffffff' },
    { primary: '#00ffff', secondary: '#0a192f', accent: '#172a45', text: '#ffffff' },
    { primary: '#9d00ff', secondary: '#1e0533', accent: '#2d1654', text: '#ffffff' },
    { primary: '#00ff00', secondary: '#0d1117', accent: '#1d2127', text: '#ffffff' },
    { primary: '#ff1493', secondary: '#1a1a2e', accent: '#16213e', text: '#ffffff' },
    { primary: '#ffa500', secondary: '#2c3e50', accent: '#34495e', text: '#ffffff' },
    { primary: '#4ecdc4', secondary: '#1a2332', accent: '#2d3e50', text: '#ffffff' },
    { primary: '#ff6b6b', secondary: '#0a0a0a', accent: '#1a1a1a', text: '#ffffff' },
    { primary: '#f39c12', secondary: '#000000', accent: '#1a1a1a', text: '#ffffff' }
  ];

  const generateTemplate = (index, colors) => {
    const greeting = randomChoice(greetings);
    const headline = randomChoice(content.headlines);
    const subheadline = randomChoice(content.subheadlines);
    const intro = randomChoice(content.intros);
    const body = randomChoice(content.bodies);
    const closing = randomChoice(content.closings);
    const footer1 = randomChoice(content.footers1);
    const footer2 = randomChoice(content.footers2);
    const feat1 = randomChoice(content.features);
    const feat2 = randomChoice(content.features);
    const feat3 = randomChoice(content.features);

    const templates = [
      // TEMPLATE 1: Classic Centered
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
        <tr><td align="center" style="padding: 0;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
            <tr><td style="padding: 30px; text-align: center; border-bottom: 3px solid ${colors.primary};">
              <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 32px; letter-spacing: 2px; color: ${colors.text};">${formData.brandName}</h1>
            </td></tr>
            <tr><td style="padding: 40px 30px;">
              <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 18px; margin-bottom: 20px;">${greeting}</p>
              <p style="color: ${colors.text}; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">${intro}</p>
              <p style="color: ${colors.text}; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 30px;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 40px 0;">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.secondary}; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">LOG IN & PLAY NOW</a>
                </td>
              </tr></table>
              <p style="margin: 20px 0 5px; color: ${colors.text}; font-family: Arial, sans-serif;">${closing}</p>
            </td></tr>
            <tr><td style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #999999; text-align: center; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 2: VIP Styled
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
        <tr><td align="center" style="padding: 0;">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background-color: #000000; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 36px; letter-spacing: 3px; color: ${colors.primary};">${formData.brandName}</h1>
              <p style="margin: 10px 0 0; font-size: 14px; letter-spacing: 2px; color: #999999; font-family: Arial, sans-serif;">${formData.tagline}</p>
            </td></tr>
            <tr><td style="background-color: ${colors.secondary}; padding: 50px 30px; text-align: center;">
              <h2 style="font-size: 28px; margin: 0 0 10px; color: ${colors.text}; font-family: Arial, sans-serif;">${headline}</h2>
              <h2 style="font-size: 28px; margin: 0 0 20px; color: ${colors.text}; font-family: Arial, sans-serif;">UP TO <span style="color: ${colors.primary}; font-size: 42px;">$${formData.bonusAmount} BONUS</span></h2>
              <p style="font-size: 18px; margin: 0 0 40px; color: ${colors.text}; font-family: Arial, sans-serif;">${subheadline}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #000000; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">CLAIM YOUR BONUS NOW</a>
                </td>
              </tr></table>
              <div style="background-color: rgba(255,0,0,0.3); padding: 30px; margin: 40px 0; border-radius: 5px;">
                <h3 style="margin: 0 0 20px; font-size: 22px; color: ${colors.text}; font-family: Arial, sans-serif;">Why Choose ${formData.brandName}?</h3>
                <p style="color: ${colors.text}; font-family: Arial, sans-serif; font-size: 14px; padding: 8px 0; text-align: left; margin: 5px 0;">• ${feat1}</p>
                <p style="color: ${colors.text}; font-family: Arial, sans-serif; font-size: 14px; padding: 8px 0; text-align: left; margin: 5px 0;">• ${feat2}</p>
                <p style="color: ${colors.text}; font-family: Arial, sans-serif; font-size: 14px; padding: 8px 0; text-align: left; margin: 5px 0;">• ${feat3}</p>
              </div>
              <p style="font-size: 14px; margin: 20px 0; color: ${colors.text}; font-family: Arial, sans-serif;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #000000; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">ACCESS FREE SPINS</a>
                </td>
              </tr></table>
            </td></tr>
            <tr><td style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #999999; text-align: center; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 3: Modern Card
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr><td style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 32px; letter-spacing: 2px; color: #ffffff;">${formData.brandName}</h1>
            </td></tr>
            <tr><td style="padding: 40px 30px; background-color: #ffffff;">
              <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 18px; margin-bottom: 20px; font-weight: bold;">${greeting}</p>
              <p style="color: #333333; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 20px;">${intro}</p>
              <p style="color: #555555; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 30px;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 20px 0;">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 50px;">GET STARTED</a>
                </td>
              </tr></table>
              <p style="margin: 20px 0 5px; color: #333333; font-family: Arial, sans-serif;">${closing}</p>
            </td></tr>
            <tr><td style="background-color: #f8f8f8; padding: 20px 30px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">
              <p style="margin: 5px 0;">© 2024 ${formData.brandName}. All rights reserved.</p>
              <p style="margin: 15px 0 5px; color: #666666;">${footer1}</p>
              <p style="margin: 5px 0; color: #666666;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 4: Split Design
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td colspan="2" style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 2px solid ${colors.primary};">
              <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 28px; letter-spacing: 2px; color: ${colors.primary};">${formData.brandName}</h1>
            </td></tr>
            <tr>
              <td width="300" style="background-color: ${colors.primary}; padding: 50px 25px; vertical-align: middle;">
                <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: ${colors.secondary}; font-weight: bold;">$${formData.bonusAmount}</h1>
                <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.secondary};">BONUS OFFER</p>
              </td>
              <td width="300" style="background-color: ${colors.accent}; padding: 50px 25px; vertical-align: middle;">
                <h2 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #ffffff;">+${formData.freeSpins} FREE SPINS</h2>
                <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #cccccc;">on ${formData.gameName}</p>
              </td>
            </tr>
            <tr><td colspan="2" style="background-color: ${colors.secondary}; padding: 40px 30px;">
              <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">${greeting}</p>
              <p style="color: ${colors.text}; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">${intro}</p>
              <p style="color: ${colors.text}; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 30px;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 30px 0;">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.secondary}; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif;">CLAIM NOW</a>
                </td>
              </tr></table>
              <p style="margin: 0; color: #cccccc; font-family: Arial, sans-serif;">${closing}</p>
            </td></tr>
            <tr><td colspan="2" style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #999999; text-align: center; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 5: Minimalist
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
        <tr><td align="center" style="padding: 60px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="border-left: 4px solid ${colors.primary}; padding: 0 0 0 30px;">
              <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 28px; color: #333333;">${formData.brandName}</h1>
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">${formData.tagline}</p>
            </td></tr>
            <tr><td style="padding: 40px 0;">
              <p style="color: #333333; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">${greeting}</p>
              <p style="color: #555555; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 20px;">${intro}</p>
              <p style="color: #666666; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 30px;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f8f8; margin: 30px 0;">
                <tr><td style="padding: 30px; text-align: center;">
                  <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold; color: ${colors.primary};">$${formData.bonusAmount}</p>
                  <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Welcome Bonus</p>
                </td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 20px 0;">
                  <a href="#" style="display: inline-block; background-color: #333333; color: #ffffff; padding: 15px 50px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">Activate Bonus</a>
                </td>
              </tr></table>
              <p style="margin: 30px 0 5px; color: #333333; font-family: Arial, sans-serif;">${closing}</p>
            </td></tr>
            <tr><td style="background-color: #f8f8f8; padding: 20px 30px; font-size: 12px; color: #999999; text-align: center; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0; color: #666666;">${footer1}</p>
              <p style="margin: 5px 0; color: #666666;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 6: Newsletter Style
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5;">
        <tr><td align="center" style="padding: 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
            <tr><td style="background-color: ${colors.primary}; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #ffffff;">${formData.brandName} NEWSLETTER</h1>
            </td></tr>
            <tr><td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; font-family: Arial, sans-serif; font-size: 26px; color: ${colors.primary};">${headline}</h2>
              <p style="color: #666666; font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 20px;">${greeting}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="background-color: #f9f9f9; padding: 20px; vertical-align: top;">
                    <h3 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #333333;">Featured Offer</h3>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${intro}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: #f9f9f9; padding: 20px; vertical-align: top;">
                    <h3 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #333333;">Quick Details</h3>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${body}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 30px 0;">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 4px;">CLAIM OFFER</a>
                </td>
              </tr></table>
            </td></tr>
            <tr><td style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999999; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 7: Editorial Style
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding: 40px 30px 20px;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">${formData.brandName}</p>
            </td></tr>
            <tr><td style="padding: 0 30px;">
              <h1 style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 32px; color: #222222; line-height: 1.3;">${headline}</h1>
              <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 16px; color: ${colors.primary}; font-weight: bold;">${subheadline}</p>
            </td></tr>
            <tr><td style="height: 200px; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);"></td></tr>
            <tr><td style="padding: 30px;">
              <p style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 16px; color: #333333; line-height: 1.8; font-style: italic;">${greeting}</p>
              <p style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 16px; color: #444444; line-height: 1.8;">${intro}</p>
              <p style="margin: 0 0 30px; font-family: Georgia, serif; font-size: 16px; color: #444444; line-height: 1.8;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center">
                  <a href="#" style="display: inline-block; background-color: #222222; color: #ffffff; padding: 15px 50px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">Read More</a>
                </td>
              </tr></table>
            </td></tr>
            <tr><td style="border-top: 1px solid #e0e0e0; padding: 20px 30px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 8: Magazine Style
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
        <tr><td align="center" style="padding: 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background-color: #ffffff; padding: 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="70%" style="vertical-align: middle;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 36px; color: ${colors.primary}; font-weight: 900;">${formData.brandName}</h1>
                  </td>
                  <td width="30%" style="text-align: right; vertical-align: middle;">
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">ISSUE #${Math.floor(Math.random() * 100) + 1}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 60px 30px; text-align: center;">
              <h2 style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 28px; color: #ffffff; font-weight: 900; text-transform: uppercase;">${headline}</h2>
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${subheadline}</p>
            </td></tr>
            <tr><td style="background-color: #ffffff; padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="30%" style="background-color: ${colors.primary}; padding: 30px 15px; text-align: center; vertical-align: middle;">
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: #ffffff; font-weight: bold;">$${formData.bonusAmount}</p>
                  </td>
                  <td width="5%"></td>
                  <td width="65%" style="vertical-align: middle;">
                    <p style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6;">${intro}</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${body}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" style="padding: 30px 0 10px;">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase;">GET STARTED</a>
                </td>
              </tr></table>
            </td></tr>
            <tr><td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 9: Coupon/Ticket Style
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f0f0;">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 3px dashed ${colors.primary};">
            <tr><td style="padding: 30px; text-align: center;">
              <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 32px; color: ${colors.primary}; font-weight: 900; text-transform: uppercase;">${formData.brandName}</h1>
              <p style="margin: 0 0 30px; font-family: Arial, sans-serif; font-size: 14px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Exclusive Bonus Coupon</p>
              <div style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 40px; margin: 0 0 30px;">
                <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #ffffff; font-weight: bold;">BONUS CODE</p>
                <p style="margin: 0 0 20px; font-family: 'Courier New', monospace; font-size: 32px; color: #ffffff; font-weight: bold; letter-spacing: 4px;">VIP${Math.floor(Math.random() * 9000) + 1000}</p>
                <p style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: #ffffff; font-weight: 900;">$${formData.bonusAmount}</p>
                <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">WELCOME BONUS</p>
              </div>
              <p style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6;">${intro}</p>
              <p style="margin: 0 0 30px; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center">
                  <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; text-transform: uppercase; border-radius: 4px;">REDEEM NOW</a>
                </td>
              </tr></table>
              <p style="margin: 30px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">Valid for ${formData.validDays} days • Terms apply</p>
            </td></tr>
            <tr><td style="border-top: 3px dashed ${colors.primary}; padding: 20px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`,

      // TEMPLATE 10: Timeline/Stages Style
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%);">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding: 30px; text-align: center;">
              <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 42px; color: ${colors.primary}; font-weight: 900; text-transform: uppercase; font-style: italic; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${headline}</h1>
              <p style="margin: 0 0 40px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${subheadline}</p>
            </td></tr>
            <tr><td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2); border-radius: 10px;">
                <tr><td style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="30%" style="vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.primary}; font-weight: bold;">STAGE 1:</p>
                      </td>
                      <td width="70%" style="text-align: right; vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${formData.depositBonus}% Bonus on First Deposit</p>
                      </td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="30%" style="vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.primary}; font-weight: bold;">STAGE 2:</p>
                      </td>
                      <td width="70%" style="text-align: right; vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${formData.freeSpins} Free Spins on ${formData.gameName}</p>
                      </td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="30%" style="vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.primary}; font-weight: bold;">STAGE 3:</p>
                      </td>
                      <td width="70%" style="text-align: right; vertical-align: middle;">
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">100% Reload to $${formData.bonusAmount}</p>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="padding: 0 30px 30px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center">
                  <a href="#" style="display: inline-block; background: linear-gradient(90deg, ${colors.primary} 0%, #ffffff 100%); color: ${colors.secondary}; padding: 18px 60px; text-decoration: none; font-weight: bold; font-size: 18px; font-family: Arial, sans-serif; text-transform: uppercase; border-radius: 50px; box-shadow: 0 0 20px rgba(255,255,255,0.3);">PRESS START TO PLAY</a>
                </td>
              </tr></table>
            </td></tr>
            <tr><td style="padding: 20px 30px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.6); font-family: Arial, sans-serif;">
              <p style="margin: 5px 0;">${footer1}</p>
              <p style="margin: 5px 0;">${footer2.replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>`
    ];

    return templates[index % 10];
  };

  const getAllVariations = () => {
    const variations = [];
    for (let i = 0; i < 50; i++) {
      const colors = colorSchemes[i % 10];
      variations.push({
        id: i,
        colors,
        html: generateTemplate(i, colors)
      });
    }
    return variations;
  };

  const variations = getAllVariations();

  const generate50Subjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: `Generate 50 unique, compelling email subject lines for casino promotional emails. Mix different styles. Make them short (under 60 characters), varied, and professional. Return ONLY the 50 subject lines numbered 1-50, nothing else.`
          }]
        })
      });

      const data = await response.json();
      const subjects = data.content[0].text.split('\n').filter(line => line.trim());
      setGeneratedSubjects(subjects);
    } catch (error) {
      setGeneratedSubjects(["Error generating subjects."]);
    }
    setLoading(false);
  };

  const downloadAsImage = async () => {
    if (!previewRef.current) return;
    try {
      const canvas = await html2canvas(previewRef.current, { backgroundColor: '#ffffff', scale: 2 });
      const link = document.createElement('a');
      link.download = `email-${currentVariation + 1}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert("Error generating image.");
    }
  };

  const downloadAsHTML = () => {
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${formData.brandName}</title></head>
<body style="margin: 0; padding: 0;">${variations[currentVariation].html}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${currentVariation + 1}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const download10Random = async () => {
    setBatchDownloading(true);
    const indices = [];
    while (indices.length < 10) {
      const r = Math.floor(Math.random() * 50);
      if (!indices.includes(r)) indices.push(r);
    }

    for (let i = 0; i < 10; i++) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = variations[indices[i]].html;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      try {
        const canvas = await html2canvas(tempDiv, { backgroundColor: '#ffffff', scale: 2 });
        const link = document.createElement('a');
        link.download = `email-batch-${i + 1}-template-${indices[i] + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        await new Promise(r => setTimeout(r, 500));
      } catch (e) {}
      document.body.removeChild(tempDiv);
    }
    setBatchDownloading(false);
  };

  const exportTXT = () => {
    const blob = new Blob([generatedSubjects.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `subjects-${Date.now()}.txt`;
    a.click();
  };

  const exportCSV = () => {
    const csv = 'Subject Line\n' + generatedSubjects.map(s => `"${s}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `subjects-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
          <Mail size={48} style={{ marginBottom: '15px' }} />
          <h1 style={{ fontSize: '36px', margin: '0 0 10px' }}>Casino Email Generator Pro</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>10 Layouts • 50 Templates • Batch Export • AI Subjects</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', height: 'fit-content' }}>
            <h2 style={{ marginTop: 0, color: '#333', fontSize: '20px', borderBottom: '2px solid #667eea', paddingBottom: '15px' }}>Settings</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Bonus ($)</label>
                <input type="text" name="bonusAmount" value={formData.bonusAmount} onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Free Spins</label>
                <input type="text" name="freeSpins" value={formData.freeSpins} onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <h3 style={{ marginTop: 0, color: '#333', fontSize: '16px', marginBottom: '15px' }}>Navigation</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button onClick={() => setCurrentVariation(Math.max(0, currentVariation - 1))}
                  style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>← Prev</button>
                <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {currentVariation + 1}/50
                </div>
                <button onClick={() => setCurrentVariation(Math.min(49, currentVariation + 1))}
                  style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next →</button>
              </div>
              <button onClick={() => setCurrentVariation(Math.floor(Math.random() * 50))}
                style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Shuffle size={18} />Random
              </button>
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <h3 style={{ marginTop: 0, color: '#333', fontSize: '16px', marginBottom: '15px' }}>Export</h3>
              <button onClick={downloadAsImage}
                style={{ width: '100%', padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                <ImageIcon size={18} />PNG
              </button>
              <button onClick={downloadAsHTML}
                style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                <FileText size={18} />HTML
              </button>
              <button onClick={download10Random} disabled={batchDownloading}
                style={{ width: '100%', padding: '12px', background: batchDownloading ? '#ccc' : '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: batchDownloading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Download size={18} />{batchDownloading ? 'Downloading...' : '10 Random'}
              </button>
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <button onClick={generate50Subjects} disabled={loading}
                style={{ width: '100%', padding: '12px', background: loading ? '#ccc' : '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Wand2 size={18} />{loading ? 'Generating...' : 'Generate 50 Subjects'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <h2 style={{ marginTop: 0, color: '#333', fontSize: '24px', borderBottom: '2px solid #667eea', paddingBottom: '15px', marginBottom: '20px' }}>
                Template {currentVariation + 1} - Layout {(currentVariation % 10) + 1}
              </h2>
              <div ref={previewRef} style={{ border: '3px solid #667eea', borderRadius: '10px', overflow: 'hidden', background: '#ffffff' }}
                dangerouslySetInnerHTML={{ __html: variations[currentVariation].html }} />
            </div>

            {generatedSubjects.length > 0 && (
              <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #667eea', paddingBottom: '15px' }}>
                  <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>Subject Lines (50)</h2>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={exportTXT}
                      style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>TXT</button>
                    <button onClick={exportCSV}
                      style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>CSV</button>
                  </div>
                </div>
                <div style={{ maxHeight: '400px', overflow: 'auto', background: '#f8f9fa', borderRadius: '8px', padding: '20px' }}>
                  {generatedSubjects.map((s, i) => (
                    <div key={i} style={{ padding: '12px', marginBottom: '10px', background: 'white', borderRadius: '6px', borderLeft: '4px solid #667eea', fontSize: '14px' }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
