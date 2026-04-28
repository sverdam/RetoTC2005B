import type { Company } from "clas-types";
import { NavLink } from "react-router-dom";

interface Props{
    text: string;
    to: string;
    comp?: Company;
}

const Button: React.FC<Props> = ({text, to, comp}) => {
    return (
    <div className="flex items-center">
        <NavLink
            to={to}
            state={comp}
            className="inline-flex items-center justify-end text-white bg-clas hover:bg-clas-claro focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none focus:ring-offset-2"
            >
            
            {text}
            </NavLink>
            </div>
    )
};

export default Button