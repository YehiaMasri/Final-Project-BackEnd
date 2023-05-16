import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const silentRoomSchema = new Schema(
  {
    capacity: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: String,
      require: true,
    },
    seat_available: {
        type: Number
    },  
    is_Available:{
      type:Boolean,
      default: true
    }
  },
  {
    collection: SilentRoom,
  }
);
silentRoomSchema.plugin(mongoosePaginate);
const silentRoomModel= model('SilentRoom', silentRoomSchema);
silentRoomModel.paginate().then({});
export default silentRoomModel;