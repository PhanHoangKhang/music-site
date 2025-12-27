import mongoose, {Schema, Document} from "mongoose";

export interface IAlbum extends Document {
  name: string;
  desc: string;
  bgColor: string;
  image: string;
}

const albumSchema: Schema<IAlbum> = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    bgColor: {type: String, required: true},
    image: {type: String, required: true},
}, {timestamps: true})

const Album = mongoose.model('album', albumSchema)

export default Album