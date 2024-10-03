import interferencesApi from "../apis/interferencesApi";

const BASE_URL = '';

// Servicio para obtener todas las interferencias
export const serviceFindAllInterferences = async () => {
    try {
        const response = await interferencesApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Servicio para obtener interferencias paginadas
export const serviceFindAllPagesInterferences = async (page = 0) => {
    try {
        const response = await interferencesApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Servicio para guardar una nueva interferencia
export const serviceSaveInterference = async ({  
    username,
    company,
    address_ref,
    email,
    point_reference,    
    url_file,
    interference,
}) => {
    console.log("serviceSaveInterference: ",username);
    try {
        return await interferencesApi.post(BASE_URL, {
            username,
            company,
            address_ref,
            email,
            point_reference,    
            url_file,
            interference,
        });
    } catch (error) {
        throw error;
    }
};

// Servicio para actualizar una interferencia existente
export const serviceUpdateInterference = async ({ 
    id,
    username,
    company ,
    address_ref,
    email,
    point_reference,                       
    start,                        
    last,
    status,
    url_file,
    interference
}) => {
    try {
        return await interferencesApi.put(`${BASE_URL}/${id}`, {
            username,
            company ,
            address_ref,
            email,
            point_reference,             
            status,
            url_file,
            interference
        });
    } catch (error) {
        throw error;
    }
};

// Servicio para eliminar una interferencia
export const serviceRemoveInterference = async (id) => {
    try {
        await interferencesApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};
