import React, { useState, useEffect } from "react";
import { Users, Search, Edit2, Trash2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";

interface User {
  id: string;
  email: string;
  role: string;
  displayName: string;
  firstName: string;
  lastName: string;
  career_name: string;
  position_name: string;
  currentSubscription: {
    planName: string;
    endDate: string;
    isActive: boolean;
  };
}

export const AdminUsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const mockUsers = localStorage.getItem("mockUsers");
      if (mockUsers) {
        setUsers(JSON.parse(mockUsers));
      } else {
        const response = await fetch("/users.json");
        const data = await response.json();
        localStorage.setItem("mockUsers", JSON.stringify(data.users));
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const filteredUsers = users
    .filter((u) => u.role !== "admin")
    .filter((u) =>
      u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (user: User) => {
    setSelectedUser({ ...user });
    setShowModal(true);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      localStorage.setItem("mockUsers", JSON.stringify(updated));
    }
  };

  const handleToggle = (userId: string) => {
    const updated = users.map((u) =>
      u.id === userId
        ? {
            ...u,
            currentSubscription: {
              ...u.currentSubscription,
              isActive: !u.currentSubscription.isActive,
            },
          }
        : u
    );
    setUsers(updated);
    localStorage.setItem("mockUsers", JSON.stringify(updated));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updated = users.map((u) => (u.id === selectedUser.id ? selectedUser : u));
    setUsers(updated);
    localStorage.setItem("mockUsers", JSON.stringify(updated));
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Usuarios</h1>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Carrera / Puesto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.career_name}</div>
                    <div className="text-sm text-gray-500">{user.position_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.currentSubscription.planName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(user.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.currentSubscription.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.currentSubscription.isActive ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                      type="text"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={selectedUser.currentSubscription.endDate.split("T")[0]}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        currentSubscription: {
                          ...selectedUser.currentSubscription,
                          endDate: new Date(e.target.value).toISOString(),
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
