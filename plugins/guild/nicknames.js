const handler = async (m, { conn }) => {
    const data = global.db.group?.[m.chat]?.nicknames;
    if (!data || Object.keys(data).length === 0) return m.reply('💀 *مفيش ألقاب في المعسكر يا جندي!*');
    
    let list = '⚔️ — *ألقاب جنود المعركة:* 🔥\n\n';
    let index = 1;
    for (let [jid, nick] of Object.entries(data)) {
        list += `${index}. 🦾 ${jid.split('@')[0]} ≤ ${nick} ≥\n`;
        index++;
    }
    
    list += `\n> تاتاكاي! كل جندي ليه لقبه في المعركة 🦾`;
    
    await conn.sendMessage(m.chat, { 
        text: list, 
        mentions: Object.keys(data),
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

handler.command = ["الألقاب"];
handler.usage =  ["الألقاب"];
handler.category = "nicknames";
handler.admin = true;
handler.group = true;
export default handler;
