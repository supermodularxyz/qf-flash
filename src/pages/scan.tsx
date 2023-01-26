import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "components/Layout";
// import { ScanQR } from "components/ScanQR";
import { isAddress } from "ethers/lib/utils";
import { Input } from "components/Form";
import dynamic from "next/dynamic";

const ScanQR = dynamic(() => import("components/ScanQR"));
const Scan: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const { address } = Object.fromEntries(new FormData(target)) as {
            address: string;
          };
          if (address && isAddress(address)) {
            router.push(`/send?address=${address}`);
          }
        }}
      >
        <Input
          className="mb-1 w-full"
          required
          name="address"
          placeholder="0x..."
        />
      </form>
      <ScanQR
        onScan={(res) => {
          const address = res?.getText();
          if (address && isAddress(address)) {
            router.push(`/send?address=${address}`);
          }
        }}
      />
    </Layout>
  );
};

export default Scan;
