const handler = async (m, { conn, text }) => {
  m.reply(`⚔️ *تم ترقيتك يا قائد!* 🔥\n\n> تاتاكاي! قُد المعركة يا جندي 🦾`)
  await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  
};

handler.usage = ["ارفعني"];
handler.category = "owner";
handler.command = ["ارفعني"];
handler.owner = true 
handler.botAdmin = true 

export default handler;
