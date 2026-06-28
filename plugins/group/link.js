let handler = async (m, {
    conn
}) => {
    try {
        m.reply(`⚔️° ┄──────────╮
🔥┊ *رابـــط مـعـسـكـر الـجـنـود:* ${(await conn.groupMetadata(m.chat)).subject}
🔥┊
🔥┊ https://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat) + `
🔥┊
🔥┊ ${conn.user.name || "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦"}
╰──────────┄ °🔥`)
    } catch {
        const mentionedUser = conn.user.id.split(":")[0] + "@s.whatsapp.net";
        conn.sendMessage(m.chat, { 
            text: `💢° ┄──────────╮
⚔️┊ *يـــا جـــنـــدي! يـــجـــب تـــعـــيـــيـــن @${mentionedUser.split('@')[0]} كـــمـــشـــرف لـــلـــحـــصـــول عـــلـــى رابـــط الـــمـــعـــســـكـــر!*
╰──────────┄ °💢`, 
            mentions: [mentionedUser],
            contextInfo: {
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
                    newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                    serverMessageId: 0
                }
            }
        })
    }
}
handler.usage = ["لينك"];
handler.category = "group";
handler.command = ["لينك", "link"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
