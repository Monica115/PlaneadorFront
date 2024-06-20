import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaFileAlt,
    FaAlignJustify,
    FaClipboardCheck,
} from "react-icons/fa";

function HeaderDocente() {
    const [openIcon, setOpenIcon] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMenu2, setOpenMenu2] = useState("");
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setOpenIcon(true); // Siempre que se abra/cierre la barra lateral, el icono estará visible
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside2 = useCallback(
        (event) => {
            if (!openMenu2) return;
            if (event.target.closest("#dropdownNavbar")) {
                setOpenMenu2(false);
            }
        },
        [openMenu2]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside2);
        return () => {
            document.removeEventListener("click", handleClickOutside2);
        };
    }, [handleClickOutside2]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-red-500 p-5 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
                <div
                    className={` cursor-pointer w-16 text-white  ${
                        !sidebarOpen && "rotate-180"
                    }`}
                    onClick={toggleSidebar}
                >
                    <div className="flex items-center">
                        <FaAlignJustify />
                    </div>
                </div>
                <h1 className="text-white font-bold">Docente</h1>
                <div className="flex items-center">
                    {menuOpen && (
                        <div className="absolute top-10 right-2 bg-white border border-gray-300 p-2 rounded">
                            <Link to="perfildocente">
                                <button className="block mb-2">Perfil</button>{" "}
                            </Link>
                            <Link to="modificarperfil">
                                <button className="block mb-2">
                                    Cambiar Contraseña
                                </button>
                            </Link>
                            <Link>
                                <button
                                    className="block mb-2"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </Link>
                        </div>
                    )}
                    <button onClick={toggleMenu} className="text-white ml-2">
                        <FaUser />
                    </button>
                </div>
            </header>

            <div className="flex h-screen ">
                {/* Barra lateral */}
                <div
                    className={`h-screen ${
                        sidebarOpen ? "w-72" : "w-20"
                    } fixed top-16 left-0  bg-red-500 overflow-y-scroll z-50`}
                >
                    <div className="m-4 border-b border-gray-200 p-4">
                        <button className="flex w-52 text-white ">
                            <div className="flex items-center">
                                <FaClipboardCheck />

                                <span
                                    className={`${
                                        !sidebarOpen && "hidden"
                                    } origin-left duration-200 ml-2`}
                                >
                                    Planeadores
                                </span>
                            </div>
                        </button>
                    </div>
                    <div className="m-4 border-b border-gray-200 p-4">
                        <Link to="listadocente">
                            <button className="flex w-52 text-white ">
                                <div className="flex items-center">
                                    <FaFileAlt />

                                    <span
                                        className={`${
                                            !sidebarOpen && "hidden"
                                        } origin-left duration-200 ml-2`}
                                    >
                                        Historial de Planeador
                                    </span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main */}
                <main
                    className={`flex-grow bg-gray-100 ${
                        sidebarOpen
                            ? "ml-64 md:ml-64 lg:ml-auto"
                            : "ml-20 md:ml-20 lg:ml-auto "
                    }`}
                >
                    <div className="container lg:mx-20 md:mx-10  mt-10 z-40">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HeaderDocente;
