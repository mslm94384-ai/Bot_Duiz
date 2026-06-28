import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';
import { Convert } from "meowsab";

let handler = async (m, { conn, text, command }) => {
 
 if (!m.quoted) return m.reply('⚔️ *رد على الاستيكر يا جندي عشان تحوله لفيديو!* 🔥');

 if (!/webp/.test(m.quoted.mimetype)) return m.reply(`💀 *ده مش استيكر يا جندي!*`);

 const buffer = await m.quoted.download();;
 let smp4 = await Convert.WebpToMp4(buffer)
 
 await conn.sendMessage(m.chat, {
      video: { url: smp4 },
      caption: `✅ *تم التحويل يا جندي!* 🦾\n\n> تاتاكاي! استمر في القتال 🔥`,
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

handler.usage = ["لفيديو"];
handler.category = "tools";
handler.command = /^(tovideo|tovid|tomp4|لفيديو)$/i

export default handler;
