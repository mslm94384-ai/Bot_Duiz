import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { conn }) => {
  try {
    if (!m.quoted) return m.reply("⚔️ *رد على الصورة اللي عايز تنسخ منها الكلام يا جندي!* 🔥");
    
    const buffer = await m.quoted.download();
    const form = new FormData();
    form.append('image', buffer, { filename: 'image.jpg', contentType: 'image/jpeg' });

    const res = await axios.post('https://emam-api.web.id/home/sections/Tools/api/ocr-image', form, {
      headers: form.getHeaders()
    });

    await conn.sendMessage(m.chat, { 
      text: res.data.result,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
          newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          serverMessageId: 0
        }
      }
    }, { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, { 
      text: `❌ *حدث خطأ يا جندي!* 💢\n> ${error.message}`,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
          newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          serverMessageId: 0
        }
      }
    }, { quoted: m });
  }
};

handler.usage = ["نسخ"];
handler.command = ["نسخ", "ocr"];
handler.category = "tools";

export default handler;
