import connectionDB from "../connection/connection"
import { seedCategories } from "./seed-category";
import { seedFilters } from "./seed-filter";
import { seedCompanies } from "./seed-company";
import { seedUsers } from "./seed-user";
import { seedLocations } from "./seed-location";
import { seedContacts } from "./seed-contact";
import { seedTextModules } from "./seed-textmodule";
import { seedFiles } from "./seed-filemodule";
import { seedProducts } from "./seed-product";
import { seedServices } from "./seed-service";
import { seedCertifications } from "./seed-certification";
import { seedCapacities } from "./seed-capacity";
import { seedCompanyFilters } from "./seed-companyfilter";

async function runSeeds() {
  try {

    await connectionDB();

    await seedCategories();
    await seedFilters();
    await seedCompanies();
    await seedUsers();
    await seedLocations();
    await seedContacts();
    await seedTextModules();
    await seedFiles();
    await seedProducts();
    await seedServices();
    await seedCertifications();
    await seedCapacities();
    await seedCompanyFilters();
  } catch (error) {
    console.error("Error ejecutando seeders:", error);
  }
  console.log("Seeds ejecutados");
}

runSeeds();