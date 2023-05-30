import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },

    // is_available: {
    //   type: Boolean,
    //   default: true,
    // },
    review: {
      type: String,
    },
    // onPage: {
    //   type: Boolean,
    //   default: true,
    // },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      virtual: true,
      get: function () {
        return this.category_id;
      },
    },
  },
  { strictPopulate: false },
  {
    timestamps: true,
    collection: "Product",
  }
);
ProductSchema.plugin(mongoosePaginate);

ProductSchema.pre(["find", "findOne", "create", "save"], function () {
  this.populate(["category_id", "user_id"]);
});
const productModel = model("Product", ProductSchema);
productModel.paginate().then({});
export default model("Product", ProductSchema);
