import Assessment from "../../../db/modules/Assessment.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

  if (request.method === "GET") {
    try {
      const assessments = await Assessment.find();
      console.log("assessments", assessments);
      response.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
