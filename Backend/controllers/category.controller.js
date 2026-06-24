import '../models/connection.js';
import rs from "randomstring";
import CategorySchemaModel from "../models/category.model.js";
import path from "path";
import fs from "fs";

export const save = async (req, res) => {
  try {
    console.log("BODY => ", req.body);
    console.log("FILES => ", req.files);

    if (!req.files || !req.files.caticon) {
      return res.status(400).json({
        status: false,
        message: "Category icon is required",
      });
    }

    const caticon = req.files.caticon;

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

    const { catnm, description } = req.body;

    if (!catnm || !catnm.trim()) {
      return res.status(400).json({
        status: false,
        message: "Category name is required",
      });
    }

    const caticonnm =
      rs.generate(10) +
      "_" +
      Date.now() +
      "_" +
      caticon.name;

    const cDetails = {
      ...req.body,
      catnm: catnm.trim(),
      description: description?.trim() || "",
      caticonnm,
    };

    // Upload Folder
    const uploadDir = path.join(
      process.cwd(),
      "uploads",
      "caticons"
    );

    // Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const uploadpath = path.join(
      uploadDir,
      caticonnm
    );

    // Save image
    await caticon.mv(uploadpath);

    // Save DB
    await CategorySchemaModel.create(cDetails);

    return res.status(201).json({
      status: true,
      message: "Category saved successfully",
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