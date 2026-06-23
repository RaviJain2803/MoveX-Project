import "../models/connection.js";
import rs from "randomstring";
import ConsignmentSchemaModel from "../models/ConsignmentSchema.js";

/* ==========================
   CREATE CONSIGNMENT
========================== */

export const save = async (req, res) => {
  console.log("save consignment", req.body);
  try {
    const trackingId =
      "MOV" +
      Date.now() +
      rs.generate({
        length: 6,

        charset: "numeric",
      });

    const OrderDetails = {
      ...req.body,

      trackingId,

      status: "PENDING",

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    const order = await ConsignmentSchemaModel.create(OrderDetails);

    return res.status(201).json({
      status: true,

      message: "Consignment created successfully",

      trackingId,

      data: order,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        status: false,

        message: "Duplicate Order",
      });
    }

    return res.status(500).json({
      status: false,

      message: "Internal Server Error",
    });
  }
};

/* ==========================
   FETCH CONSIGNMENT
========================== */
export const fetch = async (req, res) => {
  try {
    const { email, trackingId } = req.query;

    let condition = {};

    if (email) {
      condition.email = email;
    }

    if (trackingId) {
      condition.trackingId = trackingId.trim();
    }

    const data = await ConsignmentSchemaModel.find(condition).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Fetch Failed",
    });
  }
};

/* ==========================
   DELETE CONSIGNMENT
========================== */

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await ConsignmentSchemaModel.findOneAndDelete(req.query);

    if (!deleted) {
      return res.status(404).json({
        status: false,

        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: true,

      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,

      message: "Internal Server Error",
    });
  }
};

/* ==========================
   UPDATE CONSIGNMENT
========================== */

export const update = async (req, res) => {
  try {
    const updated = await ConsignmentSchemaModel.findOneAndUpdate(
      req.body.condition,

      {
        $set: {
          ...req.body.data,

          updatedAt: new Date(),
        },
      },

      {
        new: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        status: false,

        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: true,

      message: "Order updated successfully",

      data: updated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,

      message: "Internal Server Error",
    });
  }
};
