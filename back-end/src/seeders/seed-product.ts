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
    {
      id: 3,
      name: "Programa de Calidad Ford",
      description:
        "Procesos internos enfocados en precisión, seguridad y mejora continua.",
      fileModuleId: 255
    },

    // =====================================
    // Company 2 - Martinrea
    // fileModuleId: 5,6
    // =====================================
    {
      id: 4,
      name: "Componente Estructural Metálico",
      description:
        "Pieza automotriz fabricada con acero de alta resistencia.",
      fileModuleId: 5
    },
    {
      id: 5,
      name: "Subensamble Soldado",
      description:
        "Conjunto estructural integrado mediante procesos robotizados.",
      fileModuleId: 6
    },
    {
      id: 6,
      name: "Solución de Ingeniería Estructural",
      description:
        "Desarrollo y validación de piezas metálicas para plataformas automotrices.",
      fileModuleId: 256
    },

    // =====================================
    // Company 3 - Beyond
    // fileModuleId: 8,9
    // =====================================
    {
      id: 7,
      name: "Transporte Empresarial",
      description:
        "Servicio especializado de movilidad para personal industrial.",
      fileModuleId: 8
    },
    {
      id: 8,
      name: "Monitoreo de Flotilla",
      description:
        "Herramientas de seguimiento y optimización operativa.",
      fileModuleId: 9
    },
    {
      id: 9,
      name: "App de Movilidad Corporativa",
      description:
        "Plataforma digital para reservaciones y control de rutas.",
      fileModuleId: 257
    },

    // =====================================
    // Company 4 - Lear
    // fileModuleId: 11,12
    // =====================================
    {
      id: 10,
      name: "Arnés Eléctrico",
      description:
        "Sistema de cableado automotriz de alta confiabilidad.",
      fileModuleId: 11
    },
    {
      id: 11,
      name: "Interior Automotriz",
      description:
        "Componentes interiores con enfoque ergonómico y estético.",
      fileModuleId: 12
    },
    {
      id: 12,
      name: "Sistema Integrado de Asiento",
      description:
        "Módulo interior diseñado para confort y durabilidad.",
      fileModuleId: 258
    }
  ]);
}