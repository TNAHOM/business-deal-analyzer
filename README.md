<p align="center"><strong>Business Deal Analyzer</strong><br/>
An AI-assisted Laravel + Inertia + React application that analyzes your business to surface risks, opportunities, investment recommendations, and actionable solutions.</p>

---

## Overview

Business Deal Analyzer helps founders and operators make informed decisions by:

-   Capturing core business information during onboarding
-   Letting users chat with an AI assistant that triages questions to the right analysis track
-   Running background jobs that use AI agents to generate structured analyses
-   Persisting results so you can review Risks, Opportunities, Solutions, and Investment guidance

Tech stack:

-   Backend: Laravel 12 (PHP 8.2+), Queues, Eloquent
-   Frontend: Inertia + React, Tailwind, Vite
-   AI layer: [maestroerror/laragent] for agent orchestration and structured outputs
-   Routing helpers: Ziggy

Key domain models:

-   `Business` — user’s business profile captured during onboarding
-   `Analysis` — stores AI outputs (`type`: risk, opportunity, solution, investment)
-   `Offer` — tracks investment offers and ties into investment analysis

## Implemented endpoints

Auth scaffolding is provided by Breeze (login/register/verify/etc. under `routes/auth.php`). The core endpoints are:

-   GET `/` — Welcome page
-   GET `/dashboard` — Auth required

-   Onboarding (auth + verified):

    -   GET `/onboarding` → `BusinessController@index` — Redirects to chat if a business already exists; otherwise shows onboarding form
    -   POST `/onboarding` → `BusinessController@store` — Creates `Business` and dispatches all four analysis jobs in background

-   Chat (auth):

    -   GET `/chat` → `ChatController@index` — Inertia chat page
    -   POST `/chat` → `ChatController@store` — Classifies the message using an AI agent and dispatches the corresponding background job

-   Risk & Opportunity (auth):

    -   GET `/analysis/risk-opportunity` → `RiskOpportunityController@index` — Shows latest Risk and Opportunity analyses for the user’s business

-   Solutions (auth):

    -   GET `/solutions` → `SolutionController@index` — Shows latest Solution analysis

-   Offers (auth):
    -   GET `/offers` → `OfferController@index` — List offers and show latest Investment analysis
    -   POST `/offers` → `OfferController@store` — Create a new offer

Profile routes (edit/update/delete) are also available under `/profile` for authenticated users.

## How AI is used (LarAgent)

This project uses [LarAgent](https://github.com/maestroerror/laragent) to define typed agents with strict response schemas and to talk to multiple providers.

Configured providers (`config/laragent.php`):

-   `gemini` (default for this app’s agents) — uses `GEMINI_API_KEY`
-   Additional providers available: `openai`, `groq`, `claude`, `openrouter`, `ollama`

Agents (see `app/AiAgents`):

-   `BusinessAnalyzerAgent` — used by chat to categorize user intent into: risk | opportunity | investment | solution | none
-   `RiskAnalysisAgent` — generates a structured Risk report
-   `OpportunityAnalysisAgent` — generates a structured Opportunity report
-   `InvestementAnalysisAgent` — generates a structured Investment recommendation
-   `SolutionAnalysisAgent` — generates structured problem/solution recommendations

All agents are configured to use provider `gemini` and model `gemini-2.5-flash-lite`. Each agent defines a `responseSchema` to validate and normalize AI output.

Environment variables for the AI layer:

-   `GEMINI_API_KEY` — required for the current default provider
-   Optionally configure other keys if you switch providers: `OPENAI_API_KEY`, `GROQ_API_KEY`, `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`

## Background jobs and queues

Four jobs implement the analysis pipelines (see `app/Jobs`):

-   `RunRiskAnalytics` — uses `RiskAnalysisAgent`; upserts `Analysis` with type `risk`
-   `RunOpportunity` — uses `OpportunityAnalysisAgent`; creates/updates `Analysis` with type `opportunity`
-   `RunInvestment` — uses `InvestementAnalysisAgent`; creates/updates `Analysis` with type `investment`
-   `RunSolution` — uses `SolutionAnalysisAgent`; creates `Analysis` with type `solution`

When are jobs dispatched?

-   Onboarding (`POST /onboarding`) — kicks off all four jobs for the newly created business
-   Chat (`POST /chat`) — categorizes the user’s message and dispatches only the relevant job

Queue setup:

-   Ensure the jobs table is migrated (this repo includes the `create_jobs_table` migration)
-   Set `QUEUE_CONNECTION=database` in `.env`
-   Run a worker: `php artisan queue:listen` or `php artisan queue:work`
-   For local dev, the provided script runs the queue listener automatically (see below)

## Local setup

Prerequisites: PHP 8.2+, Composer, Node 18+, a database (SQLite/MySQL/Postgres), and a Gemini API key.

1. Install dependencies and build assets

```bash
composer install
cp .env.example .env
php artisan key:generate

# Configure your DB in .env, then run migrations
php artisan migrate

# Configure AI provider
# e.g. in .env: GEMINI_API_KEY=your_key_here

npm install
npm run build
```

Tip: you can also run our one-shot setup script:

```bash
composer setup
```

2. Start the app in development

```bash
# This runs PHP server, queue listener, live logs, and Vite in parallel
composer dev
```

Manual alternative:

```bash
php artisan serve
php artisan queue:listen --tries=1
npm run dev
```

## Data model shape (high level)

-   `Business (id, user_id, name, description, sector, financials:json, problems:text)`
-   `Analysis (id, business_id, type:enum[risk|opportunity|solution|investment], data:json)`
-   `Offer (id, business_id, title, investor, amount:int, equity:float, postMoneyValuation:float, offerDate:date, status, type)`

## Frontend pages (Inertia + React)

-   Chat: `resources/js/Pages/Chat/Chat.jsx` → `/chat`
-   Onboarding: `resources/js/Pages/Onboarding/Onboarding.jsx` → `/onboarding`
-   Risk & Opportunity: `resources/js/Pages/Analysis/RiskOpportunity.jsx` → `/analysis/risk-opportunity`
-   Solutions: `resources/js/Pages/Solution/Solution.jsx` → `/solutions`
-   Offers: `resources/js/Pages/Offers/Offers.jsx` → `/offers`

## Example: Chat API

-   Request: `POST /chat` with JSON `{ "message": "Analyze our customer churn risk" }`
-   Response: `{ "user_message": "…", "agent_response": { "aiResponse": "…", "assignTo": "risk", "directUserQuestion": "…" } }`
-   Side effect: enqueues the matching analysis job

## Notes

-   All AI outputs are stored under `Analysis` using a strict schema per analysis type. If a provider returns non-JSON, we store a best-effort `raw` payload.
-   Agents default to Gemini; you can switch providers in `config/laragent.php` and by setting corresponding API keys.
-   For local dev, prefer `composer dev` which also tails logs via Laravel Pail for quick debugging.
