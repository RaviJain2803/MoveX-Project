import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
{
    catnm : {
        type : String,
        required : [true, "Category name is required"],
        lowercase : true,
        unique : true,
        trim : true,
        minlength : [2 , "Category name must be at least 2 characters"]
    },

    caticonnm : {
        type : String,
        required : [true , "Category icon is required"],
        trim : true
    },

    description : {
        type : String,
        trim : true,
        default : ""
    },

    status : {
        type : Boolean,
        default : true
    },
    isDeleted: {
    type: Boolean,
    default: false
}
},
{
    timestamps : true,
}
);

const CategorySchemaModel = mongoose.model("category_collection" ,CategorySchema);

export default CategorySchemaModel;