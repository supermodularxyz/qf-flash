import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import { Input } from "components/Form";
import dynamic from "next/dynamic";

const isAddress = (address: string) => address.match(/^(0x)?[0-9a-fA-F]{40}$/);

const ScanQR = dynamic(() => import("components/ScanQR"), { ssr: false });
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
