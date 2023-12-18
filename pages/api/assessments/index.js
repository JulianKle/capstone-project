import Assessment from "../../../db/modules/Assessment.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const assessments = await Assessment.find();
      response.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
