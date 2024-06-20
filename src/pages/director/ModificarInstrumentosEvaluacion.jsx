import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarInstrumentosEvaluacion = () => {
  const [instrumento, setInstrumento] = useState({});
  const [tipos, setTipos] = useState([]);
  const [selectedTipos, setSelectedTipos] = useState([]); // Add state to handle selected tipos
  const [editing, setEditing] = useState(true);
  const [alertaError, setAlertaError] = useState({
    error: false,
    message: "",
  });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getInstrumento = async () => {
      try {
        const response = await conexionAxios.get("instrumento/" + id);
        setInstrumento(response.data);
        setSelectedTipos(response.data.tipos || []);
      } catch (error) {
        console.error(error);
      }
    };
    const getTipos = async () => {
      try {
        const response = await conexionAxios.get("tipoEvidencia/");
        setTipos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInstrumento();
    getTipos();
  }, [id]);

  const handleTiposChange = (e) => {
    const selectedType = parseInt(e.target.value);
    if (selectedTipos.includes(selectedType)) {
      setSelectedTipos(
        selectedTipos.filter((typeId) => typeId !== selectedType)
      );
    } else {
      setSelectedTipos([...selectedTipos, selectedType]);
    }
  };

  const handleChange = (e) => {
    setInstrumento({
      ...instrumento,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await conexionAxios.put("/instrumento/update/" + id, {
        ...instrumento,
        tipos: selectedTipos,
      });
      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(() => {
          setAlertaExitoso({ error: false, message: "" });
        }, 5000);
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
      setAlertaError({ error: true, message: error.response.data.error });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-gray-300 text-left font-bold">
            Datos Instrumentos de Evaluación
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6 "
      >
        <div>
          <label className="uppercase block font-bold p-2" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={instrumento.nombre || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            className="uppercase block font-bold p-2"
            htmlFor="descripcion"
          >
            Descripción:
          </label>
          <textarea
            type="text"
            name="descripcion"
            value={instrumento.descripcion || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="uppercase block font-bold p-2" htmlFor="tipos">
            Tipos de evidencia:
          </label>
          <div className="relative">
            <select
              multiple
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={handleTiposChange}
              value={selectedTipos}
            >
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
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

        <div className="flex justify-center mb-5 col-span-2 p-6">
          {editing ? (
            <button
              type="submit"
              className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        <div className="flex justify-center mb-5 col-span-2">
          <Link
            to="/director/listainstrumentoevaluacion"
            className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block"
          >
            Volver
          </Link>
        </div>
      </form>
    </>
  );
};

export default ModificarInstrumentosEvaluacion;
