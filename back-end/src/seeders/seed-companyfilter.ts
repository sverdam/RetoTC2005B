import { CompanyFilter } from "../models/companyFilter";

export async function seedCompanyFilters() {
  await CompanyFilter.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    { companyId: 1, filterId: 1 },   // OEM Automotriz
    { companyId: 1, filterId: 6 },   // Ensamble Final
    { companyId: 1, filterId: 9 },   // IATF 16949
    { companyId: 1, filterId: 10 },  // Hermosillo
    { companyId: 1, filterId: 13 },  // Ingeniería

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    { companyId: 2, filterId: 2 },   // Tier 1 Supplier
    { companyId: 2, filterId: 4 },   // Estampado
    { companyId: 2, filterId: 5 },   // Soldadura
    { companyId: 2, filterId: 10 },  // Hermosillo
    { companyId: 2, filterId: 9 },   // IATF 16949

    // =====================================
    // Company 3 - Beyond
    // =====================================
    { companyId: 3, filterId: 3 },   // Logística Vehicular
    { companyId: 3, filterId: 10 },  // Hermosillo
    { companyId: 3, filterId: 15 },  // Cadena de Suministro
    { companyId: 3, filterId: 13 },  // Ingeniería
    { companyId: 3, filterId: 8 },   // ISO 9001

    // =====================================
    // Company 4 - Lear
    // =====================================
    { companyId: 4, filterId: 2 },   // Tier 1 Supplier
    { companyId: 4, filterId: 7 },   // Inyección de Plástico
    { companyId: 4, filterId: 11 },  // Nogales
    { companyId: 4, filterId: 9 },   // IATF 16949
    { companyId: 4, filterId: 14 },  // Mantenimiento

    // =====================================
    // Company 5 - Precision
    // =====================================
    { companyId: 5, filterId: 3 },   // Logística Vehicular
    { companyId: 5, filterId: 12 },  // Guaymas
    { companyId: 5, filterId: 15 },  // Cadena de Suministro
    { companyId: 5, filterId: 8 },   // ISO 9001
    { companyId: 5, filterId: 14 }   // Mantenimiento
  ]);
}