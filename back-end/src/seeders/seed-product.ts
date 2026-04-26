import { Product } from "../models/product";

export async function seedProducts() {
  await Product.bulkCreate([
    {
      name: "Producto Demo",
      description: "Descripción",
      fileModuleId: 1
    }
  ]);
}