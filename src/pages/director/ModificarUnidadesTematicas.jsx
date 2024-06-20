import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarUnidadesTematicas = () => {
  const [materia, setMateria] = useState({});
  const [materias, setMaterias] = useState([]); // Lista de materias para el selector
  const [editing, setEditing] = useState(true); // Establecer como true para que se cargue en modo de edición
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
    const getUnidad = async () => {
      try {
        const response = await conexionAxios.get("unidad/" + id);
        setMateria(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getMaterias = async () => {
      try {
        const response = await conexionAxios.get("materia/"); // Ruta para obtener las materias
        setMaterias(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUnidad();
    getMaterias();
  }, [id]);

  // Función para manejar el cambio en los datos del formulario
  // Función para manejar el cambio en los datos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateria({
      ...materia,
      [name]: name === "materia_id" ? Number(value) : value, // Convertir a número si es materia_id
    });
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put("unidad/update/" + id, materia);
      console.log(res);

      if (res.status === 200) {
        navigate("/director/listaunidadestematicas/:id");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(() => {
          setAlertaExitoso({ error: false, message: "" });
        }, 10000);
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
            Datos Unidad Tematica
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 bg-white shadow rounded-lg p-6 my-5">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={materia.nombre || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={materia.descripcion || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="materia_id">
            Materia:
          </label>
          <select
            name="materia_id"
            value={materia.materia_id}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar la materia</option>
            {materias.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarUnidadesTematicas;
