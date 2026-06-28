const handler = async (m, { conn, args }) => {
const res = await (await import("meowsab")).Scrapy.Matching();
const { data } = JSON.parse(res);

 await conn.sendButtonNormal(m.chat, {
  media: { url: data.boy },
  mediaType: 'image', 
  caption: `⚔️ # جندي 🦾`,
  buttons: [

        { name: "cta_url", params: { display_text: "📎╎ قـنـاتـي ", url: "https://whatsapp.com/channel/0029VbCoE0P8aKvPbZf8hU1D" } },

  ], 
  mentions: [m.sender],
  newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    },
}, global.reply_status)



return await conn.sendButtonNormal(m.chat, {
  media: { url: data.girl },
  mediaType: 'image', 
  caption: `⚔️ # جندية 🦾`,
  buttons: [

        { name: "quick_reply", params: { display_text: "▶️ ╎ الـتـالـي ", id: ".تطقيم" } },

  ], 
  mentions: [m.sender],
  newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    },
}, global.reply_status)

};
handler.usage =  ["تطقيم"];
handler.category = "group";
handler.command = ["ماتشينج", "تطقيم"];

export default handler;
