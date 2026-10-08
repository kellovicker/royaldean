import { useEffect, useRef, useState } from 'react'

// Chat widget. Sends messages to an n8n webhook (VITE_N8N_CHAT_WEBHOOK) and shows its reply.
// If the webhook is not set or fails, it answers common questions from the rules in data.js
// and always offers a hand-off to WhatsApp.
const KEY = 'site-chat'
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* storage unavailable */ } }

export default function ChatWidget({ chat, whatsapp }) {
  const [init] = useState(load)
  const [sid] = useState(init?.sid || uid())
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [text, setText] = useState('')
  const [msgs, setMsgs] = useState(init?.msgs?.length ? init.msgs : [{ from: 'bot', text: chat.greeting }])
  const end = useRef(null)
  const input = useRef(null)

  useEffect(() => { save({ sid, msgs: msgs.slice(-40) }) }, [sid, msgs])
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs, busy, open])
  useEffect(() => { if (open) input.current?.focus() }, [open])
  useEffect(() => {
    const f = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', f)
    return () => removeEventListener('keydown', f)
  }, [])

  const local = (q) => {
    const t = q.toLowerCase()
    const r = chat.rules.find((x) => x.k.some((k) => t.includes(k)))
    return r ? r.a : chat.fallback
  }

  async function send(raw) {
    const q = raw.trim()
    if (!q || busy) return
    setText(''); setBusy(true)
    setMsgs((m) => [...m, { from: 'me', text: q }])
    let reply
    const url = import.meta.env.VITE_N8N_CHAT_WEBHOOK
    if (url) {
      try {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: sid, message: q, page: location.href, source: 'website-chat' }) })
        if (r.ok) {
          let d = (r.headers.get('content-type') || '').includes('json') ? await r.json() : await r.text()
          if (Array.isArray(d)) d = d[0]
          reply = typeof d === 'string' ? d : d?.reply || d?.output || d?.message || d?.text
        }
      } catch { /* fall back to local answers */ }
    }
    if (!reply) { await new Promise((ok) => setTimeout(ok, 600)); reply = local(q) }
    setMsgs((m) => [...m, { from: 'bot', text: String(reply) }])
    setBusy(false)
  }

  const asked = msgs.filter((m) => m.from === 'me').slice(-3).map((m) => m.text).join('\n')
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello, I was chatting on your website.' + (asked ? '\n' + asked : ''))}`

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open live chat">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /></svg>
        </button>
      )}
      {open && (
        <section className="chat" role="dialog" aria-label={chat.title}>
          <header>
            <div><strong>{chat.title}</strong><small>Ask us anything</small></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="chat-log" role="log" aria-live="polite">
            {msgs.map((m, i) => <p key={i} className={'cm ' + m.from}>{m.text}</p>)}
            {busy && <p className="cm bot typing" aria-label="Typing"><span /><span /><span /></p>}
            {msgs.length < 2 && <div className="chips">{chat.quick.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}</div>}
            <div ref={end} />
          </div>
          <a className="chat-wa" href={waLink} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>
          <form onSubmit={(e) => { e.preventDefault(); send(text) }}>
            <input ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message" aria-label="Message" maxLength={500} />
            <button aria-label="Send message" disabled={busy || !text.trim()}>➤</button>
          </form>
        </section>
      )}
    </>
  )
}
