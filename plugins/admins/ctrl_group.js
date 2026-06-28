const handler = async (m, { conn, command }) => {
  if (command === "اقفل يبني") {
    // قفل المجموعة
    await conn.groupSettingUpdate(m.chat, 'announcement');
    
    // جلب المشاركين لعمل منشن
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants.map(p => p.id);
    
    // رسالة القفل مع منشن للكل
    const text = `🔒 *البار مقفول يعيال خفو رغي* 🐦\n\n${participants.map(p => `@${p.split('@')[0]}`).join(' ')}`;
    
    await conn.sendMessage(m.chat, {
      text: text,
      mentions: participants
    });
    
  } else if (command === "هنرش مياه") {
    // فتح المجموعة
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    
    // جلب المشاركين لعمل منشن
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants.map(p => p.id);
    
    // رسالة الفتح مع منشن للكل
    const text = `🔓 *البار مفتوح ارغو يعيال* 🐦🫶🏻\n\n${participants.map(p => `@${p.split('@')[0]}`).join(' ')}`;
    
    await conn.sendMessage(m.chat, {
      text: text,
      mentions: participants
    });
  }
};

handler.usage = ["اقفل يبني", "هنرش مياه"];
handler.category = "admin";
handler.command = ["اقفل يبني", "هنرش مياه"];
handler.admin = true;
handler.botAdmin = true;

export default handler;
