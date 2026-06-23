import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

name:{
type:String,
required:[true,"Name is required"],
trim:true,
lowercase:true
},

email:{
type:String,
required:[true,"Email is required"],
unique:true,
trim:true,
lowercase:true,
match:[
/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
"Invalid email format"
]
},

password:{
type:String,
required:[true,"Password is required"],
minlength:[6,"Password must be at least 6 characters"]
},

mobile:{
type:String,
required:[true,"Mobile number is required"],
unique:true,
match:[
/^[0-9]{10}$/,
"Mobile number must be 10 digits"
]
},

address:{
type:String,
required:[true,"Address is required"],
trim:true
},

city:{
type:String,
required:[true,"City is required"],
trim:true
},

gender:{
type:String,
required:[true,"Gender is required"],
enum:["male","female"]
},

role:{
type:String,
enum:["user","admin"],
default:"user"
},

status:{
type:Number,
default:0
}

},
{
timestamps:true
});

const userSchemaModel = mongoose.model(
"user_collection",
UserSchema
);

export default userSchemaModel;