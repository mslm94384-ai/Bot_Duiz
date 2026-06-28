import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, args }) => {
  if (!m.quoted) return m.reply("⚔️ *رد على الملصق يا جندي!* 🔥");
  
  let [pack, author] = args.join(" ").split(" | ");
  
  if (!args.length) {
    return m.reply("📝 *الاستخدام الصحيح يا قائد:*\n\n.حقوق اسم الباك | اسم المؤلف\n\n*مثال:*\n`.حقوق إيرن | 2026`");
  }
  
  if (!pack) pack = "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓";
  if (author === undefined) author = "🐦";
  
  const q = await m.quoted;
  
  const buffer = await createSticker(await q.download(), { mime: q.mimetype, pack, author });

  await conn.sendMessage(
    m.chat,
    { sticker: buffer, contextInfo: context(m.sender, "https://i.pinimg.com/736x/d5/c6/c1/d5c6c1f4a0562c5c7630ae59d19c33c8.jpg") },
    { quoted: global.reply_status }
  );
};

test.usage = ["حقوق نص | نص"];
test.command = ["حقوق"];
test.category = "sticker";
export default test;

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
        title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫",
        body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
