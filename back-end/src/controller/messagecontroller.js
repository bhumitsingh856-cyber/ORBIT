import Messages from "../models/messages.js";
import ChatList from "../models/chatlist.js";
const chatExists = async (req, res) => {
  const sender = req.user._id;
  const receiver = req.params.id;
  try {
    const chat = await ChatList.findOne({
      participants: { $all: [sender, receiver] },
    });
    if (!chat) {
        const newchat = await ChatList.create({
        participants: [sender, receiver],
        lastMessage: null,
      });
      await newchat.save();
      const chat = await Messages.create({ chatId: newchat._id, message: [] });
      await chat.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export default { chatExists };
