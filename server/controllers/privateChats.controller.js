const db = require("../db").db;
const PrivateChat = db.privateChat;
const Message = db.message;
const Users = db.users;

exports.findOne = async (req, res) => {
  const { secUserId } = req.params;
  const reqUser = req.user;

  console.log(req.params, reqUser.id);
  const privateChat = await PrivateChat.findOne({
    where: { secUser: secUserId, firUser: reqUser.id },
    include: [
      {
        model: Message,
        as: "Messages",
      },
    ],
  });

  const secUser = await Users.findOne({
    where: { id: secUserId },
  });

  if (!(privateChat && secUser)) {
    return res.status(404).json({ message: "Chat introuvable" });
  }

  return res.status(200).json({ privateChat, secUser });
};
