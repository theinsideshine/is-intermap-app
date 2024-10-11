import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';



export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { initialUserForm, handlerAddUser, errors } = useUsers();
  const theme = useTheme(); 

  const [userForm, setUserForm] = useState(initialUserForm);
 // const [checked, setChecked] = useState(userForm.admin);
  const { 
         id,
         username,
         password, 
         role,
         cuit,
         name,
         address,
         phone,
         mobile,
         contact,
         email, } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: '',
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  /* const onCheckboxChange = () => {
    const newAdmin = !admin;
    setChecked(newAdmin);
    setUserForm({
      ...userForm,
      admin: newAdmin,
    });
  }; */

  const onSubmit = (event) => {
    event.preventDefault();
    handlerAddUser(userForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
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

        {id > 0 || (
          <>
           <label htmlFor="role">Contraseña: </label>
          <input
            className="form-control my-3 w-75"
            placeholder="Contraseña"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          </>
        )}
        <p className="text-danger">{errors?.password}</p>

      <label htmlFor="role">Rol: </label>     
      <input
        className="form-control my-3 w-75"
        placeholder="Rol"
        name="role"
        value={role}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.role}</p>

      <label htmlFor="cuit">Cuit: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Cuit"
        name="cuit"
        value={cuit}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.cuit}</p>

      <label htmlFor="name">Nombre: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Nombre"
        name="name"
        value={name}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.name}</p>    

      <label htmlFor="address">Direccion: </label>
      <input
        className="form-control my-3 w-75"
        placeholder="Direccion"
        name="address"
        value={address}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.address}</p>

      <label htmlFor="phone">Telefono: </label>  
      <input
        className="form-control my-3 w-75"
        placeholder="Telefono"
        name="phone"
        value={phone}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.phone}</p>

      <label htmlFor="mobile">Celular: </label>   
      <input
        className="form-control my-3 w-75"
        placeholder="Celular"
        name="mobile"
        value={mobile}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.mobile}</p>

      <label htmlFor="contact">Contacto: </label> 
      <input
        className="form-control my-3 w-75"
        placeholder="Contacto"
        name="contact"
        value={contact}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.contact}</p>

      <label htmlFor="email">Email: </label> 
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
        readOnly={id > 0} 
      />
      <p className="text-danger">{errors?.email}</p>

     
      {/* <CustomFormControlLabel
        control={
          <CustomCheckbox
            checked={admin}
            onChange={onCheckboxChange}
            name="admin"
          />
        }
        label="Admin"
      /> */}

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
      </div>
    </form>
  );
};
