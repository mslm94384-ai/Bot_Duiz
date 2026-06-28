const toGif = async (m, { conn }) => {
  try {
    if (!m.quoted) {
      return m.reply("⚔️ *رد على الفيديو يا جندي عشان تحوله لجيف!* 🔥");
    }

    const buffer = await m.quoted.download();
    
    await conn.sendMessage(m.chat, { 
      video: buffer, 
      gifPlayback: true,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
          newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          serverMessageId: 0
        }
      }
    });
  } catch (e) {
    await conn.sendMessage(m.chat, { 
      text: `❌ *حدث خطأ يا جندي!* 💢\n> ${e.message}`,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
          newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          serverMessageId: 0
        }
      }
    });
  }
};

toGif.usage = ["لجيف"];
toGif.category = "tools";
toGif.command = ["لجيف", "togif", "لچيف"];
export default toGif;
