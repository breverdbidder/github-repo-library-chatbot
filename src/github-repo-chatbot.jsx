import React, { useState, useEffect, useRef } from 'react';
import { Send, TrendingUp, Brain, GitBranch, Search, Calendar, Star, AlertCircle } from 'lucide-react';

// Repository categories for mind map
const REPO_CATEGORIES = {
  "Discovery Tools": {
    color: "bg-blue-500",
    items: ["GitRepoAI", "RepoAnalyzer", "Trendshift", "GitHub Trending"]
  },
  "Awesome Lists": {
    color: "bg-purple-500",
    items: ["awesome", "awesome-agents", "awesome-LangGraph", "500-AI-Agents"]
  },
  "AI Agents": {
    color: "bg-green-500",
    items: ["LangGraph", "CrewAI", "AutoGen", "OpenAI Swarm"]
  },
  "Web Scraping": {
    color: "bg-yellow-500",
    items: ["Firecrawl", "Crawl4AI", "Browser-Use-RS", "Playwright"]
  },
  "Document Processing": {
    color: "bg-red-500",
    items: ["python-docx", "pdfplumber", "openpyxl", "mammoth"]
  },
  "Real Estate": {
    color: "bg-indigo-500",
    items: ["Zillow APIs", "Realtor Scraper", "Property Aggregator"]
  }
};

// Priority queue items
const PRIORITY_QUEUE = {
  high: [
    { name: "Firecrawl /agent", purpose: "Replace RealForeclose scraping", dueDate: "2026-01-15", score: 85 },
    { name: "LightRAG", purpose: "Simplify RAG implementation", dueDate: "2026-01-20", score: 82 },
    { name: "Letta (.af spec)", purpose: "Agent version control", dueDate: "2026-01-25", score: 88 },
    { name: "GitRepoAI", purpose: "Systematic quality analysis", dueDate: "2026-01-30", score: 90 }
  ],
  medium: [
    { name: "Rill Analytics", purpose: "Codebase health dashboard", dueDate: "2026-02-15", score: 75 },
    { name: "Browser-Use-RS", purpose: "Rust scraper performance", dueDate: "2026-02-28", score: 78 },
    { name: "MCP Integration", purpose: "Learn patterns from awesome-LangGraph", dueDate: "2026-03-15", score: 72 }
  ],
  low: [
    { name: "Auto-GPT", purpose: "Autonomous agent patterns", dueDate: "2026-04-01", score: 68 },
    { name: "Second-Me", purpose: "Digital twin concepts", dueDate: "2026-04-15", score: 65 }
  ]
};

// Trending repositories data
const TRENDING_DATA = [
  { name: "Claude Code", category: "AI Agents", stars: "15.2K", trend: "+1.2K", date: "2026-01-04" },
  { name: "adk-go", category: "AI Agents", stars: "5.7K", trend: "+151", date: "2026-01-04" },
  { name: "LightRAG", category: "AI Agents", stars: "25K", trend: "+152", date: "2026-01-03" },
  { name: "RustFS", category: "Infrastructure", stars: "8.3K", trend: "+420", date: "2026-01-02" }
];

