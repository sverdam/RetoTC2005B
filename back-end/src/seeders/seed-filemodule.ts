import { FileModule, FileType } from "../models/fileModule";

export async function seedFiles() {
  await FileModule.bulkCreate([
    {
      position: 1,
      type: FileType.LOGO,
      storedName: "logo.png",
      originalName: "logo.png",
      path: "/uploads/logo.png",
      mimeType: "image/png",
      size: 2000,
      companyId: 1
    }
  ]);
}