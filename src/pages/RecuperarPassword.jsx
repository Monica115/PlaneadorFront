import React, { useState } from "react";
import AlertaError from "../components/AlertaError";
import AlertaExitoso from "../components/AlertaExitoso";
import conexionAxios from "../axios/Axios";
import { Link } from "react-router-dom";

const RecuperarPassword = () => {
  const [correo_institucional, setEmail] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (correo_institucional.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }

    try {
      const res = await conexionAxios.post("auth/requestPasswordReset", {
        correo_institucional,
        redirectURL: `http://localhost:5173/cambiarPassword`,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });

        // Reiniciar los valores de los campos
        setEmail("");
      }
    } catch (error) {
      // Manejar el error de la solicitud
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertaError({ error: true, message: error.response.data.message });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };
  return (
    <>
      <div className="py-5">
        <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20 my-10 bg-white shadow rounded-lg p-10 ">
          <form onSubmit={handleSubmit}>
            <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-500 ">
              RECUPERAR CONTRASEÑA
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
                htmlFor="email"
                name="email"
                type="email"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={correo_institucional}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="enviar"
              className="bg-red-500 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
          <Link to="/">Volver a inicio</Link>
        </div>
      </div>
    </>
  );
};

export default RecuperarPassword;
