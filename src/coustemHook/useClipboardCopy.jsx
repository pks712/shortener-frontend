import { useState } from "react";

const useClipboardCopy = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return { copied, copyToClipboard };
};

export default useClipboardCopy;
