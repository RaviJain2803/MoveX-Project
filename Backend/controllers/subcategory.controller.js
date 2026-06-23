import "../models/connection.js";
import SubCategorySchemaModel from "../models/subcategory.model.js";
import rs from "randomstring";
import url from "url";
import path from "path";

export const save = async (req, res) => {
  try {
    // Check file exists
    if (!req.files || !req.files.caticon) {
      return res.status(400).json({
        status: false,
        message: "Sub Category icon is required",
      });
    }

    const caticon = req.files.caticon;

    // Validate image types
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

    // Generate unique file name
    const subcaticonnm =
      rs.generate(10) + "_" + Date.now() + "_" + caticon.name;

    // Prepare object for DB
    const scDetails = {
      ...req.body,
      subcaticonnm: subcaticonnm,
    };

    // Current directory
    const __dirname = url.fileURLToPath(new URL("./", import.meta.url));

    // Upload path

    const uploadpath = path.join(
      __dirname,

      "../../Frontend/public/uploads/subcaticons",

      subcaticonnm,
    );

    // Save image
    await caticon.mv(uploadpath);

    // Save record in DB
    await SubCategorySchemaModel.create(scDetails);

    return res.status(201).json({
      status: true,
      message: "Sub Category saved successfully",
    });
  } catch (error) {
    console.log(error);

    // Duplicate subcategory
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Sub Category already exists",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const fetch = async (req, res) => {
  try {
    // Query conditions from URL
    const condition = req.query;

    // Fetch subcategories
    const scList = await SubCategorySchemaModel.find(condition).sort({
      createdAt: -1,
    });

    // No data found
    if (scList.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Sub Categories Found",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      count: scList.length,
      subCategoryList: scList,
    });
  } catch (error) {
    console.error("FETCH ERROR : ", error);

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    // Frontend se:
    // ?subcatnm=car transport

    const condition = req.query;

    const result = await SubCategorySchemaModel.deleteOne(condition);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "Sub Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sub Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR : ", error);

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const update = async (req, res) => {
  try {
    const condition = req.body.condition;
    const data = req.body.data;

    const result = await SubCategorySchemaModel.updateOne(condition, {
      $set: data,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "Sub Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sub Category updated successfully",
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Sub Category already exists",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
