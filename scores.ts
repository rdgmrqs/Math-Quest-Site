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
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      // Return beautiful default demo leaderboard if Supabase is not configured yet
      return res.status(200).json([
        { nickname: "Example Pro", points: 1500, problemsSolved: 100, streak: 12, level: 10 },
        { nickname: "Math Wizard", points: 1200, problemsSolved: 80, streak: 8, level: 8 },
        { nickname: "Quest Explorer", points: 800, problemsSolved: 50, streak: 5, level: 5 },
      ]);
    }

    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("points", { ascending: false })
      .limit(10);

    if (error) throw error;

    const mappedData = (data || []).map((row: any) => ({
      nickname: row.nickname,
      points: row.points,
      problemsSolved: row.problems_solved,
      streak: row.streak,
      level: row.level,
    }));

    res.status(200).json(mappedData);
  } catch (err: any) {
    console.error("Vercel Serverless Function Error /api/leaderboard:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
}
