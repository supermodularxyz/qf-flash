import { Alert } from "./Alert";

export const ErrorMessage = ({ error }: { error: Error | null }) => {
  console.log(error);
  return error ? (
    <Alert variant="error">
      <span>
        Invalid <code>wallets.json</code>. See console for more details.
      </span>
    </Alert>
  ) : null;
};
