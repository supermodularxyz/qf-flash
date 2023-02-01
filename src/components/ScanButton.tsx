import Link from "next/link";

import { Button } from "components/Button";
import { ArrowRight, Camera } from "lucide-react";
import { useState } from "react";
import { storage } from "utils/storage";
import { useRole } from "hooks/useRole";
import { roles } from "utils/roles";

const Instructions = ({ hide = false }) =>
  hide ? null : (
    <span className="absolute -left-48 top-6 flex items-center gap-4 pl-2 text-gray-500">
      Press to scan QR
      <ArrowRight className="h-4 w-4" />
    </span>
  );

export const ScanButon = () => {
  // Only show instructions until use has pressed the Scan button
  const [hideInstructions, setHideInstructions] = useState(
    () => storage.get("instructions") === "hidden"
  );
  function handleHideInstructions() {
    setHideInstructions(true);
    storage.set("instructions", "hidden");
  }

  // Hide button for Flowers
  const role = useRole();
  if (role.isLoading || role.data === roles.Receiver) {
    return null;
  }
  return (
    <>
      <Instructions hide={hideInstructions} />
      <Link href={`/scan`}>
        <Button
          intent="primary"
          onClick={handleHideInstructions}
          className="h-16 w-16 rounded-full shadow-xl hover:shadow-none"
        >
          <Camera />
        </Button>
      </Link>
    </>
  );
};
