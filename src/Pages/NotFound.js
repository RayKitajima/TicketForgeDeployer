import * as Craft from "@craftkit/craft-uikit";

export class NotFound extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "TicketForge.Pages.NotFound";
        this.data = {};
        this.views = {};
        this.path = `notfound`;
    }

    style(componentId) {
        return `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
            }
            .message {
                margin-left: 22px;
                margin-right: 22px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root">
                <div class="message">
                    <h1>Not Found</h1>
                </div>
            </div>
        `;
    }
}

