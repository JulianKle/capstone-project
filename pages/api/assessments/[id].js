import Assessment from "@/db/modules/Assessment.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "GET") {
    try {
      if (!id) {
        return response.status(400).json({ error: "ID parameter is missing" });
      }

      const assessments = await Assessment.findById(id);
      response.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PUT") {
    const updatedAssessment = request.body;
    await Assessment.findByIdAndUpdate(id, updatedAssessment);

    response.status(200).json({ status: `Assessment successfully updated.` });
  }
}
