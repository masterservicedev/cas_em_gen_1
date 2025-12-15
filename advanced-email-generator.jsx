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

  // Greeting variations with randomization logic
  const greetingTemplates = [
    "Greetings,",
    "Hello,",
    "Hi,",
    "Hey,",
    "Hi there,",
    () => randomChoice([
      `It's ${randomChoice(['great', 'wonderful', 'a pleasure', 'fantastic', 'truly nice'])} to ${randomChoice(['connect', 'reach out', 'get in touch', 'start a conversation', 'open communication'])},`
    ]),
    () => `I ${randomChoice(['wanted', 'thought', 'felt the need', 'decided'])} to ${randomChoice(['send you', 'share with you', 'write you', 'drop you'])} a ${randomChoice(['quick', 'short', 'brief', 'concise'])} ${randomChoice(['note', 'message', 'update', 'line'])},`,
    () => `${randomChoice(['Appreciate', 'Thank you for', 'Grateful for', 'Sincerely appreciate'])} your ${randomChoice(['time', 'attention', 'moment'])} ${randomChoice(['today', 'right now', 'this moment'])},`,
    () => `I'm ${randomChoice(['reaching out', 'getting in touch', 'contacting you'])} with ${randomChoice(['something', 'an idea', 'a message', 'a thought'])} that might ${randomChoice(['interest you', 'catch your attention', 'be valuable'])},`,
    () => `${randomChoice(['Trusting all is going smoothly', 'Hope all is well', 'Trust this finds you well', 'Hope things are going great'])},`,
    () => `${randomChoice(['Thought I\'d check in briefly', 'Wanted to touch base', 'Dropping a quick line', 'Checking in with a brief note'])},`,
    () => `${randomChoice(['Starting with a short message', 'Opening with a brief hello', 'Let me start with a quick note', 'Kicking things off with a short greeting'])},`,
    () => `${randomChoice(['Wanted to share something with you', 'I\'ve got something worth sharing', 'Here\'s something for you', 'Bringing you a valuable insight'])},`,
    () => `${randomChoice(['You crossed my mind today', 'I thought of you recently', 'You came to mind', 'You popped into my thoughts'])},`,
    () => `${randomChoice(['Now\'s a great moment to connect', 'Perfect timing to reach out', 'This feels like the right time to connect', 'Always a good time to start a conversation'])},`,
    () => `${randomChoice(['Sharing something worth your attention', 'Passing along something useful', 'Here\'s something valuable', 'Bringing you an update worth reading'])},`,
    () => `${randomChoice(['Looking forward to your thoughts', 'Eager to hear your perspective', 'Anticipating your feedback', 'Interested in your view'])},`,
    () => `${randomChoice(['Here\'s a fresh idea for you', 'Bringing a new perspective', 'Offering a new update', 'Sharing a fresh take'])},`,
    () => `${randomChoice(['Let\'s get straight to it', 'Diving right in', 'Getting right to business', 'Starting without delay'])},`,
    () => `${randomChoice(['You might like this', 'This could interest you', 'Thought you\'d appreciate this', 'Here\'s something helpful'])},`,
    () => `${randomChoice(['Hope this adds value to your day', 'Trust this helps today', 'Wishing this brightens your day', 'Here\'s something positive for you'])},`,
    () => `${randomChoice(['Got something good for you', 'Bringing something worthwhile', 'Here\'s some good news', 'Offering something valuable'])},`,
    () => `${randomChoice(['Here\'s something you\'ll want to see', 'Something interesting for you', 'Sharing something worth a look', 'Here\'s a must-see'])},`,
    () => `${randomChoice(['Reaching out with purpose', 'Writing with intent', 'Getting in touch with a clear goal', 'Contacting you meaningfully'])},`,
    () => `${randomChoice(['Offering a fresh viewpoint', 'Sharing a different angle', 'Bringing you a new perspective', 'Presenting a new outlook'])},`,
    () => `${randomChoice(['Cutting to the chase', 'Getting right to it', 'No beating around the bush', 'Let\'s dive right in'])},`,
    () => `${randomChoice(['Contacting you with a timely update', 'Sharing something current', 'Getting in touch with relevant news', 'Bringing you something timely'])},`,
    () => `${randomChoice(['Just passing along something useful', 'Sharing a helpful tip', 'Bringing you a practical insight', 'Offering a useful note'])},`,
    () => `${randomChoice(['A short message to brighten your inbox', 'A quick hello to start things off', 'A little something for your inbox', 'A brief note for you'])},`,
    () => `${randomChoice(['Let\'s make this worth your time', 'Ensuring this is valuable for you', 'Making this message count', 'Here\'s something meaningful'])},`,
    () => `${randomChoice(['Here\'s a quick thought for today', 'Sharing a brief idea', 'Passing on an insight', 'Here\'s something to consider'])},`,
    () => `${randomChoice(['Bringing fresh content your way', 'Delivering something new', 'Offering something different', 'Here\'s something fresh to read'])},`,
    () => `${randomChoice(['Sharing a few ideas with you', 'Offering some inspiration', 'Passing on some suggestions', 'Bringing some thoughts your way'])},`,
    () => `${randomChoice(['Got a moment? This is worth it', 'If you have a moment, check this out', 'Spare a moment for this', 'Take a minute for this valuable info'])},`,
    () => `${randomChoice(['Just saying hi before we begin', 'Quick greetings before diving in', 'A short hello to start', 'A brief hello before we get into it'])},`,
    () => `${randomChoice(['A quick note that\'s worth it', 'Brief but valuable', 'Short and to the point', 'Concise and meaningful'])},`,
    () => `${randomChoice(['Opening the door to something new', 'Starting a new chapter', 'Exploring a fresh opportunity', 'Beginning a new conversation'])},`,
    () => `${randomChoice(['Offering a fresh perspective', 'Sharing something new', 'Providing a fresh view', 'Bringing new insights'])},`
  ];

  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomGreeting = () => {
    const template = randomChoice(greetingTemplates);
    return typeof template === 'function' ? template() : template;
  };

  // MASSIVE CONTENT LIBRARY
  const contentVariations = {
    headlines: [
      "THE VIP RED CARPET WELCOME",
      "YOUR EXCLUSIVE BONUS AWAITS",
      "PREMIUM PLAYER PACKAGE ACTIVATED",
      "HIGH ROLLER ACCESS GRANTED",
      "SYSTEM UPGRADE DETECTED",
      "WELCOME TO THE WINNERS CIRCLE",
      "ELITE MEMBER BONUS UNLOCKED",
      "YOUR PREMIUM OFFER IS READY",
      "EXCLUSIVE RELOAD BONUS AWAITS",
      "NEW PLAYER PACK DETECTED",
      "VIP STATUS CONFIRMED",
      "LUXURY GAMING EXPERIENCE",
      "JACKPOT HUNTER'S WELCOME",
      "FIRST CLASS GAMING AWAITS",
      "ROYAL TREATMENT ACTIVATED",
      "MEGA BONUS PACKAGE READY",
      "PREMIUM ACCESS GRANTED",
      "YOUR WINNING STREAK STARTS HERE",
      "EXCLUSIVE OFFER UNLOCKED",
      "HIGH STAKES WELCOME BONUS"
    ],
    subheadlines: [
      "Get Up to 50% Extra on Your Next Deposit!",
      "Plus Free Spins on Premium Slots!",
      "Limited Time Offer for Elite Players",
      "Double Your Playing Power Today",
      "Claim Your Welcome Package Now",
      "Exclusive Benefits Start Immediately",
      "Unlock Massive Winning Potential",
      "Your Journey to Big Wins Begins",
      "Premium Rewards Await Inside",
      "Experience True VIP Treatment",
      "Boost Your Bankroll Instantly",
      "More Games, More Wins, More Fun",
      "Join the Elite Gaming Community",
      "Unmatched Bonuses & Free Spins",
      "Your Gateway to Premium Gaming",
      "Start Winning Like Never Before",
      "Exclusive Perks Just for You",
      "Maximum Value, Maximum Excitement",
      "The Ultimate Player Experience",
      "Turn Your Deposit Into Big Wins"
    ],
    featureBoxTitles: [
      "Why Choose {brand}?",
      "What's Included:",
      "Your VIP Benefits:",
      "Exclusive Features:",
      "Premium Advantages:",
      "Member Perks:",
      "Elite Player Benefits:",
      "What Makes Us Different:",
      "Your Winning Edge:",
      "Unbeatable Advantages:"
    ],
    featureBullets: [
      "Exclusive High-Roller Jackpots",
      "Instant Payouts & 24/7 Support",
      "Play Hundreds of Premium Slots & Table Games",
      "Lightning-Fast Withdrawals",
      "Dedicated VIP Account Manager",
      "Weekly Reload Bonuses",
      "Cashback on Every Bet",
      "No Wagering Requirements on Selected Offers",
      "Mobile-Optimized for Gaming on the Go",
      "Provably Fair Gaming Technology",
      "Live Dealer Tables 24/7",
      "Exclusive Tournament Access",
      "Birthday Bonus Packages",
      "Loyalty Rewards Program",
      "Multi-Currency Support",
      "Secure SSL Encryption",
      "Game Selection from Top Providers",
      "Progressive Jackpot Networks",
      "Free Spins on New Releases",
      "Priority Customer Support",
      "Personalized Bonus Offers",
      "Early Access to New Games",
      "Enhanced Deposit Limits",
      "Faster Account Verification",
      "Special Event Invitations",
      "Monthly Prize Draws",
      "Exclusive Payment Methods",
      "Lower House Edge Games",
      "Premium Game Variants",
      "Dedicated VIP Events"
    ],
    companyAddresses: [
      "123 Casino Blvd, High Roller City, HR 90210",
      "456 Winner's Way, Fortune Bay, FB 80501",
      "789 Jackpot Lane, Lucky Springs, LS 70401",
      "321 Royal Court, King's Landing, KL 60301",
      "654 Gold Rush Road, Diamond District, DD 50201",
      "987 Victory Plaza, Champion Heights, CH 40101",
      "147 Prestige Avenue, Elite Estates, EE 30901",
      "258 Millionaire Mile, Bonus Bay, BB 20801",
      "369 Fortune Square, Vegas Vista, VV 10701",
      "741 Premium Place, Luxury Loop, LL 00601"
    ],
    stageContent: [
      { label: "STAGE 1:", text: "200% Bonus on First Deposit" },
      { label: "STAGE 2:", text: "50 Free Spins on Starburst" },
      { label: "STAGE 3:", text: "100% Reload to €2,000" },
      { label: "STEP 1:", text: "Register & Get Welcome Bonus" },
      { label: "STEP 2:", text: "Unlock Free Spins Package" },
      { label: "STEP 3:", text: "Claim Reload Rewards" },
      { label: "LEVEL 1:", text: "Starter Bonus Up to $500" },
      { label: "LEVEL 2:", text: "Premium Spins Unlocked" },
      { label: "LEVEL 3:", text: "VIP Reload Benefits" },
      { label: "PHASE 1:", text: "Welcome Package Activation" },
      { label: "PHASE 2:", text: "Bonus Spins Release" },
      { label: "PHASE 3:", text: "Loyalty Rewards Begin" },
      { label: "TIER 1:", text: "Initial Deposit Match" },
      { label: "TIER 2:", text: "Free Spins Unlocked" },
      { label: "TIER 3:", text: "Ongoing Reload Bonuses" }
    ],
    freeSpinsIntro: [
      "We've added a free spins offer to your account, available on selected games for a limited time.",
      "Your account has been credited with complimentary spins on our most popular titles.",
      "Exclusive free spins are now active on your account - ready when you are.",
      "A special free spins bonus awaits you on premium slot games.",
      "We've unlocked free spins for you on select casino favorites.",
      "Complimentary spins have been added to your balance for immediate use.",
      "Your free spins package is now available across our top-rated games.",
      "We're giving you bonus spins to explore our premium slot collection.",
      "Free spins on featured games have been credited to your account.",
      "Enjoy complimentary spins on some of the hottest titles right now.",
      "Your bonus spins are ready to use on our most popular slots.",
      "We've activated free spins on select premium games just for you.",
      "Complimentary spins await on our exclusive slot selection.",
      "Your account now includes bonus spins on top-performing games.",
      "Free spins have been unlocked on our featured slot titles."
    ],
    freeSpinsBody: [
      "It's a relaxed way to explore new titles without changing how you usually play. Simply log in, choose the eligible game, and enjoy the spins.",
      "Dive into exciting gameplay at no extra cost. Just log in, pick your game, and start spinning.",
      "Experience our top-rated slots risk-free. Access is instant - just choose your game and play.",
      "No deposit needed - these spins are on us. Select from our featured games and get started immediately.",
      "Try new games without commitment. Log in, choose from eligible titles, and enjoy your complimentary spins.",
      "It's the perfect opportunity to test drive premium slots with zero risk. Your spins are ready to use right now.",
      "Explore exciting new titles or revisit old favorites - all without spending a cent. Just log in and start playing.",
      "These bonus spins give you the freedom to discover what you love. Pick your game and let the reels roll.",
      "There's no catch - just pure entertainment on us. Choose your favorite slot and enjoy every spin.",
      "It's our way of saying thank you for being part of our community. Start spinning whenever you're ready.",
      "Experience the thrill of our premium slots without any financial commitment. Your free spins await.",
      "We want you to explore our game library risk-free. Log in and discover your next favorite slot.",
      "No strings attached - just great games and free spins. Jump in and enjoy the action.",
      "These complimentary spins are yours to use as you please. Pick a game and start winning.",
      "It's the easiest way to try something new or play more of what you love, completely on the house."
    ],
    bonusIntro: [
      "We're thrilled to welcome you with an exceptional bonus package designed for serious players.",
      "Your VIP experience starts now with our exclusive welcome offer.",
      "Get ready for the red carpet treatment with our premium welcome bonus.",
      "We've prepared something special for your first deposit - a bonus worthy of a high roller.",
      "Welcome to the elite circle. Your exclusive bonus is ready to claim.",
      "We're rolling out the red carpet with a welcome package that matches your ambitions.",
      "Your journey starts with a bang - claim one of our most generous welcome bonuses.",
      "We believe in rewarding loyalty from day one. Your premium bonus package awaits.",
      "This isn't just a welcome bonus - it's an invitation to experience premium gaming.",
      "Start strong with a bonus package designed to maximize your winning potential.",
      "We're giving new players like you access to exclusive welcome rewards.",
      "Your first deposit unlocks benefits that most players only dream about.",
      "Welcome bonuses don't get better than this. We've pulled out all the stops.",
      "This is how we treat our valued players - with bonuses that truly make a difference.",
      "Get ready to experience what premium welcome offers should look like."
    ],
    bonusBody: [
      "Your first deposit instantly qualifies you for the ultimate bonus package. Don't wait, this offer is strictly limited.",
      "Claim your bonus now and experience what separates us from the rest. This premium offer won't last long.",
      "Join our community of winners and maximize your playing power from day one.",
      "This is your chance to play big with extra funds. Limited time offer for new members only.",
      "Exclusive benefits await - claim your bonus and discover why players choose us.",
      "Every dollar you deposit works harder with our generous match bonus. Make your first deposit count.",
      "We're matching your deposit because we want you to experience our games at their fullest.",
      "More funds mean more chances to hit that big win. Start your journey with maximum firepower.",
      "This bonus isn't just about extra money - it's about giving you the best possible start.",
      "Smart players know that a strong start matters. Claim your bonus and play with confidence.",
      "Your bonus multiplies your deposit, giving you serious playing power right from the start.",
      "We've designed this offer to give you the edge. More funds, more games, more winning chances.",
      "This is your opportunity to explore our entire game collection with boosted funds.",
      "Don't leave money on the table - claim your welcome bonus and play like a VIP.",
      "The difference between good and great starts here. Activate your bonus and feel the difference."
    ],
    reloadIntro: [
      "If you're planning another visit, we've prepared a reload bonus that adds a little more value to your next session.",
      "We appreciate your loyalty - here's a special reload offer just for returning players.",
      "Your next deposit comes with a boost. We value your continued play.",
      "Ready for another round? We're adding extra value to your next deposit.",
      "Loyal players deserve more - here's your exclusive reload bonus.",
      "Coming back for more action? We've got a reload bonus with your name on it.",
      "Your loyalty hasn't gone unnoticed. Claim your exclusive reload offer today.",
      "We're rewarding your return with a bonus that gives you extra playing power.",
      "Every time you come back, we make it worth your while. Here's your reload bonus.",
      "Your next session just got more exciting with our exclusive reload offer.",
      "We know you'll be back for more, so we've prepared a special bonus for your return.",
      "Returning players get the VIP treatment - and this reload bonus proves it.",
      "Your continued play deserves recognition. Here's a boost for your next deposit.",
      "We're making your next visit even more rewarding with this exclusive offer.",
      "Smart players take advantage of reload bonuses - and this one's too good to miss."
    ],
    reloadBody: [
      "It's available on selected deposits and can be used across popular games on the platform, from high-stakes tables to thrilling slots.",
      "Use it on your favorite games - whether that's table games, slots, or live casino.",
      "Flexible across all major game categories. Your bonus, your choice.",
      "From blackjack to slots, your bonus works wherever you love to play.",
      "Compatible with hundreds of games. Play your way with the extra boost.",
      "This bonus adapts to your playing style - use it however you see fit.",
      "Whether you're chasing jackpots or testing strategies, this bonus has you covered.",
      "Your reload bonus works across our entire game library. The choice is yours.",
      "No restrictions on where you can use it - just pick your games and play.",
      "Table games, slots, live dealers - your bonus works everywhere.",
      "We don't limit how you use your bonus. Play what you love, win bigger.",
      "This offer is designed for flexibility. Use it on any game that catches your eye.",
      "From penny slots to high-limit tables, your bonus goes where you go.",
      "Your playing style, your games, your bonus. It's that simple.",
      "Maximum flexibility means you can play smart or play big - your call."
    ],
    closingLines: [
      "Best of luck,",
      "Good luck and enjoy,",
      "Wishing you winning spins,",
      "May fortune favor you,",
      "Here's to your next big win,",
      "Play well and prosper,",
      "Happy gaming,",
      "Enjoy the action,",
      "To your success,",
      "Game on,"
    ],
    urgency: [
      "Don't miss this limited-time boost!",
      "This exclusive offer won't last long!",
      "Claim before it's gone!",
      "Time-sensitive offer - act now!",
      "Limited availability - secure yours today!",
      "Ending soon - don't wait!",
      "Grab this before time runs out!",
      "This opportunity is fleeting!"
    ],
    footerLine1: [
      "This is a promotional offer. Please play responsibly.",
      "Promotional offer. Play responsibly and within your limits.",
      "Limited time promotional offer. Always gamble responsibly.",
      "This offer is for promotional purposes. Please play responsibly.",
      "Special promotional offer. Remember to play responsibly.",
      "Exclusive promotional offer. Play responsibly at all times.",
      "This is a limited promotional offer. Gamble responsibly.",
      "Promotional terms apply. Please play responsibly.",
      "Time-limited offer. Always play responsibly.",
      "Special offer terms apply. Play responsibly and stay in control."
    ],
    footerLine2: [
      "If you no longer wish to receive these emails, please unsubscribe here.",
      "To stop receiving these emails, please unsubscribe here.",
      "You can unsubscribe from these emails at any time here.",
      "Don't want these emails? Unsubscribe here.",
      "To opt out of future emails, unsubscribe here.",
      "No longer interested? Unsubscribe here.",
      "Click here to unsubscribe from future emails.",
      "To remove yourself from this list, unsubscribe here.",
      "Update your email preferences or unsubscribe here.",
      "Manage your email preferences or unsubscribe here."
    ]
  };

  // Color schemes for variations
  const colorSchemes = [
    { primary: '#d4af37', secondary: '#1a1a1a', accent: '#2d2d2d', name: 'Classic Gold' },
    { primary: '#ff6b6b', secondary: '#0a0a0a', accent: '#1a1a1a', name: 'Ruby Red' },
    { primary: '#4ecdc4', secondary: '#1a2332', accent: '#2d3e50', name: 'Turquoise' },
    { primary: '#a55eea', secondary: '#1e1e2e', accent: '#2e2e3e', name: 'Royal Purple' },
    { primary: '#26de81', secondary: '#0d1117', accent: '#1d2127', name: 'Emerald Green' },
    { primary: '#fd79a8', secondary: '#1a1a2e', accent: '#16213e', name: 'Hot Pink' },
    { primary: '#f39c12', secondary: '#2c3e50', accent: '#34495e', name: 'Sunset Orange' },
    { primary: '#00d2ff', secondary: '#0a192f', accent: '#172a45', name: 'Neon Blue' },
    { primary: '#c0392b', secondary: '#000000', accent: '#1a0000', name: 'Deep Crimson' },
    { primary: '#e74c3c', secondary: '#2c2c2c', accent: '#3c3c3c', name: 'Scarlet' }
  ];

  // Generate 10 template variations
  const generateTemplate = (index, colors, greeting, content) => {
    const headline = randomChoice(contentVariations.headlines);
    const subheadline = randomChoice(contentVariations.subheadlines);
    const featureTitle = randomChoice(contentVariations.featureBoxTitles).replace('{brand}', formData.brandName);
    const features = [];
    for (let i = 0; i < 3; i++) {
      features.push(randomChoice(contentVariations.featureBullets));
    }
    const address = randomChoice(contentVariations.companyAddresses);
    const stages = [
      randomChoice(contentVariations.stageContent),
      randomChoice(contentVariations.stageContent),
      randomChoice(contentVariations.stageContent)
    ];

    const layouts = [
      // Layout 1: Classic centered
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
          <tr>
            <td align="center" style="padding: 0;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
                <tr>
                  <td style="padding: 30px; text-align: center; border-bottom: 3px solid ${colors.primary};">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 32px; letter-spacing: 2px; color: #ffffff;">${formData.brandName}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 18px; margin-bottom: 20px;">${greeting}</p>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">${content.intro}</p>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 30px;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 40px 0;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.secondary}; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">LOG IN & PLAY NOW</a>
                        </td>
                      </tr>
                    </table>
                    <p style="font-size: 14px; color: #999999; font-style: italic; margin: 30px 0 20px; font-family: Arial, sans-serif;">Details and terms are available inside your account.</p>
                    <p style="margin: 0; color: #ffffff; font-family: Arial, sans-serif;">${randomChoice(contentVariations.closingLines)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #666666; text-align: center; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 2: VIP Styled (FIXED - removed blank section)
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
          <tr>
            <td align="center" style="padding: 0;">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: #000000; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 36px; letter-spacing: 3px; color: ${colors.primary};">${formData.brandName}</h1>
                    <p style="margin: 10px 0 0; font-size: 14px; letter-spacing: 2px; color: #999999; font-family: Arial, sans-serif;">${formData.tagline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: ${colors.secondary}; padding: 50px 30px; text-align: center;">
                    <h2 style="font-size: 28px; margin: 0 0 10px; line-height: 1.3; color: #ffffff; font-family: Arial, sans-serif;">${headline}</h2>
                    <h2 style="font-size: 28px; margin: 0 0 20px; color: #ffffff; font-family: Arial, sans-serif;">UP TO <span style="color: ${colors.primary}; font-size: 42px;">$${formData.bonusAmount} BONUS</span></h2>
                    <p style="font-size: 18px; margin: 0 0 40px; color: #ffffff; font-family: Arial, sans-serif;">${subheadline}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #000000; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">CLAIM YOUR BONUS NOW</a>
                        </td>
                      </tr>
                    </table>
                    <div style="background-color: #8B0000; padding: 30px; margin: 40px 0; border-radius: 5px;">
                      <h3 style="margin: 0 0 20px; font-size: 22px; color: #ffffff; font-family: Arial, sans-serif;">${featureTitle}</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${features.map(f => `<tr><td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px; padding: 8px 0; text-align: left;">• ${f}</td></tr>`).join('')}
                      </table>
                    </div>
                    <p style="font-size: 14px; line-height: 1.6; margin: 20px 0; color: #ffffff; font-family: Arial, sans-serif;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #000000; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">ACCESS FREE SPINS</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #666666; text-align: center; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 3: Modern card style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 32px; letter-spacing: 2px; color: #ffffff;">${formData.brandName}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; background-color: #ffffff;">
                    <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 18px; margin-bottom: 20px; font-weight: bold;">${greeting}</p>
                    <p style="color: #333333; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 20px;">${content.intro}</p>
                    <p style="color: #555555; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 30px;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 50px;">GET STARTED</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 5px; color: #333333; font-family: Arial, sans-serif;">${randomChoice(contentVariations.closingLines)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f8f8; padding: 20px 30px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">
                    <p style="margin: 5px 0;">© 2024 ${formData.brandName}. All rights reserved.</p>
                    <p style="margin: 15px 0 5px; color: #666666;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0; color: #666666;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 4: Split design (FIXED - added header, body, footer)
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td colspan="2" style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 2px solid ${colors.primary};">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 28px; letter-spacing: 2px; color: ${colors.primary};">${formData.brandName}</h1>
                  </td>
                </tr>
                <tr>
                  <td width="300" style="background-color: ${colors.primary}; padding: 50px 25px; vertical-align: middle;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: ${colors.secondary}; font-weight: bold; line-height: 1.2;">$${formData.bonusAmount}</h1>
                    <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.secondary};">BONUS OFFER</p>
                  </td>
                  <td width="300" style="background-color: ${colors.accent}; padding: 50px 25px; vertical-align: middle;">
                    <h2 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #ffffff;">+${formData.freeSpins} FREE SPINS</h2>
                    <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #cccccc;">on ${formData.gameName}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background-color: ${colors.secondary}; padding: 40px 30px;">
                    <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">${greeting}</p>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">${content.intro}</p>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 30px;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px 0;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.secondary}; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif;">CLAIM NOW</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0; color: #cccccc; font-family: Arial, sans-serif;">${randomChoice(contentVariations.closingLines)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background-color: ${colors.accent}; padding: 20px 30px; font-size: 12px; color: #666666; text-align: center; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 5: Minimalist (FIXED - added more body, footer)
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left: 4px solid ${colors.primary}; padding: 0 0 0 30px;">
                    <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 28px; color: #333333;">${formData.brandName}</h1>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">${formData.tagline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 0;">
                    <p style="color: #333333; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">${greeting}</p>
                    <p style="color: #555555; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 20px;">${content.intro}</p>
                    <p style="color: #666666; font-family: Arial, sans-serif; line-height: 1.8; margin-bottom: 30px;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f8f8; margin: 30px 0;">
                      <tr>
                        <td style="padding: 30px; text-align: center;">
                          <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold; color: ${colors.primary};">$${formData.bonusAmount}</p>
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Welcome Bonus</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="#" style="display: inline-block; background-color: #333333; color: #ffffff; padding: 15px 50px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">Activate Bonus</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 30px 0 5px; color: #333333; font-family: Arial, sans-serif;">${randomChoice(contentVariations.closingLines)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f8f8; padding: 20px 30px; font-size: 12px; color: #999999; text-align: center; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0; color: #666666;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0; color: #666666;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,

      // Layout 6: Newsletter Style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
                <tr>
                  <td style="background-color: ${colors.primary}; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #ffffff;">${formData.brandName} NEWSLETTER</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="margin: 0 0 20px; font-family: Arial, sans-serif; font-size: 26px; color: ${colors.primary};">${headline}</h2>
                    <p style="color: #666666; font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 20px;">${greeting}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="48%" style="background-color: #f9f9f9; padding: 20px; vertical-align: top;">
                          <h3 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #333333;">Featured Offer</h3>
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${content.intro}</p>
                        </td>
                        <td width="4%"></td>
                        <td width="48%" style="background-color: #f9f9f9; padding: 20px; vertical-align: top;">
                          <h3 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #333333;">Quick Details</h3>
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${content.body}</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px 0;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 4px;">CLAIM OFFER</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999999; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                    <p style="margin: 10px 0 5px; color: #888888;">${address}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,

      // Layout 7: Editorial Style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 40px 30px 20px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">${formData.brandName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;">
                    <h1 style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 32px; color: #222222; line-height: 1.3;">${headline}</h1>
                    <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 16px; color: ${colors.primary}; font-weight: bold;">${subheadline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="height: 200px; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);"></td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 16px; color: #333333; line-height: 1.8; font-style: italic;">${greeting}</p>
                    <p style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 16px; color: #444444; line-height: 1.8;">${content.intro}</p>
                    <p style="margin: 0 0 30px; font-family: Georgia, serif; font-size: 16px; color: #444444; line-height: 1.8;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background-color: #222222; color: #ffffff; padding: 15px 50px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">Read More</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; padding: 20px 30px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,

      // Layout 8: Magazine Style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="70%" style="vertical-align: middle;">
                          <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 36px; color: ${colors.primary}; font-weight: 900; line-height: 1.1;">${formData.brandName}</h1>
                        </td>
                        <td width="30%" style="text-align: right; vertical-align: middle;">
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">ISSUE #${Math.floor(Math.random() * 100) + 1}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 60px 30px; text-align: center;">
                    <h2 style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 28px; color: #ffffff; font-weight: 900; text-transform: uppercase;">${headline}</h2>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${subheadline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="30%" style="background-color: ${colors.primary}; padding: 30px 15px; text-align: center; vertical-align: middle;">
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: #ffffff; font-weight: bold;">$${formData.bonusAmount}</p>
                        </td>
                        <td width="5%"></td>
                        <td width="65%" style="vertical-align: middle;">
                          <p style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6;">${content.intro}</p>
                          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${content.body}</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px 0 10px;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase;">GET STARTED</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,

      // Layout 9: Coupon/Ticket Style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f0f0;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 3px dashed ${colors.primary};">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 32px; color: ${colors.primary}; font-weight: 900; text-transform: uppercase;">${formData.brandName}</h1>
                    <p style="margin: 0 0 30px; font-family: Arial, sans-serif; font-size: 14px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Exclusive Bonus Coupon</p>
                    <div style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%); padding: 40px; margin: 0 0 30px;">
                      <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 18px; color: #ffffff; font-weight: bold;">BONUS CODE</p>
                      <p style="margin: 0 0 20px; font-family: 'Courier New', monospace; font-size: 32px; color: #ffffff; font-weight: bold; letter-spacing: 4px;">VIP${Math.floor(Math.random() * 9000) + 1000}</p>
                      <p style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: #ffffff; font-weight: 900;">$${formData.bonusAmount}</p>
                      <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">WELCOME BONUS</p>
                    </div>
                    <p style="margin: 0 0 15px; font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6;">${content.intro}</p>
                    <p style="margin: 0 0 30px; font-family: Arial, sans-serif; font-size: 14px; color: #666666; line-height: 1.6;">${content.body}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; text-transform: uppercase; border-radius: 4px;">REDEEM NOW</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 30px 0 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">Valid for ${formData.validDays} days • Terms apply</p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 3px dashed ${colors.primary}; padding: 20px; text-align: center; font-size: 11px; color: #999999; font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,

      // Layout 10: Timeline/Stages Style
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%);">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h1 style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 42px; color: ${colors.primary}; font-weight: 900; text-transform: uppercase; font-style: italic; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${headline}</h1>
                    <p style="margin: 0 0 40px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${subheadline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2); border-radius: 10px;">
                      ${stages.map((stage, i) => `
                        <tr>
                          <td style="padding: 20px; border-bottom: ${i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none'};">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="30%" style="vertical-align: middle;">
                                  <p style="margin: 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.primary}; font-weight: bold;">${stage.label}</p>
                                </td>
                                <td width="70%" style="text-align: right; vertical-align: middle;">
                                  <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">${stage.text}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      `).join('')}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px; text-align: center;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background: linear-gradient(90deg, ${colors.primary} 0%, #ffffff 100%); color: ${colors.secondary}; padding: 18px 60px; text-decoration: none; font-weight: bold; font-size: 18px; font-family: Arial, sans-serif; text-transform: uppercase; border-radius: 50px; box-shadow: 0 0 20px rgba(255,255,255,0.3);">PRESS START TO PLAY</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 30px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.6); font-family: Arial, sans-serif;">
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine1)}</p>
                    <p style="margin: 5px 0;">${randomChoice(contentVariations.footerLine2).replace('unsubscribe here', `<a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>`)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `
    ];

    const layout = layouts[index % layouts.length];
    return layout();
  };

  const getAllVariations = () => {
    const variations = [];
    for (let i = 0; i < 50; i++) {
      const colors = colorSchemes[i % colorSchemes.length];
      const greeting = getRandomGreeting();
      const content = {
        intro: randomChoice(i < 15 ? contentVariations.freeSpinsIntro : i < 30 ? contentVariations.bonusIntro : contentVariations.reloadIntro),
        body: randomChoice(i < 15 ? contentVariations.freeSpinsBody : i < 30 ? contentVariations.bonusBody : contentVariations.reloadBody)
      };
      variations.push({
        id: i,
        colors,
        greeting,
        content,
        html: generateTemplate(i, colors, greeting, content)
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
            content: `Generate 50 unique, compelling email subject lines for casino promotional emails. Mix different styles:
            - Urgency (limited time, ending soon)
            - Exclusivity (VIP, exclusive, members only)
            - Value (free, bonus, extra)
            - Curiosity (questions, intrigue)
            - Personalization (your, special for you)
            
            Brand: ${formData.brandName}
            Offers include: $${formData.bonusAmount} bonus, ${formData.freeSpins} free spins, ${formData.reloadPercent}% reload
            
            Make them short (under 60 characters), varied, and professional.
            Return ONLY the 50 subject lines numbered 1-50, nothing else.`
          }]
        })
      });

      const data = await response.json();
      const subjects = data.content[0].text.split('\n').filter(line => line.trim());
      setGeneratedSubjects(subjects);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedSubjects(["Error generating subjects. Please try again."]);
    }
    setLoading(false);
  };

  const downloadAsImage = async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `casino-email-${currentVariation}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image. Please try again.");
    }
  };

  const downloadAsHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.brandName} - Promotional Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
