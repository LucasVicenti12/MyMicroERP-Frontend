import {http} from "../../../shared/api/HttpHelper.js";
import {ClientResponse} from "../usecase/ClientResponse.js";

class ClientRepository {
    async getClientList() {
        const response = await http.get("/client");
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new ClientResponse([], response.data.error.message);
            } else {
                return new ClientResponse(response.data.clients, null);
            }
        }else{
            return new ClientResponse([], "it was not possible to consult clients");
        }
    }
}

export const clientRepository = new ClientRepository();