const handler = async (m, { conn }) => {
    const q = m.quoted || m;
    const mime = q.mimetype || '';

    if (!/image/.test(mime)) {
        return m.reply('⚔️ *رد على صورة يا قائد لتغيير صورة المعسكر* 🔥');
    }
     const jid = conn.user.id.split(":")[0] + "@s.whatsapp.net";


    try {
        const media = await q.download();
        await conn.updateProfilePicture(jid, media);
        m.reply('✅ *تم تغيير صورة معسكر الجند!* 🦾\n\n> تاتاكاي! استمر في القتال يا قائد 🔥');
    } catch (error) {
        console.error(error);
        m.reply(`❌ *حدث خطأ يا قائد!* 💢\n> ${error.message}`);
    }
};

handler.usage = ["ضع"];
handler.category = "owner";
handler.command = ["ضع", "botpp"];
handler.owner = true;

export default handler;
