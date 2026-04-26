import React, { useState } from 'react';
import { MemberType } from '../types/types';

interface AddCompanyFormData {
    id: number;
    name: string;
    description: string;
    tier: number;
    memberType: MemberType;
    address: string;
    mapLink: string;
    contactEmail: string;
    contactPhone: string;
}

const Addcompany = () => {
    const [formData, setFormdata] = useState<AddCompanyFormData>({
        id: 0,
        name: '',
        description: '',
        tier: 1,
        memberType: MemberType.AFFILIATE,
        address: '',
        mapLink: '',
        contactEmail: '',
        contactPhone: '',
    });

    const [logo, setLogo] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setLogo(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //form data para soportar el archivo (Blob)
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('tier', formData.tier.toString());
    data.append('memberType', formData.memberType);

    data.append('address', formData.address);
    data.append('mapLink', formData.mapLink);

    data.append('contactEmail', formData.contactEmail);
    data.append('contactPhone', formData.contactPhone);

    if (logo) {
      data.append('logo', logo);
    }
    try {
      const response = await fetch('http://localhost:3000/company', {
        method: 'POST',
        body: data, // No enviamos headers de Content-Type, el navegador lo hace solo con FormData
      });

      if (response.ok) {
        alert("¡Empresa añadida al CLAS con éxito!");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
};

return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">Añadir Nueva Empresa al Directorio</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección: Información Básica */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
            <input type="text" name="name" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea name="description" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 h-24" required />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tier</label>
              <input type="number" name="tier" min="1" max="3" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tipo de Miembro</label>
              <select name="memberType" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2">
                <option value={MemberType.AFFILIATE}>Afiliado</option>
                <option value={MemberType.ASSOCIATE}>Asociado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección: Media y Ubicación */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo (Imagen)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección Física</label>
            <input type="text" name="address" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link de Google Maps</label>
            <input type="url" name="mapLink" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" placeholder="https://goo.gl/maps/..." />
          </div>
        </div>

        {/* Sección: Contacto Directo */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
           <div>
            <label className="block text-sm font-medium text-gray-700">Email de Contacto</label>
            <input type="email" name="contactEmail" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" name="contactPhone" onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
        </div>

        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
          Registrar Empresa en el Clúster
        </button>
      </form>
    </div>
  );
};

export default Addcompany;
