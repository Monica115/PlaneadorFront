import React, { useState } from "react";
import AlertaError from "../components/AlertaError";
import AlertaExitoso from "../components/AlertaExitoso";
import conexionAxios from "../axios/Axios";
import { Link,useParams } from "react-router-dom";

function CambiarPassword() {
  const { user_id, resetString } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.trim() === "" || repeatPassword.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }
    if (newPassword !== repeatPassword) {
      setAlertaError({
        error: true,
        message: "Las contraseñas no coinciden",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
      return;
    }

    try {
      const res = await conexionAxios.post(
        "auth/resetPassword",
        {
          user_id,
          resetString,
          newPassword,
        }
      );

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });

        // Reiniciar los valores de los campos
        setNewPassword("");
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
              CAMBIAR CONTRASEÑA
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
                htmlFor="password"
                name="password"
                type="password"
              >
                Nueva Contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="Contraseña "
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-600 block  font-bold"
                htmlFor="password"
                name="password"
                type="password"
              >
                Repetir Contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="Contraseña "
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
}

export default CambiarPassword;
