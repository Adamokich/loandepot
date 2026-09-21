import { IReview } from "@loandepot/types";
import { model, Schema } from "mongoose";

const reviewShema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    previewText: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const ReviewModel = model<IReview>("Review", reviewShema);
