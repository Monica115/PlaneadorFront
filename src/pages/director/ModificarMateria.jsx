import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarMateria = () => {
  const [materia, setMateria] = useState({
    nombre: "",
    codigo: "",
    tipo: "",
    creditos: "",
    semestre: "",
    estado: "",
    competencias: [], // Asegúrate de inicializar correctamente este estado si es un array
  });
  const [editing, setEditing] = useState(true); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const [competencias, setCompetencias] = useState([]); // Estado para almacenar la lista de competencias
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMateria = async () => {
      try {
        const response = await conexionAxios.get("materia/" + id);
        const materiaData = response.data;
        // Asegúrate de que las competencias existentes se muestren seleccionadas
        const competenciasSeleccionadas = materiaData.Competencias.map(
          (c) => c.Materias_competencias.competencia_id
        );
        console.log(competenciasSeleccionadas);
        setMateria({ ...materiaData, competencias: competenciasSeleccionadas });
      } catch (error) {
        console.error(error);
      }
    };

    const getCompetencias = async () => {
      // Función para obtener la lista de competencias
      try {
        const response = await conexionAxios.get("competencia");
        setCompetencias(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMateria();
    getCompetencias(); // Llamar a la función para obtener las competencias al cargar el componente
  }, [id]);

  // Función para manejar el cambio en los datos del materia
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateria({ ...materia, [name]: value });
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados del materia
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put("materia/update/" + id, materia);

      if (res.status === 200) {
        navigate("/director");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
      setAlertaError({ error: true, message: error.response.data.error });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  const handleCompetenciasChange = (e) => {
    const checkboxValue = parseInt(e.target.value);
    let updatedCompetencias = [];

    if (materia.competencias.includes(checkboxValue)) {
      // Si el checkbox ya está seleccionado, lo eliminamos de la lista de competencias
      updatedCompetencias = materia.competencias.filter(
        (comp) => comp !== checkboxValue
      );
    } else {
      // Si el checkbox no está seleccionado, lo añadimos a la lista de competencias
      updatedCompetencias = [...materia.competencias, checkboxValue];
    }

    setMateria((prevMateria) => ({
      ...prevMateria,
      competencias: updatedCompetencias,
    }));
    setEditing(true);
  };
  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl  border-b-4 border-gray-300 text-left font-bold">
            Datos Materia
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
        <div className=" grid lg:grid-cols-2 gap-4">
          <div>
            <label className="uppercase block font-bold" htmlFor="nombre">
              Nombre:
            </label>
            {editing ? (
              <input
                type="text"
                name="nombre"
                value={materia.nombre}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{materia.nombre}</span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="codigo">
              Codigo:
            </label>
            {editing ? (
              <input
                type="text"
                name="codigo"
                value={materia.codigo}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{materia.codigo}</span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="tipo">
              Tipo:
            </label>
            {editing ? (
              <input
                type="text"
                name="tipo"
                value={materia.tipo}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{materia.tipo}</span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="creditos">
              Créditos:
            </label>
            {editing ? (
              <input
                type="text"
                name="creditos"
                value={materia.creditos}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{materia.creditos}</span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="semestre">
              Semestre:
            </label>
            {editing ? (
              <input
                type="number"
                name="semestre"
                value={materia.semestre}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{materia.semestre}</span>
            )}
          </div>

          <div>
            <label className="uppercase block font-bold" htmlFor="estado">
              Estado:
            </label>
            {editing ? (
              <select
                name="estado"
                value={materia.estado}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            ) : (
              <span className="block text-gray-600">
                {materia.estado ? "Activo" : "Inactivo"}
              </span>
            )}
          </div>
        </div>

        {competencias.length > 0 && ( // Verificar si hay competencias antes de mostrar el select
          <div>
            <label
              className="uppercase block font-bold p-2"
              htmlFor="competencia"
            >
              Competencia:
            </label>
            {editing ? (
              <div className="grid lg:grid-cols-2 gap-4 border border-gray-400 rounded">
                {competencias.map((competencia) => (
                  <div key={competencia.id}>
                    <input
                      type="checkbox"
                      name="competencias"
                      id={competencia.id}
                      value={competencia.id}
                      checked={materia.competencias.includes(competencia.id)}
                      onChange={handleCompetenciasChange}
                    />
                    <label htmlFor={competencia.id}>{competencia.nombre}</label>
                  </div>
                ))}
              </div>
            ) : (
              <span className="block text-gray-600 p-6">
                {materia.competencias &&
                  materia.competencias.map((resultado) => (
                    <div key={resultado.nombre}>{resultado.nombre}</div>
                  ))}
              </span>
            )}
          </div>
        )}
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
          to="/director"
          className="mb-5 w- py-2 text-gray-600 text-center hover:cursor-pointer hover:text-gray-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarMateria;
