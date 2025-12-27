import express from "express";
import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumController";
import upload from "../middleware/multer";

const albumRouter = express.Router();

albumRouter.post("/create", upload.single("image"), createAlbum);
albumRouter.get("/", getAlbums);
albumRouter.get("/:id", getAlbumById);
albumRouter.put("/:id", updateAlbum);
albumRouter.delete("/:id", deleteAlbum);

export default albumRouter;
