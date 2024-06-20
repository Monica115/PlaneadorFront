import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarDocente = () => {
  const [docente, setDocente] = useState({});
  const [editing, setEditing] = useState(true); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

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
        "/user/teacher/update/" + id,
        docente
      );
      console.log(res);

      if (res.status === 200) {
        navigate("/director/listadocente");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false); // Establecer editing como false después de guardar los cambios
      }
    } catch (error) {
      console.error(error);
      setAlertaError({ error: true, message: error.response.data.error });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl  border-b-4 border-gray-300 text-left font-bold">
            Datos Docente
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6 ">
        <div className="grid lg:grid-cols-2 gap-4 p-6">
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
              <span className="block text-gray-600">
                {docente.departamento}
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
      </div>
      <div className="flex justify-center mb-5">
        {" "}
        {/* Contenedor para centrar el botón de editar */}
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listadocente"
          className="mb-5 w- py-2 text-gray-600 text-center hover:cursor-pointer hover:text-gray-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarDocente;
