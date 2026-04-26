import { Certification } from "../models/certification";

export async function seedCertifications() {
  await Certification.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      name: "ISO 9001",
      companyId: 1
    },
    {
      id: 2,
      name: "IATF 16949",
      companyId: 1
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 3,
      name: "ISO 9001",
      companyId: 2
    },
    {
      id: 4,
      name: "IATF 16949",
      companyId: 2
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 5,
      name: "ISO 9001",
      companyId: 3
    },
    {
      id: 6,
      name: "ISO 14001",
      companyId: 3
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 7,
      name: "ISO 9001",
      companyId: 4
    },
    {
      id: 8,
      name: "IATF 16949",
      companyId: 4
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 9,
      name: "ISO 9001",
      companyId: 5
    },
    {
      id: 10,
      name: "OEA Operador Económico Autorizado",
      companyId: 5
    }
  ]);
}