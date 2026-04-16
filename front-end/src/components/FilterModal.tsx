import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react"
import type { Filter } from "clas-types";
import { useState, useEffect } from "react";
import { getAllFilters } from "../api/FilterAPI";

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<Props> = ({ isOpen, onClose }) => {

    {/* Todos los filtros que vienen desde el backend */}
    const [filters, setFilters] = useState<Filter[]>([]);
    {/* Los filtros seleccionados por el usuario */}
    const [selected, setSelected] = useState<Filter[]>([]);

    useEffect(() => {
        getAllFilters().then((data: Filter[]) => setFilters(data));
    }, []);

    const toogleTag = (tag: Filter) => {
        if(selected.some((t) => t.id === tag.id)) {
            setSelected(selected.filter((t) => t.id !== tag.id));
        } else {
            setSelected([...selected, tag]);
        }
    };

    return(
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold">
                        Filtros
                    </DialogTitle>

                    <div className="flex flex-wrap gap-3">
                        {filters.map((tag) => {
                            const isSelected = selected.some((t) => t.id === tag.id);

                            return (
                                <button key={tag.id}
                                    onClick={() => toogleTag(tag)}
                                    className={`px-4 py-2 rounded-full border transition 
                                        ${isSelected ? "bg-clas text-white" : "bg-white text-clas-negro border-clas-gris hover:bg-clas-claro"}`}>
                                    {tag.name}
                                </button>
                            );
                        })}
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    )

    
}

export default FilterModal;