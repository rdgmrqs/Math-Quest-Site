import { createClient } from "@supabase/supabase-js";

let supabaseClient: any = null;

function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const { nickname, points, problemsSolved, streak, level } = req.body || {};
  if (!nickname || typeof points !== "number") {
    res.status(400).json({ error: "Invalid data. Name and points are required." });
    return;
  }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      console.warn("Vercel Function: Supabase not configured. Score not saved.");
      res.status(200).json({ success: true, message: "Demo mode: score not persisted on server." });
      return;
    }

    const { error } = await supabase
      .from("leaderboard")
      .upsert(
        {
          nickname,
          points,
          problems_solved: problemsSolved || 0,
          streak: streak || 0,
          level: level || 1,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "nickname" }
      );

    if (error) throw error;
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Vercel Serverless Function Error /api/scores:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
}
