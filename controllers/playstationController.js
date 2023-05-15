import PlayStationModel from "../models/playstationModels.js";

// get the Game

export const GetAllGame = async (req, res) => {
  try {
    const games = await PlayStationModel.find({});
    res.status(200).json({ success: true, games });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete game

export const deleteGame = async (req, res) => {
  try {
    let { id } = req.params;
     await PlayStationModel.findByIdAndDelete({ _id: id })
     .then((response) => {
       res.status(200).json({
         success: true,
         response,
         message: "Game deleted successfully",
       });
     })
     .catch((err) =>
       res.status(404).json({ success: false, message: "Game not found", err })
     );
 } catch (error) {
  res.status(500).json({ message: error.message });
}
}

// add game

export const addGame = async (req, res) => {
  const newGame = new PlayStationModel(req.body);
  try {
    const game = await newGame.save();
    if (!game) {
      res.status(404).json({ success: false, message: "Game Not Found" });
    }
    res.status(200).json({ success: true, game });
  } catch (error) {
    return res.json({ message: error.message });
  }
};


// export const deleteAllGame = async (req, res) => {
//   try {
//     await PlayStationModel.deleteMany({});
//     res.status(200).json({ success: true, message: 'All game deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };