export default async function before(m, { conn }) {
    if (!global.db?.users[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || '👤 مواطن';
    
    const levels = [
        { min: 0, max: 99, name: '👤 مواطن' },
        { min: 100, max: 249, name: '🛡️ جندي متدرب' },
        { min: 250, max: 499, name: '⚔️ جندي استطلاع' },
        { min: 500, max: 799, name: '🗡️ محارب متمرس' },
        { min: 800, max: 1199, name: '🔥 جندي النخبة' },
        { min: 1200, max: 1699, name: '💢 كابتن السرية' },
        { min: 1700, max: 2299, name: '🦾 قائد الفيلق' },
        { min: 2300, max: 2999, name: '⚡ عملاق الهجوم' },
        { min: 3000, max: 3799, name: '🌋 عملاق التدمير' },
        { min: 3800, max: 4699, name: '💀 عملاق المؤسس' },
        { min: 4700, max: 5699, name: '🌀 إيرن المُحرر' },
        { min: 5700, max: 6799, name: '🔥 إيرن الغاضب' },
        { min: 6800, max: 7999, name: '⚔️ محارب الحرية' },
        { min: 8000, max: 9299, name: '🛡️ حامل الرغبة' },
        { min: 9300, max: 10699, name: '💢 قلب الغضب' },
        { min: 10700, max: 12199, name: '🌋 رماد العالم' },
        { min: 12200, max: 13799, name: '💀 نهاية العمالقة' },
        { min: 13800, max: 15499, name: '🔥 إيرن العملاق' },
        { min: 15500, max: 17499, name: '🦾 المؤسس الأعلى' },
        { min: 17500, max: 19999, name: '⚡ إمبراطور التيتان' },
        { min: 20000, max: Infinity, name: '🌀 إيرن ييغر - المدمر' }
    ];
    
    let newLevel = level;
    let newNameLevel = nameLevel;
    let levelUp = false;
    let oldLevel = level;
    
    for (const lvl of levels) {
        if (xp >= lvl.min && xp <= lvl.max) {
            const currentLevelNum = levels.findIndex(l => l.min === lvl.min);
            if (currentLevelNum !== level) {
                newLevel = currentLevelNum;
                newNameLevel = lvl.name;
                levelUp = true;
                oldLevel = level;
            }
            break;
        }
    }
    
    if (levelUp) {
        user.level = newLevel;
        user.nameLevel = newNameLevel;
        
        const msg = `╭─┈─┈─┈─⟞⚔️⟝─┈─┈─┈─╮
┃ *⚔️ تـرقـيـة إيـرن يـيـغـر 🔥*
╰─┈─┈─┈─⟞💢⟝─┈─┈─┈─╯

┃ @${m.sender.split('@')[0]}
┃ المستوى السابق: *${oldLevel}*
┃ المستوى الجديد: *${newLevel}*

┃ 🏷️ *لقبك الجديد:*
┃ ✦ ${newNameLevel} ✦

╭─┈─┈─┈─⟞🔥⟝─┈─┈─┈─╮
┃ *المعركة لسه مخلصتش يا جندي* 🦾
╰─┈─┈─┈─⟞💀⟝─┈─┈─┈─╯`;
        
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
                    newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                    serverMessageId: 0
                },
                externalAdReply: {
                    title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫",
                    body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
                    thumbnailUrl: "https://i.pinimg.com/originals/81/89/fd/8189fd909bbae4ba4e8f1d940f500a60.jpg",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: reply_status });
    }
    
    return false;
            }
