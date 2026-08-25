export interface IModule {
  _id?: string;
  moduleId: number;
  name: string;
  imgUrl: string;
  tags: string | string[];
  descr: string;
  fileUrl: string;
  ebookName: string;
  ebookDescr: string;
  ebookImgUrl: string;
  videoUrl: string;
  lockVideoUrl: string;
}
