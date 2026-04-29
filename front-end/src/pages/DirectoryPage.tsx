import {
  PhoneIcon,
  MagnifyingGlassIcon,
  FaceFrownIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo, Profiler } from "react";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company, Filter, UserProfile } from "clas-types";
import DirectoryCard from "../components/DirectoryCard";
import FilterModal from "../components/FilterModal";
import NewDirectoryCardButton from "../components/NewDirectoryCardButton";
import { getProfile } from "../api/LoginAPI";
import { useNavigate } from "react-router";


const unverifiedUser : UserProfile = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
    role: 'unverified'
}

interface TagProps {
    value:string;
    tagTier: number;
}
const DirectoryPage: React.FC = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [tier, setTier] = useState<number[]>([])
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Filter[]>([]);
    
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
    
    const [loading, setLoading] = useState(true);

    const Tag: React.FC<TagProps> = ({value, tagTier}) => {
        const isActive = tier.includes(tagTier);

        const handleClick = () => {
            if (isActive){
                setTier(tier.filter( t => t.valueOf() != tagTier));
            } else {
                setTier([...tier, tagTier]);
            }
        }

        return(
            <div>
                <button 
                    onClick={handleClick}
                    className={`m-1 px-4 py-1.5 rounded-full border transition-all duration-200 text-sm font-medium
                        ${isActive 
                            ? "bg-clas text-white border-clas" 
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                        }`}                
                >
                    {value}
                </button>
            </div>
        )
    };

    
    useEffect(() => {
        setLoading(true);
        getAllCompanies()
            .then((companies: Company[]) => setCompanies(companies))
            .finally(() => setLoading(false));
        getProfile().
            then((profile: UserProfile) => setUserProfile(profile))
    }, []);

    const filteredCompanies = useMemo(() => {
        console.log(companies);
        console.log(tier)
        const _name = nameQuery.trim().toLowerCase();
        return companies.filter((p) => {
            const matchesName = _name.length === 0 || p.name.toLowerCase().includes(_name) || p.products?.some(pr => pr.name.toLowerCase().includes(_name)) || p.services?.some(s => s.name.toLowerCase().includes(_name));
            const matchesFilter = selected.length === 0 || selected.every((f) => 
            p.filters?.some((c) => c.name === f.name)
            );;
            const matchesTier = tier.length === 0 || tier.includes(p.tier);

            return matchesName && matchesFilter && matchesTier;
        });
    }, [nameQuery, selected, companies, tier]);

    const handleFilter = (newFilters: Filter[]) => {
        setSelected(newFilters)

    }

    if (loading) {
        return (
            <div className="min-h-20vh m-20 flex flex-col items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full border-4 border-clas border-t-transparent animate-spin"></div>
                <p className="text-clas-gris animate-pulse">Cargando directorio...</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-10 items-center p-10 min-h-screen">
            <h1 className="font-medium text-3xl"> Directorio CLAS</h1>
            <div className="w-full flex flex-wrap gap-4 justify-center">
                <div className="flex gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <input className="border-none focus:outline-none w-90 sm:w-120" placeholder="Buscar por nombre, producto o servicio..."
                        type="text"
                        value={nameQuery}
                        onChange={(e) =>
                        setNameQuery(e.target.value)}
                    ></input>
                </div>
                {/*{userProfile.role !== 'unverified' ? <>*/}
                <div className="flex gap-2">
                    <Tag value="Tier 1" tagTier={Number(1)} />
                    <Tag value="Tier 2" tagTier={Number(2)}/>
                    <Tag value="OEM" tagTier={Number(0)}/>
                    <button
                        onClick={() => setIsOpen(true)} 
                        className=" w-20 bg-clas rounded-full py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas-claro">
                        Filtros
                    </button>
                </div>
                
            
            </div>
            
            {/*grid de cards*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(userProfile.role === 'admin' && filteredCompanies.length > 0) ? 
                    <NewDirectoryCardButton /> 
                    : <></> 
                }
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                        <DirectoryCard 
                            key={company.id} 
                            company={company} 
                            user={userProfile} 
                        />
                ))
                ) : (
                    <div className="col-span-4 flex flex-col justify-center items-center gap-5 py-20">
                        <FaceFrownIcon className="text-clas h-15 w-15"/>
                        <p className="text-2xl text-clas">
                            {companies.length === 0
                                ? "No hay empresas registradas"
                                : "No se encontraron empresas con esos filtros"}
                        </p>
                        {(userProfile.role === 'admin' ?
                            <button 
                                className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas"
                                onClick={() => navigate("/empresa/editar")}
                            >
                                Crear página de empresa
                            </button>
                            : <></>
                        )}
                    </div>
                )}
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