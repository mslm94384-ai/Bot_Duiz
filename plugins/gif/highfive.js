import { Scrapy } from "meowsab";
import { gifToMp4 } from "../../system/utils.js";

let handler = async (m, { conn }) => {
    try {
        let target = m.mentionedJid?.[0] || m.quoted?.sender;
        if (!target) return m.reply(`⚔️ *منشن الشخص يا جندي!* 🔥\n> مثال: .مصافحه @${m.sender.split('@')[0]}`);

        let group = await conn.groupMetadata(m.chat);
        if (!group.participants.find(p => p.id === target)) {
            return m.reply(`💀 *العضو مش في الجروب يا ضعيف!*`);
        }

        const res = await Scrapy.AnimeGif("highfive");
        const { url, anime_name } = res.results[0];
        const video = await gifToMp4(url);
        
        await conn.sendMessage(m.chat, {
            caption: `🤝 *@${m.sender.split('@')[0]} يصافحك يا @${target.split('@')[0]}* 🦾\n> *_الأنمي: ${anime_name}_*\n\n> المصافحة قبل المعركة علامة شرف يا جندي! ⚔️`,
            video: video,
            gifPlayback: true,
            mentions: [target, m.sender],
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

    } catch (e) {
        m.reply(`❌ *حدث خطأ يا جندي!* 💢\n> ${e.message}`);
    }
}
handler.usage = ["مصافحه @منشن"];
handler.category = "gif";
handler.command = ["مصافحه"];

export default handler;
