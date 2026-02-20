# Research & Findings

## Discoveries
- `pdfjs-dist` requires a worker source URL which is currently fetched from a CDN.
- `mammoth` handles .docx to raw text conversion efficiently in-browser.
- AI Generation requires structured JSON output to map directly to the `TestCase` interface.

## Constraints
- Browser-only environment: Cannot run server-side logic (e.g., direct URL scraping might be blocked by CORS).
- LLM API limits: Must handle broad requirement sets without exceeding context windows.

## Design Decisions
- Adopt **A.N.T. 3-layer architecture** for component-service separation.
- Use **B.L.A.S.T. protocol** for development lifecycle.
