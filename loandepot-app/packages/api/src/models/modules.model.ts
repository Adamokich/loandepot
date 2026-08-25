import { IModule } from "@loandepot/types";
import { model, Schema } from "mongoose";

const moduleShema = new Schema<IModule>(
  {
    moduleId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    ebookName: {
      type: String,
      required: true,
    },
    ebookDescr: {
      type: String,
      required: true,
    },
    ebookImgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    lockVideoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ModuleModel = model<IModule>("Module", moduleShema);
