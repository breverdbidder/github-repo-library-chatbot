#!/bin/bash

echo "🚀 Cloudflare Pages Deployment Script"
echo "======================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing wrangler..."
    npm install -g wrangler
fi

echo "✅ Wrangler installed"
echo ""

# Login to Cloudflare
echo "🔐 Logging into Cloudflare..."
echo "   This will open your browser for authentication"
wrangler login

echo ""
echo "📂 Preparing deployment..."

# Clone the repository if not already cloned
if [ ! -d "github-repo-library-chatbot" ]; then
    echo "   Cloning repository..."
    git clone https://github.com/breverdbidder/github-repo-library-chatbot.git
    cd github-repo-library-chatbot
else
    echo "   Repository already exists, using existing directory"
    cd github-repo-library-chatbot
    git pull
fi

echo ""
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name=github-repo-library

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your chatbot is now live at:"
echo "🔗 https://github-repo-library.pages.dev"
echo ""
echo "Next steps:"
echo "1. Visit the URL to test"
echo "2. Try sample queries: 'What repos should I evaluate?'"
echo "3. Explore all 4 views: Chat, Mind Map, Dashboard, Trending"
