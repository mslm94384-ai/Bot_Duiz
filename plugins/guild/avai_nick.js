const handler = async (m, { text }) => {
    if (!text) return m.reply('⚔️ *اكتب اللقب يا جندي!* 🔥\n> مثال: .متوفر لقب_المعركة');
    
    const data = global.db.group?.[m.chat]?.nicknames;
    if (!data) return m.reply('💀 *مفيش ألقاب في المعسكر يا جندي!*');
    
    const exists = Object.values(data).includes(text.trim());
    m.reply(exists ? `💢 *اللقب "${text}" محجوز بالفعل يا جندي!*` : `🦾 *اللقب "${text}" متوفر يا جندي!*`);
};

handler.command = ["متوفر"];
handler.group = true;
handler.usage =  ["متوفر"];
handler.category = "nicknames";
handler.admin = true;
export default handler;
