# ⚡ 3-Minute Cloudflare Pages Deployment

## Fastest Method: Wrangler CLI

### Option 1: One-Line Deploy (Mac/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/breverdbidder/github-repo-library-chatbot/main/scripts/deploy-to-cloudflare.sh | bash
```

### Option 2: Manual Steps

```bash
# 1. Install wrangler
npm install -g wrangler

# 2. Clone repo
git clone https://github.com/breverdbidder/github-repo-library-chatbot.git
cd github-repo-library-chatbot

# 3. Login to Cloudflare
wrangler login

# 4. Deploy
wrangler pages deploy . --project-name=github-repo-library
```

### Option 3: Cloudflare Dashboard (No CLI)

1. Go to: https://dash.cloudflare.com
2. Click "Workers & Pages" → "Create application" → "Pages"
3. Connect GitHub: `breverdbidder/github-repo-library-chatbot`
4. Build settings: Leave everything blank
5. Click "Save and Deploy"

**Done!** Your site will be live at: https://github-repo-library.pages.dev

---

## What You'll Get

✅ Live chatbot with NLP capabilities  
✅ Mind map of repository categories  
✅ Priority queue dashboard  
✅ Trending repositories tracker  
✅ Free hosting on Cloudflare's global CDN  
✅ Auto-deployment on every GitHub push  

**Total Time:** 3 minutes  
**Cost:** $0 (free tier)  
**Maintenance:** Auto-updates from GitHub
