import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const FilmSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    filmCategory: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Film",
  }
);

const filmModel = model("Film", FilmSchema);
FilmSchema.plugin(mongoosePaginate);

export default filmModel;
