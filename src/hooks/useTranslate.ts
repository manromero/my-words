import { useState } from "react";

export const useTranslate = () => {
  const [loading, setLoading] = useState(false);

  const translate = async (text: string): Promise<string | undefined> => {
    setLoading(true);
    const data = {
      text,
    };
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (!response.ok) {
      throw new Error("Response is not ok");
    }
    const result = await response.json();
    if (!result?.translation) {
      throw new Error("Unexpected Error");
    }
    return result.translation;
  };

  return { translate, loading };
};
