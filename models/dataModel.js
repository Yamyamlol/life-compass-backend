import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  BMI: { type: Number, required: false },
  email: { type: String, required: true },
  date: { type: Date, required: false },
});

const dataModel =
  mongoose.models.fitnessApp ||
  mongoose.model("fitnessApp", fitnessSchema, "fitnessapps");
  
export default dataModel;
