import mongoose, { Collection } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const silentRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: String,
      require: true,
    },
  },
  {
    collection: SilentRoom,
  }
);
silentRoomSchema.plugin(mongoosePaginate);
const silentRoomModel= model('SilentRoom', silentRoomSchema);
silentRoomModel.paginate().then({});
export default silentRoomModel;