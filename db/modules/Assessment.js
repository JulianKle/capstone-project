import mongoose from "mongoose";

const { Schema } = mongoose;

const assessmentSchema = new Schema({
  title: { type: String, required: true },
  editor: { type: String, required: false },
  company: { type: String, required: false },
  status: { type: String, required: false },
  cognitiveBehavior: { type: Boolean, default: false, required: false },
  socialScoring: { type: Boolean, default: false, required: false },
  biometricIdentification: { type: Boolean, default: false, required: false },
  useUnderSafetyRegulation: { type: Boolean, default: false, required: false },
  useInCertainArea: { type: Boolean, default: false, required: false },
  specificTransparencyRisk: { type: Boolean, default: false, required: false },
  gpai: { type: Boolean, default: false, required: false },
  minimalRisk: { type: Boolean, default: false, required: false },
});

const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

console.log(Assessment);

export default Assessment;
