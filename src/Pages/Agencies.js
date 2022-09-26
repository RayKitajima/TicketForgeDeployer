import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

import { AgencyDigest } from "../PageElements/AgencyDigest.js";
import { AgencyList } from "../PageElements/AgencyList.js";

export class Agencies extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "TicketForge.Pages.Agencies";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null,
            agencyList: []
        };
        this.views = {
            agencyList: null,
            toast: null
        };
        this.path = `${TicketForge.Context.contractId}/agencies`;
    }

    viewDidLoad(callback) {
        this.data.wallectConnectedListener = Craft.Core.NotificationCenter.listen(
            "TicketForge.Context.walletConnected",
            this.walletStateChanged.bind(this)
        );
        this.data.wallectDisconnectedListener = Craft.Core.NotificationCenter.listen(
            "TicketForge.Context.walletDisconnected",
            this.walletStateChanged.bind(this)
        );

        this.views.agencyList = new AgencyList({});
        this.appendView({
            id: "agencyList",
            component: this.views.agencyList
        });

        this.views.toast = new Craft.Widget.Toast();
        console.log(this.views.toast);
        this.appendView(this.views.toast);

        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("agencies");

        this.updateCreateButton();
        this.updateAgencies();

        if (callback) { callback(); }
    }

    walletStateChanged() {
        this.updateCreateButton();
        this.updateAgencies();
    }

    async updateCreateButton() {
        if (!TicketForge.Context.connectedContract) {
            console.log("contract is not connected");
            this.shadow.getElementById("status").innerHTML = "Contract is not connected";
            return;
        }
        if (!TicketForge.Context.connectedWallet) {
            console.log("wallet is not connected");
            this.shadow.getElementById("status").innerHTML = "You need to connect your wallet";
            this.shadow.getElementById("createButton").disabled = true;
            return;
        } else {
            this.shadow.getElementById("status").innerHTML = "Ready to create agency. Please fill in the form above. Note that you need to pay 0.01 ETH to create an agency.";
            this.shadow.getElementById("createButton").disabled = false;
            return;
        }
    }

    async updateAgencies() {
        try {
            if (!TicketForge.Context.connectedWallet) return;
            let agencies = await TicketForge.Context.connectedContract.getContract().getAgenciesByAddress(
                TicketForge.Context.connectedWallet.data.account
            );
            console.log(agencies);

            for (let i = 0; i < this.data.agencyList.length; i++) {
                this.data.agencyList[i].unloadView();
            }
            this.data.agencyList = [];

            this.views.agencyList.clear();
            for (let i = 0; i < agencies.length; i++) {
                let agencyDigestView = new AgencyDigest({
                    title: agencies[i].title,
                    address: agencies[i].agencyAddress
                });
                this.data.agencyList.push(agencyDigestView);
                this.views.agencyList.appendView(agencyDigestView);
            }
        } catch (error) {
            console.log("failed to load agencies");
            console.log(error);
        }
    }

    async createAgency() {
        try {
            if (!TicketForge.Context.connectedWallet) return;

            let createAgencyTxn = await TicketForge.Context.connectedContract.getContract().createAgency(
                this.shadow.getElementById("title").value,
                this.shadow.getElementById("description").value,
                this.shadow.getElementById("image").value,
                {
                    value: `${0.01 * 10 ** 18}`
                }
            );

            this.views.toast.show({
                title: "Create your agency",
                message: "Please wait for the transaction to be confirmed",
            });

            await createAgencyTxn.wait();
            console.log("createAgencyTxn: ");
            console.log(createAgencyTxn);

            this.views.toast.show({
                title: "Agency created",
                message: "Your agency has been created",
            });

            TicketForge.Context.Web3.provider.once("block", () => {
                this.updateAgencies();
            });

            this.shadow.getElementById("title").value = "";
            this.shadow.getElementById("description").value = "";
            this.shadow.getElementById("image").value = "";
        } catch (error) {
            console.log("failed to create agency");
            console.log(error);
            this.views.toast.show({
                title: "Failed to create agency",
                message: "Please try again later : " + error.message,
            });
        }
    }

    style(componentId) {
        return `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
            }
            #info {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .form {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .formtitle {
                margin-top: 22px;
                font-size: 18px;
                font-weight: bold;
            }
            .formelement {
                margin-top: 22px;
            }
            .formelement label {
                font-weight: bold;
            }
            .formelement input {
                width : 100%;
                line-height: 2em;
            }
            .formelement textarea {
                width : 100%;
                line-height: 1.5em;
            }
            #createButton {
                width : 100%;
                font-size: 16px;
                font-weight: bold;
                line-height: 2em;
                padding-left: 22px;
                padding-right: 22px;
            }
            #agencyList {
                margin-top: 22px;
            }
            #status {
                margin-top: 22px;
                color: red;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="form">
                    <div class="formtitle">
                        Create your agency
                    </div>
                    <div class="formelement">
                        <label for="title">Title : </label><br>
                        <input type="text" id="title" name="title" placeholder="Title">
                    </div>
                    <div class="formelement">
                        <label for="description">Description : </label><br>
                        <textarea id="description" name="description" placeholder="Description" rows="10"></textarea>
                    </div>
                    <div class="formelement">
                        <label for="image">Image : </label><br>
                        <input type="text" id="image" name="image" placeholder="Image">
                    </div>
                    <div class="formelement">
                        <button id="createButton" onclick="${componentId}.createAgency()">Create</button>
                    </div>

                    <div id="status"></div>
                </div>
                
                <div class="form" style="padding-bottom:200px;">
                    <div class="formtitle">
                        Your agencies
                    </div>
                    <div id="agencyList"></div>
                </div>
            </div>
        `;
    }

}

