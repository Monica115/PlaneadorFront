import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarDatosPlaneador = () => {
  const [planeador, setPlaneador] = useState({});
  const [user, setUser] = useState([]); // Lista de docentes para el selector
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
    const getPlaneador = async () => {
      try {
        const response = await conexionAxios.get("planeador/" + id);
        setPlaneador(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getDocente = async () => {
      try {
        const response = await conexionAxios.get("user/teachers/");
        setUser(response.data);
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
    getPlaneador();
    getDocente();
    getMaterias();
  }, [id]);

  // Función para manejar el cambio en los datos del formulario para el usuario
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setPlaneador((prevState) => ({
      ...prevState,
      [name]: name === "user_id" ? Number(value) : value, // Convertir a número si es user_id
    }));
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para manejar el cambio en los datos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaneador((prevState) => ({
      ...prevState,
      [name]: name === "materia_id" ? Number(value) : value, // Convertir a número si es materia_id
    }));
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put("planeador/update/" + id, planeador);
      console.log(res);

      if (res.status === 200) {
        navigate("/director/listaplaneador");
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
            Datos Planeador
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
          <label className="uppercase block font-bold p-4" htmlFor="user_id">
            Docente:
          </label>
          <select
            name="user_id"
            value={planeador.user_id || ""}
            onChange={handleChangeUser}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar docente</option>
            {user.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="uppercase block font-bold p-4"
            htmlFor="area_formacion"
          >
            Area de Formación:
          </label>
          <input
            type="text"
            name="area_formacion"
            value={planeador.area_formacion || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="uppercase block font-bold p-4" htmlFor="materia_id">
            Materia:
          </label>
          <select
            name="materia_id"
            value={planeador.materia_id || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccionar curso</option>
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

        <div>
          <Link to={`modificarplaneador/${id}`}>
            <button className="mx-2 py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors">
              Siguiente
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <Link
          to="/director/listaplaneador"
          className="mb-5 w- py-2 text-gray-600 text-center hover:cursor-pointer hover:text-gray-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarDatosPlaneador;
