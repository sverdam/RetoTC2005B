import { CompanyFilter } from "../models/companyFilter";

export async function seedCompanyFilters() {
  await CompanyFilter.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    { companyId: 2, filterId: 1 },   // OEM Automotriz
    { companyId: 2, filterId: 6 },   // Ensamble Final
    { companyId: 2, filterId: 9 },   // IATF 16949
    { companyId: 2, filterId: 10 },  // Hermosillo
    { companyId: 2, filterId: 13 },  // Ingeniería

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    { companyId: 3, filterId: 2 },   // Tier 1 Supplier
    { companyId: 3, filterId: 4 },   // Estampado
    { companyId: 3, filterId: 5 },   // Soldadura
    { companyId: 3, filterId: 10 },  // Hermosillo
    { companyId: 3, filterId: 9 },   // IATF 16949

    // =====================================
    // Company 3 - Beyond
    // =====================================
    { companyId: 4, filterId: 3 },   // Logística Vehicular
    { companyId: 4, filterId: 10 },  // Hermosillo
    { companyId: 4, filterId: 15 },  // Cadena de Suministro
    { companyId: 4, filterId: 13 },  // Ingeniería
    { companyId: 4, filterId: 8 },   // ISO 9001

    // =====================================
    // Company 4 - Lear
    // =====================================
    { companyId: 5, filterId: 2 },   // Tier 1 Supplier
    { companyId: 5, filterId: 7 },   // Inyección de Plástico
    { companyId: 5, filterId: 11 },  // Nogales
    { companyId: 5, filterId: 9 },   // IATF 16949
    { companyId: 5, filterId: 14 },  // Mantenimiento

    // =====================================
    // Company 5 - Precision
    // =====================================
    { companyId: 6, filterId: 3 },   // Logística Vehicular
    { companyId: 6, filterId: 12 },  // Guaymas
    { companyId: 6, filterId: 15 },  // Cadena de Suministro
    { companyId: 6, filterId: 8 },   // ISO 9001
    { companyId: 6, filterId: 14 }   // Mantenimiento
  ]);
}