import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarDirector = () => {
  const [director, setDirector] = useState({});
  const [editing, setEditing] = useState(false); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getDirector = async () => {
      try {
        const response = await conexionAxios.get("user/admin/" + id);
        setDirector(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDirector();
  }, [id]);

  // Función para manejar el cambio en los datos del director
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirector({ ...director, [name]: value });
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados del director
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put("user/admin/update", {
        id: localStorage.getItem("userId"),
        codigo: director.codigo,
        nombre: director.nombre,
        tipo_vinculacion: director.tipo_vinculacion,
        departamento: director.departamento,

        correo_personal: director.correo_personal,
        correo_institucional: director.correo_institucional,
        celular: director.celular,
        estado: director.estado,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false); // Establecer editing como false después de guardar los cambios
      }
    } catch (error) {
      setAlertaError({ error: true, message: error.response.data.error });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl  border-b-4 border-gray-300 text-left font-bold">
            Director
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="lg:mx-auto md:mx-40 sm:mx-20 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          {editing ? (
            <input
              type="text"
              name="nombre"
              value={director.nombre}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{director.nombre}</span>
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
              value={director.tipo_vinculacion}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {director.tipo_vinculacion}
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
              value={director.departamento}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{director.departamento}</span>
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
              value={director.correo_personal}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {director.correo_personal}
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
              value={director.correo_institucional}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {director.correo_institucional}
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
              value={director.celular}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{director.celular}</span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          {editing ? (
            <select
              name="estado"
              value={director.estado}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          ) : (
            <span className="block text-gray-600">
              {director.estado ? "Activo" : "Inactivo"}
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
            className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex justify-center mb-5">
        <Link to="modificarperfil">
          <button className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors">
            Cambiar Contraseña
          </button>
        </Link>
      </div>
    </>
  );
};

export default ModificarDirector;
