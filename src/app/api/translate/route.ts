import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const DEEPL_AUTH_API_KEY = process.env.NEXT_PRIVATE_DEEPL_AUTH_API_KEY ?? "";

type ResponseData = {
  error?: string;
  translation?: string;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ResponseData>> {
  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get("text");
  if (!text) {
    return NextResponse.json(
      { error: "Bad request: Text is mandatory" },
      { status: 400 }
    );
  }
  const data = {
    text: [text],
    target_lang: "ES",
    source_lang: "EN",
  };
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `DeepL-Auth-Key ${DEEPL_AUTH_API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unexpected error from deepL" },
      { status: 500 }
    );
  }

  const result = await response.json();
  if (!result?.translations?.[0]?.text) {
    return NextResponse.json(
      { error: "No translation founds from deePL" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { translation: result?.translations?.[0]?.text },
    { status: 200 }
  );
}
