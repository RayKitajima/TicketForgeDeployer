
import * as Craft from "@craftkit/craft-uikit";

export class AgencyList extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "TicketForge.PageElements.AgencyList";
    }

    clear() {
        this.root.innerHTML = "";
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                margin-top: 22px;
                margin-left: 0px;
                color: #096328;
            }
            #message {
                overflow-wrap: break-word;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                (no agency)
            </div>
        `;
    }
};
