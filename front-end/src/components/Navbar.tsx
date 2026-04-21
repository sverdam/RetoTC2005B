import { NavLink } from "react-router-dom";
import Button from "./Button";

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [
    "block py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-clas-negro"
      : "text-gray-500 hover:text-clas",
  ].join(" ");
};

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 border-b">
          <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
            <NavLink to="/" className="flex items-center">
              <img
                src="..\src\assets\CLAS-Logotipo-03.jpeg"
                alt="Logo"
                className="mr-3 w-12"
              />
            </NavLink>


            <div className="flex items-center w-auto">
              <ul className="flex flex-row items-center font-medium space-x-8">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={navLinkClass}
                  >
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/directorio"
                    className={navLinkClass}
                  >
                    Directorio
                  </NavLink>
                </li>
                <li>
                    <Button
                    text="Iniciar Sesión"
                    to="/"  
                    />
                     {/* TO DO: add login button navigation */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;


