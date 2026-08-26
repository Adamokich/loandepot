export interface IModule {
  _id?: string;
  moduleId: number;
  moduleName: string;
  moduleImgUrl: string;
  tags: string | string[];
  moduleDescr: string;
  fileUrl: string;
  name: string;
  descr: string;
  imgUrl: string;
  videoUrl: string;
  lockVideoUrl: string;
}
