import { Capacity, CapacityType } from "../models/capacities";

export async function seedCapacities() {
  await Capacity.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      type: CapacityType.MATERIAL,
      description: "Acero galvanizado automotriz",
      companyId: 2
    },
    {
      id: 2,
      type: CapacityType.PROCESS,
      description: "Ensamble final de vehículo",
      companyId: 2
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 3,
      type: CapacityType.MATERIAL,
      description: "Acero de alta resistencia",
      companyId: 3
    },
    {
      id: 4,
      type: CapacityType.PROCESS,
      description: "Estampado y soldadura robotizada",
      companyId: 3
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 5,
      type: CapacityType.MATERIAL,
      description: "Unidades de transporte empresarial",
      companyId: 4
    },
    {
      id: 6,
      type: CapacityType.PROCESS,
      description: "Planeación y monitoreo de rutas",
      companyId: 4
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 7,
      type: CapacityType.MATERIAL,
      description: "Textiles técnicos y componentes eléctricos",
      companyId: 5
    },
    {
      id: 8,
      type: CapacityType.PROCESS,
      description: "Ensamble de arneses automotrices",
      companyId: 5
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 9,
      type: CapacityType.MATERIAL,
      description: "Vehículos ligeros y pesados en resguardo",
      companyId: 6
    },
    {
      id: 10,
      type: CapacityType.PROCESS,
      description: "Control logístico y distribución nacional",
      companyId: 6
    }
  ]);
}