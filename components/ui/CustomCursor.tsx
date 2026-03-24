'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      dot.style.left  = e.clientX + 'px'
      dot.style.top   = e.clientY + 'px'
      setTimeout(() => {
        ring.style.left = e.clientX + 'px'
        ring.style.top  = e.clientY + 'px'
      }, 80)
    }

    const onEnter = () => {
      dot.style.width  = '14px'
      dot.style.height = '14px'
      ring.style.width  = '48px'
      ring.style.height = '48px'
    }

    const onLeave = () => {
      dot.style.width  = '8px'
      dot.style.height = '8px'
      ring.style.width  = '32px'
      ring.style.height = '32px'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: 8, height: 8, background: 'var(--gold)', borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
          width: 32, height: 32,
          border: '1px solid rgba(201,169,110,0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          transition: 'left 0.08s ease-out, top 0.08s ease-out, width 0.3s, height 0.3s',
        }}
      />
    </>
  )
}
