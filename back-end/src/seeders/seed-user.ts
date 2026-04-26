import { User, UserRole } from "../models/user";
import { hashPassword } from "../security/hashing";

export async function seedUsers() {
  const password = await hashPassword("123");

  await User.bulkCreate([
    // Company 1 - Ford
    {
      id: 1,
      name: "Ford Editor",
      email: "editor@fordsonora.com",
      password,
      role: UserRole.EDITORCOMPANY,
      companyId: 1
    },
    {
      id: 2,
      name: "Ford Usuario",
      email: "user@fordsonora.com",
      password,
      role: UserRole.USER,
      companyId: 1
    },

    // Company 2 - Martinrea
    {
      id: 3,
      name: "Martinrea Editor",
      email: "editor@martinrea-sonora.com",
      password,
      role: UserRole.EDITORCOMPANY,
      companyId: 2
    },
    {
      id: 4,
      name: "Martinrea Usuario",
      email: "user@martinrea-sonora.com",
      password,
      role: UserRole.USER,
      companyId: 2
    },

    // Company 3 - Beyond
    {
      id: 5,
      name: "Beyond Editor",
      email: "editor@beyondmovilidad.com",
      password,
      role: UserRole.EDITORCOMPANY,
      companyId: 3
    },
    {
      id: 6,
      name: "Beyond Usuario",
      email: "user@beyondmovilidad.com",
      password,
      role: UserRole.USER,
      companyId: 3
    },

    // Company 4 - Lear
    {
      id: 7,
      name: "Lear Editor",
      email: "editor@learsonora.com",
      password,
      role: UserRole.EDITORCOMPANY,
      companyId: 4
    },
    {
      id: 8,
      name: "Lear Usuario",
      email: "user@learsonora.com",
      password,
      role: UserRole.USER,
      companyId: 4
    },

    // Company 5 - Precision
    {
      id: 9,
      name: "Precision Editor",
      email: "editor@precisionlogistics.mx",
      password,
      role: UserRole.EDITORCOMPANY,
      companyId: 5
    },
    {
      id: 10,
      name: "Precision Usuario",
      email: "user@precisionlogistics.mx",
      password,
      role: UserRole.USER,
      companyId: 5
    }
  ]);
}