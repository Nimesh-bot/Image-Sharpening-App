export type Asset = {
    assetId: string;
    base64: any;
    duration: any;
    exif: any;
    fileName: string;
    fileSize: number;
    height: number;
    type: string;
    uri: string;
    width: number;
  };
  
export type ImageType = {
    assets: Asset[];
    canceled: boolean;
  };