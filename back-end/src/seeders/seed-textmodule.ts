import { TextModule } from "../models/textModule";

export async function seedTextModules() {
  await TextModule.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      title: "Descripción General",
      text: "Operación automotriz en Sonora orientada a manufactura avanzada, eficiencia operativa y altos estándares de calidad.",
      tier: 1,
      companyId: 2
    },
    {
      id: 2,
      title: "Capacidades",
      text: "Procesos de ensamble, control de calidad, logística interna y mejora continua para producción automotriz.",
      tier: 1,
      companyId: 2
    },
    {
      id: 3,
      title: "Talento",
      text: "Programas de capacitación técnica, seguridad industrial y desarrollo de liderazgo para personal operativo y administrativo.",
      tier: 2,
      companyId: 2
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 4,
      title: "Descripción General",
      text: "Empresa especializada en manufactura de componentes estructurales y soluciones metálicas para la industria automotriz.",
      tier: 1,
      companyId: 3
    },
    {
      id: 5,
      title: "Capacidades",
      text: "Estampado, soldadura, ensamble metálico y soporte de ingeniería para programas de producción.",
      tier: 1,
      companyId: 3
    },
    {
      id: 6,
      title: "Calidad",
      text: "Enfoque en trazabilidad, auditorías internas y mejora continua orientada al cliente automotriz.",
      tier: 2,
      companyId: 3
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 7,
      title: "Descripción General",
      text: "Empresa dedicada a soluciones de movilidad corporativa, transporte inteligente y administración de flotillas.",
      tier: 1,
      companyId: 4
    },
    {
      id: 8,
      title: "Servicios",
      text: "Optimización de rutas, monitoreo operativo, transporte empresarial y herramientas digitales de movilidad.",
      tier: 1,
      companyId: 4
    },
    {
      id: 9,
      title: "Innovación",
      text: "Uso de tecnología para mejorar tiempos de traslado, seguridad y experiencia del usuario.",
      tier: 2,
      companyId: 4
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 10,
      title: "Descripción General",
      text: "Proveedor global con presencia en Sonora enfocado en interiores automotrices y sistemas eléctricos.",
      tier: 1,
      companyId: 5
    },
    {
      id: 11,
      title: "Capacidades",
      text: "Manufactura de componentes interiores, cableado, ensamble y validación de producto.",
      tier: 1,
      companyId: 5
    },
    {
      id: 12,
      title: "Sustentabilidad",
      text: "Impulso a prácticas responsables, eficiencia energética y reducción de desperdicio operativo.",
      tier: 2,
      companyId: 5
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 13,
      title: "Descripción General",
      text: "Empresa especializada en logística vehicular, recepción, resguardo y distribución de unidades.",
      tier: 1,
      companyId: 6
    },
    {
      id: 14,
      title: "Capacidades",
      text: "Administración de patios, control de inventario vehicular y coordinación de transporte terrestre.",
      tier: 1,
      companyId: 6
    },
    {
      id: 15,
      title: "Servicio al Cliente",
      text: "Seguimiento operativo, visibilidad de unidades y respuesta ágil a requerimientos logísticos.",
      tier: 2,
      companyId: 6
    }
  ]);
}