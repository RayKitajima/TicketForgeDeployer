
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
Craft.usePackage(StickyHeaderNavi);

import { Agencies } from "../Pages/Agencies.js";
import { Howto } from "../Pages/Howto.js";
import { NotFound } from "../Pages/NotFound.js";

export class PageController extends Craft.Widget.StickyHeaderNavi.ViewController {

    constructor(options) {
        super(options);
        this.packagename = "TicketForge.Framework.PageController";
        this.data = {
            PageCache: {},
            currentPage: null
        };
    }

    deployCustomBackBtn() {
        // delegate to header
        this.header.deployCustomBackBtn();
    }

    getCurrentPage() {
        return this.data.currentPage;
    }

    /**
     * 
     * /<contract address>/agencies|howto
     * 
     */
    resolveRoutingRequest(route) {
        let path = route.path;
        let event = route.event;

        if (!path) { path = ""; }

        let contractId = "";
        let pageName = "";

        let match = path.match(/\/?([^\/]*)\/?([^\/]*)\/?/);

        if (match) {
            contractId = match[1];
            pageName = match[2] || "";
        }

        console.log(`resolveRoutingRequest: contractId: ${contractId}, pageName: ${pageName}`);
        TicketForge.Context.contractId = contractId.toLowerCase();

        this.openNamedPage(pageName.toLowerCase(), route);
    }

    openNamedPage(pageName, route) {
        if (!route) { route = { path: `/${TicketForge.Context.contractId}/${pageName}` }; }
        switch (pageName) {
            case 'howto':
                this.openHowtoPage(route);
                break;
            case 'agencies':
                this.openAgenciesPage(route);
                break;
            default:
                this.openNotFoundPage(route);
                break;
        }
    }

    openNotFoundPage(route) {
        this.open({
            page: new NotFound(),
            callback: null,
            route: route
        });
    }

    openHowtoPage(route) {
        if (!this.data.PageCache.howto) {
            this.data.PageCache.howto = new Howto();
        }
        this.data.currentPage = this.data.PageCache.howto;
        this.open({
            page: this.data.PageCache.howto,
            callback: null,
            route: route
        });
    }

    openAgenciesPage(route) {
        if (!this.data.PageCache.agencies) {
            this.data.PageCache.agencies = new Agencies();
        }
        this.data.currentPage = this.data.PageCache.agencies;
        this.open({
            page: this.data.PageCache.agencies,
            callback: null,
            route: route
        });
    }
}
