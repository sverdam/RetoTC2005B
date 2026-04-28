import {
    BuildingOffice2Icon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import React from "react";

interface ProfileProps {
  name: string;
  position: string;
  company: string;
  mail: string;
  image?: string;
}

const ProfileCard: React.FC<ProfileProps> = ({
  name,
  position,
  company,
  image,
  mail
}) => {
  return (
    <div>
      <div className="w-full bg-white p-4 gap-2 w-68 flex flex-col items-center rounded-xl overflow-hidden shadow transition hover:shadow-lg hover:-translate-y-1">
                 {/* Profile Image */}
                    <div className="w-40 h-40">
                        <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-full bg-gray-50"/>
                    </div>

                    {/* Profile Info */}
                    <div className="flex flex-col gap-1 items-center">
                        <h3 className="w-40 text-center text-clas-negro font-medium text-xl">
                            {name}
                        </h3>

                        
                        <h4 className="text-clas text-sm font-medium mb-1">
                            {position}
                        </h4>

                        <div className="flex gap-2">
                            <BuildingOffice2Icon className="h-4 text-clas-gris"/>
                            <p className="text-gray-500 text-sm mb-3">
                            {company}
                        </p>
                        </div>

                        <a href={`mailto:${mail}`}  className="text-clas text-sm font-medium hover:underline">
                            {mail}
                        </a>
                    </div>
                    
      </div>
    </div>
  );
};

export default ProfileCard;