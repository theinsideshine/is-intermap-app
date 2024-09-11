import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";
import { jwtDecode } from 'jwt-decode';



export const useAuth = () => {

    const dispatch = useDispatch();
    const { user, isAdmin, isAuth, isSuperUser } = useSelector(state => state.auth);

    //const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const saveTokenAndDecode = (token) => {       

        // Decodificar el token JWT
        const decodedToken = jwtDecode(token);
        console.log("Decoded JWT:", decodedToken);

        // Extraer el username y el role del token
        const { username, role } = decodedToken.sub;

        console.log("username: ", username);
        console.log("role: ", role);

        // Determinar los valores de isAdmin e isSuperUser según el rol
        let isAdmin = false;
        let isSuperUser = false;

        if (role === 'superuser') {
            isAdmin = true;
            isSuperUser = true;
        } else if (role === 'admin') {
            isAdmin = true;
            isSuperUser = false;
        } else {  // Si es 'user' u otro rol
            isAdmin = false;
            isSuperUser = false;
        }

        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            isAdmin: isAdmin,
            isSuperUser: isSuperUser,
            user: username,
        }));
        sessionStorage.setItem('token', `Bearer ${token}`);

        // Actualizar el estado en Redux con el usuario y los roles
        dispatch(onLogin({
            user: { username },  // Actualiza el estado con el nombre de usuario
            isAdmin,  // Actualiza el estado según el rol
            isSuperUser,  // Actualiza el estado según el rol
        }));
        navigate('/intercheck');
    };
    const handlerLogin = async ({ username, password }) => {

        try {
            const response = await loginUser({ username, password });
            console.log("response es: ",response);
            const token = response.data.access_token; 
             console.log(token);           
             console.log("Token recibido:", token);

             // Llamar al método para guardar y decodificar el token
             saveTokenAndDecode(token);
             
            //navigate('/albums'); 
        } catch (error) {
            if (error.response?.status === 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status === 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        console.log("handlerLogOut");
        dispatch(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }
    return {
        login: {
            user,
            isSuperUser,
            isAdmin,
            isAuth,
        },
        handlerLogin,
        handlerLogout,
    }
}