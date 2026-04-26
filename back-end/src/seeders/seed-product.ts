import { Product } from "../models/product";

export async function seedProducts() {
  await Product.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // fileModuleId: 2,3
    // =====================================
    {
      id: 1,
      name: "SUV Ensamblado en Sonora",
      description:
        "Vehículo utilitario fabricado bajo estándares globales de calidad y desempeño.",
      fileModuleId: 2
    },
    {
      id: 2,
      name: "Línea de Producción Automotriz",
      description:
        "Imagen representativa de procesos de manufactura y ensamble final.",
      fileModuleId: 3
    },

    // =====================================
    // Company 2 - Martinrea
    // fileModuleId: 5,6
    // =====================================
    {
      id: 3,
      name: "Componente Estructural Metálico",
      description:
        "Pieza automotriz fabricada con acero de alta resistencia.",
      fileModuleId: 5
    },
    {
      id: 4,
      name: "Subensamble Soldado",
      description:
        "Conjunto estructural integrado mediante procesos robotizados.",
      fileModuleId: 6
    },

    // =====================================
    // Company 3 - Beyond
    // fileModuleId: 8,9
    // =====================================
    {
      id: 5,
      name: "Transporte Empresarial",
      description:
        "Servicio especializado de movilidad para personal industrial.",
      fileModuleId: 8
    },
    {
      id: 6,
      name: "Monitoreo de Flotilla",
      description:
        "Herramientas de seguimiento y optimización operativa.",
      fileModuleId: 9
    },

    // =====================================
    // Company 4 - Lear
    // fileModuleId: 11,12
    // =====================================
    {
      id: 7,
      name: "Arnés Eléctrico",
      description:
        "Sistema de cableado automotriz de alta confiabilidad.",
      fileModuleId: 11
    },
    {
      id: 8,
      name: "Interior Automotriz",
      description:
        "Componentes interiores con enfoque ergonómico y estético.",
      fileModuleId: 12
    },

    // =====================================
    // Company 5 - Precision
    // fileModuleId: 14,15
    // =====================================
    {
      id: 9,
      name: "Patio Vehicular",
      description:
        "Infraestructura para resguardo y control de unidades.",
      fileModuleId: 14
    },
    {
      id: 10,
      name: "Distribución Nacional",
      description:
        "Operación logística para traslado de vehículos terminados.",
      fileModuleId: 15
    }
  ]);
}