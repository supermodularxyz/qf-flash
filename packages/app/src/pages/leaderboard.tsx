import { type NextPage } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Layout } from "layouts/Layout";
import { useLeaderboard } from "hooks/useLeaderboard";
import { truncate } from "utils/truncate";
import { timeAgo } from "utils/date";
import { Skeleton } from "components/Skeleton";
import { useName } from "hooks/useName";
import { ScanButton } from "components/ScanButton";
import { roleEmoji } from "utils/roles";

const createLoadingProjects = (length = 2) =>
  Array.from({ length })
    .fill(0)
    .map((_, i) => i)
    .map(
      (i) => ({
        address: `0x...${i}`,
        amount: 0,
        matching: 0,
        funders: [],
        lastFunded: 0,
      }),
      {}
    );

const Name = ({ children = "" }) => {
  const name = useName(children);
  return (
    <Skeleton className="w-full" isLoading={name.isLoading}>
      {name.data || truncate(children, 8)}
    </Skeleton>
  );
};

const LeaderboardTable = ({
  header,
  ...props
}: { header: ReactNode } & ComponentPropsWithoutRef<"table">) => (
  <>
    <div className="mb-1 text-xs uppercase tracking-widest text-gray-600">
      {header}
    </div>

    <div className="mb-4 max-h-60 overflow-y-scroll">
      <table className="w-full table-auto text-sm" {...props} />
    </div>
  </>
);

const Leaderboard: NextPage = () => {
  const { data, isLoading } = useLeaderboard();

  const { bees = [], flowers = [], queryDuration, lastUpdated } = data || {};

  const loadingProjects = createLoadingProjects(3);
  return (
    <Layout fab={<ScanButton />}>
      <div className="mb-4 text-sm uppercase tracking-widest">Leaderboard</div>

      <LeaderboardTable header={<>{roleEmoji[2]} Flowers</>}>
        <thead>
          <tr className="text-left text-xs">
            <th>Received</th>
            <th>Address</th>
            <th className="text-right">Visits</th>
            <th className="text-right">Matching</th>
          </tr>
        </thead>
        <tbody>
          {(isLoading ? loadingProjects : flowers).map(
            ({ address = "", amount = 0, funders = [], matching = 0 }) => {
              return (
                <tr key={address}>
                  <td className="w-20">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      {amount}
                    </Skeleton>
                  </td>
                  <td>
                    <Skeleton className="w-full" isLoading={isLoading}>
                      <Name>{address}</Name>
                    </Skeleton>
                  </td>
                  <td className="w-20 text-right">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      {funders.length}
                    </Skeleton>
                  </td>
                  <td className="w-28 text-right">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      {(matching || 0).toFixed(2)} DAI
                    </Skeleton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </LeaderboardTable>
      <LeaderboardTable header={<>{roleEmoji[1]} Bees</>}>
        <thead>
          <tr className="text-left text-xs">
            <th>Sent</th>
            <th>Address</th>
            <th className="text-right">Flowers visited</th>
          </tr>
        </thead>
        <tbody>
          {bees.map(({ address = "", amount = 0, visited = 0 }) => (
            <tr key={address}>
              <td className="w-16">
                <Skeleton className="w-12" isLoading={isLoading}>
                  {amount}
                </Skeleton>
              </td>
              <td>
                <Name>{address}</Name>
              </td>
              <td className=" text-right">
                <Skeleton className="w-12" isLoading={isLoading}>
                  {visited}
                </Skeleton>
              </td>
            </tr>
          ))}
        </tbody>
      </LeaderboardTable>
      <div className="flex justify-between text-xs">
        <div>
          Last updated: {lastUpdated && <span>&lt;{timeAgo(lastUpdated)}</span>}
        </div>
        <div>Query time: {queryDuration}ms</div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
