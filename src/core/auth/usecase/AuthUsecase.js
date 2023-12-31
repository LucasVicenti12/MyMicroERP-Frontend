import {authRepository} from "../respository/AuthRepository.js";

export class AuthUsecase {
    async login(login, password) {
        if (!login || !password) {
            return new Promise((resolve) => {
                resolve({token: null, error: "Login or password are incorrect"})
            }, 200)
        } else {
            return authRepository.login(login, password)
        }
    }

    async logout(){
        return authRepository.logout()
    }
}

export const authUsecase = new AuthUsecase();