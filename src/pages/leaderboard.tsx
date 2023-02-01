import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { useLeaderboard } from "hooks/useLeaderboard";
import { truncate } from "utils/truncate";
import { timeAgo } from "utils/date";
import { Skeleton } from "components/Skeleton";
import { useName } from "hooks/useName";
import { ScanButton } from "components/ScanButton";

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
    <Skeleton className="w-12" isLoading={name.isLoading}>
      {name.data || truncate(children)}
    </Skeleton>
  );
};
const Leaderboard: NextPage = () => {
  const { data, isLoading } = useLeaderboard();

  const { bees = [], projects = [], queryDuration, lastUpdated } = data || {};

  const loadingProjects = createLoadingProjects(3);
  console.log(projects);
  console.log(bees);
  return (
    <Layout fab={<ScanButton />}>
      <div className="mb-4 text-sm uppercase tracking-widest">Leaderboard</div>

      <table className="mb-4 w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th>#</th>
            <th>Flower</th>
            <th className="text-right">Visits</th>
            <th className="text-right">Matching</th>
            {/* <th className="text-right">Last funded</th> */}
          </tr>
        </thead>
        <tbody>
          {(isLoading ? loadingProjects : projects).map(
            ({ address = "", amount = 0, funders = [], matching = 0 }) => {
              return (
                <tr key={address}>
                  <td className="w-16">
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
                      {/* {timeAgo(lastFunded)} ago */}
                    </Skeleton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <table className="mb-4 w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th>Tokens</th>
            <th>Bee</th>
            <th className="text-right">Visited</th>
            <th className="text-right"></th>
            {/* <th className="text-right">Last funded</th> */}
          </tr>
        </thead>
        <tbody>
          {bees.map(({ address = "", amount = 0, visited = 0 }) => {
            return (
              <tr key={address}>
                <td className="w-16">
                  <Skeleton className="w-12" isLoading={isLoading}>
                    {amount}
                  </Skeleton>
                </td>
                <td>
                  <Name>{address}</Name>
                </td>
                <td className="w-20 text-right">
                  <Skeleton className="w-12" isLoading={isLoading}>
                    {visited}
                  </Skeleton>
                </td>
                <td className="w-28 text-right">
                  <Skeleton className="w-12" isLoading={isLoading}>
                    {/* {(matching || 0).toFixed(2)} DAI */}
                    {/* {timeAgo(lastFunded)} ago */}
                  </Skeleton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between text-xs">
        <div>
          Last updated:{" "}
          {lastUpdated && <span>&lt; {timeAgo(lastUpdated)}</span>}
        </div>
        <div>Query time: {queryDuration}ms</div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
