import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import type { DecodeContinuouslyCallback } from "@zxing/browser/esm/common/DecodeContinuouslyCallback";

export const ScanQR = ({ onScan }: { onScan: DecodeContinuouslyCallback }) => {
  const controlsRef = useRef<IScannerControls | null>(null);
  const videoId = "scan-qr";
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts: 500,
    });

    codeReader
      .decodeFromConstraints(
        { video: { facingMode: "environment" } },
        videoId,
        onScan
      )
      .then((controls: IScannerControls) => (controlsRef.current = controls))
      .catch((error: Error) => {
        console.log("error", error);
        setError(error);
      });
    return () => controlsRef.current?.stop();
  }, []);

  return (
    <div>
      {error ? (
        <pre className="py-16 text-center">{error.message}</pre>
      ) : (
        <video id={videoId} muted />
      )}
    </div>
  );
};

export default ScanQR;
