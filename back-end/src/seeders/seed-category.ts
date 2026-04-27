import { Category } from "../models/category";

export async function seedCategories() {
  await Category.bulkCreate([
    { id: 1, name: "Industria" },
    { id: 2, name: "Procesos" },
    { id: 3, name: "Certificaciones" },
    { id: 4, name: "Ubicación" },
    { id: 5, name: "Servicios" }
  ]);
}