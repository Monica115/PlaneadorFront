import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const VisualizarDatosPlaneador = () => {
  const [planeador, setPlaneador] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getPlaneador = async () => {
      try {
        const response = await conexionAxios.get("planeador/" + id);
        setPlaneador(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    getPlaneador();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <AlertaError mensaje="Error loading planner data" />;
  }

  return (
    <>
      <div className=" py-5"></div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          <span className="block text-gray-600">{planeador.nombre}</span>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="area_formacion">
            Área de formación:
          </label>
          <span className="block text-gray-600">
            {planeador.area_formacion}
          </span>
        </div>
        {planeador.Usuario && (
          <>
            <div>
              <label className="uppercase block font-bold" htmlFor="codigo">
                Código Docente:
              </label>
              <span className="block text-gray-600">
                {planeador.Usuario.codigo}
              </span>
            </div>
            <div>
              <label
                className="uppercase block font-bold"
                htmlFor="nombre_docente"
              >
                Nombre Docente:
              </label>
              <span className="block text-gray-600">
                {planeador.Usuario.nombre}
              </span>
            </div>
          </>
        )}
        {planeador.Materia && (
          <>
            <div>
              <label
                className="uppercase block font-bold"
                htmlFor="codigo_materia"
              >
                Código Materia:
              </label>
              <span className="block text-gray-600">
                {planeador.Materia.codigo}
              </span>
            </div>
            <div>
              <label
                className="uppercase block font-bold"
                htmlFor="nombre_materia"
              >
                Nombre Materia:
              </label>
              <span className="block text-gray-600">
                {planeador.Materia.nombre}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VisualizarDatosPlaneador;
