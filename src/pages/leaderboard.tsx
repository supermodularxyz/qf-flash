import { type NextPage } from "next";

import { Layout } from "components/Layout";
import { useSendEvents } from "hooks/useSendEvents";
import { truncate } from "utils/truncate";

const Leaderboard: NextPage = () => {
  const { data, isLoading } = useSendEvents();

  console.log(JSON.stringify(data, null, 2));
  console.log(data?.projects);
  const { nameByAddress = {}, projects = {}, queryDuration } = data || {};

  return (
    <Layout>
      <h1 className="mb-4 text-center text-4xl">Leaderboard</h1>

      <table className="mb-4 w-full table-auto">
        <thead>
          <tr className="text-left text-xs">
            <th>Amount</th>
            <th>Project</th>
            <th># Funders</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(projects).map(([address, { amount, funders }]) => {
            return (
              <tr key={address}>
                <td>{amount}</td>
                <td>{nameByAddress[address] || truncate(address)}</td>
                <td>{funders.size}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-right text-xs">Query time: {queryDuration}ms</div>
    </Layout>
  );
};

export default Leaderboard;
