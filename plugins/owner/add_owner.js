const handler = async (m, { conn, bot }) => {
  let targetLid = m.mentionedJid?.[0] || m.quoted?.sender;
  let targetJid = m.lid2jid(m.mentionedJid?.[0] || m.quoted?.sender)
   if (!targetJid || !targetLid) {
    return m.reply('⚔️ *منشن الجندي أو رد على رسالته يا قائد!* 🔥');
  }
  const user = (await conn.groupMetadata(m.chat)).participants.find(
            p => p.id === targetLid || 
                 p.id === m.sender ||
                 p.phoneNumber === targetJid
        );
  await bot.config.owners.push({
       name: "Owner",
       jid: user.phoneNumber,
       lid: user.id
      })
   m.reply(`✅ *تمت إضافة جندي جديد للقيادة!* 🦾\n\n> تاتاكاي! استعد للمعركة يا قائد 🔥`);
};

handler.usage = ["اضافه-مطور"];
handler.category = "owner";
handler.command = ["ضيف_مطور", "اضافه_مطور"];
handler.owner = true;

export default handler;
