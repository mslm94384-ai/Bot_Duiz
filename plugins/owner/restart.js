const test = async (m, { conn, bot }) => {
  m.react("⚔️")
  
  conn.msgUrl(m.chat, "⚔️ *المعركة مستمرة... إعادة تشغيل الجند!* 🔥", { 
    title: "𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫 𝐁𝐨𝐭 ⚔️",
    body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
    img: "https://g.top4top.io/p_3700yob0b1.jpg",
    big: false,
    newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    }
  });
  
  setTimeout(() => {
    bot.restart();
  }, 1000); 
};

test.usage = ["رستارت"]
test.category = "owner";
test.command = ["رستارت", "restart"];
test.owner = true;
export default test;
