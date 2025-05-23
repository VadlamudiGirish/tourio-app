import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
import { Comment } from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      response.status(404).json({ status: "Not found" });
      return;
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "PUT") {
    const updatedPlace = request.body;
    const place = await Place.findByIdAndUpdate(id, updatedPlace);

    if (!place) {
      response.status(404).json({ status: "Not found" });
      return;
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "DELETE") {
    const deletedPlace = await Place.findByIdAndDelete(id);
    if (!deletedPlace) {
      return response.status(404).json({ error: "Place not found" });
    }

    await Comment.deleteMany({ placeId: id });

    return response.status(200).json({
      status: `Place ${id} and associated comments deleted`,
    });
  }

  response.status(405).json({ status: "Method not allowed." });
}
