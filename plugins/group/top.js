const handler = async (m, { conn, args }) => {
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
const jids = participants.map(p => p.id);

if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "💀 *المجموعة صغيرة جداً يا جندي! محتاجين ناس عشان المعركة* ⚔️" });
}

const shuffledJids = [...jids].sort(() => Math.random() - 0.5);
const topUsers = shuffledJids.slice(0, Math.min(10, jids.length));

const emojis = ["😂", "🤬", "🙂", "😎", "🔥", "💀", "⚔️", "🦾"];
let em = emojis[Math.floor(Math.random() * emojis.length)]
let messageText = `⚔️ *${em} توب أقوى 10 جنود > ${args.join(' ') || 'في المعركة'} ${em}* 🔥\n\n`;

topUsers.forEach((user, index) => {
    let percentage;
    if (index === 0) {
        percentage = Math.floor(Math.random() * 15) + 90; // 90-105%
    } else if (index === 1) {
        percentage = Math.floor(Math.random() * 15) + 80; // 80-95%
    } else if (index === 2) {
        percentage = Math.floor(Math.random() * 15) + 70; // 70-85%
    } else if (index === 3) {
        percentage = Math.floor(Math.random() * 15) + 60; // 60-75%
    } else if (index === 4) {
        percentage = Math.floor(Math.random() * 15) + 50; // 50-65%
    } else {
        percentage = Math.floor(Math.random() * 40) + 30; // 30-70%
    }
    
    const medal = index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🦾";
    messageText += `${medal} *${index + 1}.* @${user.split('@')[0]} - بنسبة قتال *${percentage}%*\n`;
});

messageText += `\n> تاتاكاي! استمر في القتال يا جنود 🦾🔥`;

return conn.sendMessage(m.chat, { 
    text: messageText, 
    mentions: topUsers,
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
};
handler.usage =  ["توب"];
handler.category = "group";
handler.command = ["توب"];

export default handler;
