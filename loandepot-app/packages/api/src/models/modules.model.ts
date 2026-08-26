import { IModule } from "@loandepot/types";
import { model, Schema } from "mongoose";

const moduleShema = new Schema<IModule>(
  {
    moduleId: {
      type: Number,
      required: true,
      unique: true,
    },
    moduleName: {
      type: String,
      required: true,
      trim: true,
    },
    moduleImgUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    moduleDescr: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    imgUrl: {
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
    timestamps: false,
    versionKey: false,
  },
);

export const ModuleModel = model<IModule>("Module", moduleShema);
