import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const playStationSchema = new Schema(
  {
    game: {
      type: String,
      require: true,
    },
    hourlyRate: {
      type: Number,
      require: true,
    },
    nbrOfPerson: {
      type: Number,
      require: true,
    },
    ps: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "PlayStation",
  }
);

playStationSchema.plugin(mongoosePaginate);

const playStationModel = model("PlayStation", playStationSchema);

export default playStationModel;