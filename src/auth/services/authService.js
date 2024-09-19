import axios from "axios";

export const loginUser = async ({username, password}) => {
    try {
        return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
}

export const registerUser = async ({
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
                    }) => {
                        try {
                            return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, {
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