import { Company, MemberType } from "../models/company";

export async function seedCompanies() {
  await Company.bulkCreate([
    {
      id: 2,
      name: "Ford Motor Company",
      description:
        "Operación automotriz en Sonora enfocada en manufactura avanzada, calidad y desarrollo regional.",
      tier: 0,
      memberType: MemberType.ASSOCIATE,
      website: "https://www.ford.com",
      slogan: "Built for the road ahead",
      employees: 3200,
      pieces: 145000,
      space: 320000,
      capacity: "Alta capacidad de manufactura y ensamble",
      color: "#003478",
      aboutUs:"Ford Motor Company es una empresa líder en la industria automotriz con más de 100 años de experiencia, reconocida por su innovación, calidad y compromiso con la movilidad sostenible. Desarrolla vehículos y soluciones tecnológicas que impulsan un futuro más inteligente y eficiente."
    },
    {
      id: 3,
      name: "Martinrea International",
      description:
        "Proveedor automotriz especializado en estructuras metálicas, componentes y soluciones de manufactura.",
      tier: 1,
      memberType: MemberType.ASSOCIATE,
      website: "https://www.martinrea.com",
      slogan: "Making people’s lives better",
      employees: 950,
      pieces: 74000,
      space: 26000,
      capacity: "Estampado, ensamble y estructuras",
      color: "#1D4F91",
      aboutUs:"Martinrea International se especializa en el diseño y fabricación de estructuras ligeras y sistemas de propulsión para la industria automotriz. Su enfoque está en la innovación, la eficiencia y la mejora continua para contribuir al futuro de la movilidad."
    },
    {
      id: 4,
      name: "Beyond Movilidad Compartida",
      description:
        "Empresa enfocada en soluciones de movilidad empresarial, transporte y tecnología aplicada.",
      tier: 0,
      memberType: MemberType.ASSOCIATE,
      website: "https://www.beyondmovilidad.com",
      slogan: "Movilidad inteligente",
      employees: 140,
      pieces: 0,
      space: 12000,
      capacity: "Gestión de flotillas y movilidad",
      color: "#00A86B",
      aboutUs:"Beyond Movilidad Compartida ofrece soluciones de transporte eficientes y sostenibles para empresas y personas. Su misión es optimizar la movilidad mediante servicios innovadores que mejoran la experiencia del usuario y reducen costos."
    },
    {
      id: 5,
      name: "Lear Corporation",
      description:
        "Proveedor global del sector automotriz con experiencia en interiores, asientos y sistemas eléctricos.",
      tier: 1,
      memberType: MemberType.ASSOCIATE,
      website: "https://www.lear.com",
      slogan: "A better future starts here",
      employees: 2100,
      pieces: 112000,
      space: 156000,
      capacity: "Interiores automotrices y cableado",
      color: "#C8102E",
      aboutUs:"Lear Corporation es líder global en tecnología automotriz, especializada en sistemas de asientos y E-Systems. Su compromiso con la innovación, la seguridad y la sostenibilidad impulsa soluciones para una movilidad más inteligente."
    },
    {
      id: 6,
      name: "Precision Vehicle Logistics de México",
      description:
        "Empresa especializada en logística vehicular, manejo de unidades y distribución automotriz.",
      tier: 4,
      memberType: MemberType.AFFILIATE,
      website: "https://www.precisionlogistics.mx",
      slogan: "Precision in motion",
      employees: 260,
      pieces: 0,
      space: 45000,
      capacity: "Patio vehicular y distribución",
      color: "#4A4A4A",
      aboutUs:"Precision Vehicle Logistics de México brinda servicios especializados en logística automotriz, asegurando eficiencia y precisión en el traslado y gestión de vehículos. Su enfoque está en la excelencia operativa y la confiabilidad."
    }
  ]);
}