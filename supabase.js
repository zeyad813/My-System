const SUPABASE_URL = "https://ysopxwlahtcnjsfkwctn.supabase.co";
const SUPABASE_KEY = "sb_publishable_KI54ieEUyiE6QVwpT3Bmkg_BosdmNua";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection(){
  try{
    const {data,error} = await sb.from('habit_logs').select('*').limit(1);
    if(error) throw error;
    document.getElementById('syncStatus').innerText = "Synced ✓";
  }catch(e){
    document.getElementById('syncStatus').innerText = "Sync Error";
  }
}

window.addEventListener('load', testConnection);
