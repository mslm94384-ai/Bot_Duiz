import fs from 'fs';
import path from 'path';

const ff = async (m, { conn, text, command }) => {
    let target = m.mentionedJid?.[0] || m.quoted?.sender;
    
    if (!target && text?.includes('@')) {
        target = text.replace('@', '') + '@s.whatsapp.net';
    }
    
    if (!target) {
        return m.reply(`⚔️ *منشن الجندي يا قائد!* 🔥\n> مثال: .${command} @${m.sender.split('@')[0]}`);
    }
    
    const jid = await m.lid2jid(target);
    const user = global.db.users[jid] || {};
    
    const isUnban = command === "فك_حظر" || command === "الغاء_الحظر";
    
    if (isUnban) {
        if (user.banned) {
            delete user.banned;
            await conn.sendMessage(m.chat, { 
                text: `✅ *تم فك حظر الجندي @${target.split('@')[0]}* 🦾\n> *_دلوقت يقدر يرجع للمعركة_*`, 
                mentions: [target],
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
        } else {
            m.reply(`💢 *الجندي @${target.split('@')[0]} مش محظور يا قائد!*`, { mentions: [target] });
        }
        return;
    }
    
    user.banned = true;
    await conn.sendMessage(m.chat, { 
        text: `✅ *تم حظر الجندي @${target.split('@')[0]}* 💀\n> *_مش هيعرف يقاتل معانا تاني_*`, 
        mentions: [target],
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

ff.usage = ["حظر", "فك_حظر"];
ff.category = "owner";
ff.command = ["حظر", "فك_حظر", "الغاء_الحظر"];
ff.owner = true;

export default ff;
