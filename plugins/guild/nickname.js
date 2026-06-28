const handler = async (m, { conn, text }) => {
    
    const mentioned = await m.lid2jid(m.mentionedJid?.[0])
    if (!mentioned) return m.reply('⚔️ *منشن الجندي يا قائد!* 🔥\n> مثال: .لقب @user لقب_المعركة');
    
    const parts = text.split(' ');
    parts.shift();
    const nickname = parts.join(' ').trim();
    
    if (!nickname) return m.reply('✏️ *اكتب اللقب بعد المنشن يا جندي!* 🦾\n> مثال: .لقب @user لقب_المعركة');
    
    if (!global.db.group) global.db.group = {};
    if (!global.db.group[m.chat]) global.db.group[m.chat] = {};
    if (!global.db.group[m.chat].nicknames) global.db.group[m.chat].nicknames = {};
    
    const existingNick = Object.entries(global.db.group[m.chat].nicknames).find(([jid, nick]) => 
        nick === nickname && jid !== mentioned
    );
    
    if (existingNick) return m.reply(`💢 *اللقب "${nickname}" محجوز بالفعل يا جندي!*`);
    
    global.db.group[m.chat].nicknames[mentioned] = nickname;
    await conn.sendMessage(m.chat, { 
        text: `✅ *تم تسجيل لقب "${nickname}" للجندي @${mentioned.split('@')[0]}* 🦾\n\n> تاتاكاي! استمر في القتال يا جندي 🔥`, 
        mentions: [mentioned],
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

handler.command = ["لقب"];
handler.usage =  ["لقب"];
handler.category = "nicknames";
handler.admin = true;
handler.group = true;
export default handler;
