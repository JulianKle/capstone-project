import Assessment from "@/db/modules/Assessment.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  const { id } = request.query;
 
  await dbConnect();



  if (request.method === "GET") {
    try {
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

  //Preparing delete functionality
  if (request.method === "DELETE") {
    await Assessment.findByIdAndDelete(id);
    response
      .status(200)
      .json({ status: `Assessment ${id} successfully deleted.` });
  }
}
