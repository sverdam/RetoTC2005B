import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react"
import type { Filter, Category } from "clas-types";
import { useState, useEffect, useMemo } from "react";
import { getAllFilters } from "../api/FilterAPI";
import { getAllCategories } from "../api/CategoryAPI";
import { useNavigate } from "react-router";


interface Props{
    isOpen: boolean;
    onClose: () => void;
    selectFilter: Filter[];
    setSelectFilter: (filters: Filter[] ) => void;
}

const FilterModal: React.FC<Props> = ({ isOpen, onClose, selectFilter, setSelectFilter }) => {

    {/* Todos los filtros que vienen desde el backend */}
    const [filters, setFilters] = useState<Filter[]>([]);
    {/* Los filtros seleccionados por el usuario */}
    const [selected, setSelected] = useState<Filter[]>([]);
    {/* Las categorias que vienen de backend */}
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllFilters().then((data: Filter[]) => setFilters(data));
        if (isOpen) {
            setSelected(selectFilter);
        }
        
    }, [isOpen, selectFilter]);

    useEffect(() => {
        getAllCategories().then((data:Category[]) => setCategories(data))
    }, []);

    const toogleTag = (tag: Filter) => {
        if(selected.some((t) => t.id === tag.id)) {
            setSelected(selected.filter((t) => t.id !== tag.id));
        } else {
            setSelected([...selected, tag]);
        }
    };


    const groupedFilters = useMemo(() => {
        return filters.reduce<Record<number, Filter[]>>((acc, filter) => {
            if (!acc[filter.category.id]) {
                acc[filter.category.id] = [];
            }
            acc[filter.category.id].push(filter);
            return acc;
        }, {});
    },[filters]);

    return(
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        Filtros
                    </DialogTitle>

                    <div className="flex flex-wrap gap-3">
                        {categories.map(category => (
                            <div key={category.id} className="mb-4">
                                <h3 className="text-md font-semibold text-clas-negro">{category.name}</h3>
                                <div>
                                    {groupedFilters[category.id]?.map(filter => {
                                        const isSelected = selected.some((f) => f.id === filter.id);
                                        
                                        return(
                                            <button key={filter.id}
                                                onClick={() => toogleTag(filter)}
                                                className={` m-2 px-4 py-2 rounded-full border transition 
                                                    ${isSelected ? "bg-clas text-white" : "bg-white text-clas-negro border-clas-gris hover:bg-clas-claro"}`}>
                                                {filter.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button 
                        onClick={() =>{
                            onClose();
                                
                        }}

                        className="bg-white border-2 border-red-500 rounded-lg py-1 px-2 text-red-500 hover:bg-clas-gris/40 focus:ring-2 focus:ring-red-600">
                            Cancelar
                        </button>
                        <button 
                        onClick={() =>{
                            setSelectFilter(selected);
                            onClose();
                                
                        }}

                        className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            Filtrar
                        </button>
                    </div>
                    
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default FilterModal;