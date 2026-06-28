let control = async (m, { command, text, conn, bot, participants }) => {
    try {
        const isBotOwner = (userId) => {
            if (!bot.config || !bot.config.owners) return false;
            return bot.config.owners.some(owner => 
                owner.jid === userId || owner.lid === userId
            );
        };

        const getUser = () => {
            if (m.quoted) return m.quoted.sender;
            if (m.mentionedJid && m.mentionedJid.length > 0) return m.mentionedJid[0];
            if (text) return text + "@s.whatsapp.net";
            return null;
        };

        if (command === "ضيف") {
            if (!text) return m.reply("❌ فين الرقم؟");
            if (m.quoted) {
                await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], 'add');
                return m.reply("*✅ تمت الإضافة*");
            }
            if (m.mentionedJid && m.mentionedJid.length > 0) {
                await conn.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], 'add');
                return m.reply("*✅ تمت الإضافة*");
            }
            await conn.groupParticipantsUpdate(m.chat, [text + "@s.whatsapp.net"], 'add');
            return m.reply("*✅ تمت الإضافة*");
        }
        
        if (command === "انطر") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            if (isBotOwner(user) || user === conn.user.id) {
                m.reply("بتهزر ؟");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            
            // رسالة الطرد الجديدة
            const userTag = user.split('@')[0];
            return m.reply(`🐦 *تم نطرك بنجاح يا @${userTag}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "رفاعي") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            // التأكد إن الشخص مش مشرف قبل ما يترفع
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (member && (member.admin === 'admin' || member.admin === 'superadmin')) {
                    return m.reply("❌ ده مشرف بالفعل يا معلم 😂");
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            
            // رسالة الرفع الجديدة
            const userTag = user.split('@')[0];
            return m.reply(`🐦 *تم اخدك ع رفاعي بنجاح يا @${userTag}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "ريح") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            // منع تنزيل الأونر
            if (isBotOwner(user)) {
                return m.reply("❌ مش هتنزل الأونر يا معلم 😂");
            }
            
            // التأكد إن الشخص مشرف قبل ما يتنزل
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (!member || (member.admin !== 'admin' && member.admin !== 'superadmin')) {
                    return m.reply("❌ ده مش مشرف أصلاً 😂");
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            
            // رسالة التنزيل الجديدة
            const userTag = user.split('@')[0];
            return m.reply(`👾 *شوف حد يديك رول بق يا @${userTag}* 👾`, null, { mentions: [user] });
        }
        
    } catch (error) {
        await m.reply("❌ " + error.message);
    }
};

control.usage = ['ضيف', 'انطر', 'رفاعي', 'ريح'];
control.command = ['ضيف', 'انطر', 'رفاعي', 'ريح'];
control.admin = true;
control.botAdmin = true;
control.category = "admin";
export default control;
