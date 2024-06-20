import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarFilaPlaneador = () => {
  const [planeadorFila, setPlaneadorFila] = useState({
    estrategia_retroalimentacion: "",
    corte_periodo: "",
    semana_retroalimentacion: "",
    semana_actividad_desarrollada: "",
    tipo_evidencia: [],
    Ra_Cursos: [],
    instrumento_evaluacion: [],
    Unidades_Tematicas: [],
    valor_evaluacion: "",
  });
  const [valor_evaluacion, setValor_evaluacion] = useState("");
  const [estrategia_retroalimentacion, setEstrategia_retroalimentacion] =
    useState("");
  const [semana_retroalimentacion, setSemana_retroalimentacion] = useState("");
  const [corte_periodo, setCorte_periodo] = useState("");
  const [semana_actividad_desarrollada, setSemana_actividad_desarrollada] =
    useState("");
  const [ra_id, setResultadoAprendizaje] = useState([]);
  const [raCursos, setRaCursos] = useState([]);
  const [tipoEvidencias, setTipoEvidencias] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [unidadesTematicas, setUnidadesTematicas] = useState([]);
  const [planeador, setPlaneador] = useState([{}]);
  const [editing, setEditing] = useState(false);
  const [materia, setMateria] = useState(null);
  const [instrumento, setInstrumento] = useState([]);
  const [tipoEvidencia, setTipoEvidencia] = useState([]);
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const { id, planeador_id } = useParams();

  useEffect(() => {
    const getPlaneadorfila = async () => {
      try {
        const response = await conexionAxios.get(`planeador/fila/${id}`);
        setPlaneadorFila(response.data);
        console.log("filar", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPlaneadorfila();
  }, [id]);

  useEffect(() => {
    const fetchPlaneador = async () => {
      try {
        const response = await conexionAxios.get(
          `planeador/${planeadorFila.planeador_id}`
        );
        setPlaneador(response.data);
        console.log("planeador".response.data);
      } catch (error) {
        console.error("Error fetching planeador:", error);
      }
    };

    fetchPlaneador();
  }, [id]);

  useEffect(() => {
    if (planeadorFila && planeadorFila.Materia) {
      const fetchMateria = async () => {
        try {
          const response = await conexionAxios.get(
            `materia/${planeador.Materia.id}`
          );
          setMateria(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching materia:", error);
        }
      };

      fetchMateria();
    }
  }, [planeadorFila]);

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await conexionAxios.get("instrumento/");
        setInstrumento(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching instrumentos:", error);
      }
    };

    fetchInstrumento();
  }, []);

  useEffect(() => {
    const fetchTipoEvidencias = async () => {
      try {
        const response = await conexionAxios.get("tipoEvidencia/");
        setTipoEvidencia(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tipoEvidencias:", error);
      }
    };

    fetchTipoEvidencias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaneadorFila({ ...planeadorFila, [name]: value });
    setEditing(true);
  };

  const handleMultiSelectChange = (e, stateSetter) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    stateSetter(selectedValues);
    setEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        `planeadorFila/fila/update/${id}`,
        planeadorFila
      );

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      if (error.response) {
        setAlertaError({ error: true, message: error.response.data.error });
        setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
      }
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-gray-300 text-left font-bold">
            Planeador
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
        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="estrategia_retroalimentacion"
            >
              Estrategia o metodología a emplear para realimentar estudiante:
            </label>
            {editing ? (
              <input
                type="text"
                name="estrategia_retroalimentacion"
                value={planeadorFila.estrategia_retroalimentacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.estrategia_retroalimentacion}
              </span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="corte_periodo"
            >
              Corte del periodo:
            </label>
            {editing ? (
              <select
                id="corte_periodo"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={planeadorFila.corte_periodo}
                onChange={handleChange}
              >
                <option value="">Seleccione un corte</option>
                <option value="1">Corte 1</option>
                <option value="2">Corte 2</option>
                <option value="3">Corte 3</option>
                <option value="4">Corte 4</option>
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.corte_periodo}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="semana_retroalimentacion"
            >
              Semana de realimentación sobre evaluación:
            </label>
            {editing ? (
              <input
                type="text"
                name="semana_retroalimentacion"
                value={planeadorFila.semana_retroalimentacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.semana_retroalimentacion}
              </span>
            )}
          </div>

          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="semana_actividad_desarrollada"
            >
              En qué semana se realiza la actividad:
            </label>
            {editing ? (
              <input
                type="text"
                name="semana_actividad_desarrollada"
                value={planeadorFila.semana_actividad_desarrollada || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.semana_actividad_desarrollada}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <label className="uppercase block font-bold" htmlFor="ra_curso">
              Resultado de aprendizaje del curso:
            </label>
            {editing ? (
              <select
                id="raCurso"
                multiple
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={planeadorFila.Ra_Cursos}
                onChange={(e) => {
                  const selectedRaCursos = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setRaCursos(selectedRaCursos);
                }}
              >
                {materia &&
                  materia.Ra_Cursos.map((raCurso) => (
                    <option key={raCurso.id} value={raCurso.id}>
                      {raCurso.nombre}
                    </option>
                  ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.Ra_Cursos &&
                  planeadorFila.Ra_Cursos.map((resultado) => (
                    <li key={resultado.nombre}>{resultado.nombre}</li>
                  ))}
              </span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="tipo_evidencia"
            >
              Tipo de evidencia de aprendizaje:
            </label>
            {editing ? (
              <select
                id="tipoEvidencias"
                multiple
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={planeadorFila.tipo_evidencia}
                onChange={(e) =>
                  handleMultiSelectChange(e, (values) =>
                    setPlaneadorFila({
                      ...planeadorFila,
                      tipo_evidencia: values,
                    })
                  )
                }
              >
                {tipoEvidencia &&
                  tipoEvidencia.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.Ra_Cursos &&
                  planeadorFila.Ra_Cursos.map(
                    (tipo) =>
                      tipo.Tipo_Evidencias &&
                      tipo.Tipo_Evidencias.map((evidencia) => (
                        <li key={evidencia.id}>{evidencia.nombre}</li>
                      ))
                  )}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="instrumento_evaluacion"
            >
              Instrumentos de evaluación:
            </label>
            {editing ? (
              <select
                id="instrumentos"
                multiple
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={planeadorFila.instrumento_evaluacion}
                onChange={(e) =>
                  handleMultiSelectChange(e, (values) =>
                    setPlaneadorFila({
                      ...planeadorFila,
                      instrumento_evaluacion: values,
                    })
                  )
                }
              >
                {instrumento &&
                  instrumento.map((ins) => (
                    <option key={ins.id} value={ins.id}>
                      {ins.nombre}
                    </option>
                  ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.instrumento_evaluacion &&
                  planeadorFila.instrumento_evaluacion.map((ins) => (
                    <li key={ins.id}>{ins.nombre}</li>
                  ))}
              </span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="unidad_tematica"
            >
              Unidad Temática:
            </label>
            {editing ? (
              <select
                id="unidadestematicas"
                multiple
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={planeadorFila.Unidades_Tematicas}
                onChange={(e) =>
                  handleMultiSelectChange(e, (values) =>
                    setPlaneadorFila({
                      ...planeadorFila,
                      unidad_tematica: values,
                    })
                  )
                }
              >
                {materia &&
                  materia.Unidades_Tematicas.map((unidad) => (
                    <option key={unidad.id} value={unidad.id}>
                      {unidad.nombre}
                    </option>
                  ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.Unidades_Tematicas &&
                  planeadorFila.Unidades_Tematicas.map((unidad) => (
                    <li key={unidad.id}>{unidad.nombre}</li>
                  ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="valor_evaluacion"
            >
              Valor de la evaluación del instrumento:
            </label>
            {editing ? (
              <input
                type="text"
                name="valor_evaluacion"
                value={planeadorFila.valor_evaluacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeadorFila.valor_evaluacion}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center mb-5">
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-red-700 hover:bg-red-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div> */}
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listaplaneador/"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarFilaPlaneador;
