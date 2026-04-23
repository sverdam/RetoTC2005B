import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { LoginUser } from "clas-types";
import { getProfile, login } from "../api/LoginAPI";

const emptyForm : LoginUser = {
    email: "",
    password: ""
}

const LoginPage: React.FC = () => {
    
    const navigate = useNavigate();
    const [ form, setForm] = useState<LoginUser>(emptyForm);
    
    const handleChange = (field: keyof LoginUser, value: string | number | boolean) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        login(form).then(
            () => navigate("/directorio")
        );
    };

    // useEffect(() => {
    //     getProfile().then(response => {
    //         console.log("GET PROFILE: ");
    //         console.log(response)
    //     }).finally(
    //         () => console.log("get profile attempted")
    //     );
    // }, [])

    return(
        <div className="grid grid-cols-2 gap-2">
            <div className=" flex flex-col justify-end rounded-lg  h-screen bg-gradient-to-t from-clas to-clas-claro">
                <h4 className="px-10 font-semibold text-white text-left text-lg">Puedes facilmente</h4>
                <h1 className="px-10 py-10 font-bold text-white text-left text-2xl">Acceder a información sobre empresas líderes en la industria automotriz</h1>
            </div>
            <div className="flex flex-col items-start  justify-center rounded-lg">
                <img src="..\src\assets\CLAS-Logotipo-03.jpeg" className="p-10 w-40"/>
                <h1 className="px-10 pt-5 text-clas-negro font-bold text-3xl text-left">Inicia Sesión</h1>
                <p className="px-10 pt-2 pb-5 text-clas-negro/70 text-lg text-left">Accede al directorio, boletín de noticias y más</p>
                {/* Formulario */}
                <form action="/login" method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start px-10">
                        <label className="font-semibold text-lg pb-2">Correo</label>
                        <input 
                        type="text" 
                        placeholder="Tu correo" 
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="border border-clas-gris rounded-lg px-2 py-1 text-clas-negro/80 w-md">
                        </input>
                    </div>
                    <div className="flex flex-col items-start px-10 py-5">
                        <label className="font-semibold text-lg pb-2">Contraseña</label>
                        <input 
                            type="password" placeholder="contraseña" 
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="border border-clas-gris rounded-lg px-2 py-1 text-clas-negro/80 w-md">

                        </input>
                    </div>
                    {/*TODO: Arreglar submit para dirigir al directorio */}
                    <button type="submit" 
                    className="w-md bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">Entrar</button>
                </form>
                <div className="w-lg flex justify-center px-10 py-5 gap-2">
                    <p className="pt-2 pb-5 text-clas-negro/70 text-sm">
                        ¿Te gustaría formar parte de CLAS?
                    </p>
                    <a href="/membresia" className="pt-2 pb-5 text-clas-claro text-sm font-semibold hover:text-clas">
                        Contáctanos aquí
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;