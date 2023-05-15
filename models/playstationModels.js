import mongoose from "mongoose";
const {Schema, model} = mongoose;

const PlayStationSchema = new Schema(
    {
        game:{
            type: String,
            require:true
        },
        hourly_rate:{
            type:Number,
            require:true
        },
        nb_of_person:{
            type:Number,
            require:true,
        },
        type:{
            type:String,
        }
    },
    {
        timestamps:true,
        collection:"PlayStation",
    }
);

const playStationModel = model("PlayStation", PlayStationSchema);
export default model ("PlayStation", PlayStationSchema);
