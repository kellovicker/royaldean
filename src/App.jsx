import { useEffect, useState } from 'react'
import useReveal from './useReveal.js'
import ChatWidget from './ChatWidget.jsx'
import { chat, site, images, strip, rooms, facilities, gallery, policies, reviews } from './data.js'

const wa = (m) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(m)}`
const ext = { target: '_blank', rel: 'noopener noreferrer' }
const navLinks = [['home', 'Home'], ['rooms', 'Rooms'], ['restaurant', 'Dining'], ['facilities', 'Facilities'], ['gallery', 'Gallery'], ['about', 'About'], ['contact', 'Contact']]

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(scrollY > 40)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <header className={'nav' + (solid || open ? ' solid' : '')}>
      <a className="logo" href="#home"><i>♛</i>Royal Dean<small>HOTEL &amp; SUITES · PORT HARCOURT</small></a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      <nav className={'menu' + (open ? ' open' : '')}>
        {navLinks.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="btn sm" href={wa('Hello, I would like to book a room.')} {...ext}>Book Now</a>
      </nav>
    </header>
  )
}

const Ban = ({ img, eyebrow, title, text }) => (
  <div className="ban" style={{ backgroundImage: `linear-gradient(90deg,#0a1428 35%,rgba(10,20,40,.3)),url(${img})` }}>
    <div className="wrap">{eyebrow && <p className="eb">{eyebrow}</p>}<h2>{title}</h2><p>{text}</p></div>
  </div>
)

function Rooms() {
  const [f, setF] = useState('all')
  const tabs = [['all', 'All Rooms'], ...rooms.map((r) => [r.id, r.name])]
  return (
    <section id="rooms">
      <Ban img={images.banner} title="Our Rooms" text="Comfortable spaces. Thoughtful details. A stay you'll love." />
      <div className="wrap sec">
        <div className="tabs">{tabs.map(([id, l]) => <button key={id} className={'tab' + (f === id ? ' on' : '')} onClick={() => setF(id)}>{l}</button>)}</div>
        <div className="rooms">
          {rooms.filter((r) => f === 'all' || r.id === f).map((r) => (
            <article className="room" key={r.id}>
              <img src={r.img} alt={`${r.name} at ${site.name}`} loading="lazy" />
              <div className="rb">
                <h3>{r.name}</h3><p className="muted">{r.desc}</p>
                <p className="am">1 King Bed &nbsp;·&nbsp; WiFi &nbsp;·&nbsp; AC</p>
                <p className="pr"><strong>{r.price}</strong> / night</p>
                <a className="btn full" href={wa(`Hello, I would like to book the ${r.name}.`)} {...ext}>Book Now</a>
              </div>
            </article>
          ))}
        </div>
        <p className="muted" style={{ marginTop: '1.2rem' }}>Rates are per night and may change. Confirm current prices on WhatsApp.</p>
      </div>
    </section>
  )
}

