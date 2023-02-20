import { useCallback, useEffect, useState } from "react";
import { ZodSchema } from "zod";

type DropState<T> = { file: T | null; error: Error | null; isLoading: boolean };

export function useFileDrop<S>(schema: ZodSchema<S>) {
  // Infer shape of files from schema
  const [state, setState] = useState<DropState<S>>({
    error: null,
    file: null,
    isLoading: false,
  });

  useEffect(() => {
    // Prevent file from opening a new tab on drop
    window.addEventListener("dragover", (e) => e.preventDefault(), false);
    window.addEventListener(
      "drop",
      (e) => {
        e.preventDefault();
        handleDrop(e.dataTransfer?.files!);
      },
      false
    );
  }, []);

  const handleDrop = useCallback((files: FileList) => {
    const [droppedFile] = files || [];
    if (droppedFile) {
      setState((s) => ({ ...s, isLoading: true }));
      readFile(droppedFile)
        .then(schema.parseAsync)
        .then((file) => setState({ file, error: null, isLoading: false }))
        .catch((error: Error) =>
          setState({ error, file: null, isLoading: false })
        );
    }
  }, []);

  return { ...state, handleDrop };
}

async function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        try {
          resolve(JSON.parse(reader.result as string));
        } catch (error) {
          reject(error);
        }
      },
      false
    );
    reader.readAsText(file);
  });
}
