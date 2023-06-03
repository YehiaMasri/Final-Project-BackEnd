import User from "../models/userModels.js";
import Room from "../models/entertainmentModels.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const editRoom = async (req, res, next) => {
  try {
    const product = req.params.id;
    const payload = req.body;
    Room.findByIdAndUpdate(product, payload).then((product) => {
      console.log(product);
      if (product) {
        res.status(200).json({
          message: "Room updated successfully",
          product,
        });
      } else {
        res.status(404).json({
          message: "Room not found",
        });
      }
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const getRooms = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const rooms = await Room.find({
      ...others,
    })
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// export const bookSection = async (req, res) => {
//   try {
//     const { userId, roomId } = req.body;

//     const user = await User.findById(userId).populate('bookedSections');
//     const section = await Room.findById(roomId).populate({
//       path: 'bookings.user',
//       populate: {
//         path: 'bookedSections',
//         model: 'Room'
//       }
//     }).populate('bookedSections');

//     if (!user || !section) {
//       return res.status(404).json({ message: "User or section not found" });
//     }

//     const booking = {
//       user: user._id,
//       bookedAt: new Date(),
//     };

//     section.bookings.push(booking);
//     section.seat_available--;

//     await section.save();

//     user.bookedSections.push(section);
//     await user.save();

//     // Populate user and section data in the response
//     const populatedUser = await User.populate(user, { path: 'bookedSections' });
//     const populatedSection = await Room.populate(section, { path: 'bookings.user' });

//     return res
//       .status(200)
//       .json({ message: "Section booked successfully", section: populatedSection, user: populatedUser });
//   } catch (error) {
//     return res.status(500).json({ message: "Error booking section", error });
//   }
// };

export const bookSection = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const user = await User.findById(userId);
    const section = await Room.findById(roomId);

    if (!user || !section) {
      return res.status(404).json({ message: 'User or section not found' });
    }

    const booking = {
      user: user._id,
      bookedAt: new Date()
    };

    section.bookings.push(booking);
    section.seat_available--;

    await section.save();

    user.bookedSections.push(section);
    await user.save();

    return res.status(200).json({ message: 'Section booked successfully', section});
  } catch (error) {
    return res.status(500).json({ message: 'Error booking section', error });
  }
};