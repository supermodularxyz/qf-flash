# qf-flash/contracts

This project is built using hardhat.

## Directory Structure

```
├── contracts                           # Smart contracts
├   ├── QFToken.sol                     # QFToken contract
├── scripts                             # Scripts for smart contracts
├   ├── deploy.ts                       # deploy script
├   ├── prepare.ts                      # create and fund wallets script
├   ├── prepare.ts                      # simulate script
├── test                                # Tests for smart contracts
├   ├── QFToken.ts                      # QFToken tests
├── utils                               # Utils
├   ├── createWallets.ts                # Generate wallets
├   ├── prepareWallets.ts               # Set roles, transfer tokens and ETH (or xDAI) to wallets
├── .env.example                        # .env template
├── hardhat.config.ts                   # Hardhat configuration
├── package.json                        # Package configuration
├── README.md
```

## Getting started

Copy the env template and enter your mnemonic phrase for the deploying wallet.

```sh
cp .env.sample .env
```

## Development

First run the node:

```sh
pnpm run hardhat:node
```

Then deploy the contract (see below).

## Tests

Run the tests:

```sh
pnpm run test
```

## Generating ABI

Generate the ABI to the app (`packages/app/src/abi/QFToken.json`).

Read more here: [packages/app/README.md](../app/README.md#development)

```sh
npx hardhat abi
```

## Create Wallets

A number of wallets can be generated and later funded with QF tokens and ETH. This will create a `wallets.json` file in `packages/contracts`.

Params:

- `NUM_WALLETS` - how many wallets to generate
- `RATIO` - ratio between senders and receivers (eg. 20 / 100 = 0.2)
- `CONTRACT_ADDRESS` - optional to add as a suffix to `wallets_<address>.json`

```sh
NUM_WALLETS="100" RATIO="0.2" npx hardhat run scripts/wallets.ts
```

## Deployment

Run the following to deploy the contract. Configure the network to either `localhost`, `chiado`, or `gnosis`,

```sh
npx hardhat --network localhost run scripts/deploy.ts
```

The terminal should output the contract address. Use this in the next script:

## Fund Wallets

After we have deployed the contract we can fund the generated wallets with QF Tokens and ETH.

Params:

- `CONTRACT_ADDRESS` - QF Token contract address to use to mint tokens from

```sh
CONTRACT_ADDRESS="<deployed contract address>" npx hardhat --network localhost run scripts/prepare.ts
```

## List Wallets

To verify that the wallets have been funded, the following script can be called:

Params:

- `CONTRACT_ADDRESS` - QF Token contract address to use to get balance from

```sh
CONTRACT_ADDRESS="<deployed contract address>" npx hardhat --network localhost run scripts/list-wallets.ts
```

It generates an output like this:

```sh
ADDRESS                                    | xDAI | QF  | ROLE
0x9FC82BCfe7bFE5894Cc8eA50d82E9077dEB92FAD | 0.01 | 100 | sender
...
0x1CF718Cf232B2c91d991b95fD67fA2bEA7133c99 | 0.01 | 100 | receiver
...
```

## Transfering Payouts

Query all the transfers, calculate the matching funds, and transfer to the recipients.

Params:

- `CONTRACT_ADDRESS` - QF Token contract address to query for Transfer events
- `PAYOUT_TOKEN` - Address of token used for payouts
- `MATCHING_POOL` - Amount of matching funds to distribute

```sh
CONTRACT_ADDRESS="<deployed contract address>" PAYOUT_TOKEN="<address>" MATCHING_POOL="<amount to distribute>" npx hardhat run --network localhost scripts/payout.ts

```
