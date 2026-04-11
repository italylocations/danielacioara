'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Mostra solo se non già visto in questa sessione
    const seen = sessionStorage.getItem('splash-seen')
    if (seen) {
      setVisible(false)
      return
    }
    sessionStorage.setItem('splash-seen', 'true')

    const fadeTimer = setTimeout(() => setFadeOut(true), 1600)
    const removeTimer = setTimeout(() => setVisible(false), 2100)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0A0A0A',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fadeOut ? 'none' : 'all'
    }}>
      <div style={{
        perspective: '800px',
        perspectiveOrigin: 'center'
      }}>
        <div style={{
          animation: 'coinFlip 1.4s ease-in-out forwards',
          transformStyle: 'preserve-3d'
        }}>
          <Image
            src="/daniela-logo-final.png"
            alt="Daniela Cioara"
            width={320}
            height={320}
            preload
            className="splash-logo"
            style={{ display: 'block', objectFit: 'contain' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes coinFlip {
          0% {
            transform: rotateY(-90deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: rotateY(0deg) scale(1);
          }
          75% {
            transform: rotateY(15deg) scale(1);
          }
          100% {
            transform: rotateY(0deg) scale(1);
          }
        }
        @media (max-width: 767px) {
          .splash-logo { width: 240px !important; height: 240px !important; }
        }
      `}</style>
    </div>
  )
}
