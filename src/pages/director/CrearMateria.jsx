import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearMaterias from "./CrearMaterias";

const CrearMateria = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState(true);
  const [creditos, setCreditos] = useState("");
  const [semestre, setSemestre] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competenciasSeleccionadas, setCompetenciasSeleccionadas] = useState(
    []
  );

  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const getCompetencias = async () => {
      try {
        const response = await conexionAxios.get("competencia/");
        setCompetencias(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCompetencias();
  }, []);

  const handleChange = (e) => {
    const checkboxValue = parseInt(e.target.value);
    if (competenciasSeleccionadas.includes(checkboxValue)) {
      // Si la competencia ya está seleccionada, la eliminamos del estado
      setCompetenciasSeleccionadas(
        competenciasSeleccionadas.filter((id) => id !== checkboxValue)
      );
    } else {
      // Si la competencia no está seleccionada, la agregamos al estado
      setCompetenciasSeleccionadas([
        ...competenciasSeleccionadas,
        checkboxValue,
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await conexionAxios.post("materia/create", {
        codigo,
        nombre,
        tipo,
        creditos,
        semestre,
        competencias: competenciasSeleccionadas,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setCodigo("");
        setNombre("");
        setCreditos("");
        setSemestre("");
        setCompetenciasSeleccionadas([]);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div>
      <div className="px-10 py-5"></div>
      <div className=" 2xl:mx-48 xl:mx-52 lg:mx-32 md:mx-10 sm:mx-10 mx-10  bg-white shadow rounded-lg p-10 ">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl text-center text-gray-900 border-b-2 border-gray-300 ">
            Crear Materia
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
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre de la materia"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="flex">
            <div className="w-1/2 ">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="codigo"
                >
                  Código
                </label>
                <input
                  id="codigo"
                  type="number"
                  placeholder="Código"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="tipo"
                >
                  Tipo
                </label>
                <select
                  name="tipo"
                  value={tipo ? "1" : "0"}
                  onChange={(e) =>
                    setTipo(e.target.value === "1" ? true : false)
                  }
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                >
                  <option value="1">Obligatoria</option>
                  <option value="0">Electiva</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="creditos"
                >
                  Créditos
                </label>
                <input
                  id="creditos"
                  type="number"
                  placeholder="Créditos"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={creditos}
                  onChange={(e) => setCreditos(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="semestre"
                >
                  Semestre
                </label>
                <input
                  id="semestre"
                  type="number"
                  placeholder="Semestre"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="categoriaId"
            >
              Competencias:
            </label>
            <div className="grid lg:grid-cols-2 gap-4 border border-gray-400 rounded">
              {competencias.map((competencia) => (
                <div key={competencia.id}>
                  <input
                    type="checkbox"
                    id={competencia.id}
                    value={competencia.id}
                    checked={competenciasSeleccionadas.includes(competencia.id)}
                    onChange={handleChange}
                  />
                  <label htmlFor={competencia.id}>{competencia.nombre}</label>
                </div>
              ))}
            </div>
          </div>

          <input
            type="submit"
            value="Registrar"
            className="bg-red-700 hover:bg-red-900 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-s
            ky-800 transition-colors"
          />
        </form>
        <div className="border-t border-gray-600 p-2">
          <CrearMaterias />
        </div>
      </div>
    </div>
  );
};

export default CrearMateria;
