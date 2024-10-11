import { useNavigate } from "react-router-dom";
import { serviceFindAllPagesUser, serviceRemoveUser, serviceSaveUser, serviceUpdateUser } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenUserForm, onCloseUserForm, loadingUserError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";
import useThemedSwal from "../helpers/useThemedSwal";

export const useUsers = () => {
    
    const Swal = useThemedSwal();
    const { users, userSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getUsers = async (page = 0) => {

        try {            
            const result = await serviceFindAllPagesUser(page);
            console.log(result);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    }

    const handlerAddUser = async (user) => {
         console.log(user);

       // if (!login.isAdmin) return;

        let response;
        try {

            if (user.id === 0) {
                response = await serviceSaveUser(user);
                console.log("response alta:",response.data)
                dispatch(addUser(response.data))
            } else {
                response = await serviceUpdateUser(user);
                dispatch(updateUser(response.data));
            }

            Swal.fire(
                (user.id === 0) ?
                    'Usuario Creado' :
                    'Usuario Actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' :
                    'El usuario ha sido actualizado con exito!',
                'success'
            );
            handlerCloseUserForm(); // Borra errores
            navigate('/users');
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                
                dispatch(loadingUserError(error.response.data));

            }else if (error.response && error.response.status === 500 ) {

                    console.log('error: ',error);               
            } else if (error.response?.status === 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await serviceRemoveUser(id);

                    dispatch(removeUser(id));

                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    console.log('Error al eliminar: '+error.response.data);
                    if (error.response?.status === 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }));
    }

    const handlerOpenUserForm = () => {
        dispatch(onOpenUserForm());
    }

    const handlerCloseUserForm = () => {
        dispatch(onCloseUserForm());
        dispatch(loadingUserError({}));//Borra los errores
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenUserForm,
        handlerCloseUserForm,
        getUsers,
    }
}