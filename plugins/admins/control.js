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

        // دالة لعمل منشن مضمن في النص
        const getMentionText = (userId) => {
            return `@${userId.split('@')[0]}`;
        };

        if (command === "ضيف") {
            if (!text) return m.reply("❌ فين الرقم؟");
            let user = getUser();
            if (!user) return m.reply("❌ مفيش شخص محدد");
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'add');
            const mentionText = getMentionText(user);
            return m.reply(`✅ *تمت إضافة ${mentionText} بنجاح* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "انطر") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            if (isBotOwner(user) || user === conn.user.id) {
                m.reply("بتهزر ؟");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            const mentionText = getMentionText(user);
            return m.reply(`🐦 *تم نطرك بنجاح يا ${mentionText}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "رفاعي") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            // التأكد إن الشخص مش مشرف قبل ما يترفع
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (member && (member.admin === 'admin' || member.admin === 'superadmin')) {
                    const mentionText = getMentionText(user);
                    return m.reply(`❌ ${mentionText} مشرف بالفعل يا معلم 😂`, null, { mentions: [user] });
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            const mentionText = getMentionText(user);
            // هنا التعديل الرئيسي - منشن قبل وبعد
            return m.reply(`🐦 *تم اخدك ع رفاعي بنجاح ${mentionText}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "ريح") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            // منع تنزيل الأونر
            if (isBotOwner(user)) {
                const mentionText = getMentionText(user);
                return m.reply(`❌ مش هتنزل ${mentionText} الأونر يا معلم 😂`, null, { mentions: [user] });
            }
            
            // التأكد إن الشخص مشرف قبل ما يتنزل
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (!member || (member.admin !== 'admin' && member.admin !== 'superadmin')) {
                    const mentionText = getMentionText(user);
                    return m.reply(`❌ ${mentionText} مش مشرف أصلاً 😂`, null, { mentions: [user] });
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            const mentionText = getMentionText(user);
            return m.reply(`👾 *شوف حد يديك رول بق يا ${mentionText}* 👾`, null, { mentions: [user] });
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
