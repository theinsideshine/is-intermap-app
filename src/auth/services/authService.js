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