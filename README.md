# Royal Dean Hotel & Suites (Vite + React)

npm install && npm run dev | npm run build

- Content: src/data.js. Photos: public/images/ (swap in the hotel real photos, same file names)
- Contact form: set VITE_N8N_WEBHOOK in .env (POST JSON: name, email, msg, source). If empty it opens WhatsApp.
- Replace yourdomain.com in index.html, public/robots.txt, public/sitemap.xml
- Add real social URLs in src/data.js; confirm room rates with the hotel

- Live chat: set VITE_N8N_CHAT_WEBHOOK in .env. POST body {sessionId, message, page, source}; respond with JSON {"reply": "..."} (a Respond to Webhook node). Edit quick replies and fallback answers in `chat` in src/data.js.
- Scroll animation: src/useReveal.js (selectors are listed in the useReveal() call in App.jsx).
