import { useEffect, useState } from "react";

const useAutoPasteFromClipboard = () => {
  const [autoPaste, setAutoPaste] = useState(false);     // switch state
  const [originalUrl, setOriginalUrl] = useState("");     // clipboard se milne wala URL

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith("http")) {
        setOriginalUrl(text);
      }
    } catch (err) {
      console.error("Clipboard access denied", err);
    }
  };

  useEffect(() => {
    if (autoPaste) {
      pasteFromClipboard();
    }
  }, [autoPaste]);

  return {
    autoPaste,
    setAutoPaste,
    originalUrl,
    setOriginalUrl,
     pasteFromClipboard,
  };
};

export default useAutoPasteFromClipboard;
