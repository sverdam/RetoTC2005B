import { Filter } from "../models/filter";

export async function seedFilters() {
  await Filter.bulkCreate([
    // Industria
    { id: 1, name: "OEM Automotriz", tier: 1, categoryId: 1 },
    { id: 2, name: "Tier 1 Supplier", tier: 1, categoryId: 1 },
    { id: 3, name: "Logística Vehicular", tier: 1, categoryId: 1 },

    // Procesos
    { id: 4, name: "Estampado", tier: 1, categoryId: 2 },
    { id: 5, name: "Soldadura", tier: 1, categoryId: 2 },
    { id: 6, name: "Ensamble Final", tier: 1, categoryId: 2 },
    { id: 7, name: "Inyección de Plástico", tier: 1, categoryId: 2 },

    // Certificaciones
    { id: 8, name: "ISO 9001", tier: 1, categoryId: 3 },
    { id: 9, name: "IATF 16949", tier: 1, categoryId: 3 },

    // Ubicación
    { id: 10, name: "Hermosillo", tier: 1, categoryId: 4 },
    { id: 11, name: "Nogales", tier: 1, categoryId: 4 },
    { id: 12, name: "Guaymas", tier: 1, categoryId: 4 },

    // Servicios
    { id: 13, name: "Ingeniería", tier: 1, categoryId: 5 },
    { id: 14, name: "Mantenimiento", tier: 1, categoryId: 5 },
    { id: 15, name: "Cadena de Suministro", tier: 1, categoryId: 5 }
  ]);
}