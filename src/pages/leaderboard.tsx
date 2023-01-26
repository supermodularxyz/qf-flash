import { type NextPage } from "next";

import { Layout } from "components/Layout";
import { useSendEvents } from "hooks/useSendEvents";
import { truncate } from "utils/truncate";

const Leaderboard: NextPage = () => {
  const { data, isLoading } = useSendEvents();

  console.log(JSON.stringify(data, null, 2));
  console.log(data?.projects);
  const {
    events = [],
    amountByAddress = {},
    nameByAddress = {},
    votesByAddress = {},
    projects = {},
    queryDuration,
  } = data || {};

  return (
    <Layout>
      <h1 className="mb-4 text-center text-4xl">Leaderboard</h1>

      <table className="mb-4 w-full table-auto">
        <thead>
          <tr className="text-left text-xs">
            <th className="">Amount</th>
            <th>Project</th>
            <th className=""># Funders</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(projects).map(([address, { amount, funders }]) => {
            return (
              <tr key={address}>
                <td className="">{amount}</td>
                <td>{nameByAddress[address] || truncate(address)}</td>
                <td className="">{funders.size}</td>
                {/* <td>{amountByAddress[event.to]}</td> */}
                {/* <td>{event.timestamp?.toISOString()}</td> */}
                {/* <td>{nameByAddress[event.from]}</td>
                <td>{nameByAddress[event.to] || event.to}</td> */}
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
