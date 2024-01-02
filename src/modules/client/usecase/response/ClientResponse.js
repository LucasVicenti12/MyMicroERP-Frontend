export class ClientArrayResponse {
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

export class ClientResponse {
    /**
     * Client response from backend
     * @param {any} client
     * @param {string} error
     */
    constructor(client, error) {
        this.client = client;
        this.error = error;
    }
}