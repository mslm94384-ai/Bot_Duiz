let user = async (m, { args, command, text, conn }) => {
    
    try {
        const groupMetadata = await conn.groupMetadata(m.chat);
        let participant = groupMetadata.participants.find(
            p => p.id === m.sender || 
                 p.id.split('@')[0] === m.sender ||
                 p.phoneNumber === m.sender
        );

        if (!participant) {
            return m.reply(`⚔️ *الرقم لازم يبقى في المعسكر يا جندي!* 🔥`);
        }

        const user = {
            name: m.name || "جندي مجهول",
            jid: participant.phoneNumber,
            lid: participant.id
        };
        
        m.reply(`⚔️ *معلومات الجندي* 🦾

📛 *الاسم:* ${user.name}
📱 *الرقم:* ${user.jid}
🆔 *المعرف:* ${user.lid}

> تاتاكاي! استمر في القتال يا جندي 🔥`);
        
    } catch (err) {
        m.reply(`❌ *حدث خطأ يا جندي!* 💢\n> ${err.message}`);
    }
};

user.command = ['لمطور','id'];
export default user;
