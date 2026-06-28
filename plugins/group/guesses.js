const handler = async (m, { conn, command }) => {
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
const jids = participants.map(p => p.id);

if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "💀 *المجموعة صغيرة جداً يا جندي! محتاجين ناس عشان المعركة* ⚔️" });
}

let randomIndex = Math.floor(Math.random() * jids.length);
const randomUser = jids[randomIndex];
const percentage = Math.floor(Math.random() * 100) + 1;

let responseText = "";

switch (command) {
    case "بيحبني":
        responseText = `🔥 *أقوى محارب بيحبك في المعركة* ❤️\n\n*الجندي [ @${randomUser.split('@')[0]} ]* \n\n> *نسبة حبه ليك: ${percentage}%* 💕\n\n> تاتاكاي! الحب سلاح قوي يا جندي 🦾`;
        break;
        
    case "بيكرهني":
        responseText = `💢 *أقوى عدو بيكرهك في المعركة* 😤\n\n*الجندي [ @${randomUser.split('@')[0]} ]* \n\n> *نسبة كرهه ليك: ${percentage}%* 💀\n\n> ركز في المعركة يا جندي! الأعداء كتير 🦾`;
        break;
        
    case "بيكراش":
        responseText = `🫶 *اكتشفت مين معجب بيك في المعركة* 💘\n\n*الجندي [ @${randomUser.split('@')[0]} ]* \n\n> *نسبة اعجابه بيك: ${percentage}%* 😍\n\n> حتى المحاربين عندهم مشاعر يا جندي 🥺💙`;
        break;
        
    default:
        return;
}

return conn.sendMessage(m.chat, { 
    text: responseText, 
    mentions: [randomUser],
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
};

handler.usage = ["بيحبني", "بيكرهني", "بيكراش"];
handler.category = "group";
handler.command = ["بيحبني", "بيكرهني", "بيكراش"];

export default handler;
