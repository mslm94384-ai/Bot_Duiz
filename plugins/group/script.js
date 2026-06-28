let handler = async (m, {
    conn,
    bot
}) => {
const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
        newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫 𝐁𝐨𝐭",
        body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
const { images } = bot.config.info;
const img = images.random()
await conn.sendMessage(m.chat, { 
  text: `
⚔️ *سورس إيرن بوت* 🔥

GitHub: _*https://github.com/deveni0/Pomni-AI/tree/main*_

Video: _*https://youtu.be/hA5aCpvesJE?si=pHAEsbDFTVXe2_sq*_

> *لا تنسى وضع نجمة لـ الريبو 🌟*
> تاتاكاي! استمر في القتال يا جندي 🦾
`,
  contextInfo: context(m.sender, img)
}, { quoted: reply_status });
}
handler.usage = ["سكريبت"];
handler.category = "group";
handler.command = ["سكريبت", "سورس", "sc"];

export default handler;
