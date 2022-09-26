
import * as Craft from "@craftkit/craft-uikit";

export class AgencyDigest extends Craft.UI.View {

    /**
     * Constructor of AgencyDigest
     * 
     * @param {Object} options - Options for the ticket
     * 
     */
    constructor(options) {
        super();
        this.packagename = "TicketForge.PageElements.AgencyDigest";
        this.data = {
            title: options.title,
            address: options.address,
            icon: options.icon,
            image: options.image
        };
        this.views = {};
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                color: #096328;
                margin-top: 11px;
            }
            a {
                text-decoration: none;
            }
            .title {
                font-size: 16px;
            }
            .address {
                font-size: 12px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <a href="/agency/${this.data.address}/" 
                target="_${this.data.address}" rel="nofollow noreferrer">
                    <div class="title">${this.data.title}</div>
                    <div class="address">(${this.data.address})</div>
                </a>
            </div>
        `;
    }
};
