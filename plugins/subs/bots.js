const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ *نظام الجنود الفرعيين غير متاح يا قائد!*");

  const bots = sub.list();
  if (bots.length === 0) return m.reply("💀 *مفيش جنود فرعيين مثبتين يا قائد!*");

  let text = `⚔️ *الجنود الفرعيين في المعسكر* 🔥
*╮┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ـ*\n`;
  
  const mentions = [];
  
  bots.forEach((b, i) => {
    const jid = b.phone ? `${b.phone}@s.whatsapp.net` : null;
    if (jid) mentions.push(jid);
    
    text += `🦾 *#${i+1}* \n`;
    text += `📱 — الرقم: ${jid ? `@${b.phone}` : b.phone || 'غير معروف'}\n`;
    text += `📍 — الحالة: ${b.connected ? '🟢 في المعركة' : '🔴 في الاستراحة'}\n`;
    text += `📨 — الرسائل: ${b.messages || 0}\n`;
    text += `🆔 — الايدي: ${b.id}\n`;
    text += `╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ـ\n`;
  });
  
  text += `\n> *_✓ إجمالي الجنود: ${bots.length}_* 🦾`;

  const { images } = bot.config.info;
  const img = images?.[Math.floor(Math.random() * images.length)] || "https://i.pinimg.com/originals/e7/e3/0e/e7e30e4af3767d893ce7309563ced390.png";

  await conn.sendMessage(m.chat, {
    text: text,
    mentions: mentions,
    contextInfo: {
      externalAdReply: {
        title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫",
        body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true,
        newsletter: {
          name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
        }
      }
    }
  }, { quoted: m });
};

run.command = ["البوتات", "bots"];
run.noSub = true;
run.usage =  ["تنصيب"];
run.category = "البوتات";
run.owner = true;
export default run;
