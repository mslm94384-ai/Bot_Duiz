import { Scrapy } from "meowsab";
import { gifToMp4 } from "../../system/utils.js";

let handler = async (m, { conn }) => {
    try {
        let target = m.mentionedJid?.[0] || m.quoted?.sender;
        if (!target) return m.reply(`⚔️ *منشن الشخص يا جندي!* 🔥\n> مثال: .ضحك @${m.sender.split('@')[0]}`);

        let group = await conn.groupMetadata(m.chat);
        if (!group.participants.find(p => p.id === target)) {
            return m.reply(`💀 *العضو مش في الجروب يا ضعيف!*`);
        }

        const res = await Scrapy.AnimeGif("laugh");
        const { url, anime_name } = res.results[0];
        const video = await gifToMp4(url);
        
        await conn.sendMessage(m.chat, {
            caption: `😂 *@${m.sender.split('@')[0]} بيضحك عليك يا @${target.split('@')[0]}* 🤣\n> *_الأنمي: ${anime_name}_*\n\n> اضحك يا جندي! الضحك أحسن سلاح في المعركة 🎯🔥`,
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
handler.usage = ["ضحك @منشن"];
handler.category = "gif";
handler.command = ["ضحك"];
export default handler;
