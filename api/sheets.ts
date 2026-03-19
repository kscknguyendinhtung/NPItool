import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const method = req.method || "GET";
    const options: RequestInit = {
      method,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Content-Type": "application/json"
      },
      redirect: "follow"
    };

    if (method === "POST") {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url as string, options);
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (e) {
      // If POST, Apps Script might return success text instead of JSON
      if (method === "POST") {
        res.status(200).json({ success: true, note: "Update sent successfully" });
      } else {
        res.status(500).json({ error: "Received non-JSON response", preview: text.substring(0, 100) });
      }
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to communicate with Google Script" });
  }
}
