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

        // دالة لجلب اسم المستخدم من المجموعة
        const getParticipantName = async (userId) => {
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const participant = groupMetadata.participants.find(p => p.id === userId);
                if (participant && participant.name) {
                    return participant.name;
                }
                // لو مش لاقي الاسم، استخدم pushName من الرسالة
                if (m.mentionedJid && m.mentionedJid.includes(userId)) {
                    // حاول تجيب الاسم من الـ message
                }
                return userId.split('@')[0]; // الرقم كـ fallback
            } catch {
                return userId.split('@')[0];
            }
        };

        if (command === "ضيف") {
            if (!text) return m.reply("❌ فين الرقم؟");
            let user = getUser();
            if (!user) return m.reply("❌ مفيش شخص محدد");
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'add');
            const userName = await getParticipantName(user);
            // استخدام الاسم بدل الأرقام
            return m.reply(`✅ *تمت إضافة @${userName} بنجاح* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "انطر") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            if (isBotOwner(user) || user === conn.user.id) {
                m.reply("بتهزر ؟");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            const userName = await getParticipantName(user);
            return m.reply(`🐦 *تم نطرك بنجاح يا @${userName}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "رفاعي") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (member && (member.admin === 'admin' || member.admin === 'superadmin')) {
                    const userName = await getParticipantName(user);
                    return m.reply(`❌ @${userName} مشرف بالفعل يا معلم 😂`, null, { mentions: [user] });
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            const userName = await getParticipantName(user);
            // التعديل الرئيسي هنا - استخدام الاسم بدل الرقم
            return m.reply(`🐦 *تم اخدك ع رفاعي بنجاح يا @${userName}* 🐦`, null, { mentions: [user] });
        }
        
        if (command === "ريح") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن أو رد على العضو");
            
            if (isBotOwner(user)) {
                const userName = await getParticipantName(user);
                return m.reply(`❌ مش هتنزل @${userName} الأونر يا معلم 😂`, null, { mentions: [user] });
            }
            
            try {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const member = groupMetadata.participants.find(p => p.id === user);
                if (!member || (member.admin !== 'admin' && member.admin !== 'superadmin')) {
                    const userName = await getParticipantName(user);
                    return m.reply(`❌ @${userName} مش مشرف أصلاً 😂`, null, { mentions: [user] });
                }
            } catch {}
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            const userName = await getParticipantName(user);
            return m.reply(`👾 *شوف حد يديك رول بق يا @${userName}* 👾`, null, { mentions: [user] });
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
