import {clientRepository} from "../repository/ClientRepository.js";
import {ClientResponse} from "./ClientResponse.js";

class ClientUsecase {
    async getClientList() {
        try {
            return clientRepository.getClientList();
        } catch (e) {
            return new ClientResponse(
                [],
                "An unexpected error has occurred"
            );
        }
    }
}

export const clientUsecase = new ClientUsecase();