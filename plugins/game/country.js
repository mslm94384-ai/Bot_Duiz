async function handler(m, { conn }) {
    if (!global.gameActive) global.gameActive = {};
    
    if (global.gameActive[m.chat]) {
        clearTimeout(global.gameActive[m.chat].timeout);
        delete global.gameActive[m.chat];
    }
    
    const res = await fetch("https://gist.githubusercontent.com/Kyutaka101/799d5646ceed992bf862026847473852/raw/dcbecff259b1d94615d7c48079ed1396ed42ef67/gistfile1.txt");
    const data = await res.json();
    const country = data[Math.floor(Math.random() * data.length)];
    
    const msg = await conn.sendMessage(m.chat, {
        image: { url: country.img },
        caption: `⚔️ *معركة الأعلام* 🔥\n\n@${m.sender.split('@')[0]}، لديك 30 ثانية لتحديد العلم!\n> تاتاكاي! أظهر قوتك يا جندي 🦾`,
        mentions: [m.sender],
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
    
    global.gameActive[m.chat] = {
        answer: country.name.toLowerCase(),
        image: country.img,
        msgId: msg.key.id,
        timeout: setTimeout(() => {
            if (global.gameActive[m.chat]) {
                const answer = global.gameActive[m.chat].answer;
                delete global.gameActive[m.chat];
                conn.sendMessage(m.chat, { 
                    text: `💀 *انتهى الوقت يا ضعيف!*\nالإجابة الصحيحة هي: *${answer}*\n> المرة الجاية هتبقى أقوى 🦾`,
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
            }
        }, 30000)
    };
}

handler.before = async (m, { conn }) => {
    if (!m.quoted || !m.text) return;
    if (!global.gameActive?.[m.chat]) return;
    
    const game = global.gameActive[m.chat];
    if (m.quoted.id !== game.msgId) return;
    
    if (m.text.toLowerCase().trim() === game.answer) {
        clearTimeout(game.timeout);
        delete global.gameActive[m.chat];
        
        if (global.db?.users[m.sender]) {
            global.db.users[m.sender].xp = (global.db.users[m.sender].xp || 0) + 100;
            global.db.users[m.sender].cookies = (global.db.users[m.sender].cookies || 0) + 2;
        }
        
        await conn.sendMessage(m.chat, {
            image: { url: game.image },
            caption: `🔥 *تاتاكاي! أحسنت يا بطل!* 🔥\n\n@${m.sender.split('@')[0]}، عرفت العلم صح!\n🎉 +100 XP و 🍪 +2 كوكيز\n\n> المعركة مستمرة... جهز نفسك للجولة القادمة ⚔️`,
            mentions: [m.sender],
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
        return true;
    }
    
    await conn.sendMessage(m.chat, {
        text: `💢 *إجابة غلط يا جندي!*\n@${m.sender.split('@')[0]}، ركز في المعركة! حاول تاني 🦾`,
        mentions: [m.sender],
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
    return true;
};

handler.usage = ["علم"];
handler.category = "games";
handler.command = ['علم', 'country'];

export default handler;
