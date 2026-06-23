import mongoose from "mongoose";

const SubCategorySchema = mongoose.Schema(
{
    catnm : {
        type : String,
        required : [true,"Category name is required"],
        lowercase : true,
        trim : true,
    },

    subcatnm : {
        type : String,
        required : [true,"Sub Category name is required"],
        lowercase : true,
        trim : true,
        unique : true,
        minlength : [2,
        "Sub Category name must be at least 2 characters"]
    },

    subcaticonnm : {
        type : String,
        required : [true,"Sub Category icon is required"],
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
    }
},
{
    timestamps : true
});

const SubCategorySchemaModel =
mongoose.model(
    "subcategory_collection",
    SubCategorySchema
);

export default SubCategorySchemaModel;