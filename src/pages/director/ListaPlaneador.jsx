import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaDownload, FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListaPlaneador = () => {
  const [planeador, setplaneador] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set items per page

  useEffect(() => {
    const getplaneador = async () => {
      try {
        const response = await conexionAxios.get("planeador/");
        console.log(response.data);
        setplaneador(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getplaneador();
  }, []);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = planeador.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`planeador/delete/${id}`);
      // Actualizar la lista después de eliminar
      const updatedPlaneador = planeador.filter((doc) => doc.id !== id);
      setplaneador(updatedPlaneador);
      setFilteredData(updatedPlaneador);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDownload = async (id) => {
    try {
      const response = await conexionAxios.get(`planeador/download-excel/${id}`, {
        responseType: "blob", // Important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx"); // You can specify the file name here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div>
      <div className="py-5">
        <div className="">
          <h1 className="text-2xl border-b-4 border-gray-300 text-left font-bold">
            Planeador
          </h1>
        </div>
      </div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3">
        <div>
          <Link to="crearplaneador">
            <button className="border border-black rounded p-2 text-white bg-red-700 hover:bg-red-900 mx-2">
              Agregar Planeador
            </button>
          </Link>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={search}
            className="border p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <div className="py-2 mt-5 align-middle inline-block min-w-full">
            <div className="shadow overflow-x-auto sm:overflow-x-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400">
                  <thead className=" uppercase bg-red-500">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nombre
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Area de formación
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Visualizar
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Editar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descargar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-400">
                    {currentItems.map((materiaItem) => (
                      <tr key={materiaItem.id}>
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="text-sm text-gray-900">
                            {materiaItem.nombre}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {materiaItem.area_formacion}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`visualizarplaneador/${materiaItem.id}`}>
                            <button className=" text-gray-500 font-bold hover:text-gray-800 py-2 px-4 rounded text-2xl">
                              <FaEye />
                            </button>
                          </Link>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`modificardatosplaneador/${materiaItem.id}`}
                          >
                            <button className=" text-gray-500 font-bold hover:text-gray-800 py-2 px-4 rounded text-2xl">
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className=" text-gray-500 font-bold hover:text-gray-800 py-2 px-4 rounded text-2xl"
                            onClick={() => handleDownload(materiaItem.id)}
                          >
                            <FaDownload />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className=" text-red-500 font-bold hover:text-red-900 py-2 px-4 rounded text-2xl"
                            onClick={() => handleDelete(materiaItem.id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaPlaneador;
