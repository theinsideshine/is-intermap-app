import React, { useEffect, useState } from "react";
import { useInterferences } from "../../hooks/useInterferences";
import { Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";

export const InterferenceForm = ({ interferenceSelected, handlerCloseForm }) => {
  const { initialInterferenceForm, handlerAddInterference, errors } = useInterferences();
  const theme = useTheme(); 

  const [interferenceForm, setInterferenceForm] = useState(initialInterferenceForm);
  const { 
         id,
         username,
         email, 
         company } = interferenceForm;

  useEffect(() => {
    setInterferenceForm({
      ...interferenceSelected,
    });
  }, [interferenceSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInterferenceForm({
      ...interferenceForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handlerAddInterference(interferenceForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setInterferenceForm(initialInterferenceForm);
  };

  return (
    <form onSubmit={onSubmit}>

      <label htmlFor="username">Usuario: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Usuario"
        name="username"
        value={username}
        onChange={onInputChange}
        readOnly={id > 0} 
      />
      <p className="text-danger">{errors?.username}</p>

      <label htmlFor="email">Email: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>

      <label htmlFor="company">Empresa: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Empresa"
        name="company"
        value={company}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.company}</p>

      <input type="hidden" name="id" value={id} />

      <div className="d-flex">
        <Button
          variant="contained"
          style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, marginRight: '8px' }}
          type="submit"
        >
          {id > 0 ? 'Editar' : 'Crear'}
        </Button>

        {handlerCloseForm && (
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}
            onClick={onCloseForm}
          >
            Cerrar
          </Button>
        )}

        {/* Botón para crear nueva interferencia y redirigir */}
        {!id && (
          <Link to="/new-interference">
            <Button
              variant="contained"
              style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}
            >
              Crear Nueva Interferencia
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
};
