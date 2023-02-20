import { Alert } from "./Alert";

type Props = { onDrop: (files: FileList) => void };

export const LoadWallets = ({ onDrop }: Props) => (
  <Alert>
    <div>
      Drag and drop <code>wallets.json</code> here
      <div>
        or{" "}
        <input
          onChange={(e) => onDrop(e.target.files!)}
          className="cursor-pointer"
          type="file"
          accept="application/json"
        />
      </div>
    </div>
  </Alert>
);
