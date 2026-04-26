import {
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company } from "../types/types";
import DirectoryCard from "../components/DirectoryCard";


const DirectoryPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [tier] = useState<number | null>(null);

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
            <h1 className="font-medium text-3xl">Directorio CLAS</h1>

            <div className="w-full flex flex-col gap-4 items-center">
                <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
                    <div className="flex gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                        <MagnifyingGlassIcon className="h-4 w-4" />
                        <input
                            className="border-none focus:outline-none w-120"
                            placeholder="Buscar por nombre..."
                            type="text"
                            value={nameQuery}
                            onChange={(e) => setNameQuery(e.target.value)}
                        />
                    </div>
                    <button className="w-28 bg-clas rounded-lg py-2 px-3 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                        Filtros
                    </button>
                </div>

                <div className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm text-slate-600">Empresas cargadas: {companies.length}</span>
                        <span className="text-sm text-slate-600">Resultados filtrados: {filteredCompanies.length}</span>
                    </div>
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                        <strong>Vista previa de datos:</strong>
                        <pre className="mt-2 max-h-60 overflow-auto text-xs leading-5 text-slate-700">
                            {JSON.stringify(filteredCompanies, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>

            {/*grid de cacharros*/}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full max-w-6xl">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                        <DirectoryCard key={company.id} company={company} />
                    ))
                ) : (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        No hay empresas para mostrar.
                    </div>
                )}
            </div>
        </div>
    )

};

export default DirectoryPage;