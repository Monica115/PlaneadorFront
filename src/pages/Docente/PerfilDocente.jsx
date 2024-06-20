import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const PerfilDocente = () => {
    const [docente, setDocente] = useState({});
  const [editing, setEditing] = useState(false); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getDocente = async () => {
      try {
        const response = await conexionAxios.get("user/teacher/" + localStorage.getItem("id") );
        setDocente(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDocente();
  }, [id]);

  // Función para manejar el cambio en los datos del docente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocente({ ...docente, [name]: value });
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados del docente
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        "user/teacher/update",
        docente
      );
      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false); // Establecer editing como false después de guardar los cambios
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
          <h1 className="text-2xl">Datos personales</h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="lg:mx- md:mx-40 sm:mx-20 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          {editing ? (
            <input
              type="text"
              name="nombre"
              value={docente.nombre}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{docente.nombre}</span>
          )}
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="tipo_vinculacion"
          >
            Tipo Vinculacion:
          </label>
          {editing ? (
            <input
              type="text"
              name="tipo_vinculacion"
              value={docente.tipo_vinculacion}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {docente.tipo_vinculacion}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="departamento">
            Departamento:
          </label>
          {editing ? (
            <input
              type="text"
              name="departamento"
              value={docente.departamento}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{docente.departamento}</span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="area_formacion">
            Área de Formación:
          </label>
          {editing ? (
            <input
              type="text"
              name="area_formacion"
              value={docente.area_formacion}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {docente.area_formacion}
            </span>
          )}
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_personal"
          >
            Correo Personal:
          </label>
          {editing ? (
            <input
              type="email"
              name="correo_personal"
              value={docente.correo_personal}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {docente.correo_personal}
            </span>
          )}
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_institucional"
          >
            Correo Institucional:
          </label>
          {editing ? (
            <input
              type="email"
              name="correo_institucional"
              value={docente.correo_institucional}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {docente.correo_institucional}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="celular">
            Celular:
          </label>
          {editing ? (
            <input
              type="tel"
              name="celular"
              value={docente.celular}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{docente.celular}</span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          {editing ? (
            <select
              name="estado"
              value={docente.estado}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          ) : (
            <span className="block text-gray-600">
              {docente.estado ? "Activo" : "Inactivo"}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center mb-5">
        {" "}
        {/* Contenedor para centrar el botón de editar */}
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
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
}

export default PerfilDocente