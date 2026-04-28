import { FileModule, FileType } from "../models/fileModule";

export async function seedFiles() {
  await FileModule.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      position: 1,
      type: FileType.LOGO,
      companyId: 2
    },
    {
      id: 2,
      position: 2,
      type: FileType.IMAGE,
      companyId: 2
    },
    {
      id: 3,
      position: 3,
      type: FileType.IMAGE,
      companyId: 2
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 4,
      position: 1,
      type: FileType.LOGO,
      companyId: 3
    },
    {
      id: 5,
      position: 2,
      type: FileType.IMAGE,
      companyId: 3
    },
    {
      id: 6,
      position: 3,
      type: FileType.IMAGE,
      companyId: 3
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 7,
      position: 1,
      type: FileType.LOGO,
      companyId: 4
    },
    {
      id: 8,
      position: 2,
      type: FileType.IMAGE,
      companyId: 4
    },
    {
      id: 9,
      position: 3,
      type: FileType.IMAGE,
      companyId: 4
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 10,
      position: 1,
      type: FileType.LOGO,
      companyId: 5
    },
    {
      id: 11,
      position: 2,
      type: FileType.IMAGE,
      companyId: 5
    },
    {
      id: 12,
      position: 3,
      type: FileType.IMAGE,
      companyId: 5
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 13,
      position: 1,
      type: FileType.LOGO,
      companyId: 6
    },
    {
      id: 14,
      position: 2,
      type: FileType.IMAGE,
      companyId: 6
    },
    {
      id: 15,
      position: 3,
      type: FileType.IMAGE,
      companyId: 6
    }
  ]);
}