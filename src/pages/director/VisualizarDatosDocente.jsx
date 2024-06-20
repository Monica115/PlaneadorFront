import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";

const VisualizarDatosDocente = () => {
  const [docente, setDocente] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDocente = async () => {
      try {
        const response = await conexionAxios.get("user/teacher/" + id);
        setDocente(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDocente();
  }, [id]);

  return (
    <>
      <div className=" py-5">
        <h1 className="text-2xl  border-b-4 border-gray-300 text-left font-bold">
          Datos Docente
        </h1>
      </div>
      <div className=" 2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          <label className="block text-gray-600">{docente.nombre}</label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="tipo_vinculacion"
          >
            Tipo Vinculacion:
          </label>
          <label className="block text-gray-600">
            {docente.tipo_vinculacion}
          </label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="departamento">
            Departamento:
          </label>
          <label className="block text-gray-600">{docente.departamento}</label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_personal"
          >
            Correo Personal:
          </label>
          <label className="block text-gray-600">
            {docente.correo_personal}
          </label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_institucional"
          >
            Correo Institucional:
          </label>
          <label className="block text-gray-600">
            {docente.correo_institucional}
          </label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="celular">
            Celular:
          </label>
          <label className="block text-gray-600">{docente.celular}</label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          <label className="block text-gray-600">
            {docente.estado ? "Activo" : "Inactivo"}
          </label>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listadocente"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default VisualizarDatosDocente;
