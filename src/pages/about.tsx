import { type NextPage } from "next";

import { Layout } from "components/Layout";
import { P } from "components/Text";

const About: NextPage = () => {
  return (
    <Layout>
      {/* <h1 className="mb-2 text-2xl">What is this?</h1> */}
      <div className="mb-4 text-sm uppercase tracking-widest">
        What is this?
      </div>
      <P>Detailed information about this app</P>
    </Layout>
  );
};

export default About;
