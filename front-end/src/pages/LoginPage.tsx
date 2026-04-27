import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { LoginUser } from "clas-types";
import { getProfile, login } from "../api/LoginAPI";import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
4
// import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const emptyForm : LoginUser = {
    email: "",
    password: ""
}

const LoginPage: React.FC = () => {
    
    const navigate = useNavigate();
    const [ form, setForm] = useState<LoginUser>(emptyForm);
    const [ failAttempt, setFailAttempt] = useState<boolean>(false);

    const handleChange = (field: keyof LoginUser, value: string | number | boolean) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        login(form).then(
            () => {
                navigate("/directorio");
                setFailAttempt(false);
            }
        ).catch(
            () => setFailAttempt(true)
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
        <div className="min-h-full grid grid-cols-2 gap-2 bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_0%,_rgba(59,130,246,0.18)_25%,_white_65%)]">
            <div className="m-20 flex flex-col justify-center rounded-lg bg-transparent">
                <h4 className="px-10 font-semibold text-clas-negro text-left text-lg animate:bounce">Puedes facilmente</h4>
                <h1 className="px-10 py-10 font-bold text-clas-negro text-left text-2xl">Acceder a información sobre empresas líderes en la industria automotriz</h1>
            </div>
            <div className="m-20 px-10 flex flex-col items-center justify-center rounded-lg bg-white rounded-xl shadow-xl shadow-clas/50">
                <img src="..\src\assets\CLAS-Logo.png" className="p-10 w-50"/>
                <h1 className="px-10 pt-5 text-clas-negro font-bold text-3xl text-left">¡Bienvenido!</h1>
                <p className="px-10 pt-2 pb-5 text-clas-negro/70 text-lg text-left">Inicia sesión para continuar</p>
                {/* Formulario */}
                <form action="/login" method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start px-10">
                        <label className="font-semibold text-lg pb-2">Correo</label>
                        <div className="flex items-center gap-2 border border-clas-gris rounded-lg px-2 py-1 text-clas-negro/80 w-md">
                            <EnvelopeIcon className="text-clas-gris w-5 h-5"/>
                            <input 
                            type="text" 
                            placeholder="Tu correo" 
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full outline-none">
                            </input>
                        </div>
                        
                    </div>
                    <div className="flex flex-col items-start px-10 py-5">
                        <label className="font-semibold text-lg pb-2">Contraseña</label>
                        <div className="flex items-center gap-2 border border-clas-gris rounded-lg px-2 py-1 text-clas-negro/80 w-md">
                            <LockClosedIcon className="text-clas-gris w-5 h-5"/>
                            <input 
                            type="password" placeholder="contraseña" 
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="w-full outline-none">
                            </input>
                        </div>
                        
                    </div>
                    <button type="submit" 
                    className="w-md bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">Entrar</button>
                    {failAttempt ? <div className="text-red-700 p-2">
                        <p>Contraseña o usuario incorrecto</p>
                    </div> : <></>}
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