async function test(m, { conn, bot, text }) {
  if (!text) return m.reply("⚔️ *اكتب نص البحث يا جندي!* 🔥")
  try {
  const res = await fetch(`https://www.emam-api.web.id/home/sections/Search/api/tiktok/videos?q=${text}`)
const { data } = await res.json()

if (data && data.length > 0) {
    const { title, no_watermark: video, music } = data[0]

    await conn.sendButtonNormal(m.chat, {
        media: { url: video },
        mediaType: 'video',
        caption: `${title || "no title"}`,
        buttons: [
            { 
                name: "cta_copy", 
                params: { 
                    display_text: "💟╎ قناتي", 
                    copy_code: "https://whatsapp.com/channel/0029VbCoE0P8aKvPbZf8hU1D" 
                } 
            },
        ],
        mentions: [m.sender],
        newsletter: {
            name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
            jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
        },
    }, global.reply_status)
} else {
    await conn.sendMessage(m.chat, { text: `💀 *مفيش فيديوهات لـ "${text}" يا جندي!*` })
}
    
  } catch (error) {
    console.error(error.messsage);
    m.react("❌")
  }
}

test.category = "search";
test.usage = ["بحث_تيك"];
test.command = ["بحث_تيك"];
export default test;
