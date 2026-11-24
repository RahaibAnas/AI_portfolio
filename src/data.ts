export const profile = {
  name: "Rahaib Anas",
  monogram: "RA",
  handle: "AI@backend.api",
  role: "Backend & AI Engineer",
  kicker: "Backend REST API & AI Developer",
  availability: "Available for Backend & AI Developer Positions",
  tagline: "Building Python REST APIs integrated with RAG, LangChain, and AI Models.",
  intro:
    "Specializing in building robust Django & DRF REST APIs, background task processing with Celery & Redis, and integrating modern AI pipelines using LangChain, RAG, Vector DBs, and LLM APIs.",
  github: "https://github.com/RahaibAnas",
  linkedin: "https://www.linkedin.com/in/rahaibanas/",
  resume: "./public/resume/Rahaib_Anas_Resume.pdf",
  email: "mianrahaib@gmail.com",
  inquiryEmail: "mianrahaib@gmail.com",
  githubHandle: "github.com/rahaibanas",
  location: "Available for Remote & On-site",
  web3formsKey: "e55de21e-1689-44c3-8599-90dcb294ffb6",
};

export const sections = [
  { id: "hero", index: "01", label: "Index" },
  { id: "about", index: "02", label: "About" },
  { id: "stack", index: "03", label: "Stack" },
  { id: "projects", index: "04", label: "Projects" },
  { id: "capabilities", index: "05", label: "Capabilities" },
  { id: "education", index: "06", label: "Education" },
  { id: "contact", index: "07", label: "Contact" },
] as const;

export const about = {
  lead: "I am a Python Backend and AI Developer focused on constructing robust server-side applications integrated with modern Generative AI.",
  paragraphs: [
    "My foundation is built on modern Python backend engineering using Django, Django REST Framework, Celery, Redis, PostgreSQL, and Docker. I complement this core backend expertise with cutting-edge AI skills—building RAG pipelines, working with Vector DBs, fine-tuning Hugging Face models, and crafting intelligent workflows using LangChain and LangGraph.",
    "I also utilize Pandas, Matplotlib, and Seaborn for data analysis and visual insights. I am eager to contribute clean, well-tested Python backend and AI solution code to scalable engineering teams.",
  ],
  focus: [
    "Django DRF",
    "Celery & Redis",
    "VectorDB & RAG",
    "LangChain / LangGraph",
    "LLM APIs",
  ],
  metrics: [
    { code: "METRIC_01", value: "10+", label: "REST APIs Implemented" },
    { code: "METRIC_02", value: "5+", label: "AI & RAG Integrations" },
    { code: "METRIC_03", value: "70%", label: "Containerized (Docker)" },
    { code: "METRIC_04", value: "HF", label: "Fine-Tuned Models" },
  ],
};

export type StackItem = { name: string; level: string; strength: number };
export type StackGroup = {
  id: string;
  index: string;
  title: string;
  tint: "amber" | "cyan" | "ink";
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    id: "backend",
    index: "3.1",
    title: "Backend Engineering",
    tint: "amber",
    items: [
      { name: "Python", level: "Primary", strength: 5 },
      { name: "Django & DRF", level: "Proficient", strength: 4 },
      { name: "Java", level: "Intermediate", strength: 3 },
      { name: "Celery & Redis", level: "Proficient", strength: 4 },
      { name: "PostgreSQL", level: "Proficient", strength: 4 },
    ],
  },
  {
    id: "ai",
    index: "3.2",
    title: "AI & LLM Stack",
    tint: "cyan",
    items: [
      { name: "HuggingFace Training", level: "Hands-on", strength: 4 },
      { name: "OpenAI & Gemini API", level: "Proficient", strength: 4 },
      { name: "OpenRouter API", level: "Proficient", strength: 4 },
      { name: "Vector Databases", level: "RAG Ready", strength: 4 },
      { name: "LangChain & LangGraph", level: "Agents", strength: 4 },
    ],
  },
  {
    id: "data",
    index: "3.3",
    title: "Data Analytics",
    tint: "ink",
    items: [
      { name: "Pandas", level: "Data Ops", strength: 4 },
      { name: "Matplotlib", level: "Visualization", strength: 3 },
      { name: "Seaborn", level: "Stats Plotting", strength: 3 },
      { name: "Jupyter / EDA", level: "Analysis", strength: 4 },
    ],
  },
  {
    id: "devops",
    index: "3.4",
    title: "DevOps & Tooling",
    tint: "amber",
    items: [
      { name: "Docker", level: "Containers", strength: 4 },
      { name: "Git / GitHub", level: "Version Ctrl", strength: 4 },
      { name: "Postman / OpenAPI", level: "API Specs", strength: 4 },
      { name: "Linux / Bash", level: "CLI Tools", strength: 3 },
    ],
  },
];

