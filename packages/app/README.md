# qf-flash/app

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Getting started

Copy the env template and enter your mnemonic phrase for the deploying wallet.

```sh
cp .env.sample .env
```

## Development

You can run a local hardhat node or configure the `.env` to point to a test or mainnet contract.

```sh
pnpm run dev
```

Open http://localhost:3000

If you make any changes to the contract (`packages/contracts/contracts/QFToken.sol`) you will need to re-generate the ABI and the ts types.

```sh
pnpm run generate-types
pnpm run generate-types
```
