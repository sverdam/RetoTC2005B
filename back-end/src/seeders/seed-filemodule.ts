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
      storedName: "ford-logo.png",
      originalName: "ford-logo.png",
      path: "/uploads/logos/ford-logo.png",
      mimeType: "image/png",
      size: 148320,
      companyId: 1
    },
    {
      id: 2,
      position: 2,
      type: FileType.IMAGE,
      storedName: "ford-product-1.jpg",
      originalName: "ford-product-1.jpg",
      path: "/uploads/products/ford-product-1.jpg",
      mimeType: "image/jpeg",
      size: 254881,
      companyId: 1
    },
    {
      id: 3,
      position: 3,
      type: FileType.IMAGE,
      storedName: "ford-product-2.jpg",
      originalName: "ford-product-2.jpg",
      path: "/uploads/products/ford-product-2.jpg",
      mimeType: "image/jpeg",
      size: 241550,
      companyId: 1
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 4,
      position: 1,
      type: FileType.LOGO,
      storedName: "martinrea-logo.png",
      originalName: "martinrea-logo.png",
      path: "/uploads/logos/martinrea-logo.png",
      mimeType: "image/png",
      size: 132845,
      companyId: 2
    },
    {
      id: 5,
      position: 2,
      type: FileType.IMAGE,
      storedName: "martinrea-product-1.jpg",
      originalName: "martinrea-product-1.jpg",
      path: "/uploads/products/martinrea-product-1.jpg",
      mimeType: "image/jpeg",
      size: 219445,
      companyId: 2
    },
    {
      id: 6,
      position: 3,
      type: FileType.IMAGE,
      storedName: "martinrea-product-2.jpg",
      originalName: "martinrea-product-2.jpg",
      path: "/uploads/products/martinrea-product-2.jpg",
      mimeType: "image/jpeg",
      size: 232100,
      companyId: 2
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 7,
      position: 1,
      type: FileType.LOGO,
      storedName: "beyond-logo.png",
      originalName: "beyond-logo.png",
      path: "/uploads/logos/beyond-logo.png",
      mimeType: "image/png",
      size: 95420,
      companyId: 3
    },
    {
      id: 8,
      position: 2,
      type: FileType.IMAGE,
      storedName: "beyond-product-1.jpg",
      originalName: "beyond-product-1.jpg",
      path: "/uploads/products/beyond-product-1.jpg",
      mimeType: "image/jpeg",
      size: 198220,
      companyId: 3
    },
    {
      id: 9,
      position: 3,
      type: FileType.IMAGE,
      storedName: "beyond-product-2.jpg",
      originalName: "beyond-product-2.jpg",
      path: "/uploads/products/beyond-product-2.jpg",
      mimeType: "image/jpeg",
      size: 204881,
      companyId: 3
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 10,
      position: 1,
      type: FileType.LOGO,
      storedName: "lear-logo.png",
      originalName: "lear-logo.png",
      path: "/uploads/logos/lear-logo.png",
      mimeType: "image/png",
      size: 121530,
      companyId: 4
    },
    {
      id: 11,
      position: 2,
      type: FileType.IMAGE,
      storedName: "lear-product-1.jpg",
      originalName: "lear-product-1.jpg",
      path: "/uploads/products/lear-product-1.jpg",
      mimeType: "image/jpeg",
      size: 245000,
      companyId: 4
    },
    {
      id: 12,
      position: 3,
      type: FileType.IMAGE,
      storedName: "lear-product-2.jpg",
      originalName: "lear-product-2.jpg",
      path: "/uploads/products/lear-product-2.jpg",
      mimeType: "image/jpeg",
      size: 233910,
      companyId: 4
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 13,
      position: 1,
      type: FileType.LOGO,
      storedName: "precision-logo.png",
      originalName: "precision-logo.png",
      path: "/uploads/logos/precision-logo.png",
      mimeType: "image/png",
      size: 110278,
      companyId: 5
    },
    {
      id: 14,
      position: 2,
      type: FileType.IMAGE,
      storedName: "precision-product-1.jpg",
      originalName: "precision-product-1.jpg",
      path: "/uploads/products/precision-product-1.jpg",
      mimeType: "image/jpeg",
      size: 212004,
      companyId: 5
    },
    {
      id: 15,
      position: 3,
      type: FileType.IMAGE,
      storedName: "precision-product-2.jpg",
      originalName: "precision-product-2.jpg",
      path: "/uploads/products/precision-product-2.jpg",
      mimeType: "image/jpeg",
      size: 226300,
      companyId: 5
    }
  ]);
}