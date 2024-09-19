import usersApi from "../apis/usersApi";

const BASE_URL = '';

export const serviceFindAllUser = async() => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceFindAllPagesUser = async (page = 0) => {
    try {
        const response = await usersApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceFindAllUsernames = async () => {
    try {
      const response = await usersApi.get(`${BASE_URL}/usernames`);
      console.log('usernames: ',response.data)
      return response.data; // Devuelve la lista de nombres de usuario
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const serviceSaveUser = async ({  
                                        username,
                                        password,
                                        role,
                                        cuit,
                                        name,
                                        address,
                                        phone,
                                        mobile,
                                        contact,
                                        email,  }) => {
    try {
        return await usersApi.post(BASE_URL, {
                                        username,
                                        password,
                                        role,
                                        cuit,
                                        name,
                                        address,
                                        phone,
                                        mobile,
                                        contact,
                                        email,
                                        });
    } catch (error) {
        throw error;
    }
}

export const serviceUpdateUser = async({ id, username, email, admin }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const serviceRemoveUser = async (id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}