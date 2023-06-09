import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

// validating the Email
let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// user model
const userSchema = new Schema(
  {
    
    username: {
      type: String,
      required: "username is required",
      trim: true,
      unique:true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: "password is required",
    },
    image: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // isAdmin:{
    //   type:Boolean,
    //   default:false
    // },
    bookedSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
      }
    ]
  },
  {
    timestamps: true,
    collection: "User",
  }
);
userSchema.pre(/^find/, function (next) {
  this.populate('bookedSections');
  next();
});

// hashing the password
userSchema.pre("save", function (next) {
  bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(this.password, salt))
      .then((hashPassword) => {
          this.password = hashPassword;
          next();
      })
      .catch((err) => {
          next(err);
      });
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// adding the pagination plugin
userSchema.plugin(mongoosePaginate);

const UserModel = model("User", userSchema);
export default UserModel;
