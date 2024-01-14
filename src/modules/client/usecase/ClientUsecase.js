import {clientRepository} from "../repository/ClientRepository.js";
import {ClientResponse} from "./response/ClientResponse.js";

class ClientUsecase {
    /**
     * @param {number} page
     * @param {number} numberPerPages
     * @returns {Promise<ClientResponse|ClientArrayResponse>}
     */
    async getClientList(page, numberPerPages) {
        try {
            return clientRepository.getClientList(page, numberPerPages);
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

    async registerVipType(vipType) {
        return clientRepository.registerVipType(vipType)
    }
}

export const clientUsecase = new ClientUsecase();