
import * as Craft from "@craftkit/craft-uikit";

import { MenuButton } from "./MenuButton.js";

export class Menu extends Craft.UI.View {

    constructor(options) {
        super(options || {});
        this.packagename = "TicketForge.Framework.Menu";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null
        };
        this.views = {
            howtoButton: null,
            agenciesButton: null
        };
    }

    viewDidLoad(callback) {
        this.clearMeneu();
        this.appendHowtoButton();
        this.appendAgenciesButton();
        if (callback) { callback(); }
    }

    clearMeneu() {
        this.views.howtoButton?.removeFromParent();
        this.views.howtoButton = null;
        this.views.agenciesButton?.removeFromParent();
        this.views.agenciesButton = null;
    }

    appendHowtoButton() {
        this.views.howtoButton = new MenuButton({
            label: 'Howto',
            action: () => {
                this.viewController.openNamedPage('howto');
                this.markHowto();
            }
        });
        this.appendView(this.views.howtoButton);
    }

    appendAgenciesButton() {
        this.views.agenciesButton = new MenuButton({
            label: 'My Agencies',
            action: () => {
                this.viewController.openNamedPage('agencies');
                this.markAgencies();
            }
        });
        this.appendView(this.views.agenciesButton);
    }

    mark(name) {
        switch (name) {
            case 'howto':
                this.markHowto();
                break;
            case 'agencies':
                this.markAgencies();
                break;
            default:
                this.markHowto();
                break;
        }
    }

    markHowto() {
        this.views.howtoButton?.mark();
        this.views.agenciesButton.unmark();
    }

    markAgencies() {
        this.views.howtoButton?.unmark();
        this.views.agenciesButton.mark();
    }

    style() {
        return `
			.root {
				box-sizing:border-box;
				display: flex;
				flex-direction: row;
				justify-content: center;
				height: 44px;
				line-height: 40px;
				text-align: center;
			}
		`;
    }
}
