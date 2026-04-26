import { Contact, ContactType } from "../models/contact";

export async function seedContacts() {
  await Contact.bulkCreate([
    // =====================================
    // Company 1 - Ford
    // =====================================
    {
      id: 1,
      type: ContactType.EMAIL,
      position: "ventas",
      contactInfo: "ventas@fordsonora.com",
      companyId: 1
    },
    {
      id: 2,
      type: ContactType.EMAIL,
      position: "compras",
      contactInfo: "proveedores@fordsonora.com",
      companyId: 1
    },
    {
      id: 3,
      type: ContactType.PHONE,
      position: "ventas",
      contactInfo: "+52 662 101 1001",
      companyId: 1
    },
    {
      id: 4,
      type: ContactType.PHONE,
      position: "compras",
      contactInfo: "+52 662 101 1002",
      companyId: 1
    },

    // =====================================
    // Company 2 - Martinrea
    // =====================================
    {
      id: 5,
      type: ContactType.EMAIL,
      position: "ventas",
      contactInfo: "ventas@martinrea-sonora.com",
      companyId: 2
    },
    {
      id: 6,
      type: ContactType.EMAIL,
      position: "compras",
      contactInfo: "compras@martinrea-sonora.com",
      companyId: 2
    },
    {
      id: 7,
      type: ContactType.PHONE,
      position: "ventas",
      contactInfo: "+52 662 201 2001",
      companyId: 2
    },
    {
      id: 8,
      type: ContactType.PHONE,
      position: "compras",
      contactInfo: "+52 662 201 2002",
      companyId: 2
    },

    // =====================================
    // Company 3 - Beyond
    // =====================================
    {
      id: 9,
      type: ContactType.EMAIL,
      position: "servicio a cliente",
      contactInfo: "info@beyondmovilidad.com",
      companyId: 3
    },
    {
      id: 10,
      type: ContactType.EMAIL,
      position: "operaciones",
      contactInfo: "operaciones@beyondmovilidad.com",
      companyId: 3
    },
    {
      id: 11,
      type: ContactType.PHONE,
      position: "ventas",
      contactInfo: "+52 662 301 3001",
      companyId: 3
    },
    {
      id: 12,
      type: ContactType.PHONE,
      position: "compras",
      contactInfo: "+52 662 301 3002",
      companyId: 3
    },

    // =====================================
    // Company 4 - Lear
    // =====================================
    {
      id: 13,
      type: ContactType.EMAIL,
      position: "ventas",
      contactInfo: "ventas@learsonora.com",
      companyId: 4
    },
    {
      id: 14,
      type: ContactType.EMAIL,
      position: "compras",
      contactInfo: "rh@learsonora.com",
      companyId: 4
    },
    {
      id: 15,
      type: ContactType.PHONE,
      position: "ventas",
      contactInfo: "+52 631 401 4001",
      companyId: 4
    },
    {
      id: 16,
      type: ContactType.PHONE,
      position: "compras",
      contactInfo: "+52 631 401 4002",
      companyId: 4
    },

    // =====================================
    // Company 5 - Precision
    // =====================================
    {
      id: 17,
      type: ContactType.EMAIL,
      position: "servicio a cliente",
      contactInfo: "contacto@precisionlogistics.mx",
      companyId: 5
    },
    {
      id: 18,
      type: ContactType.EMAIL,
      position: "compras",
      contactInfo: "patio@precisionlogistics.mx",
      companyId: 5
    },
    {
      id: 19,
      type: ContactType.PHONE,
      position: "ventas",
      contactInfo: "+52 622 501 5001",
      companyId: 5
    },
    {
      id: 20,
      type: ContactType.PHONE,
      position: "compras",
      contactInfo: "+52 622 501 5002",
      companyId: 5
    }
  ]);
}