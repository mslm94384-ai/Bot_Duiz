import fs from 'fs';
import path from 'path';

const findFile = (base, name) => {
    const search = (dir) => {
        if (!fs.existsSync(dir)) return null;

        for (const item of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, item);

            if (fs.statSync(fullPath).isDirectory()) {
                const found = search(fullPath);
                if (found) return found;
            } else if (item === `${name}.js`) {
                return fullPath;
            }
        }

        return null;
    };

    return search(base);
};

const handler = async (m, { conn, bot, text, command }) => {
    try {
        if (!m.isOwner) return m.reply('⚔️ *هذا الأمر للقادة فقط يا جندي!* 🔥');

        if (!text) return m.reply(
            `⚔️ *طريقة الاستخدام يا قائد* — *.${command} اسم_الملف*\n> مثال : .${command} menu`
        );

        const base       = bot.config?.commandsPath || './plugins';
        const targetName = text.trim().replace(/\.js$/, '');
        const filePath   = findFile(base, targetName);

        if (!filePath || !fs.existsSync(filePath)) {
            return m.reply(`💀 *لم يتم العثور على ملف: ${targetName}.js يا جندي!*`);
        }

        const fileContent  = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(base, filePath);

        return await conn.sendAiMessage(m.chat, [
            {
                type: 2,
                text: `📄 *مسار الملف* : \`${relativePath}\``,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 1,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
                        newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                        serverMessageId: 0
                    }
                }
            },
            {
                type: 5,
                codeMetadata: {
                    language: 'javascript',
                    code: fileContent
                },
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 1,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
                        newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                        serverMessageId: 0
                    }
                }
            }
        ]);

    } catch (error) {
        return m.reply(`❌ *حدث خطأ يا قائد!* 💢\n> ${error.message}`);
    }
};

handler.category = 'owner';
handler.usage    = ['كود'];
handler.command  = ['كود', 'getcode', 'cat'];
handler.owner    = true;

export default handler;
