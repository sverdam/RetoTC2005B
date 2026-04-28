import { NavLink, useLocation, useNavigate} from "react-router-dom";
import Button from "./Button";
import { logout, getProfile } from "../api/LoginAPI";
import { useEffect, useState } from "react";
import type { UserProfile } from "clas-types";

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [
    "block py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-clas-negro"
      : "text-gray-500 hover:text-clas",
  ].join(" ");
};

const unverifiedUser : UserProfile = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
    role: 'unverified'
}

const Navbar: React.FC = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)

    useEffect(() => {
      getProfile().then(result => setUserProfile(result))
    }, [location.pathname])

    const clickLogout = () => {
      logout().finally(() => {
        getProfile().then(result => {
          setUserProfile(result);
        navigate("/");
      });
      });
    }

    return (
        <nav className="bg-white w-full border-b border-gray-200">
          <div className="w-full px-4 lg:px-6 py-2.5 flex items-center justify-between">
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
                {(userProfile.role === 'admin') ? 
                <li>
                  <NavLink
                    to="/usuarios"
                    className={navLinkClass}
                  >
                    Administración de Usuarios
                  </NavLink>
                </li> : <></>}
                <li>{
                    userProfile.role === "unverified" ? 
                    <Button
                    text="Iniciar Sesión"
                    to="/login"  
                    /> : 
                    <button
                    onClick={clickLogout}
                    className="inline-flex items-center justify-end text-white bg-clas hover:bg-clas-claro focus:ring-4 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none focus:ring-offset-2"> 
                    Cerrar Sesión
                    </button>
                    }
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;


