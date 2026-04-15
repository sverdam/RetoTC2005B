import {
  PhoneIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company } from "my-types";
import DirectoryCard from "../components/DirectoryCard";


const UserPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [tier, setTier] = useState<string | null>(null);

    useEffect(() => {
        getAllCompanies().then((companies: Company[]) => setCompanies(companies));
    }, []);

    const filteredCompanies = useMemo(() => {
        console.log(companies);
        const _name = nameQuery.trim().toLowerCase();

        return companies.filter((p) => {
            const matchesName = _name.length === 0 || p.name.toLowerCase().includes(_name);
            const matchesTier = tier === null || p.tier === tier;

            return matchesName && matchesTier;
        });
    }, [nameQuery, tier, companies]);

    return (
        <div className="flex flex-col gap-10 items-center mx-2">
            <h1 className="font-medium text-3xl"> Directorio CLAS</h1>
            <div className="w-full flex gap-4 justify-center">
                <div className="flex flex-col items-center gap-2">
                    <label>Nombre</label>
                    <div className="flex  gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                        <MagnifyingGlassIcon className="h-4 w-4" />
                        <input className="border-none focus:outline-none" placeholder="Buscar por nombre..."
                            type="text"
                            value={nameQuery}
                            onChange={(e) =>
                            setNameQuery(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <label>Tier</label>
                    <div className="flex gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                        <select
                            className="border-none focus:outline-none focus:ring-0"
                            value={tier ?? ""}
                            onChange={(e) => 
                            setTier(e.target.value === "" ? null : (e.target.value))
                        }>
                            <option value="">All Tiers</option>
                            <option>
                                Tier 1
                            </option>
                            <option>
                                Tier 2
                            </option>
                            <option>
                                Tier 3
                            </option>
                        </select>
                    </div>
                </div>
                
            </div>
            {/*grid de cacharros*/}
            <div className="grid grid-cols-4 gap-4">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </div>
    )

};

export default UserPage;