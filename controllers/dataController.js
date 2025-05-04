import mongoose from "mongoose";
import dataModel from "../models/dataModel.js";

export const upsertFitnessEntry = async (req, res) => {
  try {
    let { height, weight, email, BMI} = req.body;
    if (!BMI) {
      BMI = +(weight / (height) ** 2).toFixed(2);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedEntry = await dataModel.findOneAndUpdate(
      { email, date: today },
      { height, weight, BMI, email, date: today },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Upsert Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFitnessHistory = async (req, res) => {
  try {
    // Add this somewhere in your server initialization code
    console.log("Connected to MongoDB:", mongoose.connection.name);
    console.log("Raw request query:", req.query);
    const { email } = req.query;
    console.log("Extracted email:", email);
    console.log("After processing:", email.trim().toLowerCase());

    // Try a simple query to see all documents
    const allDocs = await dataModel.find({});
    console.log("All documents in collection:", allDocs.length);

    const entries = await dataModel
      .find({
        email: email.trim().toLowerCase(),
      })
      .sort({ date: -1 });

    console.log("Found entries:", entries);
    res.json({ success: true, entries });
  } catch (error) {
    console.error("Error in getFitnessHistory:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};