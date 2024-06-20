import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaError from "../components/AlertaError";
import AlertaExitoso from "../components/AlertaExitoso";
import conexionAxios from "../axios/Axios";

const IniciarSesion = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [correo_institucional, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correo_institucional.trim() === "" || password.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
      return; // Añade un return para salir de la función si hay campos vacíos
    }

    try {
      const res = await conexionAxios.post("auth/login", {
        correo_institucional,
        password,
      });

      if (res.status === 200) {
        console.log(res);
        console.log(res.data);
        const token = res.data.accessToken; // Obtener el token de la respuesta del servidor
        const userId = res.data.accessToken.id; // Obtener el ID del usuario de la respuesta del servidor
        localStorage.setItem("token", token); // Guardar el token en el almacenamiento local
        
        localStorage.setItem("id", userId); // Guardar el ID del usuario en el almacenamiento local
        handleLogin(token);
        if (res.data.role === "Director") {
          navigate("/director");
        } else if (res.data.role === "Docente") {
          navigate("/docente");
        }
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-center">Bienvenido</h1>
        <h2 className="text-xl font-medium text-center mt-4">
          Sistema de Planeador
        </h2>
      </div>
      <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20 my-10 bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-500 ">
            INICIAR SESIÓN{" "}
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
              onChange={handleEmailChange}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="password"
              name="password"
              type="password"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="Contraseña "
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-red-500 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>

        <nav className="lg:flex lg:justify-between">
          <Link
            className="block  my-3 text-slate-500 uppercase text-sm"
            to="/RecuperarPassword"
          >
            Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default IniciarSesion;