const GitHubRepoLibraryChatbot = () => {
  const [activeView, setActiveView] = useState('chat');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your GitHub Repository Library assistant. I can help you:\n\n• Find repositories by category or use case\n• Analyze priority queue items\n• Track trending repos\n• Recommend quality tools\n• Explain repository assessments\n\nWhat would you like to explore?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process user query with context about the repo library
  const processQuery = async (userQuery) => {
    setIsLoading(true);
    
    // Build context from our library
    const context = `You are an AI assistant for the GitHub Repository Mega Library system. You have access to:

REPOSITORY CATEGORIES:
${Object.entries(REPO_CATEGORIES).map(([cat, data]) => `- ${cat}: ${data.items.join(', ')}`).join('\n')}

PRIORITY QUEUE (High Priority):
${PRIORITY_QUEUE.high.map(item => `- ${item.name} (Score: ${item.score}, Due: ${item.dueDate}): ${item.purpose}`).join('\n')}

CURRENT TRENDING:
${TRENDING_DATA.map(repo => `- ${repo.name} (${repo.category}): ${repo.stars} stars, ${repo.trend} today`).join('\n')}

BIDDEED.AI CONTEXT:
- Uses LangGraph V17.0 (fastest framework)
- 12-stage pipeline (Everest Ascent™)
- ForecastEngines with 97/96/95 scores
- Smart Router V7.1 with 73% FREE tier

QUALITY ASSESSMENT FRAMEWORK:
- 80+ score = ADOPT
- 60-79 = EVALUATE
- 40-59 = CONDITIONAL
- <40 = REJECT

User query: ${userQuery}

Provide a helpful, specific response. If recommending repositories, mention their quality scores and BidDeed.AI relevance.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            ...messages.filter(m => m.role !== 'system'),
            { role: "user", content: context }
          ],
        })
      });

      const data = await response.json();
      const assistantMessage = data.content[0].text;
      
      setMessages(prev => [...prev, 
        { role: 'user', content: userQuery },
        { role: 'assistant', content: assistantMessage }
      ]);
    } catch (error) {
      setMessages(prev => [...prev,
        { role: 'user', content: userQuery },
        { role: 'assistant', content: 'I encountered an error. Here\'s what I can tell you based on the local data:\n\nFor repository discovery, check the Mind Map view for categories. For priority items, see the Dashboard. For trending repos, check the Trending tab.' }
      ]);
    }
    
    setIsLoading(false);
    setInput('');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    processQuery(input);
  };

  // Mind Map View
  const MindMapView = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Brain className="w-6 h-6" />
        Repository Categories Mind Map
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(REPO_CATEGORIES).map(([category, data]) => (
          <div key={category} className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: data.color.replace('bg-', '') }}>
            <h3 className={`text-lg font-bold mb-4 ${data.color} text-white px-3 py-2 rounded`}>
              {category}
            </h3>
            <ul className="space-y-2">
              {data.items.map(item => (
                <li key={item} className="flex items-center gap-2 text-gray-700">
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Priority Queue Dashboard
      </h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="text-3xl font-bold text-red-600">{PRIORITY_QUEUE.high.length}</div>
          <div className="text-red-700">High Priority</div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="text-3xl font-bold text-yellow-600">{PRIORITY_QUEUE.medium.length}</div>
          <div className="text-yellow-700">Medium Priority</div>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="text-3xl font-bold text-green-600">{PRIORITY_QUEUE.low.length}</div>
          <div className="text-green-700">Low Priority</div>
        </div>
      </div>

      {/* High Priority Items */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          High Priority (Evaluate This Month)
        </h3>
        {PRIORITY_QUEUE.high.map(item => (
          <div key={item.name} className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg">{item.name}</h4>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                Score: {item.score}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{item.purpose}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Due: {item.dueDate}
            </div>
          </div>
        ))}

        <h3 className="text-xl font-bold text-yellow-600 mt-8 flex items-center gap-2">
          Medium Priority (Evaluate Q1 2026)
        </h3>
        {PRIORITY_QUEUE.medium.map(item => (
          <div key={item.name} className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg">{item.name}</h4>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                Score: {item.score}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{item.purpose}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Due: {item.dueDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Trending View
  const TrendingView = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Star className="w-6 h-6" />
        Trending Repositories (January 2026)
      </h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
        <p className="text-blue-800">
          <strong>Next Update:</strong> Sunday, January 11, 2026 (Weekly Schedule)
        </p>
      </div>

      <div className="space-y-4">
        {TRENDING_DATA.map(repo => (
          <div key={repo.name} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-lg">{repo.name}</h4>
                <span className="text-sm text-gray-500">{repo.category}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{repo.stars}</span>
                </div>
                <span className="text-green-600 text-sm font-semibold">{repo.trend}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">{repo.date}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Chat View
  const ChatView = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-lg p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about repositories, trending items, or get recommendations..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => processQuery("What repos should I evaluate this month?")}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            Priority items
          </button>
          <button
            onClick={() => processQuery("Show me trending AI agent repos")}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            Trending AI
          </button>
          <button
            onClick={() => processQuery("Best web scraping tools for BidDeed.AI?")}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            Scraping tools
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">GitHub Repository Library Assistant</h1>
        <p className="text-blue-100">AI-powered repository discovery & analysis for BidDeed.AI</p>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="flex gap-1 p-2">
          <button
            onClick={() => setActiveView('chat')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeView === 'chat' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Chat Assistant
          </button>
          <button
            onClick={() => setActiveView('mindmap')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeView === 'mindmap' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Brain className="w-4 h-4" />
            Mind Map
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('trending')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeView === 'trending' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
            Trending
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'chat' && <ChatView />}
        {activeView === 'mindmap' && <MindMapView />}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'trending' && <TrendingView />}
      </div>
    </div>
  );
};

export default GitHubRepoLibraryChatbot;
