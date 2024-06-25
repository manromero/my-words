export const useTranslate = () => {
  const translate = async (text: string): Promise<string | undefined> => {
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
    console.log("response", response);
    if (!response.ok) {
      throw new Error("Response is not ok");
    }
    const result = await response.json();
    if (!result?.translation) {
      throw new Error("Unexpected Error");
    }
    return result.translation;
  };

  return { translate };
};
