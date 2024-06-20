import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import AgregarDocentes from "./AgregarDocentes";

const AgregarDocente = () => {
  const [nombre, setNombre] = useState("");
  const [correo_personal, setCorreo_personal] = useState("");
  const [correo_institucional, setCorreo_institucional] = useState("");
  const [tipo_vinculacion, setTipo_vinculacion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      correo_personal.trim() === "" ||
      correo_institucional.trim() === "" ||
      tipo_vinculacion.trim() === "" ||
      codigo.trim() === ""
    ) {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }
    const tipoVinculacion = tipo_vinculacion.toUpperCase();
    try {
      const res = await conexionAxios.post("user/createTeacher", {
        nombre,
        correo_personal,
        correo_institucional,
        tipo_vinculacion: tipoVinculacion,
        departamento,
        celular,
        codigo,
      });

      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        // Reiniciar los valores de los campos
        setNombre("");
        setCorreo_personal("");
        setCorreo_institucional("");
        setTipo_vinculacion("");
        setDepartamento("");
        setCelular("");
        setCodigo("");
      }
    } catch (error) {
      // Manejar el error de la solicitud
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div>
      <div className=" px-10 py-5 "></div>
      <div className=" 2xl:mx-48 xl:mx-52 lg:mx-32 md:mx-10 sm:mx-10 mx-10  bg-white shadow rounded-lg p-10 ">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900 border-b-2 border-gray-300">
            Registrar Docente
          </h1>

          {alertaError.error && !alertaExitoso.error && (
            <AlertaError message={alertaError.message} />
          )}
          {alertaExitoso.error && (
            <AlertaExitoso message={alertaExitoso.message} />
          )}

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="nombre"
              name="nombre"
              type="text"
            >
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="Correo_Personal"
              name="Correo_Personal"
              type="email"
            >
              Correo Personal
            </label>

            <input
              id="Correo_Personal"
              type="email"
              placeholder="Correo Personal"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={correo_personal}
              onChange={(e) => setCorreo_personal(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="correoInstitucional"
              name="correoInstitucional"
              type="email"
            >
              Email Institucional
            </label>

            <input
              id="correoInstitucional"
              type="email"
              placeholder="Correo Institucional"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={correo_institucional}
              onChange={(e) => setCorreo_institucional(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="tipoVinculacion"
              name="tipoVinculacion"
              type="text"
            >
              Tipo Vinculacion
            </label>

            <input
              id="tipoVinculacion"
              type="text"
              placeholder="tipo Vinculacion"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
              value={tipo_vinculacion}
              onChange={(e) => setTipo_vinculacion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="departamento"
              name="departamento"
              type="text"
            >
              Departamento
            </label>

            <input
              id="departamento"
              type="text"
              placeholder="Departamento"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          <div className="flex">
            {/* Primera columna */}
            <div className="w-1/2">
              <div className="my-5  mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="celular"
                  name="celular"
                  type="text"
                >
                  Celular
                </label>

                <input
                  id="celular"
                  type="number"
                  placeholder="Celular"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </div>
            </div>

            {/* Segunda columna */}
            <div className="w-1/2">
              <div className="my-5  mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="codigo"
                  name="codigo"
                  type="text"
                >
                  Codigo
                </label>

                <input
                  id="codigo"
                  type="number"
                  placeholder="codigo"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="registrar"
            className="bg-red-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors"
          />
        </form>
        <div className="border-t border-gray-600 p-2">
          <AgregarDocentes />
        </div>
      </div>
    </div>
  );
};

export default AgregarDocente;
