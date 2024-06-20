import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import conexionAxios from "../axios/Axios";
import {
  FaUser,
  FaUserFriends,
  FaListAlt,
  FaFlag,
  FaSearch,
  FaListUl,
  FaFileAlt,
  FaBookmark,
  FaIdCardAlt,
  FaAlignJustify,
  FaUserTie,
  FaHouseUser,
} from "react-icons/fa";
import { TbNumber123 } from "react-icons/tb";
import { BiCircleThreeQuarter } from "react-icons/bi";
import { IoExit, IoStatsChartSharp } from "react-icons/io5";

function HeaderDirector() {
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

  // para el id del director
  const [director, setDirector] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getDirector = async () => {
      try {
        const response = await conexionAxios.get("user/admin");
        setDirector(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDirector();
  }, []);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = docente.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-red-600 p-5 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
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
        <h1 className="text-white font-bold">Director</h1>
      </header>

      <div className="flex h-screen ">
        {/* Barra lateral */}
        <div
          className={`h-screen ${
            sidebarOpen ? "w-72" : "w-20"
          } fixed top-16 left-0  bg-red-600 overflow-y-scroll z-50`}
        >
          <div className="m-4 border-b border-gray-200 p-4">
            {filteredData.map((directorItem) => (
              <div key={directorItem.id}>
                <Link to={`modificardirector/${directorItem.id}`}>
                  <button className="flex w-52 text-white ">
                    <div className="flex items-center">
                      <FaHouseUser />

                      <span
                        className={`${
                          !sidebarOpen && "hidden"
                        } origin-left duration-200 ml-2`}
                      >
                        Menú Principal
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listadocente">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaUserFriends />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Docente
                  </span>
                </div>
              </button>
            </Link>
          </div>

          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaListAlt />

                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Materias
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listacompetencia">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaFlag />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Competencias
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listacategoria">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <BiCircleThreeQuarter />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Categorias
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listaresultadoaprendizaje">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaSearch />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Resultados Aprendizaje
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listaracurso">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaListUl />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Listado RA Curso
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listainstrumentoevaluacion">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <IoStatsChartSharp />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Instrumentos Evaluacion
                  </span>
                </div>
              </button>
            </Link>
          </div>

          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listaplaneador">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaIdCardAlt />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Planeadores Docente
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white " onClick={handleLogout}>
              <div className="flex items-center">
                <IoExit />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Cerrar Sesión
                </span>
              </div>
            </button>
          </div>
          <div className="m-4  p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Main */}
        <main
          className={`flex-grow bg-gray-100 my-10 z-40${
            sidebarOpen ? "ml-72 md:ml-72 lg:ml-72 2xl:ml-20" : "ml-20 md:ml-20 lg:ml-20  "
          }`}
        >
          
            <Outlet />
         
        </main>
      </div>
    </div>
  );
}

export default HeaderDirector;
