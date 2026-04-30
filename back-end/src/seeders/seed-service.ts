import { Service } from "../models/services";

export async function seedServices() {
  await Service.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      companyId: 2,
      name: "Manufactura Automotriz",
      description:
        "Producción de vehículos bajo estándares globales de calidad."
    },
    {
      id: 2,
      companyId: 2,
      name: "Ingeniería de Procesos",
      description:
        "Optimización de líneas de producción y mejora continua."
    },
    {
      id: 3,
      companyId: 2,
      name: "Control de Calidad",
      description:
        "Inspección y validación de componentes y unidades terminadas."
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 4,
      companyId: 3,
      name: "Estampado Metálico",
      description:
        "Fabricación de piezas estructurales automotrices."
    },
    {
      id: 5,
      companyId: 3,
      name: "Soldadura Robotizada",
      description:
        "Integración de subconjuntos con procesos automatizados."
    },
    {
      id: 6,
      companyId: 3,
      name: "Diseño de Componentes",
      description:
        "Desarrollo técnico de soluciones para OEM y Tier 1."
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 7,
      companyId: 4,
      name: "Movilidad Empresarial",
      description:
        "Transporte de personal para plantas industriales."
    },
    {
      id: 8,
      companyId: 4,
      name: "Administración de Flotillas",
      description:
        "Control operativo y mantenimiento de unidades."
    },
    {
      id: 9,
      companyId: 4,
      name: "Optimización de Rutas",
      description:
        "Planeación logística para reducir tiempos y costos."
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 10,
      companyId: 5,
      name: "Arneses Eléctricos",
      description:
        "Producción de sistemas eléctricos automotrices."
    },
    {
      id: 11,
      companyId: 5,
      name: "Interiores Automotrices",
      description:
        "Manufactura de componentes interiores y acabados."
    },
    {
      id: 12,
      companyId: 5,
      name: "Soporte de Ingeniería",
      description:
        "Asistencia técnica para integración de nuevos programas."
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 13,
      companyId: 6,
      name: "Logística Vehicular",
      description:
        "Traslado y distribución de vehículos terminados."
    },
    {
      id: 14,
      companyId: 6,
      name: "Resguardo de Inventario",
      description:
        "Administración de patios y control de unidades."
    },
    {
      id: 15,
      companyId: 6,
      name: "Seguimiento Operativo",
      description:
        "Monitoreo de entregas y trazabilidad logística."
    }
  ]);
}