export type Project = {
  id: string;
  method: "POST" | "GET" | "CLI";
  route: string;
  title: string;
  category: string;
  status: string;
  statusTint: "amber" | "cyan" | "muted";
  summary: string;
  detail: string;
  stack: string[];
  repo: string;
  capability: string;
};

export const projects: Project[] = [
  {
    id: "flashpulse",
    method: "POST",
    route: "/api/v1/inventory/reserve",
    title: "FlashPulse Engine — Flash-Sale Inventory System",
    category: "High-Concurrency Backend",
    status: "Redis + Celery",
    statusTint: "amber",
    summary:
      "High-performance flash sale and inventory management backend engineered to handle extreme concurrency without overselling.",
    detail:
      "Combines atomic Redis hash operations, PostgreSQL row-level locking, and idempotent Celery worker pipelines to keep stock counts correct while requests arrive in bursts.",
    stack: ["Django DRF", "PostgreSQL", "Redis", "Celery", "Docker"],
    repo: "https://github.com/RahaibAnas/FlashPulse-Engine---High-Performance-Flash-Sale-Inventory-System",
    capability: "Concurrency & Locking",
  },
  {
    id: "citevault",
    method: "POST",
    route: "/api/v1/rag/ingest",
    title: "CiteVault RAG Engine",
    category: "Django REST + RAG",
    status: "Featured Project",
    statusTint: "cyan",
    summary:
      "Retrieval-Augmented Generation backend built with Django REST Framework, LangChain, and ChromaDB.",
    detail:
      "Asynchronously parses uploaded documents (PDF, DOCX, TXT, MD) via Celery & Redis and answers queries with source citations and conversational memory.",
    stack: ["Django DRF", "LangChain", "ChromaDB", "Celery & Redis", "PostgreSQL"],
    repo: "https://github.com/RahaibAnas/CiteVault-RAG-Engine",
    capability: "Async RAG + Citations",
  },
  {
    id: "contextiq",
    method: "CLI",
    route: "/api/v1/chat/completions",
    title: "ContextIQ Advanced RAG Chatbot",
    category: "Advanced RAG",
    status: "Conversational AI",
    statusTint: "cyan",
    summary:
      "Context-aware Retrieval-Augmented Generation chatbot designed for multi-turn conversational Q&A grounded in retrieved knowledge context.",
    detail:
      "Pairs semantic search with LLM orchestration so every answer stays anchored to retrieved sources across an entire conversation rather than a single turn.",
    stack: ["Python", "RAG", "Vector Search", "LLM APIs"],
    repo: "https://github.com/RahaibAnas/ContextIQ-Advanced-RAG-Chatbot",
    capability: "Context-Aware RAG",
  },
  {
    id: "imdb",
    method: "POST",
    route: "/api/v1/models/train",
    title: "IMDB Sentiment Transformer Fine-Tuning",
    category: "HuggingFace + NLP",
    status: "Transformer Fine-Tuning",
    statusTint: "muted",
    summary:
      "End-to-end NLP fine-tuning pipeline utilizing Hugging Face Transformers and PyTorch on the IMDB movie review dataset.",
    detail:
      "Includes tokenization workflows, training/validation evaluation tracking, and metric visualization with Pandas and Matplotlib.",
    stack: ["HuggingFace", "PyTorch", "Transformers", "Pandas", "Matplotlib"],
    repo: "https://github.com/RahaibAnas/IMDB_fineTuning",
    capability: "Fine-Tuned Model",
  },
  {
    id: "ragcli",
    method: "CLI",
    route: "rag query --docs ./",
    title: "Document-Based RAG CLI Application",
    category: "CLI + Vector Search",
    status: "Terminal AI Tool",
    statusTint: "cyan",
    summary:
      "Command-line Retrieval-Augmented Generation assistant for querying local documents directly from the terminal.",
    detail:
      "Implements recursive text chunking, vector embeddings, similarity retrieval, and context-grounded LLM responses.",
    stack: ["Python CLI", "LangChain", "VectorDB", "LLM APIs"],
    repo: "https://github.com/RahaibAnas/document_based_RAG_cli_application",
    capability: "CLI RAG Pipeline",
  },
];

