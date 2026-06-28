import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;

        const participants = event.participants.filter(p => p?.phoneNumber).map(p => p.phoneNumber);
        const author = event.author;
        let txt;

        const users = participants.length 
            ? participants.map(p => '@' + p.split('@')[0]).join(' and ') 
            : 'No users';
        const authorTag = author ? '@' + author.split('@')[0] : 'Unknown';

        const messages = {
            add: `⚔️ مـنـور الـمـعـسـكـر ${users} ${authorTag === users ? "" : `\n𝐛𝐲 ${authorTag}`} 🔥`,
            remove: `${users} تم إزالته من المعسكر ${authorTag === users ? "" : `\n𝐛𝐲 ${authorTag}`} 💀`,
            promote: `🦾 مـبـروك الـقـيـادة ${users}\nby ${authorTag}`,
            demote: `💢 بـقـيـت جـنـدي ${users}\nby ${authorTag}`
        };

        txt = messages[eventType];
        if (!txt) return null;
        
        if (global.db.groups[event.chat].noWelcome === true) return 9999;

        const img = ["remove", "add"].includes(eventType) 
            ? (event.userUrl || "https://files.catbox.moe/hm9iq4.jpg") 
            : "https://files.catbox.moe/hm9iq4.jpg";

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: ctx.config?.info.nameBot || "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛",
            body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
            },
            big: ["remove", "add"].includes(eventType)
        });

    } catch (e) {
        console.error(e);
    }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    const quoted = {
        key: {
            participant: `${msg.sender.split('@')[0]}@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: `${msg.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${msg.pushName}\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nEND:VCARD`,
            },
        },
        participant: '0@s.whatsapp.net',
    };
    
    const messages = {
        cooldown: `⚔️ *استنى ${time || 'كام ثانيه'} ثانية يا جندي!* 🔥\n⊱⋅ ──────────── ⋅⊰\n> *_لازم تصبر شويه عشان الأمر ده مينفعش فيه سبام_*`,
        owner: `💢 *الأمر ده للقادة بس يا جندي!* 🦾\n⊱⋅ ──────────── ⋅⊰\n> *_الأمر ده لـ القادة البوت لازم تكون قائد عشان تقدر تستخدمه_*`,
        group: `💀 *الأمر ده بيشتغل بس في المعسكرات!* ⚔️\n⊱⋅ ──────────── ⋅⊰\n> *_لازم الأمر ده تستخدمه في جروب فقط_*`,
        admin: `🔥 *الأمر ده للقادة والمشرفين بس!* 👑\n⊱⋅ ──────────── ⋅⊰\n> *_انت مجرد جندي لازم تبقي قائد يا جندي_*`,
        private: `🦾 *الأمر ده في الخاص بس يا جندي!* 💢\n⊱⋅ ──────────── ⋅⊰\n> *_الأمر في الخاص بس ياقلبي_*`,
        botAdmin: `⚔️ *لازم اكون قائد عشان أنفذ الأمر!* 🦾\n⊱⋅ ──────────── ⋅⊰\n> *_حطني قائد عشان تقدر تستعمل الأمر ده_*`,
        noSub: `💀 *الأمر ده للجند الأساسي بس!* 🔥\n⊱⋅ ──────────── ⋅⊰\n> *_ادخل المعسكر ده و جرب الأمر [ https://chat.whatsapp.com/Epfd9J7t8tR6nnpIDjtGQZ?mode=gi_t ]_*`,
        disabled: `📛 *الأمر متوقف تحت الصيانة يا جندي!* 🛠️\n⊱⋅ ──────────── ⋅⊰\n> *_الأمر تحت الصيانة قريباً يشتغل تاني_*`,
        error: `❌ *الأمر فيه خطأ يا جندي! كلم القادة* 💢\n⊱⋅ ──────────── ⋅⊰\n*_اكتب " .المطور " عشان يبعتلك رقم القائد_*`
    };
    
    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.pinimg.com/originals/02/c3/51/02c351dfd4eb72a62f225ce964dc510d.jpg",
            title: "⚔️ 𝐀𝐥𝐞𝐫𝐭𝐬 | 𝐖𝐚𝐫𝐧𝐢𝐧𝐠𝐬 🔥",
            body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝚁𝚎𝚊𝚍 𝚝𝚑𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎",
            newsletter: {
                name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
                jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
            },
            big: false
        }, quoted);
        return false;  
    }
    return null;  
};

export { access, group };
