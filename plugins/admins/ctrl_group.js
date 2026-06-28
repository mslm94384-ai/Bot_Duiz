// أضف ده في ملف الأوامر (admin.js أو main.js)

if (command === "هنرش" || command === "اقفل" || command === "قفل") {
    // قفل المجموعة - منع الكتابة
    if (!m.isGroup) return m.reply("❌ دي للمجموعات بس");
    try {
        await conn.groupSettingUpdate(m.chat, 'announcement');
        return m.reply("🔒 *تم قفل المجموعة* 🔒\n🚫 ممنوع الكتابة من الأعضاء العاديين");
    } catch (error) {
        return m.reply("❌ " + error.message);
    }
}

if (command === "افتح" || command === "فتح") {
    // فتح المجموعة - السماح بالكتابة
    if (!m.isGroup) return m.reply("❌ دي للمجموعات بس");
    try {
        await conn.groupSettingUpdate(m.chat, 'not_announcement');
        return m.reply("🔓 *تم فتح المجموعة* 🔓\n✅ كل الأعضاء يقدر يكتبوا دلوقتي");
    } catch (error) {
        return m.reply("❌ " + error.message);
    }
}
