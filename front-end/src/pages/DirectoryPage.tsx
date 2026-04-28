import {
  PhoneIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo, Profiler } from "react";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company, Filter, UserProfile } from "clas-types";
import DirectoryCard from "../components/DirectoryCard";
import FilterModal from "../components/FilterModal";
import NewDirectoryCardButton from "../components/NewDirectoryCardButton";
import { getProfile } from "../api/LoginAPI";


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
    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [tier, setTier] = useState<number[]>([])
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Filter[]>([]);
    
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
    
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
        getAllCompanies().then((companies: Company[]) => setCompanies(companies));
        getProfile().then((profile: UserProfile) => setUserProfile(profile))
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

    return (
        <div className="flex flex-col gap-10 items-center p-10 min-h-screen">
            <h1 className="font-medium text-3xl"> Directorio CLAS</h1>
            <div className="w-full flex gap-4 justify-center">
                <div className="flex gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <input className="border-none focus:outline-none w-120" placeholder="Buscar por nombre..."
                        type="text"
                        value={nameQuery}
                        onChange={(e) =>
                        setNameQuery(e.target.value)}
                    ></input>
                </div>
                {/*{userProfile.role !== 'unverified' ? <>*/}
                <Tag value="Tier 1" tagTier={Number(1)} />
                <Tag value="Tier 2" tagTier={Number(2)}/>
                <Tag value="OEM" tagTier={Number(0)}/>
                <button
                    onClick={() => setIsOpen(true)} 
                    className=" w-20 bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                    Filtros
                </button>
            
            </div>
            {/*grid de cards*/}
            <div className="grid grid-cols-4 gap-4">
                {(userProfile.role === 'admin') ? 
                <NewDirectoryCardButton /> : <></> }
                {filteredCompanies.map((company) => (
                    <DirectoryCard key={company.id} company={company} user={userProfile} />
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