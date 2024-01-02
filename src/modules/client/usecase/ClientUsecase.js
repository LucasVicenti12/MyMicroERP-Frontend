import {clientRepository} from "../repository/ClientRepository.js";
import {ClientResponse} from "./response/ClientResponse.js";

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

    async saveClient(client) {
        return clientRepository.saveClient(client)
    }

    async getAllVipType() {
        return clientRepository.getAllVipType()
    }

    async getClientByCode(code) {
        return clientRepository.getClientByCode(code);
    }

    async getAllDocumentType() {
        return clientRepository.getAllDocumentType();
    }
}

export const clientUsecase = new ClientUsecase();