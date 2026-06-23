import '../models/connection.js';
import rs from "randomstring";
import CategorySchemaModel from "../models/category.model.js";
import path from "path";
import url from "url";



export const save = async (req, res) => {
    try {
         console.log("BODY => ", req.body);

        console.log("FILES => ", req.files);

        console.log("CATICON => ", req?.files?.caticon);
        // Check if file is uploaded
        // User must upload category icon
        if (!req.files || !req.files.caticon) {
            return res.status(400).json({
                status: false,
                message: "Category icon is required",
            });
        }

        const caticon = req.files.caticon;

        // Allow only image files
        // Prevent users from uploading .exe, .zip, .js etc.
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
            "image/svg+xml",
        ];

        if (!allowedTypes.includes(caticon.mimetype)) {
            return res.status(400).json({
                status: false,
                message: "Only image files are allowed",
            });
        }

        // Extract data from request body
        const { catnm, description } = req.body;

        // Backend validation
        // Frontend validation ko trust nahi karte
        // User Postman se empty category bhej sakta hai
        if (!catnm || catnm.trim() === "") {
            return res.status(400).json({
                status: false,
                message: "Category name is required",
            });
        }

        // Description optional hai
        // Agar nahi aayi to empty string save hogi
        // Agar spaces hain to trim ho jayengi
        const desc = description?.trim() || "";

        // Generate unique filename
        // Prevent same file names from overwriting each other
        const caticonnm =
            rs.generate(10) +
            "_" +
            Date.now() +
            "_" +
            caticon.name;

        // Prepare category data for MongoDB

        const cDetails = {

            // Copy all request body fields
            ...req.body,

            // Remove extra spaces
            // Example:
            // "   House Shifting   "
            // becomes
            // "House Shifting"
            catnm: catnm.trim(),

            // Save cleaned description
            description: desc,

            // Save generated image name
            caticonnm,
        };

        // Get current directory path
        // Required because __dirname is not available in ES Modules
        const __dirname = url.fileURLToPath(
            new URL("./", import.meta.url)
        );

        // Create upload path
        const uploadpath = path.join(
            __dirname,
            "../../Frontend/public/uploads/caticons",
            caticonnm
        );

        // Save image into uploads folder
        await caticon.mv(uploadpath);

        // Save category into MongoDB
        await CategorySchemaModel.create(cDetails);

        return res.status(201).json({
            status: true,
            message: "Category saved successfully",
        });

    } catch (error) {

        console.log(error);

        // MongoDB duplicate key error
        // Triggered when same category name already exists
        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Category already exists",
            });
        }

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


// export const save = async (req,res)=>{
//     try {
//         // check file exists 
//         if(!req.files || !req.files.caticon){
//             return res.status(400).json({
//                 status : false,
//                 message : "Category icon is required",
//             });
//         }

//         const caticon = req.files.caticon;

//         // Validate image types
//         const allowedTypes = [
//             "image/png",
//             "image/jpeg",
//             "image/jpg",
//             "image/webp",
//             "image/svg+xml",
//         ];

//         if(!allowedTypes.includes(caticon.mimetype)){
//             return res.status(400).json({
//                 status : false,
//                 message : "Only image files are allowed"
//             })
//         }

//         // Generate unique filename
//         const caticonnm = rs.generate(10) + "_" + Date.now() +"_" +caticon.name;

//         //Prepare category data
//         const cDetails = {
//             ...req.body ,
//              caticonnm,
//         };

//         //upload path
//         const __dirname = url.fileURLToPath(new URL("./",import.meta.url) );

//         const uploadpath = path.join(__dirname,"../../Frontend/public/uploads/caticons", caticonnm )
         
//         // Save file
//         await caticon.mv(uploadpath);

//         //Save category in DB
//         await CategorySchemaModel.create(cDetails);

//         return res.status(201).json({
//             status : true,
//             message : "Category saved successfully",
//         });

//     } catch (error) {
//         console.log(error);

//          // Duplicate category name
//     if (error.code === 11000) {
//       return res.status(400).json({
//         status: false,
//         message: "Category already exists",
//       });
//     }
//      return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
        
//     }
// }



export const fetch = async (req, res) => {
    try {

        // Allowed filters
        // Sirf ye fields search ke liye allow hongi
        const { catnm, status } = req.query;

        const condition = {};
        condition.isDeleted = false;

        // Search by category name
        // Example:
        // /category/fetch?catnm=house shifting
        if (catnm) {
            condition.catnm = catnm.toLowerCase().trim();
        }

        // Search by status
        // Example:
        // /category/fetch?status=true
        if (status !== undefined) {
            condition.status = status === "true";
        }

        // Fetch categories
        const cList = await CategorySchemaModel.find(condition);

        // No data found
        if (cList.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No categories found",
            });
        }

        // Success response
        return res.status(200).json({
            status: true,

            // Total records found
            count: cList.length,

            // Actual data
            data: cList,
        });

    } catch (error) {

        console.error("FETCH ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};




// export const fetch = async(req,res)=>{
//     try {
//         const condition = req.query;
//         const cList = await CategorySchemaModel.find(condition);
//         if(cList.length === 0)
//         {
//             return res.status(404).json({status : false , message:"Resource not found "})
//         }
//         res.status(200).json(cList) //array pass
//     } catch (error) {
//         console.error("FETCH ERROR: ",error);
//         res.status(500).json({status : false , message : "Internal Server Error"})
//     }   
// }



export const update = async (req, res) => {
    try {

        // Category id URL query se aayegi
        // Example:
        // /category/update?_id=685c123

        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({
                status: false,
                message: "Category id is required",
            });
        }

        // Update data
        const updateData = {};

        // Category Name Update
        if (req.body.catnm) {
            updateData.catnm = req.body.catnm.trim();
        }

        // Description Update
        if (req.body.description !== undefined) {
            updateData.description = req.body.description.trim();
        }

        // Status Update
        if (req.body.status !== undefined) {
            updateData.status = req.body.status;
        }

        const updatedCategory =
            await CategorySchemaModel.findByIdAndUpdate(
                _id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!updatedCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });

    } catch (error) {

        console.log(error);

        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Category already exists",
            });
        }

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


export const deleteCategory = async (req, res) => {
  try {

    const { _id } = req.query;

    if (!_id) {
      return res.status(400).json({
        status: false,
        message: "Category id is required",
      });
    }

    const category = await CategorySchemaModel.findByIdAndUpdate(
      _id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};