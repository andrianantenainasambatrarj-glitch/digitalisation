import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiBarChart2, FiMenu, FiUserPlus, FiHeart, FiBook, FiFile } from "react-icons/fi";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-beige text-base-content">
      {/* Topbar */}
      <div className="navbar bg-white/90 backdrop-blur border-b border-base-300 sticky top-0 z-40">
        <div className="flex-none md:hidden">
          <label htmlFor="app-drawer" className="btn btn-ghost btn-square">
            <FiMenu className="text-xl" />
          </label>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-lg font-semibold text-navy">
            Etat Civil • Commune Rurale
          </Link>
        </div>
        <div className="flex-none gap-2 pr-2">
          <a href="#" className="link link-hover text-sm hidden md:block">Aide</a>
        </div>
      </div>

      {/* Body with drawer for mobile */}
      <div className="drawer lg:drawer-open">
        <input id="app-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          {/* Content */}
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" />
          {/* Sidebar */}
          <aside className="w-72 bg-white border-r border-base-300 min-h-[calc(100vh-4rem)] p-4">
            <nav className="menu">
              <p className="menu-title">Navigation</p>
              <ul>
                <li>
                  <NavLink to="/" end className={({isActive}) => isActive ? "active" : undefined}>
                    <FiHome className="mr-2"/> Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className={({isActive}) => isActive ? "active" : undefined}>
                    <FiFileText className="mr-2"/> Services
                  </NavLink>
                </li>
                <li className="menu-title mt-2">Actes</li>
                <li>
                  <NavLink to="/naissance" className={({isActive}) => isActive ? "active" : undefined}>
                    <FiUserPlus className="mr-2"/> Naissance
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mariage" className={({isActive}) => isActive ? "active" : undefined}>
                    <FiHeart className="mr-2"/> Mariage
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/deces" className={({isActive}) => isActive ? "active" : undefined}>
                    <FiBook className="mr-2"/> Décès
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reconnaissance" className={({isActive}) => isActive ? "active" : undefined}>
                    <FiFile className="mr-2"/> Reconnaissance
                  </NavLink>
                </li>
                <li className="menu-title mt-2">Autres</li>
                <li>
                  <a href="#stats">
                    <FiBarChart2 className="mr-2"/> Statistiques
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Layout;


