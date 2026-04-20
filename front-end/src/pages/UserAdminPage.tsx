import {
  PhotoIcon,
  TrashIcon,
  PencilIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Company } from "clas-types";
import { getAllUsers, deleteUser } from "../api/UserAPI";
import { getAllCompanies } from "../api/CompanyAPI";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
//import UserDetailModal from "../components/userDetailModal";

const SortIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m8 15 4 4 4-4m0-6-4-4-4 4"
    />
  </svg>
);

const UserPage: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [nameQuery, setNameQuery] = useState("");
  const [positionQuery, setPositionQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<number | null> (null);
  const [userToDelete, setUserToDelete] = useState<User | null> (null);
  const [userToView, setUserToView] = useState<User | null> (null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    getAllUsers().then((users: User[]) => setUsers(users));
    getAllCompanies().then((companies: Company[]) => setCompanies(companies));
 
  }, []);


  const filteredUsers = useMemo(() => {
    console.log(users);
    const _name= nameQuery.trim().toLowerCase();
    const _position = positionQuery.trim().toLowerCase();

    return users.filter((u) => {
      const matchesName = _name.length === 0 || u.name.toLowerCase().includes(_name);
      const matchesPosition = _position.length === 0 || u.role.toLowerCase().includes(_position);
      const matchesCompany = companyId === null || u.company?.id === companyId;

      return matchesName && matchesPosition && matchesCompany;
    });
  }, [positionQuery, nameQuery, companyId, users]);

  const handleDelete = () => {
    if(!userToDelete) return;
    deleteUser(userToDelete.id).then(() => {
      setUsers((prev) => prev.filter((p) => p.id !== userToDelete.id));
      setUserToDelete(null);
    });
  };

  return (
    <div className="p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

        {/* Header */}
        <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex items-center !gap-2">
          <UserIcon className="!h-4 !w-4 text-blue-700" />
          <p className="text-sm font-semibold text-blue-900">
            All Users
          </p>
        </div>

        {/* Filter */}
        <div className="px-4 py-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Filter</h2>

          <div className="flex flex-wrap gap-3 items-end">

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Name
              </label>
              <input
                className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Name"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Position
              </label>
              <input
                className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Position"
                value={positionQuery}
                onChange={(e) =>
                  setPositionQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Company
              </label>
              <select className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={companyId ?? ""}
                onChange={(e) => 
                  setCompanyId(e.target.value === "" ? null : Number(e.target.value))
                }
              >
                <option value="">All Companies</option>
                {companies.map((com) => (
                  <option key={com.id} value={com.id}>
                    {com.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-900">Results</h2>
            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              onClick={() => navigate("/usuarios/nuevo")}>
              NEW USER
            </button>
          </div>

          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table id="filter-table" className="min-w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      #
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    Company
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      Name
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      Position
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      Email
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      isAdmin
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    Modify
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td className="px-3 py-6 text-center text-sm text-gray-500" colSpan={10}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className = "hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {index+1}
                      </td>
                      
                      <td className="px-3 py-3 text-center text-gray-700">
                        {user.company?.name}
                      </td>

                      <td className="px-3 py-3">
                        <button onClick={() => setUserToView(user)}className="text-blue-600 hover:underline text-sm font-medium">
                          {user.name}
                        </button>
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {user.role}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-3 py-3 text-gray-700 text-center">
                        {user.role.toLowerCase() === "admin" ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-600 inline-block" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 inline-block" />
                        )}
                      </td>

                      {/*Edit*/}
                    <td className="px-3 py-3 text-center">
                      <button onClick={() => setUserToView(user)} className="text-blue-600 hover:text-blue-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </td>

                    {/* delete*/}
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() =>
                          setUserToDelete(user)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  ))
                )} 
              </tbody>
            </table>
            <DeleteConfirmModal
              user={userToDelete}
              onClose={() => setUserToDelete(null)}
              onConfirm={handleDelete} />
            {/* <UserDetailModal 
              user={userToView}
              onClose={() => setUserToView(null)}
              onEdit={() => {navigate(`/usuarios/${userToView?.id}`, {state: {user: userToView } });
                setUserToView(null);
              }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
