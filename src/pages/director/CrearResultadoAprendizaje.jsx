import React, { useState, useEffect } from "react";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";

const CrearResultadoAprendizaje = () => {
  const [descripcion, setDescripcion] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competencia_id, setCompetencia_id] = useState("");
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
        const response = await conexionAxios.get("competencia/");
        setCompetencias(response.data);

        console.log(response.data);

        if (response.data.length > 0) {
          setCompetencia_id(response.data[0].id); // Establecer la primera categoría como seleccionada por defecto
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (competencia_id) => {
    setCompetencia_id(competencia_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (descripcion.trim() === "" || isNaN(Number(competencia_id))) {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
      return;
    }

    try {
      const res = await conexionAxios.post("ra/create", {
        descripcion,
        competencia_id: Number(competencia_id),
      });
      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({
          error: true,
          message: res.data.message,
        });
        setTimeout(() => setAlertaExitoso({ error: false, message: "" }), 5000);
        setDescripcion("");
        if (competencias.length > 0) {
          setCompetencia_id(categorias[0].id); // Restablecer a la primera categoría
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
            Crear Resultado de Aprendizaje
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
              Competencia
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e.target.value)}
                value={competencia_id}
              >
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
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

export default CrearResultadoAprendizaje;
