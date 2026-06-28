const toimg = async (m, { conn }) => {
  try {
    if (!m.quoted) {
      return m.reply("⚔️ *رد على الصورة يا جندي عشان تحولها!* 🔥");
    }

    const buffer = await m.quoted.download();
    
    await conn.sendMessage(m.chat, { 
      image: buffer,
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

toimg.usage = ["لصوره"];
toimg.category = "tools";
toimg.command = ["لصوره", "toimage", "toimg"];
export default toimg;
