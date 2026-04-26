import { Location } from "../models/location";

export async function seedLocations() {
  await Location.bulkCreate([
    {
      id: 1,
      address: "Blvd. Ford y Carretera 26, Hermosillo, Sonora, México",
      mapLink: "https://maps.google.com/?q=Ford+Hermosillo+Sonora",
      companyId: 1
    },
    {
      id: 2,
      address: "Parque Industrial Hermosillo Norte, Hermosillo, Sonora, México",
      mapLink: "https://maps.google.com/?q=Martinrea+Hermosillo+Sonora",
      companyId: 2
    },
    {
      id: 3,
      address: "Blvd. Solidaridad 1200, Hermosillo, Sonora, México",
      mapLink: "https://maps.google.com/?q=Beyond+Movilidad+Hermosillo",
      companyId: 3
    },
    {
      id: 4,
      address: "Parque Industrial Nogales, Nogales, Sonora, México",
      mapLink: "https://maps.google.com/?q=Lear+Nogales+Sonora",
      companyId: 4
    },
    {
      id: 5,
      address: "Zona Industrial Guaymas, Guaymas, Sonora, México",
      mapLink: "https://maps.google.com/?q=Precision+Vehicle+Logistics+Guaymas",
      companyId: 5
    }
  ]);
}