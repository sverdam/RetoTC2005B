import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Company, User, NewUserInput, UserRole } from "clas-types";
import { getAllCompanies } from '../api/CompanyAPI';
import { createUser, getUserById, updateUser } from '../api/UserAPI';


const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "block text-xs font-medium text-gray-600 mb-1";

// Valor inicial del formulario
const emptyForm: NewUserInput ={
    name: "",
    email: "",
    password: "",
    role: 'user',
    companyId: 0,
};

const UserFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const isEditing = id !== undefined;

    const [ companies, setCompanies ] = useState<Company[]>([]);
    const [ form, setForm] = useState<NewUserInput>(emptyForm);

    useEffect(() => {
        getAllCompanies().then(setCompanies);

        if (isEditing)
        {
            getUserById(Number(id)).then( user => {
                setForm({
                    name: user.name,
                    email: user.email,
                    password: "",
                    role: user.role,
                    companyId: user.company?.id ?? 0
                })
            }).catch(

            );
        }
    },[]);

    const handleChange = (field: keyof NewUserInput, value: string | number | boolean) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing){
            updateUser(Number(id), form).then(() => navigate("/usuarios"));
        } else {
            createUser(form).then(() => navigate("/usuarios"));
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/usuarios")}
                            className="text-blue-700 hover:text:blue-900"    
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                        {isEditing ? <PencilSquareIcon className="h-4 w-4 text-blue-700" />
                            : <PlusIcon className="h-4 w-4 text-blue-700" />}
                        <p className="text-sm font-semibold text-blue-900">
                            {isEditing ? "Edit User" : "New User"}
                        </p>
                    </div>
                    {/* Body */}
                    <div className="px-6 py-6 space-y-5">
                        {/* Name - Full Width */}
                        <div>
                            <label className={labelClass}>
                                Nombre
                            </label>
                            <input
                                type="text"
                                required
                                className={inputClass}
                                placeholder="User name"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}>
                            </input>
                        </div>
                        {/* 2-column grid */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            {/* Email */}
                            <div>
                                <label className={labelClass}>
                                    Correo
                                </label>
                                <input
                                    type="text"
                                    required
                                    className={inputClass}
                                    placeholder="User e-mail"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}>
                                </input>
                            </div>
                            {/* Password */}
                            <div>
                                <label className={labelClass}>
                                    {isEditing ? "Restablecer " : ""}Contraseña
                                </label>
                                <input
                                    type="password"
                                    required
                                    className={inputClass}
                                    placeholder={isEditing ? "Dejar vacío para mantener contraseña actual" : "User password"}
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}>
                                </input>
                            </div>
                            
                            {/* Company */}
                            <div>
                                <label className={labelClass}>
                                    Compañia
                                </label>
                                <select
                                    required
                                    className={inputClass}
                                    value={form.companyId || 0}
                                    onChange={(e) => handleChange("companyId", parseInt(e.target.value) || 0)}
                                >
                                    <option value="">
                                        Selecciona una compañia
                                    </option>
                                    {companies.map((com) => (
                                        <option key={com.id} value={com.id}>
                                            {com.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* isAdmin */}
                            <div>
                                <label className={labelClass}>
                                    Tipo de usuario
                                </label>
                                <select
                                    required 
                                    className={inputClass}
                                    value={form.role.toString()}
                                    onChange={(e) => handleChange("role", e.target.value )}
                                    >
                                    <option
                                        value="user">
                                        USER
                                    </option>
                                    <option
                                        value="admin">
                                        ADMIN
                                    </option>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
                        <button
                            type="button"
                            onClick={() => navigate("/usuarios")}
                            className="rounded-md border border-gray-500 bg-white
                            px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50
                            focus:outline-none focus:ring-2 focus:ring-gray-300">
                                Cancelar
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-md
                        bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm
                        hover:bg-blue-700 focus: outline-none focus:ring-2 focus:ring-blue-500/30">
                            {isEditing ? <><PencilSquareIcon className="h-4 w-4" />Guardar Cambios</>: <><PlusIcon className="h-4 w-4" />Guardar Usuario</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserFormPage;
