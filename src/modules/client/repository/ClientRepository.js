import {http} from "../../../shared/api/HttpHelper.js";
import {ClientArrayResponse, ClientResponse} from "../usecase/response/ClientResponse.js";
import {VipTypeArrayResponse} from "../usecase/response/VipTypeResponse.js";
import {DocumentTypeArrayResponse} from "../usecase/response/DocumentTypeResponse.js";

class ClientRepository {
    /**
     * @param {number} page
     * @param {number} numberPerPages
     * @returns {Promise<ClientArrayResponse>}
     */
    async getClientList(page, numberPerPages) {
        const response = await http.get(`/client?page=${page}&numberRecordsPerPage=${numberPerPages}`);
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new ClientArrayResponse([], response.data.error.message);
            } else {
                return new ClientArrayResponse(response.data, null);
            }
        } else {
            return new ClientArrayResponse([], "it was not possible to consult clients");
        }
    }

    async saveClient(client) {
        if (client.contacts.length > 0) {
            if (client.contacts[0].contactType === 1 && client.contacts[0].contact === "") {
                client.contacts = [];
            }
        }
        if (client.contacts.length > 0) {
            let tempArray = [];
            client.contacts.map((contact) => {
                tempArray.push({
                    contactType: {
                        code: contact.contactType,
                    },
                    contact: contact.contact
                })
            });
            client.contacts = tempArray;
        }
        let data = {};
        if (client.uuid) {
            data = {
                uuid: client.uuid,
                code: client.code,
                name: client.name,
                fantasyName: client.fantasyName,
                documentType: {
                    code: client.documentType
                },
                document: client.document,
                address: client.address,
                zipCode: client.zipCode,
                vipType: {
                    code: client.vipCode
                },
                contacts: client.contacts
            }
        } else {
            data = {
                name: client.name,
                fantasyName: client.fantasyName,
                documentType: {
                    code: client.documentType
                },
                document: client.document,
                address: client.address,
                zipCode: client.zipCode,
                vipType: {
                    code: client.vipCode
                },
                contacts: client.contacts
            }
        }
        const response = await http.post("/client", data)
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new ClientResponse(null, response.data.error.message);
            } else {
                return new ClientResponse(response.data.client, null);
            }
        } else {
            return new ClientResponse(null, "it was not possible to save client");
        }
    }

    async getAllVipType() {
        const response = await http.get("/client/vipType")
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new VipTypeArrayResponse([], response.data.error.message)
            } else {
                return new VipTypeArrayResponse(response.data.vipType, null)
            }
        } else {
            return new VipTypeArrayResponse([], "it was not possible to consult vip types")
        }
    }

    async getClientByCode(code) {
        const response = await http.get(`/client/getByCode/${code}`)
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new ClientResponse(null, response.data.error.message);
            } else {
                return new ClientResponse(response.data.client, null);
            }
        } else {
            return new ClientResponse(null, "it was not possible to consult client");
        }
    }

    async getAllDocumentType() {
        const response = await http.get("/client/documentType")
        if (response.status === 200) {
            if (response.data.error !== null) {
                return new DocumentTypeArrayResponse([], response.data.error.message);
            } else {
                return new DocumentTypeArrayResponse(response.data.documentType, null);
            }
        } else {
            return new DocumentTypeArrayResponse([], "it was not possible to consult document types");
        }
    }

    async registerVipType(vipType) {
        return await http.post("/client/vipType", {
            description: vipType
        });
    }
}

export const clientRepository = new ClientRepository();