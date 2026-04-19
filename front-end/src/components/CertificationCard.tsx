import { CheckIcon } from "@heroicons/react/24/outline";

interface CertificationProps{
    name: string;
}

const CertificationCard: React.FC<CertificationProps> = ({name}) => {
    return (
        <div className=" flex flex-col flex-wrap justify-center items-center rounded-lg border border-clas-gris w-30 h-30 p-2">
            <div className="rounded-full w-7 h-7 border border-clas m-1">
                <CheckIcon className="text-clas p-1"/>
            </div>
            <h3 className="text-clas-negro m-2">{name}</h3>
        </div>
    )
}

export default CertificationCard;