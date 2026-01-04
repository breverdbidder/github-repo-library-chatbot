# Deployment Guide

## Quick Deploy

### 1. Cloudflare Pages (Chatbot)

```bash
# Clone repository
git clone https://github.com/breverdbidder/github-repo-library-chatbot.git
cd github-repo-library-chatbot

# Install dependencies
npm install

# Build
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=github-repo-library
```

**Live URL:** `https://github-repo-library.pages.dev`

### 2. GitHub Actions (Automation)

Already configured! Just add secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add secret: `SUPABASE_KEY` (your Supabase API key)
3. Workflow runs every Sunday 11 PM EST automatically

**Manual trigger:**
- Actions tab → "GitHub Trending Weekly Update" → Run workflow

### 3. Supabase Database

```sql
CREATE TABLE github_trending (
  id SERIAL PRIMARY KEY,
  repo_name TEXT NOT NULL,
  category TEXT,
  stars TEXT,
  trend TEXT,
  quality_score INTEGER,
  discovered_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);
```

## Environment Variables

Create `.env` file:

```env
GITHUB_TOKEN=your_github_token
SUPABASE_KEY=your_supabase_key
SUPABASE_URL=https://mocerqjnksmhcjzxrewo.supabase.co
```

## Local Development

```bash
# Install Node dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Run chatbot dev server
npm run dev

# Test automation script
python weekly_trending_automation.py
```

## Verification

- ✅ Chatbot accessible at Cloudflare URL
- ✅ GitHub Actions runs successfully
- ✅ Supabase receives trending data
- ✅ GITHUB_REPO_MEGA_LIBRARY.md updates weekly

## Support

Issues: https://github.com/breverdbidder/github-repo-library-chatbot/issues
