import user from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await user
      .find({
        _id: { $ne: loggedInUserId }
      })
      .select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getUserForSidebar: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {text, image} = req.body
    const {id: receiverId} = req.params;
    
  } catch (error) {
    console.log('error: ', error);
    
  }
};
