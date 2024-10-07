import { useNavigate } from "react-router-dom";
import { 
    serviceFindAllPagesInterferences, 
    serviceRemoveInterference, 
    serviceSaveInterference, 
    serviceUpdateInterference 
} from "../services/interferenceService";
import { useDispatch, useSelector } from "react-redux";
import { 
    initialInterferenceForm, 
    addInterference, 
    removeInterference, 
    updateInterference, 
    loadingInterferences, 
    onInterferenceSelectedForm, 
    onOpenInterferenceForm, 
    onCloseInterferenceForm, 
    loadingInterferenceError 
} from "../store/slices/interferences/interferencesSlice";
import { useAuth } from "../auth/hooks/useAuth";
import useThemedSwal from "../helpers/useThemedSwal";

export const useInterferences = () => {

    const Swal = useThemedSwal();
    const { interferences, interferenceSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.interferences);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login, handlerLogout } = useAuth();

    const getInterferences = async (page = 0) => {
        try {            
            const result = await serviceFindAllPagesInterferences(page);
            console.log(result);
            dispatch(loadingInterferences(result.data));
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    }

    const handlerAddInterference = async (interference) => {
        console.log("handleAddInnterference:" ,interference);

        let response;
        try {
            if (interference.id === 0) {
                response = await serviceSaveInterference(interference);
                dispatch(addInterference(response.data));
            } else {
                response = await serviceUpdateInterference(interference);
                dispatch(updateInterference(response.data));
            }

            Swal.fire(
                (interference.id === 0) ? 
                'Interferencia Creada' : 
                'Interferencia Actualizada',
                (interference.interference) ? 
                'No hay interferencia' : 
                'Si hay interferencia',
                'success'
            );
            handlerCloseInterferenceForm();
            navigate('/interferences');
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400) {
                dispatch(loadingInterferenceError(error.response.data));
            } else if (error.response?.status === 500) {
                console.log('error:', error);
            } else if (error.response?.status === 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveInterference = (id) => {
        

        Swal.fire({
            title: '¿Está seguro que desea eliminar?',
            text: "Cuidado, la interferencia será eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await serviceRemoveInterference(id);
                    dispatch(removeInterference(id));

                    Swal.fire(
                        'Interferencia Eliminada!',
                        'La interferencia ha sido eliminada con éxito!',
                        'success'
                    );
                } catch (error) {
                    console.log('Error al eliminar:', error.response.data);
                    if (error.response?.status === 401) {
                        handlerLogout();
                    }
                }
            }
        });
    }

    const handlerInterferenceSelectedForm = (interference) => {
        dispatch(onInterferenceSelectedForm({ ...interference }));
    }

    const handlerOpenInterferenceForm = () => {
        dispatch(onOpenInterferenceForm());
    }

    const handlerCloseInterferenceForm = () => {
        dispatch(onCloseInterferenceForm());
        dispatch(loadingInterferenceError({})); // Borra los errores
    }

    return {
        interferences,
        interferenceSelected,
        initialInterferenceForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddInterference,
        handlerRemoveInterference,
        handlerInterferenceSelectedForm,
        handlerOpenInterferenceForm,
        handlerCloseInterferenceForm,
        getInterferences,
    }
}
