import { type NextPage } from "next";

import { Layout } from "components/Layout";
import { useSendEvents } from "hooks/useSendEvents";
import { truncate } from "utils/truncate";
import { timeAgo } from "utils/date";

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

  return (
    <Layout>
      {/* <h1 className="mb-2 text-2xl">Leaderboard</h1> */}
      <div className="mb-4 text-sm uppercase tracking-widest">Leaderboard</div>

      <table className="mb-4 w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th>Amount</th>
            <th>Project</th>
            <th className="text-right"># Funders</th>
            <th className="text-right">Last funded</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(projects).map(
            ([address, { amount, funders, lastFunded }]) => {
              return (
                <tr key={address}>
                  <td>{amount}</td>
                  <td>{nameByAddress[address] || truncate(address)}</td>
                  <td className="text-right">{funders.size}</td>
                  <td className="text-right">{timeAgo(lastFunded)} ago</td>
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
