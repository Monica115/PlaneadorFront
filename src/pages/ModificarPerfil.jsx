import React, { useState } from "react";
import AlertaError from "../components/AlertaError";
import AlertaExitoso from "../components/AlertaExitoso";
import conexionAxios from "../axios/Axios";

const ModificarPerfil = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      password.trim() === "" ||
      newPassword.trim() === "" ||
      repeatNewPassword.trim() === ""
    ) {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // Limpiar la alerta después de 7 segundos
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setAlertaError({
        error: true,
        message: "Las contraseñas no coinciden",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // Limpiar la alerta después de 7 segundos
      return;
    }

    try {
      const res = await conexionAxios.put("user/updatePassword", {
        id: localStorage.getItem("userId"),
        password,
        newPassword,
        repeatNewPassword,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });

        // Reiniciar los valores de los campos
        setPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      }
    } catch (error) {
      console.log(error);
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
      <div className="py-1">
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
                Contraseña actual
              </label>

              <input
                id="password"
                type="password"
                placeholder="Contraseña actual"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block  font-bold"
                htmlFor="password"
                name="password"
                type="password"
              >
                nueva contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="Nueva contraseña"
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
                repetir contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="Repetir contraseña"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="enviar"
              className="bg-red-500 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModificarPerfil;
