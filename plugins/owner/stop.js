const test = async (m, { conn, bot }) => {
  m.react("💀")
  
  conn.msgUrl(m.chat, "💀 *المعركة توقفت... استريحوا يا جنود* 🛑", { 
    title: "𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫 𝐁𝐨𝐭 ⚔️",
    body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝚁𝚎𝚜𝚝 𝚏𝚘𝚛 𝚗𝚘𝚠",
    img: "https://g.top4top.io/p_3700yob0b1.jpg",
    big: false,
    newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    }
  });
  
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true;
export default test;
