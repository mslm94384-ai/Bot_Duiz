import { Scrapy } from "meowsab";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("⚔️ *مثال يا جندي:* .كلمات Shiloh again 🔥");
  
  const response = await Scrapy.lyrics(text);
  
  if (!response.ok) return m.reply("💀 *مفيش كلمات للأغنية يا جندي!*");
  
  const data = response.data;
  
  let result = `🎵 *${data.trackName}* 🎵\n`;
  result += `👤 *الفنان:* ${data.artistName}\n`;
  result += `💿 *الألبوم:* ${data.albumName}\n`;
  result += `⏱️ *المدة:* ${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}\n\n`;
  result += `📝 *كلمات الأغنية:*\n\`\`\`\n${data.plainLyrics}\n\`\`\``;
  
  await conn.sendMessage(m.chat, { 
    text: result,
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

handler.usage = ["كلمات"];
handler.command = ["كلمات", "lyrics"];
handler.category = "tools";

export default handler;
