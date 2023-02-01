import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { P } from "components/Text";
import { ScanButton } from "components/ScanButton";

const About: NextPage = () => {
  return (
    <Layout fab={<ScanButton />}>
      <div className="mb-4 text-sm uppercase tracking-widest">
        What is this?
      </div>
      <P>Each user is either a Bee or a Flower</P>

      <div className="flex justify-around gap-4 pt-8">
        <div>
          <div className="mb-2 text-center text-6xl">{"🌼"}</div>
          <div>Build projects</div>
        </div>
        <div>
          <div className="mb-2 text-center text-6xl">{"🐝"}</div>
          <div>Discovers projects</div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
