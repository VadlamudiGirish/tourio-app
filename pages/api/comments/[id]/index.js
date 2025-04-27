import dbConnect from "@/db/connect";
import { Comment } from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      try {
        const comments = await Comment.find({ placeId: id }).sort({
          createdAt: -1,
        });
        response.status(200).json(comments);
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const commentData = { ...request.body, placeId: id };
        const comment = await Comment.create(commentData);
        response.status(201).json(comment);
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
          return response.status(404).json({ status: "Comment not found" });
        }
        return response.status(200).json({ status: "Comment deleted" });
      } catch (error) {
        console.error(error);

        response.status(400).json({ success: false });
      }
      break;

    default:
      response.status(405).json({ success: false });
      break;
  }
}
