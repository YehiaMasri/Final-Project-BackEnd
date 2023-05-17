import User from "../models/userModels.js";
import Room from "../models/entertainmentModels.js";

export const creatRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const room = await newRoom.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    let { id } = req.params;
    const delRoom = await Room.findByIdAndDelete({ id });
    res
      .status(200)
      .json({ message: "Room deleted successfully", response: delRoom });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const editRoom = async (req, res, next) => {
  try {
    const editRoom = await Room.findByIdAndUpdate(
      req.params.roomid,
      { $set: req.body },
      { new: true }
    );
    if (!editRoom) {
      res.status(404).json({ message: "Room not found" });
      res.status(200).json({ message: "Room updated successfully" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) {
      res.status(404).json({ message: "Rooms are not found" });
    }
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    let id = req.params.id;
    const room = await Room.find({ id });
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const bookSection = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const user = await User.findById(userId);
    const section = await Room.findById(roomId);

    if (!user || !section) {
      return res.status(404).json({ message: "User or section not found" });
    }

    const booking = {
      user: user._id,
      bookedAt: new Date(),
    };

    section.bookings.push(booking);
    section.seat_available--;

    await section.save();

    user.bookedSections.push(section);
    await user.save();

    return res
      .status(200)
      .json({ message: "Section booked successfully", section });
  } catch (error) {
    return res.status(500).json({ message: "Error booking section", error });
  }
};
