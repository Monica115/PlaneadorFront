import React from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/Axios"; // Assuming 'axios' is exported as default from 'Axios'

const CrearSubtemaExcel = ({ onChange }) => {
  const { id } = useParams();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validFileTypes.includes(file.type)) {
      alert("Por favor, sube un archivo Excel válido.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const response = await axios.post(
        `subtema/createSubtemas/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message) {
        alert(response.data.message);
        onChange();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <p className="text-center">
          Si desea registrar varios subtemas, por favor subir excel aquí
        </p>
      </div>
      <div>
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-green-800 text-white rounded-md cursor-pointer hover:bg-green-500"
        >
          Subir Excel
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default CrearSubtemaExcel;
