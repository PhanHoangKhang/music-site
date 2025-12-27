import type { Request, Response } from "express";

import Song from "../models/songModel";

interface MulterFiles {
  image?: Express.Multer.File[];
  audio?: Express.Multer.File[];
}

// POST /song/add
export const addSong = async (req: Request, res: Response) => {
  try {
    const { name, desc, album, artist } = req.body;

    const files = req.files as MulterFiles;

    if (!files?.audio || !files?.image) {
      return res.status(400).json({
        success: false,
        message: "Audio and image are required"
      });
    }

    const audioFile = files.audio[0];
    const imageFile = files.image[0];

    const duration = "0:00";

    const songData = {
      name,
      desc,
      album,
      artist,
      duration,
      category: "music",
      image: `/uploads/images/${imageFile.filename}`,
      file: `/uploads/audio/${audioFile.filename}`
    };

    await Song.create(songData);

    res.json({ success: true, message: "Song added" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// GET /song/list
export const listSong = async (req: Request, res: Response) => {
  try {
    const allSong = await Song.find({}).populate("album", "name image bgColor");;
    res.json({ success: true, songs: allSong });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// POST /song/remove/:id
export const removeSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Song id is required"
      });
    }

    const deleteSong = await Song.findByIdAndDelete(id);

    if (!deleteSong) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    res.json({ success: true, message: "Remove successfully" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
