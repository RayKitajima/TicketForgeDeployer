
# TicketForge agency deployer

This is a simple tool to deploy a TicketForge agency.

## Usage

Before you start, you need to have a working TicketAgencyFactory contract deployed on local anvil or some other Ethereum network. And you need to have a valid private key for the account that will deploy the agency. It's nice to use a pair of private key and address that the anvil prompt gives you when you start it.

```bash
$ anvil
                            _   _
                            (_) | |
      __ _   _ __   __   __  _  | |
     / _` | | '_ \  \ \ / / | | | |
    | (_| | | | | |  \ V /  | | | |
     \__,_| |_| |_|   \_/   |_| |_|

    0.1.0 (3a79ab0 2022-09-09T01:30:20.777011Z)
    https://github.com/foundry-rs/foundry

Available Accounts
==================

(0) 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
    :
    : 
``` 
in another terminal

```bash
$ cd /path/to/TicketForge

$ forge create --rpc-url http://127.0.0.1:8545/ --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/AgencyFactory.sol:AgencyFactory --hh
No files changed, compilation skipped
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Transaction hash: 0xf4740dcd6dc708439e5a88ddcdea48771dce2b9b2f63a58b31ae56d66bc77cd2
```

Then, start the deployer:

```bash
$ npm run devbuild
$ npm run serve
```

Open `http://127.0.0.1:8090/0x5fbdb2315678afecb367f032d93f642f64180aa3/howto` in your browser and follow the instructions.


