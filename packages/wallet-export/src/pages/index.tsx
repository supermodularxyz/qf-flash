import { Alert } from "components/Alert";
import { LoadWallets } from "components/LoadWallets";
import { ErrorMessage } from "components/ErrorMessage";
import { PrintableWallets } from "components/PrintableWallets";
import { useFileDrop } from "hooks/useFileDrop";
import { type NextPage } from "next";
import { z } from "zod";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://qf-flash.vercel.app/create?key=";

const address = z
  .string()
  .length(42, { message: "Must be a valid Ethereum address" })
  .startsWith("0x");
const mnemonic = z.string();

export const WalletSchema = z.record(z.string(), z.record(address, mnemonic));

const Home: NextPage = () => {
  // Pass schema for validation and infer return type
  const { file, error, handleDrop, isLoading } = useFileDrop(WalletSchema);

  if (isLoading) return <Alert>Loading wallets</Alert>;
  if (error) return <ErrorMessage error={error} />;
  if (file) return <PrintableWallets baseUrl={baseUrl} wallets={file} />;

  return <LoadWallets onDrop={handleDrop} />;
};

export default Home;