${variations[currentVariation].html}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `casino-email-${currentVariation}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const download10RandomTemplates = async () => {
    setBatchDownloading(true);
    const randomIndices = [];
    while (randomIndices.length < 10) {
      const random = Math.floor(Math.random() * 50);
      if (!randomIndices.includes(random)) {
        randomIndices.push(random);
      }
    }

    for (let i = 0; i < randomIndices.length; i++) {
      const index = randomIndices[i];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = variations[index].html;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      try {
        const canvas = await html2canvas(tempDiv, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = `casino-email-batch-${i + 1}-template-${index}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
      }

      document.body.removeChild(tempDiv);
    }
    
    setBatchDownloading(false);
    alert('10 random templates downloaded!');
  };

  const exportSubjectsAsTXT = () => {
    const text = generatedSubjects.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subject-lines-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportSubjectsAsCSV = () => {
    const csv = 'Subject Line\n' + generatedSubjects.map(s => `"${s}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subject-lines-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToGoogleSheets = () => {
    alert('Google Sheets export: Copy the URL below and subjects, then create a new Google Sheet.\n\nSubjects are in the panel. Current template URL: ' + window.location.href);
  };

  const randomizeTemplate = () => {
    const randomIndex = Math.floor(Math.random() * 50);
    setCurrentVariation(randomIndex);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
          <Mail size={48} style={{ marginBottom: '15px' }} />
          <h1 style={{ fontSize: '36px', margin: '0 0 10px' }}>Casino Email Generator Pro</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>50 Templates • 10 Layouts • AI Subject Lines • Batch Export</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
          {/* Left Panel - Controls */}
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', height: 'fit-content' }}>
            <h2 style={{ marginTop: 0, color: '#333', fontSize: '20px', borderBottom: '2px solid #667eea', paddingBottom: '15px' }}>Campaign Settings</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Bonus ($)</label>
                <input
                  type="text"
                  name="bonusAmount"
                  value={formData.bonusAmount}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Free Spins</label>
                <input
                  type="text"
                  name="freeSpins"
                  value={formData.freeSpins}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Game Name</label>
              <input
                type="text"
                name="gameName"
                value={formData.gameName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <h3 style={{ marginTop: 0, color: '#333', fontSize: '16px', marginBottom: '15px' }}>Template Navigation</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button
                  onClick={() => setCurrentVariation(Math.max(0, currentVariation - 1))}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  ← Prev
                </button>
                <div style={{
                  flex: 1,
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {currentVariation + 1}/50
                </div>
                <button
                  onClick={() => setCurrentVariation(Math.min(49, currentVariation + 1))}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
              <button
                onClick={randomizeTemplate}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Shuffle size={18} />
                Random Template
              </button>
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <h3 style={{ marginTop: 0, color: '#333', fontSize: '16px', marginBottom: '15px' }}>Export Options</h3>
              <button
                onClick={downloadAsImage}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '10px'
                }}
              >
                <ImageIcon size={18} />
                Download as PNG
              </button>
              <button
                onClick={downloadAsHTML}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '10px'
                }}
              >
                <FileText size={18} />
                Download HTML
              </button>
              <button
                onClick={download10RandomTemplates}
                disabled={batchDownloading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: batchDownloading ? '#ccc' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: batchDownloading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Download size={18} />
                {batchDownloading ? 'Downloading...' : 'Download 10 Random (PNG)'}
              </button>
            </div>

            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px', marginTop: '25px' }}>
              <button
                onClick={generate50Subjects}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: loading ? '#ccc' : '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Wand2 size={18} />
                {loading ? 'Generating...' : 'Generate 50 Subjects'}
              </button>
            </div>
          </div>

          {/* Right Panel - Preview & Subjects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Email Preview */}
            <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <h2 style={{ marginTop: 0, color: '#333', fontSize: '24px', borderBottom: '2px solid #667eea', paddingBottom: '15px', marginBottom: '20px' }}>
                Email Preview - Template {currentVariation + 1}
              </h2>
              <div
                ref={previewRef}
                style={{
                  border: '3px solid #667eea',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
                dangerouslySetInnerHTML={{ __html: variations[currentVariation].html }}
              />
            </div>

            {/* Subject Lines */}
            {generatedSubjects.length > 0 && (
              <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #667eea', paddingBottom: '15px' }}>
                  <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>Generated Subject Lines (50)</h2>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={exportSubjectsAsTXT}
                      style={{
                        padding: '8px 16px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileText size={14} />
                      TXT
                    </button>
                    <button
                      onClick={exportSubjectsAsCSV}
                      style={{
                        padding: '8px 16px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileSpreadsheet size={14} />
                      CSV
                    </button>
                    <button
                      onClick={exportToGoogleSheets}
                      style={{
                        padding: '8px 16px',
                        background: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sheet size={14} />
                      Sheets
                    </button>
                  </div>
                </div>
                <div style={{
                  maxHeight: '400px',
                  overflow: 'auto',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '2px solid #e9ecef'
                }}>
                  {generatedSubjects.map((subject, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px',
                        marginBottom: '10px',
                        background: 'white',
                        borderRadius: '6px',
                        borderLeft: '4px solid #667eea',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#333',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    >
                      {subject}
                    </div>
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
