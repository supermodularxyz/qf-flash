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

## Deployment

Run the following to deploy the contract. Configure the network to either `localhost`, `chiado`, or `gnosis`,

```sh
npx hardhat --network localhost run scripts/deploy.ts`
```

The terminal should output the contract address. Use this in the next script:

```sh
CONTRACT_ADDRESS="<deployed contract address>" npx hardhat --network localhost run scripts/prepare.ts
```

TODO:

- Generate QR codes for generated wallets
  - `sender_0xAddress.svg`
  - `receiver_0xAddress.svg`

## Generating ABI

Generate the ABI to the app (`packages/app/src/abi/QFToken.json`)

```sh
pnpm run test
```
