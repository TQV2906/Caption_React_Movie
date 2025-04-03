import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <aside className="bg-gray-100 w-64 h-screen fixed top-0 left-0 overflow-y-auto border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/admin/users"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
            >
              Users
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/movies"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
            >
              Movies
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
            >
              Add Movie
            </NavLink>
          </li>
          {/* Thêm các mục sidebar khác tại đây */}
        </ul>
      </nav>
      <div className="p-6 mt-auto border-t border-gray-200">
        <button className="block w-full py-2 px-4 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-150 ease-in-out">
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
