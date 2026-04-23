import {
  PhoneIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo, Profiler } from "react";
import { getAllCompanies } from "../api/CompanyAPI";
import type { Company, UserProfile } from "clas-types";
import DirectoryCard from "../components/DirectoryCard";
import FilterModal from "../components/FilterModal";
import NewDirectoryCardButton from "../components/NewDirectoryCardButton";
import { getProfile } from "../api/LoginAPI";


const unverifiedUser : UserProfile = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
    companyMemberType: 'none',
    role: 'unverified'
}

interface TagProps {
    value:string;
    tagTier: number;
}
const DirectoryPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [tier, setTier] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
    
    const Tag: React.FC<TagProps> = ({value, tagTier}) => {
        return(
            <div className="bg-white border border-clas-gris rounded-full">
                <button onClick={() => {
                    if (tagTier === tier) {
                        setTier(null);
                    }else{
                        setTier(tagTier);
                    }
                }}
                className="text-clas-negro bg-white rounded-full w-full h-full px-4 py-2 hover:bg-clas hover:text-white focus:bg-clas focus:text-white">
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
        const _name = nameQuery.trim().toLowerCase();
        return companies.filter((p) => {
            
            console.log(`tag ${tier}, tier ${p.tier}`);
            const matchesName = _name.length === 0 || p.name.toLowerCase().includes(_name);
            const matchesTier = tier === null || p.tier === tier;

            return matchesName && matchesTier;
        });
    }, [nameQuery, tier, companies]);

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
                <Tag value="Tier 1" tagTier={1} />
                <Tag value="Tier 2" tagTier={2}/>
                <Tag value="OEM" tagTier={0}/>
                <button
                    onClick={() => setIsOpen(true)} 
                    className=" w-20 bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                    Filtros
                </button>
            </div>
            {/*grid de cards*/}
            <div className="grid grid-cols-4 gap-4">
                <NewDirectoryCardButton />
                {filteredCompanies.map((company) => (
                    <DirectoryCard key={company.id} company={company} />
                ))}
            </div>
            <FilterModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )

};

export default DirectoryPage;