import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import VisualizarDatosPlaneador from "./VisualizarDatosPlaneador";

const ModificarPlaneador = () => {
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
  const [planeador, setPlaneador] = useState(null);
  const [materia, setMateria] = useState(null);
  const [instrumento, setInstrumento] = useState(null);
  const [tipoEvidencia, setTipoEvidencia] = useState(null);

  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchPlaneador = async () => {
      try {
        const response = await conexionAxios.get(`planeador/${id}`);
        setPlaneador(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching planeador:", error);
      }
    };

    fetchPlaneador();
  }, [id]);

  useEffect(() => {
    if (planeador && planeador.Materia) {
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
  }, [planeador]);

  useEffect(() => {
    if (planeador && planeador.Materia) {
      const fetchInstrumento = async () => {
        try {
          const response = await conexionAxios.get("instrumento/");
          setInstrumento(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching materia:", error);
        }
      };

      fetchInstrumento();
    }
  }, [planeador]);

  useEffect(() => {
    const fechtTipoEvidencias = async () => {
      try {
        const response = await conexionAxios.get("tipoEvidencia/");
        setTipoEvidencia(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tipoEvidencias:", error);
      }
    };

    fechtTipoEvidencias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultadoAprendizajeId = parseInt(ra_id, 10);
    try {
      const res = await conexionAxios.post("planeador/fila/create", {
        valor_evaluacion,
        estrategia_retroalimentacion,
        semana_retroalimentacion,
        corte_periodo: parseInt(corte_periodo),
        semana_actividad_desarrollada,
        planeador_id: parseInt(id),
        // ra_id: parseInt(id), // suponer que raCursos contiene los IDs seleccionados
        ra_id: resultadoAprendizajeId,
        materia_id: planeador.Materia.id,
        raCursos,
        tipoEvidencias,
        instrumentos,
        unidadesTematicas,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  if (!planeador || !materia) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <VisualizarDatosPlaneador />
      </div>

      <div className="py-5">
        <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 bg-white shadow rounded-lg p-6 my-5">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-left">Crear Fila Planeador</h1>

            {alertaError.error && !alertaExitoso.error && (
              <AlertaError message={alertaError.message} />
            )}
            {alertaExitoso.error && (
              <AlertaExitoso message={alertaExitoso.message} />
            )}

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="estrategia_retroalimentacion"
                  >
                    Estrategia o metodología a emplear para realimentar
                    estudiante:
                  </label>
                  <input
                    id="estrategia_retroalimentacion"
                    type="text"
                    placeholder="Estrategia de retroalimentación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={estrategia_retroalimentacion}
                    onChange={(e) =>
                      setEstrategia_retroalimentacion(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="corte_periodo"
                  >
                    Corte del periodo:
                  </label>
                  <select
                    id="corte_periodo"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={corte_periodo}
                    onChange={(e) => setCorte_periodo(e.target.value)}
                  >
                    <option value="">Seleccione un corte</option>
                    <option value="1">Corte 1</option>
                    <option value="2">Corte 2</option>
                    <option value="3">Corte 3</option>
                    <option value="4">Corte 4</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="resultadoAprendizaje"
                >
                  Resultado de aprendizaje:
                </label>
                <select
                  id="resultadoAprendizaje"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={ra_id}
                  onChange={(e) => setResultadoAprendizaje(e.target.value)}
                >
                  <option value="">Seleccione un resultado</option>
                  {materia.resultadosAprendizaje.map((ra) => (
                    <option key={ra.id} value={ra.id}>
                      {ra.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="raCurso"
                  >
                    Resultado de aprendizaje del curso:
                  </label>
                  <select
                    id="raCurso"
                    multiple
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={raCursos}
                    onChange={(e) => {
                      const selectedRaCursos = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setRaCursos(selectedRaCursos);
                    }}
                  >
                    {materia.Ra_Cursos.map((raCurso) => (
                      <option key={raCurso.id} value={raCurso.id}>
                        {raCurso.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="semana_retroalimentacion"
                  >
                    Semana de realimentación sobre evaluación:
                  </label>
                  <input
                    id="semana_retroalimentacion"
                    type="text"
                    placeholder="Semana de realimentación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={semana_retroalimentacion}
                    onChange={(e) =>
                      setSemana_retroalimentacion(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="tipoEvidencias"
                  >
                    Tipo de evidencia de aprendizaje:
                  </label>
                  <select
                    id="tipoEvidencias"
                    multiple
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={tipoEvidencias}
                    onChange={(e) => {
                      const selectedEvidencias = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setTipoEvidencias(selectedEvidencias);
                    }}
                  >
                    {tipoEvidencia &&
                      tipoEvidencia.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="semana_actividad_desarrollada"
                  >
                    En qué semana se realiza la actividad:
                  </label>
                  <input
                    id="semana_actividad_desarrollada"
                    type="text"
                    placeholder="Semana realizada"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={semana_actividad_desarrollada}
                    onChange={(e) =>
                      setSemana_actividad_desarrollada(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="instrumentos"
                  >
                    Instrumentos de evaluación:
                  </label>
                  <select
                    id="instrumentos"
                    multiple
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={instrumentos}
                    onChange={(e) => {
                      const selectedInstrumentos = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setInstrumentos(selectedInstrumentos);
                    }}
                  >
                    {instrumento &&
                      instrumento.map((ins) => (
                        <option key={ins.id} value={ins.id}>
                          {ins.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="unidadesTematicas"
                  >
                    Unidad Temática:
                  </label>
                  <select
                    id="unidadestematicas"
                    multiple
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={unidadesTematicas}
                    onChange={(e) => {
                      const selectedUnidadesTematicas = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setUnidadesTematicas(selectedUnidadesTematicas);
                    }}
                  >
                    {materia.Unidades_Tematicas.map((unidad) => (
                      <option key={unidad.id} value={unidad.id}>
                        {unidad.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="valor_evaluacion"
                  >
                    Valor de la evaluación del instrumento:
                  </label>
                  <input
                    id="valor_evaluacion"
                    type="text"
                    placeholder="Valor de la evaluación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={valor_evaluacion}
                    onChange={(e) => setValor_evaluacion(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Registrar"
              className="bg-blue-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModificarPlaneador;
