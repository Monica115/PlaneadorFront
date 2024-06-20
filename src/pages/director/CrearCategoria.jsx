import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearMaterias from "./CrearMaterias";

const CrearCategoria = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || descripcion.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }

    try {
      const res = await conexionAxios.post("categoria/create", {
        nombre,
        descripcion,
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
        setDescripcion("");
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
          <h1 className="font-bold text-2xl text-center text-gray-900 border-b-2 border-gray-300 ">
            Crear Categoria
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
              placeholder="nombre de la categoria"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="descripcion"
              name="descripcion"
              type="text"
            >
              Descripcion
            </label>

            <textarea
              id="descripcion"
              type="textarea"
              placeholder="descripcion de la categoria"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear"
            className="bg-red-700 hover:bg-red-900 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors"
          />
        </form>
      </div>
    </div>
  );
};

export default CrearCategoria;
