handler.before = async (m, { conn }) => {
    if (!m.text || !global.quiz?.games[m.chat] || !global.quiz?.scores[m.chat]) return;

    const game = global.quiz.games[m.chat];
    const player = m.sender;
    
    if (m.text.trim() !== game.answer) return;

    clearTimeout(game.timeout);
    delete global.quiz.games[m.chat];

    if (!global.quiz.scores[m.chat][player]) global.quiz.scores[m.chat][player] = 0;
    global.quiz.scores[m.chat][player]++;
    
    let total = 0;
    for (let id in global.quiz.scores[m.chat]) {
        total += global.quiz.scores[m.chat][id];
    }
    
    if (total >= 20) {
        const entries = Object.entries(global.quiz.scores[m.chat])
            .sort((a, b) => b[1] - a[1]);
        
        const sorted = entries.map(([id, score], i) => 
            `${i+1}. @${id.split('@')[0]} - ${score} نقطة`
        );
        
        const mentions = entries.map(([id]) => id);
        
        const winner = entries[0][0];
        if (global.db?.users[winner]) {
            global.db.users[winner].xp = (global.db.users[winner].xp || 0) + 500;
            global.db.users[winner].cookies = (global.db.users[winner].cookies || 0) + 10;
        }
        
        await conn.sendMessage(m.chat, { 
            text: `🏆 *أبطال معركة المسابقة* ⚔️\n\n${sorted.join('\n')}\n\n🏅 @${winner.split('@')[0]} حصل على +500 XP و 🍪 +10 كوكيز\n\n> تاتاكاي! استمر في القتال يا بطل 🦾`,
            mentions,
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
        delete global.quiz.scores[m.chat];
        return;
    }

    await conn.sendMessage(m.chat, {
        text: `✅ *تاتاكاي! أحسنت يا جندي!* 🔥\nمعاك: ${global.quiz.scores[m.chat][player]} نقطة\n> استمر في القتال 🦾`,
        mentions: [player],
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
    handler(m, { conn });
};

async function handler(m, { conn }) {
    if (!global.quiz) global.quiz = { games: {}, scores: {} };

    if (global.quiz.games[m.chat]) {
        clearTimeout(global.quiz.games[m.chat].timeout);
        delete global.quiz.games[m.chat];
    }

    const data = await (await fetch("https://raw.githubusercontent.com/Xov445447533/Xov11111/master/src/JSON/venom-كتابه.json")).json();
    const q = data[Math.floor(Math.random() * data.length)];
    
    await conn.sendMessage(m.chat, {
        text: `
╭─┈─┈─┈─⟞⚔️⟝─┈─┈─┈─╮
┃ *⌯︙ ${q.question}*
╰─┈─┈─┈─⟞🔥⟝─┈─┈─┈─╯
> _*اكتب الإجابة بسرعة يا جندي! + بعد ٣٠ ثانية لو مردتش المعركة هتنتهي*_ 🦾`,
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
    
    if (!global.quiz.scores[m.chat]) global.quiz.scores[m.chat] = {};
    
    global.quiz.games[m.chat] = {
        answer: q.response,
        timeout: setTimeout(() => {
            if (global.quiz.games[m.chat]) {
                delete global.quiz.games[m.chat];
                delete global.quiz.scores[m.chat];
                conn.sendMessage(m.chat, {
                    text: `💀 *انتهى الوقت يا ضعيف!*\n> المرة الجاية هتبقى أقوى 🦾`,
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

handler.usage = ["مسابقه"];
handler.category = "games";
handler.command = ['مسابقه'];
export default handler;
