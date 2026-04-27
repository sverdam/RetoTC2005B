import { Service } from "../models/services";

export async function seedServices() {
  await Service.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      name: "Manufactura Automotriz",
      description:
        "Operación de procesos productivos con enfoque en seguridad, calidad y eficiencia.",
      companyId: 2
    },
    {
      id: 2,
      name: "Ingeniería de Procesos",
      description:
        "Optimización de líneas de producción y mejora continua.",
      companyId: 2
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 3,
      name: "Estampado Metálico",
      description:
        "Fabricación de componentes metálicos de precisión para la industria automotriz.",
      companyId: 3
    },
    {
      id: 4,
      name: "Soldadura y Ensamble",
      description:
        "Integración de subconjuntos estructurales bajo especificaciones técnicas.",
      companyId: 3
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 5,
      name: "Movilidad Corporativa",
      description:
        "Transporte empresarial diseñado para operaciones industriales.",
      companyId: 4
    },
    {
      id: 6,
      name: "Gestión de Flotillas",
      description:
        "Administración operativa y monitoreo de unidades de transporte.",
      companyId: 4
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 7,
      name: "Manufactura de Interiores",
      description:
        "Producción de componentes interiores para vehículos ligeros.",
      companyId: 5
    },
    {
      id: 8,
      name: "Sistemas Eléctricos",
      description:
        "Integración y validación de arneses y soluciones eléctricas.",
      companyId: 5
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 9,
      name: "Logística Vehicular",
      description:
        "Recepción, control y distribución de vehículos terminados.",
      companyId: 6
    },
    {
      id: 10,
      name: "Administración de Patio",
      description:
        "Operación de patios con trazabilidad y control de inventario.",
      companyId: 6
    }
  ]);
}