
import { Utils } from "../Utils";

export class Agency {

    /**
     * Agency constructor
     * 
     * @param {Object} options - Options for the agency
     * @param {string} options.account - The wallet account
     * @param {string} options.contractId - The contract address
     */
    constructor(options) {
        this.packagename = "TicketForge.Models.Agency";

        this.data = {
            account: options.account,
            contractId: options.contractId,
            name: title,
            address: address,
            icon: null,
            image: null
        };
    }

    /**
     * Load the agency asstet from the Blockchain
     * 
     * @returns void
     */
    load() {
        Utils.loadAgencyDigest(this.data.contractId, this.data.account, (asset) => {
            this.data.title = asset.title;
            this.data.address = asset.address;
            this.data.icon = asset.icon;
            this.data.image = asset.image;
        });
    }

}
