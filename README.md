# Agent Dashboard

Real-time status dashboard for Yoshi and all sub-agents.

## Features
- Dark theme DevOps-style UI
- Auto-refreshes every 30 seconds
- Color-coded status badges (running/completed/failed/stalled/queued)
- Animated pulse on running agents
- Relative timestamps
- Task queue with priority indicators
- Responsive / mobile-friendly

## Data Source
Update `data/agents.json` to reflect current agent state. The dashboard reads it via fetch.

## Deploy
Configured for Vercel — just connect the repo.
