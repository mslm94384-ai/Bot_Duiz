const handler = async (m, { conn }) => {
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
const jids = participants.map(p => p.id);

if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "💀 *المجموعة صغيرة جداً يا جندي! محتاجين ناس عشان المعركة* ⚔️" });
}

let index1 = Math.floor(Math.random() * jids.length);
let index2;

do {
    index2 = Math.floor(Math.random() * jids.length);
} while (index2 === index1 && jids.length > 1);

const user1 = jids[index1];
const user2 = jids[index2];

const content = {
    user1: user1,
    num1: (Math.floor(Math.random() * 100) + 1) + '%',
    user2: user2,
    num2: (Math.floor(Math.random() * 100) + 1) + '%'
};

return conn.sendMessage(m.chat, { 
    text: `⚔️ *المحكمة العسكرية تعلن الطلاق!* 💢

*تعلن المحكمة فسخ الزواج بين الجندي [ @${content.user1.split('@')[0]} ] والجندية [ @${content.user2.split('@')[0]} ] 

> *ادفع النفقة يا جندي! دي معركة جديدة* 🦾🔥`, 
    mentions: [content.user1, content.user2],
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

handler.usage = ["طلاق"];
handler.category = "group";
handler.command = ["طلاق"];

export default handler;
