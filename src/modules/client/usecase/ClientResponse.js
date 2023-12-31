export class ClientResponse {
    /**
     * Client response from backend
     * @param {[]} clients
     * @param {string} error
     */
    constructor(clients, error) {
        this.clients = clients;
        this.error = error;
    }
}