import { useEffect, useRef } from "react";
import { IScannerControls } from "@zxing/browser";
import type { DecodeContinuouslyCallback } from "@zxing/browser/esm/common/DecodeContinuouslyCallback";

export const ScanQR = ({ onScan }: { onScan: DecodeContinuouslyCallback }) => {
  const controlsRef = useRef<IScannerControls | null>(null);
  const videoId = "scan-qr";

  useEffect(() => {
    import("@zxing/browser").then(({ BrowserQRCodeReader }) => {
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
          console.log(error);
        });
    });
    return () => controlsRef.current?.stop();
  }, []);

  return (
    <div>
      <video id={videoId} muted />
    </div>
  );
};

export default ScanQR;
