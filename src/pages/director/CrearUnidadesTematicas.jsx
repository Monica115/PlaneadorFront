import React, { useState, useEffect } from "react";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearUnidadesExcel from "./CrearUnidadesExcel";

const CrearUnidadesTematicas = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materia_id, setMateria_id] = useState("");
  const [alertaError, setAlertaError] = useState({
    error: false,
    message: "",
  });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("materia/");
        setMaterias(response.data);

        if (response.data.length > 0) {
          setMateria_id(response.data[0].id); // Establecer la primera categoría como seleccionada por defecto
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (categoriaId) => {
    setMateria_id(categoriaId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (descripcion.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
      return;
    }

    try {
      const res = await conexionAxios.post("unidad/create", {
        nombre,
        descripcion,
        materia_id: parseInt(materia_id),
      });
      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({
          error: true,
          message: res.data.message,
        });
        setTimeout(() => setAlertaExitoso({ error: false, message: "" }), 5000);
        setNombre("");
        setDescripcion("");

        if (materias.length > 0) {
          setMateria_id(categorias[0].id); // Restablecer a la primera categoría
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({
          error: true,
          message: error.response.data.error,
        });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  return (
    <div>
      <div className="px-10 py-5"></div>
      <div className=" 2xl:mx-48 xl:mx-52 lg:mx-32 md:mx-10 sm:mx-10 mx-10  bg-white shadow rounded-lg p-10 ">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl text-center text-gray-900 border-b-2 border-gray-300 ">
            Crear Unidad Tematica
          </h1>

          {alertaError.error && !alertaExitoso.error && (
            <AlertaError message={alertaError.message} />
          )}
          {alertaExitoso.error && (
            <AlertaExitoso message={alertaExitoso.message} />
          )}

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="nombre"
              name="nombre"
              type="text"
            >
              Nombre
            </label>

            <input
              id="nombre"
              placeholder="Nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="descripcion"
            >
              Descripcion
            </label>

            <textarea
              id="descripcion"
              placeholder="Descripcion de la categoria"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="categoriaId"
            >
              Materia
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e.target.value)}
                value={materia_id}
              >
                {materias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Crear"
            className="bg-red-700 hover:bg-red-900 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors"
          />
        </form>
        <div className="border-t border-gray-600 p-2">
          <CrearUnidadesExcel />
        </div>
      </div>
    </div>
  );
};

export default CrearUnidadesTematicas;