export const capabilities = [
  {
    index: "01",
    title: "RAG Architecture & VectorDBs",
    body: "Building Retrieval-Augmented Generation (RAG) pipelines. Chunking, embedding, indexing into VectorDBs, and fetching semantic context for dynamic LLM prompts.",
  },
  {
    index: "02",
    title: "RESTful API Design (Django DRF)",
    body: "Structuring clean DRF serializers, viewsets, token-based authentication (JWT), and well-documented OpenAPI endpoints tailored to backend integration.",
  },
  {
    index: "03",
    title: "LangChain & LangGraph Workflows",
    body: "Developing agentic workflows and multi-step reasoning chains with state graphs to create custom AI assistants and intelligent data processing routes.",
  },
  {
    index: "04",
    title: "Background Job Queues (Celery/Redis)",
    body: "Offloading heavy AI inference tasks, batch processing, and vector indexing to background workers using Celery with Redis as the message broker.",
  },
  {
    index: "05",
    title: "Multi-LLM Integration",
    body: "Seamless integration with OpenAI API, Gemini API, and OpenRouter API, alongside fine-tuning Hugging Face models for specific domain workloads.",
  },
  {
    index: "06",
    title: "Data Analysis & Visualization",
    body: "Exploratory data analysis with Pandas, visualizing distributions and evaluation metrics using Matplotlib and Seaborn for data-driven decisions.",
  },
];

export const education = {
  degree: "Bachelor of Science in Maths with Data Science",
  stage: "Under-Graduate / 2029",
  coursework:
    "Data Structures & Algorithms, Object-Oriented Programming (Python, Java), Database Systems (SQL), Operating Systems, Web Engineering, Machine Learning Fundamentals.",
  focus: [
    {
      title: "AI Engineering Specialization",
      meta: "LangChain & HuggingFace",
      body: "Focus on RAG models, Vector DB index optimization, and LLM orchestration.",
      tint: "cyan" as const,
    },
    {
      title: "Backend REST Architecture",
      meta: "Django REST Framework",
      body: "Building scalable APIs, ORM query optimization, and Celery background workers.",
      tint: "amber" as const,
    },
    {
      title: "Containerization",
      meta: "Docker Workflow",
      body: "Packaging multi-container Django, Redis, PostgreSQL, and AI worker environments.",
      tint: "amber" as const,
    },
    {
      title: "Data Analytics",
      meta: "Pandas & Visualization",
      body: "Aggregating datasets and generating visual charts using Matplotlib and Seaborn.",
      tint: "cyan" as const,
    },
  ],
};

export const roleRoutes = [
  { value: "BACKEND_DEV", label: "/role/backend_developer" },
  { value: "AI_ENGINEER", label: "/role/ai_engineer" },
  { value: "PYTHON_REST_API_DEV", label: "/role/python_rest_api_developer" },
  { value: "OTHER", label: "/route/general_inquiry" },
];

export const logLines = [
  { code: "200", verb: "POST", path: "/api/v1/rag/query", ms: "0.12s" },
  { code: "202", verb: "QUEUED", path: "celery: ingest.pdf chunk=512", ms: "0.03s" },
  { code: "200", verb: "GET", path: "/api/v1/projects", ms: "0.04s" },
  { code: "200", verb: "POST", path: "/api/v1/inventory/reserve", ms: "0.08s" },
  { code: "200", verb: "GET", path: "/api/v1/embeddings/search k=8", ms: "0.09s" },
  { code: "201", verb: "POST", path: "/api/v1/contact", ms: "0.21s" },
  { code: "200", verb: "POST", path: "/auth/token refresh", ms: "0.05s" },
  { code: "200", verb: "PING", path: "redis://broker/heartbeat", ms: "0.01s" },
  { code: "200", verb: "GET", path: "/openapi.json", ms: "0.02s" },
];
