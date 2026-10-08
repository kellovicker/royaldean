// Everything about the hotel lives here.
export const site = {
  name: 'Royal Dean Hotel & Suites',
  phone: '+234 915 606 4729',
  whatsapp: '2349163276188',
  whatsappLabel: '+234 916 327 6188',
  address: 'No. 5, Hon. Amadi Street, Rumueme, off Ada George Road, Port Harcourt, Rivers State',
  mapQuery: 'Royal Dean Hotels and Suites Rumueme Port Harcourt',
  socials: [ // add real URLs
    { label: 'Facebook', short: 'f', href: '#' },
    { label: 'Instagram', short: 'ig', href: '#' },
    { label: 'X', short: 'X', href: '#' },
    { label: 'TikTok', short: 'tt', href: '#' },
  ],
}
const img = (n) => `/images/${n}.jpg`
export const images = { hero: img('hero'), banner: img('rbanner'), lobby: img('lobby'), reception: img('reception'), lounge: img('lounge') }
export const strip = [['♛', 'Luxury Rooms', 'Comfortable & stylish'], ['✦', 'Free Breakfast', 'Included with your stay'], ['◷', '24/7 Electricity', 'Power round the clock'], ['⌖', 'Easy Access', 'Ada George Road, Rumueme']]
export const rooms = [ // confirm current rates with the hotel
  { id: 'royal', name: 'Royal Deluxe', img: img('r1'), price: '₦58,500', desc: 'Comfortable room with a king bed, work desk and private bathroom.' },
  { id: 'super', name: 'Super Deluxe', img: img('r2'), price: '₦82,500', desc: 'More space and comfort, ideal for business or leisure stays.' },
  { id: 'suite', name: 'Suite', img: img('r4'), price: '₦105,500', desc: 'Our most spacious choice for longer or special stays.' },
]
export const facilities = [['♛', 'Comfortable Rooms', 'Air conditioning, flatscreen TV, king bed'], ['✦', 'Free WiFi & Breakfast', 'Included with every stay'], ['⚡', '24/7 Electricity', 'Round-the-clock power supply'], ['◆', 'Fitness Facilities', 'On-site fitness area'], ['▣', 'Event Hall & Meeting Rooms', 'Events, meetings and conferences'], ['◈', 'Parking & Security', 'Parking, CCTV and security guards']]
export const gallery = [['r1', 'Royal Deluxe room'], ['lounge', 'Lounge with river view'], ['r2', 'Super Deluxe room'], ['lobby', 'Hotel lobby'], ['r3', 'Hotel room with city view'], ['r4', 'Suite'], ['rbanner', 'Bedroom detail'], ['reception', 'Reception desk']].map(([f, alt]) => ({ src: img(f), alt }))
export const policies = [['Check-in and check-out', 'Both at 12:00 pm. Valid ID required at check-in.'], ['Families', 'Babies and kids stay free.'], ['House rules', 'No pets. No smoking in rooms. Cash or card accepted.']]
export const reviews = [[5, 'A quiet, cosy hotel in a serene area that is easy to reach. My stay was delightful.'], [5, 'Loved the rooms, especially the penthouse. Spacious, clean and comfortable.'], [4, 'Great value and a calm setting. Reception and bar service could be sharper.']]

export const chat = {
  title: 'Royal Dean Reception',
  greeting: 'Hi! Welcome to Royal Dean Hotel & Suites. How can we help you today?',
  quick: ['Room rates', 'Check-in time', 'Location', 'Book a room'],
  fallback: 'Thanks for your message. Tap "Continue on WhatsApp" below and our team will reply you there.',
  rules: [
    { k: ['rate', 'price', 'cost', 'how much', 'room'], a: 'Per night: Royal Deluxe ₦58,500, Super Deluxe ₦82,500, Suite ₦105,500. Rates may change, so confirm on WhatsApp.' },
    { k: ['check', 'arrive', 'time'], a: 'Check-in and check-out are both at 12:00 pm. Please bring a valid ID.' },
    { k: ['where', 'location', 'address', 'direction'], a: 'We are at No. 5, Hon. Amadi Street, Rumueme, off Ada George Road, Port Harcourt.' },
    { k: ['breakfast', 'food', 'bar', 'restaurant'], a: 'Complimentary breakfast comes with your stay, and we have an on-site bar.' },
    { k: ['event', 'hall', 'meeting', 'wedding', 'conference'], a: 'We have an event hall and meeting rooms. Send your date and guest count on WhatsApp for a quote.' },
    { k: ['wifi', 'light', 'power', 'electric', 'generator'], a: 'Free WiFi and 24/7 electricity are included.' },
    { k: ['kid', 'child', 'baby'], a: 'Babies and kids stay free.' },
    { k: ['book', 'reserve', 'availab'], a: 'Tap "Continue on WhatsApp" and tell us your dates and room type. We will confirm availability.' },
    { k: ['phone', 'call', 'number', 'contact'], a: 'Call +234 915 606 4729 or WhatsApp +234 916 327 6188.' },
  ],
}
