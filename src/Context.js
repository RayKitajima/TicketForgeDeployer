
import { ethers } from "ethers";
import { Contract } from "./Models/Contract.js";

export var Context = {
    contractAbi: require("./Contracts/AgencyFactory.json").abi,

    _contractId: null,
    _connectedContract: null,
    _connectedWallet: null,

    Web3: {
        _ethereum: null,
        _provider: null,
        _signer: null,

        get ethereum() {
            if (this._ethereum === null) {
                const { ethereum } = window;
                this._ethereum = ethereum;
            }
            return this._ethereum;
        },

        get provider() {
            if (this._provider === null) {
                this._provider = new ethers.providers.Web3Provider(
                    this.ethereum
                );
            }
            return this._provider;
        },

        get signer() {
            if (this._signer === null) {
                this._signer = this.provider.getSigner();
            }
            return this._signer;
        }
    },

    set contractId(contractId) {
        if (this._contractId !== contractId) {
            this._contractId = contractId;
            this.connectedContract = new Contract({
                contractId: contractId,
                abi: this.contractAbi
            });
            console.log('Contract');
            console.log(this.connectedContract);
        }
    },

    get contractId() {
        return this._contractId;
    },

    /**
     * Set the connected contract and notify the listeners
     * 
     * @param {TicketForge.Model.Contract} contract - The contract to set
     * @returns void
     * @fires TicketForge.Context.connectedContract
     * @fires TicketForge.Context.disconnectedContract
     */
    set connectedContract(contract) {
        this._connectedContract = contract;
        if (contract) {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.contractConnected", contract);
        } else {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.contractDisconnected");
        }
        queueMicrotask(() => {
            this.checkIfOwner();
        });
    },

    /**
     * Get the connected contract
     * 
     * @returns {Object} - The connected contract
     */
    get connectedContract() {
        return this._connectedContract;
    },

    /**
     * Set the connected wallet and notify the listeners
     * 
     * @param {Wallet} wallet - TicketForge.Model.Wallet
     * @returns void
     * @fires TicketForge.Context.connectedWallet
     * @fires TicketForge.Context.disconnectedWallet
     */
    set connectedWallet(wallet) {
        this._connectedWallet = wallet;
        if (wallet) {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.walletConnected", wallet);
        } else {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.walletDisconnected");
        }
        console.log('Wallet');
        console.log(this.connectedWallet);
        queueMicrotask(() => {
            this.checkIfOwner();
        });
    },

    /**
     * Get the connected wallet
     * 
     * @returns {Object} - The connected wallet
     */
    get connectedWallet() {
        return this._connectedWallet;
    },

    /**
     * Check if the connected wallet is the owner of the connected contract
     * 
     * @returns {void}
     * @fires TicketForge.Context.connectedAsOwner - When the wallet is the owner of the contract
     */
    async checkIfOwner() {
        if (!this._connectedContract || !this._connectedWallet) {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.connectedAsNotOwner", null);
            console.log('Not owner');
            return;
        }
        console.log('Checking if owner');
        let owner = await this._connectedContract.data.connectedContract.owner();
        owner = owner.toLowerCase();
        const account = this._connectedWallet.data.account.toLowerCase();
        console.log("Owner: " + owner);
        console.log("Wallet: " + account);
        if (owner === account) {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.connectedAsOwner", owner);
        } else {
            Craft.Core.NotificationCenter.notify("TicketForge.Context.connectedAsNotOwner", owner);
        }
    }

};
