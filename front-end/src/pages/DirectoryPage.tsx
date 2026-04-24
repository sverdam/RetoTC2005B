import {
  PhoneIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company, Filter } from "clas-types";
import DirectoryCard from "../components/DirectoryCard";
import FilterModal from "../components/FilterModal";


const DirectoryPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Filter[]>([]);

    useEffect(() => {
        getAllCompanies().then((companies: Company[]) => setCompanies(companies));
    }, []);

    const filteredCompanies = useMemo(() => {
        console.log(companies);
        const _name = nameQuery.trim().toLowerCase();

        return companies.filter((p) => {
            const matchesName = _name.length === 0 || p.name.toLowerCase().includes(_name);
            const matchesFilter = selected.length === 0 || selected.every((f) => 
            p.filters?.some((c) => c.name === f.name)
        );

            return matchesName && matchesFilter;
        });
    }, [nameQuery, selected, companies]);

    const handleFilter = (newFilters: Filter[]) => {
        setSelected(newFilters)

    }

    return (
        <div className="flex flex-col gap-10 items-center mx-2">
            <h1 className="font-medium text-3xl"> Directorio CLAS</h1>
            <div className="w-full flex gap-4 justify-center">
                <div className="flex  gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <input className="border-none focus:outline-none w-120" placeholder="Buscar por nombre..."
                        type="text"
                        value={nameQuery}
                        onChange={(e) =>
                        setNameQuery(e.target.value)}
                    ></input>
                </div>
                <button
                    onClick={() => setIsOpen(true)} 
                    className=" w-20 bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                    Filtros
                </button>
            </div>
            {/*grid de cacharros*/}
            <div className="grid grid-cols-4 gap-4">
                {filteredCompanies.map((company) => (
                    <DirectoryCard key={company.id} company={company} />
                ))}
            </div>
            <FilterModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                selectFilter = {selected}
                setSelectFilter = {handleFilter}
            />
        </div>
    )

};

export default DirectoryPage;