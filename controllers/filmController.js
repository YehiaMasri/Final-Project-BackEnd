import mongoosePaginate from 'mongoose-paginate-v2';

import filmModel from "../models/filmModles.js";

//get all film

export const getAllFilm = async (req, res) => {
  try {
    const films = await filmModel.find({});
    res.status(200).json({ success: true, films });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add a new film

export const addFilm = async (req, res) => {
  const newFilm = new filmModel(req.body);

  try {
    const Film = await newFilm.save();
    res.status(201).json(Film);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete film

export async function deleteFilm(req, res, next) {
  try {
    let { id } = req.params;
    await filmModel.findByIdAndDelete({ _id: id })
      .then((response) => {
        res.status(200).json({
          success: true,
          response,
          message: "Film deleted successfully",
        });
      })
      .catch((err) =>
        res.status(404).json({ success: false, message: "Film not found", err })
      );
  } catch (err) {
    return next(err);
  }
}

