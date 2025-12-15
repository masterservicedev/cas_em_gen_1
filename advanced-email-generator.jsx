import React, { useState, useRef } from 'react';
import { Download, Mail, Wand2, Image as ImageIcon, FileText, Shuffle } from 'lucide-react';
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

  // Content variations
  const contentVariations = {
    freeSpinsIntro: [
      "We've added a free spins offer to your account, available on selected games for a limited time.",
      "Your account has been credited with complimentary spins on our most popular titles.",
      "Exclusive free spins are now active on your account - ready when you are.",
      "A special free spins bonus awaits you on premium slot games.",
      "We've unlocked free spins for you on select casino favorites."
    ],
    freeSpinsBody: [
      "It's a relaxed way to explore new titles without changing how you usually play. Simply log in, choose the eligible game, and enjoy the spins.",
      "Dive into exciting gameplay at no extra cost. Just log in, pick your game, and start spinning.",
      "Experience our top-rated slots risk-free. Access is instant - just choose your game and play.",
      "No deposit needed - these spins are on us. Select from our featured games and get started immediately.",
      "Try new games without commitment. Log in, choose from eligible titles, and enjoy your complimentary spins."
    ],
    bonusIntro: [
      "We're thrilled to welcome you with an exceptional bonus package designed for serious players.",
      "Your VIP experience starts now with our exclusive welcome offer.",
      "Get ready for the red carpet treatment with our premium welcome bonus.",
      "We've prepared something special for your first deposit - a bonus worthy of a high roller.",
      "Welcome to the elite circle. Your exclusive bonus is ready to claim."
    ],
    bonusBody: [
      "Your first deposit instantly qualifies you for the ultimate bonus package. Don't wait, this offer is strictly limited.",
      "Claim your bonus now and experience what separates us from the rest. This premium offer won't last long.",
      "Join our community of winners and maximize your playing power from day one.",
      "This is your chance to play big with extra funds. Limited time offer for new members only.",
      "Exclusive benefits await - claim your bonus and discover why players choose us."
    ],
    reloadIntro: [
      "If you're planning another visit, we've prepared a reload bonus that adds a little more value to your next session.",
      "We appreciate your loyalty - here's a special reload offer just for returning players.",
      "Your next deposit comes with a boost. We value your continued play.",
      "Ready for another round? We're adding extra value to your next deposit.",
      "Loyal players deserve more - here's your exclusive reload bonus."
    ],
    reloadBody: [
      "It's available on selected deposits and can be used across popular games on the platform, from high-stakes tables to thrilling slots.",
      "Use it on your favorite games - whether that's table games, slots, or live casino.",
      "Flexible across all major game categories. Your bonus, your choice.",
      "From blackjack to slots, your bonus works wherever you love to play.",
      "Compatible with hundreds of games. Play your way with the extra boost."
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

  // Generate 50+ template variations
  const generateTemplate = (index, colors, greeting, content) => {
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
                    <p style="margin: 5px 0;">This is a promotional offer. Please play responsibly.</p>
                    <p style="margin: 5px 0;">If you no longer wish to receive these emails, please <a href="#" style="color: ${colors.primary}; text-decoration: underline;">unsubscribe here</a>.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 2: VIP Styled
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
                    <h2 style="font-size: 28px; margin: 0 0 10px; line-height: 1.3; color: #ffffff; font-family: Arial, sans-serif;">THE VIP RED CARPET WELCOME</h2>
                    <h2 style="font-size: 28px; margin: 0 0 20px; color: #ffffff; font-family: Arial, sans-serif;">UP TO <span style="color: ${colors.primary}; font-size: 42px;">$${formData.bonusAmount} BONUS</span></h2>
                    <p style="font-size: 18px; margin: 0 0 40px; color: #ffffff; font-family: Arial, sans-serif;">Plus ${formData.freeSpins} Free Spins on ${formData.gameName}!</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: #000000; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif; border-radius: 5px;">CLAIM YOUR BONUS NOW</a>
                        </td>
                      </tr>
                    </table>
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
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 4: Split design
      () => `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.secondary};">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" style="background-color: ${colors.primary}; padding: 50px 25px; vertical-align: middle;">
                    <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 42px; color: ${colors.secondary}; font-weight: bold; line-height: 1.2;">$${formData.bonusAmount}</h1>
                    <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 18px; color: ${colors.secondary};">BONUS OFFER</p>
                  </td>
                  <td width="50%" style="background-color: ${colors.accent}; padding: 50px 25px; vertical-align: middle;">
                    <h2 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #ffffff;">+${formData.freeSpins} FREE SPINS</h2>
                    <p style="margin: 10px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #cccccc;">on ${formData.gameName}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background-color: ${colors.secondary}; padding: 40px 30px;">
                    <p style="color: ${colors.primary}; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">${greeting}</p>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">${content.intro}</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px 0;">
                          <a href="#" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.secondary}; padding: 15px 40px; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif;">CLAIM NOW</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      
      // Layout 5: Minimalist
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [
            {
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
            }
          ],
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

  const randomizeTemplate = () => {
    const randomIndex = Math.floor(Math.random() * 50);
    setCurrentVariation(randomIndex);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
          <Mail size={48} style={{ marginBottom: '15px' }} />
          <h1 style={{ fontSize: '36px', margin: '0 0 10px' }}>Advanced Casino Email Generator</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>50+ Template Variations • AI Subject Lines • Image & HTML Export</p>
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
              <h3 style={{ marginTop: 0, color: '#333', fontSize: '16px', marginBottom: '15px' }}>Template Variation</h3>
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
                  gap: '8px'
                }}
              >
                <FileText size={18} />
                Download HTML
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
                Email Preview - Variation {currentVariation + 1}
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
                <h2 style={{ marginTop: 0, color: '#333', fontSize: '24px', borderBottom: '2px solid #667eea', paddingBottom: '15px', marginBottom: '20px' }}>
                  Generated Subject Lines (50)
                </h2>
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
