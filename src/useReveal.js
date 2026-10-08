import { useEffect } from 'react'

// Fades elements up as they scroll into view. Only elements below the fold are hidden first,
// so nothing flashes on load. Respects prefers-reduced-motion.
export default function useReveal(selector) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const els = [...document.querySelectorAll(selector)]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => els.includes(c))
      el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 90 + 'ms')
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('reveal'); io.observe(el) }
    })
    return () => io.disconnect()
  }, [])
}
