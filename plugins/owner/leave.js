const handler = async (m, { conn, text }) => {
  m.reply(`⚔️ *المعركة انتهت... أراكم في المعركة القادمة* 🔥\n\n> تاتاكاي! استمروا في القتال يا جنود 🦾`)
  conn.groupLeave(m.chat)
};

handler.usage = ["اخرج"];
handler.category = "group";
handler.command = ["اخرج"];
handler.owner = true 
export default handler;
