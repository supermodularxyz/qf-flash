import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { useSendEvents } from "hooks/useSendEvents";
import { truncate } from "utils/truncate";
import { timeAgo } from "utils/date";
import { Skeleton } from "components/Skeleton";

const createLoadingProjects = (length = 2) =>
  Array.from({ length })
    .fill(0)
    .map((_, i) => i)
    .reduce(
      (acc, i) => ({
        ...acc,
        [i]: { amount: 0, funders: 0, lastFunded: 0 },
      }),
      {}
    );

const Leaderboard: NextPage = () => {
  const { data, isLoading } = useSendEvents();

  console.log(JSON.stringify(data, null, 2));
  console.log(data?.projects);
  const {
    nameByAddress = {},
    projects = {},
    queryDuration,
    lastUpdated,
  } = data || {};

  const loadingProjects = createLoadingProjects(3);
  return (
    <Layout>
      <div className="mb-4 text-sm uppercase tracking-widest">Leaderboard</div>

      <table className="mb-4 w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th>Amount</th>
            <th>Project</th>
            <th className="text-right"># Funders</th>
            <th className="text-right">Matching</th>
            {/* <th className="text-right">Last funded</th> */}
          </tr>
        </thead>
        <tbody>
          {Object.entries(isLoading ? loadingProjects : projects).map(
            ([address, { amount, funders, lastFunded }]) => {
              return (
                <tr key={address}>
                  <td className="w-16">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      {amount}
                    </Skeleton>
                  </td>
                  <td>
                    <Skeleton className="w-full" isLoading={isLoading}>
                      {nameByAddress[address] || truncate(address)}
                    </Skeleton>
                  </td>
                  <td className="w-24 text-right">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      {funders.size}
                    </Skeleton>
                  </td>
                  <td className="w-24 text-right">
                    <Skeleton className="w-12" isLoading={isLoading}>
                      ?{/* {timeAgo(lastFunded)} ago */}
                    </Skeleton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className="flex justify-between text-xs">
        <div>{/* Last updated: {timeAgo(lastUpdated)} */}</div>
        <div>Query time: {queryDuration}ms</div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
