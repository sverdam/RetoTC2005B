import type { Company } from "clas-types";
import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    to: string;
    comp?: Company;
    color?: string;
}

const Button: React.FC<Props> = ({ text, to, comp, color }) => {
    const baseColor = color || "";
    const hoverColor = color ? `${color}CC` : "";

    return (
        <div className="flex items-center">
            <NavLink
                to={to}
                state={comp}
                style={{
                    background: color || undefined,
                }}
                className={`inline-flex items-center justify-end text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 transition focus:outline-none focus:ring-offset-2 ${
                    !color
                        ? "bg-clas hover:bg-clas-claro focus:ring-blue-300"
                        : ""
                }`}
                onMouseEnter={(e) => {
                    if (color) {
                        e.currentTarget.style.background = hoverColor;
                    }
                }}
                onMouseLeave={(e) => {
                    if (color) {
                        e.currentTarget.style.background = baseColor;
                    }
                }}
            >
                {text}
            </NavLink>
        </div>
    );
};

export default Button;