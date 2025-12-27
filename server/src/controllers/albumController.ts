import { Request, Response } from "express";
import Album from "../models/albumModel";

/**
 * @desc    Create new album
 * @route   POST /api/albums
 */

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const { name, desc, bgColor } = req.body;

    if (!name || !desc || !bgColor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload.single → req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const album = await Album.create({
      name,
      desc,
      bgColor,
      image: `/uploads/images/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create album failed",
      error,
    });
  }
};

/**
 * @desc    Get all albums
 * @route   GET /api/albums
 */
export const getAlbums = async (req: Request, res: Response) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: "Fetch albums failed", error });
  }
};

/**
 * @desc    Get single album
 * @route   GET /api/albums/:id
 */
export const getAlbumById = async (req: Request, res: Response) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: "Fetch album failed", error });
  }
};

/**
 * @desc    Update album
 * @route   PUT /api/albums/:id
 */
export const updateAlbum = async (req: Request, res: Response) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ message: "Update album failed", error });
  }
};

/**
 * @desc    Delete album
 * @route   DELETE /api/albums/:id
 */
export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);

    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete album failed", error });
  }
};
