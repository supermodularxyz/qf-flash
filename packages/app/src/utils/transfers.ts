import type { QFToken } from "types";
import { sum } from "./math";
import { calculateMatch } from "./qf";

export type Scores = {
  [address: string]: {
    amounts: { [address: string]: number };
  };
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const FROM_BLOCK = process.env.FROM_BLOCK || 0;

export async function queryTransferEvents(contract: QFToken) {
  const bees: Scores = {};
  const flowers: Scores = {};

  await contract
    // Fetch all Transfer events
    .queryFilter(contract.filters.Transfer(), Number(FROM_BLOCK))
    .then((events) =>
      Promise.all(
        events
          // Filter out initial minting transfers
          .filter((e) => e.args.from !== ZERO_ADDRESS)
          .map((e) => {
            const { value, from, to } = e.args;

            // Init empty objects
            if (!bees[from]) bees[from] = { amounts: {} };
            if (!flowers[to]) flowers[to] = { amounts: {} };

            // Add token amounts
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            flowers[to]!.amounts[from] =
              (flowers[to]!.amounts[from] || 0) + Number(value);

            bees[from]!.amounts[to] =
              (bees[from]!.amounts[to] || 0) + Number(value);
            /* eslint-enable @typescript-eslint/no-non-null-assertion */

            return {};
          })
      )
    );

  return {
    bees: mapBeeScores(bees),
    flowers: mapFlowerScores(flowers),
  };
}

const mapFlowerScores = (flowers: Scores) => {
  const matches = calculateMatch(flowers);
  return Object.entries(flowers)
    .map(([address, { amounts }]) => ({
      address,
      matching: matches[address],
      amount: sum(Object.values(amounts)),
      funders: Object.keys(amounts),
    }))
    .sort((a, b) => (Number(a.matching) > Number(b.matching) ? -1 : 1));
};

const mapBeeScores = (bees: Scores) => {
  return Object.entries(bees)
    .map(([address, { amounts }]) => {
      return {
        address,
        visited: Object.keys(amounts).length,
        amount: sum(Object.values(amounts)),
      };
    })
    .sort((a, b) => {
      if (a.visited === b.visited) {
        return a.amount > b.amount ? -1 : 1;
      }
      return a.visited > b.visited ? -1 : 1;
    });
};
