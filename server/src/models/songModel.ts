import mongoose, { Schema, Document } from "mongoose";

export interface ISong extends Document {
  name: string;
  desc: string;
  album: mongoose.Types.ObjectId;
  artist?: string;
  image: string;
  file: string;
  duration: string;
  category?: string;
}

const songSchema: Schema<ISong> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },

    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },

    artist: { type: String },
    image: { type: String, required: true },
    file: { type: String, required: true },
    duration: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
