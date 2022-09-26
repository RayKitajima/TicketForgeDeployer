import * as Craft from "@craftkit/craft-uikit";

export class Howto extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "TicketForge.Pages.Howto";
        this.data = {
            mark: "howto"
        };
        this.views = {};
        this.path = `${TicketForge.Context.contractId}/howto`;
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("howto");
        if (callback) { callback(); }
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
            .howto {
                margin-left: 22px;
                margin-right: 22px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="message">
                    <h1>How to use TicketForge</h1>
                </div>
                <div class="howto">
                    <p>
                        You can create your own Ticket Agency contract here.
                    </p>
                    <p>
                        To create your own contract, you need to connect your wallet. <br/>
                        And you need to pay 0.01 ETH to create the contract.
                    </p>
                    <p>
                        <ol>
                            <li> Go to the <a href="/${TicketForge.Context.contractId}/agencies">My Agencies</a> page. <br/>
                            <li> Connect your wallet if you haven't done so. <br/>
                            <li> Fill in the form and click the "Create" button. <br/>
                            <li> You will be asked to confirm the transaction in your wallet. <br/>
                            <li> After the transaction is confirmed, you can see your agency contract in the list. <br/>
                            <li> Click the link to go to the agency page. (NOT YET)<br/>
                        </ol>
                    </p>
                    <p>
                        TicketForge is a smart contract that allows you to create ticketing service for your shows, 
                        concerts or any other kind of event. 
                    </p>
                    <p>
                        Event organizers create an agency contract for their series of shows, 
                        and then create show contracts for each show in the series. 
                        Each show contract has a set of seat types, and each seat type has a set of seats. 
                        Prices for each seat type are set by the event organizer, 
                        and then the event organizer sells tickets to the show through the show contract.
                    </p>
                </div>
            </div>
        `;
    }
}

