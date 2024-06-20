import React, { useState, useEffect } from "react";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearRACursoExcel from "./CrearRACursoExcel";
const CrearPlaneador = () => {
  const [user_id, setUser_id] = useState("");
  const [user, setUser] = useState([]);
  const [area_formacion, setArea_formacion] = useState("");
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
        console.log(response.data);

        setMaterias(response.data);
        if (response.data.length > 0) {
          setMateria_id(response.data[0].id); // Establecer la primera categoría como seleccionada por defecto
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getDocente = async () => {
      try {
        const response = await conexionAxios.get("user/teachers");
        console.log(response.data);

        setUser(response.data);
        if (response.data.length > 0) {
          setUser_id(response.data[0].id); // Establecer la primera categoría como seleccionada por defecto
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getDocente();
  }, []);

  const handleMateriaChange = (materia_id) => {
    setMateria_id(materia_id);
  };
  const handleUserChange = (user_id) => {
    setUser_id(user_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await conexionAxios.post("planeador/create", {
        user_id: parseInt(user_id),
        area_formacion,
        materia_id: parseInt(materia_id),
      });
      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({
          error: true,
          message: res.data.message,
        });
        setTimeout(() => setAlertaExitoso({ error: false, message: "" }), 5000);
        if (user.length > 0) {
          setUser_id(user[0].id); // Restablecer al primer ID de docente
        }
        setUser_id("");
        if (materias.length > 0) {
          setMateria_id(materias[0].id); // Restablecer al primer ID de materia
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
      <div className="xl:mx-60 lg:mx-60 md:mx-40 sm:mx-20 bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl text-center text-gray-900 border-b-2 border-gray-300 ">
            Crear Planeador
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
              htmlFor="categoriaId"
            >
              Seleccionar Docente:
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleUserChange(e.target.value)}
                value={user_id}
              >
                {user.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre}
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
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="area_formacion"
              name="area_formacion"
              type="text"
            >
              Area de Formación
            </label>

            <input
              id="area_formacion"
              placeholder="Area de Formación"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={area_formacion}
              onChange={(e) => setArea_formacion(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="categoriaId"
            >
              Seleccionar Curso:
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleMateriaChange(e.target.value)}
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
      </div>
    </div>
  );
};

export default CrearPlaneador;
