import {http} from "../../../shared/api/HttpHelper.js";

class AuthRepository {
    async login(login, password) {
        const response = await http.post("/auth/login", {
            login: login,
            password: password
        });
        if (response.status === 200) {
            return {
                token: response.data,
                error: null
            }
        } else {
            return {
                token: null,
                error: "Invalid credentials"
            }
        }
    }

    async logout() {
        await http.get("/auth/logout")
    }
}

export const authRepository = new AuthRepository();