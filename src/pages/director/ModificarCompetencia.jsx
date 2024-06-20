import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import { TiDeleteOutline } from "react-icons/ti";

const ModificarCompetencia = () => {
  const [competencia, setCompetencia] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
    categoria_id: "",
    Resultados_Aprendizajes: [],
  });
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
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCompetencia = async () => {
      try {
        const response = await conexionAxios.get(`competencia/${id}`);
        setCompetencia(response.data);
      } catch (error) {
        console.error(error);
        setAlertaError({
          error: true,
          message: "Error al cargar la competencia",
        });
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await conexionAxios.get("categoria/");
        setCategorias(response.data);
        if (response.data.length > 0) {
          setCompetencia((prev) => ({
            ...prev,
            categoria_id: response.data[0].id,
          }));
        }
      } catch (error) {
        console.error(error);
        setAlertaError({
          error: true,
          message: "Error al cargar las categorías",
        });
      }
    };

    getCompetencia();
    fetchCategorias();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetencia((prev) => ({ ...prev, [name]: value }));
    setEditing(true);
  };

  const handleChangeCategoria = (e) => {
    setCompetencia((prev) => ({
      ...prev,
      categoria_id: parseInt(e.target.value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        `competencia/update/${id}`,
        competencia
      );
      if (res.status === 200) {
        navigate("/director/listacompetencia");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({
          error: true,
          message: error.response.data.error,
        });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  const unlinkResultadoAprendizaje = async (id) => {
    try {
      const res = await conexionAxios.put(`competencia/unlinkRA/${id}`, {
        resultado_id: id,
      });
      if (res.status === 200) {
        setCompetencia((prev) => ({
          ...prev,
          Resultados_Aprendizajes: prev.Resultados_Aprendizajes.filter(
            (resultado) => resultado.id !== id
          ),
        }));
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({
          error: true,
          message: error.response.data.error,
        });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-gray-300 text-left font-bold">
            Datos Competencia
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6">
        <div className=" grid lg:grid-cols-2 gap-4 p-2">
          <div>
            <label className="uppercase block font-bold" htmlFor="nombre">
              Nombre:
            </label>
            {editing ? (
              <input
                type="text"
                name="nombre"
                value={competencia.nombre}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">{competencia.nombre}</span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="descripcion">
              Descripción:
            </label>
            {editing ? (
              <textarea
                name="descripcion"
                value={competencia.descripcion}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {competencia.descripcion}
              </span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="estado">
              Estado:
            </label>
            {editing ? (
              <select
                name="estado"
                value={competencia.estado}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            ) : (
              <span className="block text-gray-600">
                {competencia.estado ? "Activo" : "Inactivo"}
              </span>
            )}
          </div>
          <div>
            <label className="uppercase block font-bold" htmlFor="categoria_id">
              Categoría:
            </label>
            {editing ? (
              <select
                name="categoria_id"
                value={competencia.categoria_id}
                onChange={handleChangeCategoria}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {
                  categorias.find((cat) => cat.id === competencia.categoria_id)
                    ?.nombre
                }
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="resultadoAprendizaje"
          >
            Resultados de Aprendizaje:
          </label>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Código</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {competencia.Resultados_Aprendizajes &&
                competencia.Resultados_Aprendizajes.length > 0 ? (
                  competencia.Resultados_Aprendizajes.map(
                    (resultado, index) => (
                      <tr key={index} className="text-sm text-gray-900">
                        <td className="px-4 py-2 border-b">
                          {resultado.codigo}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {editing ? (
                            <>
                              <button
                                onClick={() => {
                                  unlinkResultadoAprendizaje(resultado.id);
                                  {
                                    console.log(resultado);
                                  }
                                }}
                                className="text-red-600 hover:cursor-pointer hover:text-red-900 transition-colors"
                              >
                                <TiDeleteOutline />
                              </button>
                            </>
                          ) : (
                            <Link
                              to={`/director/competencia/${id}/resultados`}
                              className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
                            >
                              Agregar
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      className="px-4 py-2 border-b text-gray-600"
                      colSpan="2"
                    >
                      Sin resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listacompetencia"
          className="mb-5 w- py-2 text-gray-600 text-center hover:cursor-pointer hover:text-gray-900 transition-colors block"
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarCompetencia;
