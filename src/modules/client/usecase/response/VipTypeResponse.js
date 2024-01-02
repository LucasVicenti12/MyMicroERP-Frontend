export class VipTypeArrayResponse {
    /**
     * @param {any[]} vipTypes
     * @param {string} error
     */
    constructor(vipTypes, error) {
        this.vipTypes = vipTypes;
        this.error = error;
    }
}