function Contact() {
  const [msg, setMsg] = useState('')
  async function submit(e) {
    e.preventDefault()
    const form = e.target
    const d = Object.fromEntries(new FormData(form))
    const url = import.meta.env.VITE_N8N_WEBHOOK
    try {
      if (!url) throw new Error('no webhook')
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...d, source: 'website' }) })
      if (!r.ok) throw new Error('failed')
      setMsg('Thanks. We will reply shortly.'); form.reset()
    } catch {
      window.open(wa(`Enquiry from website\nName: ${d.name}\nEmail: ${d.email || '-'}\n${d.msg}`), '_blank', 'noopener')
      setMsg('Opening WhatsApp with your message.')
    }
  }
  const q = encodeURIComponent(site.mapQuery)
  return (
    <section id="contact">
      <Ban img={images.reception} title="Get in Touch" text="We'd love to hear from you. Send us a message or find us at our location below." />
      <div className="wrap sec">
        <div className="ct">
          <div className="cl">
            <div><h4>Our Location</h4><p>{site.address}</p></div>
            <div><h4>Phone</h4><p><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a><br /><a href={`tel:+${site.whatsapp}`}>{site.whatsappLabel} (WhatsApp)</a></p></div>
            <div><h4>Reception</h4><p>Open 24 hours for bookings and enquiries</p></div>
            <div><h4>Follow Us</h4><div className="soc">{site.socials.map((s) => <a key={s.label} href={s.href} aria-label={s.label} {...ext}>{s.short}</a>)}</div></div>
          </div>
          <form className="form" onSubmit={submit}>
            <h4>Send Us a Message</h4>
            <label>Full Name<input name="name" placeholder="Your name" required autoComplete="name" /></label>
            <label>Email Address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" /></label>
            <label>Message<textarea name="msg" rows="4" placeholder="How can we help you?" required /></label>
            <button className="btn full">Send Message</button>
            <p role="status" className="muted">{msg}</p>
          </form>
          <div className="side"><img src={images.lounge} alt="Hotel lounge with river view" /></div>
        </div>
        {import.meta.env.VITE_EMBED_MAP !== 'false' && <iframe title="Hotel location" loading="lazy" src={`https://www.google.com/maps?q=${q}&output=embed`} />}
        <div className="map">
          <div><h4>Find us</h4><p className="muted">{site.address}</p></div>
          <div className="acts">
            <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${q}`} {...ext}>Open in Google Maps</a>
            <a className="btn ghost dk" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} {...ext}>Get directions</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useReveal('.tabs, .room, .two > *, .fac, .vals > div, .rev, .cl > div, .form, .side, .map, #facilities h2, #gallery h2, .dark h2, .gal img')
  return (
    <div id="home">
      <Nav />
      <section className="hero">
        <div className="wrap">
          <p className="eb">WELCOME TO</p><h1>{site.name}</h1>
          <p className="lead">Comfortable rooms and warm service in the heart of Port Harcourt.</p>
          <div className="acts"><a className="btn" href={wa('Hello, I would like to book a stay.')} {...ext}>Book Your Stay</a><a className="btn ghost" href="#rooms">Explore Rooms</a></div>
        </div>
        <div className="strip"><div className="wrap">{strip.map(([i, t, s]) => <div className="si" key={t}><span className="ic">{i}</span><div>{t}<small>{s}</small></div></div>)}</div></div>
      </section>
      <Rooms />
      <section id="restaurant" className="alt sec"><div className="wrap two">
        <img src={images.lounge} alt="Hotel lounge with river view" style={{ aspectRatio: '4/3' }} />
        <div><p className="eb" style={{ color: 'var(--gold)' }}>BREAKFAST &amp; BAR</p><h2>Start the day well</h2>
          <p>Complimentary breakfast comes with your stay, and the on-site bar is ready when you want to unwind with friends or colleagues.</p>
          <a className="btn" href={wa('Hello, I have a question about the bar and breakfast.')} {...ext}>Ask on WhatsApp</a></div>
      </div></section>
      <section id="facilities" className="sec"><div className="wrap"><h2>Facilities</h2>
        <div className="facs">{facilities.map(([i, t, d]) => <div className="fac" key={t}><span className="ic">{i}</span><div><h4>{t}</h4><p className="muted">{d}</p></div></div>)}</div></div></section>
      <section id="gallery" className="alt sec"><div className="wrap"><h2>Gallery</h2>
        <div className="gal">{gallery.map((g) => <img key={g.src} src={g.src} alt={g.alt} loading="lazy" />)}</div></div></section>
      <section id="about">
        <Ban img={images.lobby} eyebrow="ABOUT US" title="More Than Just a Stay" text="We're here to make your time with us exceptional." />
        <div className="wrap sec two">
          <img src={images.lounge} alt="Hotel lounge with river view" style={{ aspectRatio: '1/1' }} />
          <div><h2>Our Story</h2>
            <p>{site.name} sits on Hon. Amadi Street in Rumueme, off Ada George Road, in a quiet part of Port Harcourt. With more than 40 rooms, a bar, an event hall and meeting rooms, it suits business trips, family stays and events. The airport is about 37 minutes away by road.</p>
            <div className="vals">{policies.map(([t, d]) => <div key={t}><h4>{t}</h4><p className="muted">{d}</p></div>)}</div></div>
        </div>
      </section>
      <section className="dark sec"><div className="wrap"><h2>What guests say</h2>
        <div className="revs">{reviews.map(([s, t], i) => <blockquote className="rev" key={i}><div className="st" aria-label={`${s} out of 5`}>{'★'.repeat(s)}{'☆'.repeat(5 - s)}</div><p>{t}</p><cite>Guest review</cite></blockquote>)}</div></div></section>
      <Contact />
      <footer>© {new Date().getFullYear()} {site.name}, Port Harcourt. All rights reserved.</footer>
      <ChatWidget chat={chat} whatsapp={site.whatsapp} />
      <a className="fab" href={wa('Hello, I would like to make an enquiry.')} {...ext} aria-label="Chat on WhatsApp">WA</a>
    </div>
  )
}
