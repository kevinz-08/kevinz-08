import { useEffect, useRef } from 'react'
import cvPdf from '../../img/HV-Kevin-Gutierrez.pdf'
import preview from '../../img/track-app-preview.jpeg'
import storePreview from '../../img/tiendah2r-preview.png'
import SmokeShader from './SmokeShader'

export default function Hero({ introComplete = false }) {
  const spotRef = useRef(null)
  const cardRef = useRef(null)

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Spotlight: a dark veil with a soft hole that eases toward the cursor, revealing the smoke
  useEffect(() => {
    const spot = spotRef.current
    if (!spot) return
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 }
    const pos = { ...target }
    let raf = null

    const draw = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      spot.style.setProperty('--mx', `${pos.x}px`)
      spot.style.setProperty('--my', `${pos.y}px`)
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(draw) : null
    }
    const onMove = (e) => {
      const rect = spot.getBoundingClientRect()
      target.x = e.clientX - rect.left
      target.y = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(draw)
    }
    draw()
    if (reduceMotion) return
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  const handleMove = (e) => {
    if (reduceMotion || !cardRef.current) return
    const nx = (e.clientX / window.innerWidth) * 2 - 1
    const ny = (e.clientY / window.innerHeight) * 2 - 1
    cardRef.current.style.transform = `perspective(900px) rotateY(${nx * 10}deg) rotateX(${-ny * 7}deg)`
  }
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      <SmokeShader />

      {/* Spotlight veil */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(circle 420px at var(--mx, 50%) var(--my, 40%), rgba(10,10,10,0) 0%, rgba(10,10,10,0.72) 100%)',
        }}
      />

      {/* Bottom fade — dissolves hero into the next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px',
        background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        padding: '60px clamp(40px, 6vw, 96px) 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(40px, 7vh, 88px)',
      }}>
        {/* Monumental name — outlined so the smoke shows through the letters */}
        <h1
          aria-label="Kevin Santiago"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(64px, 12.4vw, 230px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: 0,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          <OutlineText text="Kevin " active={introComplete} start={0} />
          <OutlineText text="Santiago" active={introComplete} start={6} italic />
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '48px',
        }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '18px',
              opacity: 0,
              animation: introComplete ? 'fadeSlideUp 0.6s ease forwards' : 'none',
              animationDelay: introComplete ? '1.0s' : '0s',
            }}>
              Desarrollador de Software
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 2.4vw, 38px)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 18px',
              opacity: 0,
              animation: introComplete ? 'blurIn 0.8s ease forwards' : 'none',
              animationDelay: introComplete ? '1.2s' : '0s',
            }}>
              Transformo ideas en sistemas que <em style={{ fontWeight: 300 }}>funcionan.</em>
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              margin: '0 0 28px',
              opacity: 0,
              animation: introComplete ? 'blurIn 0.8s ease forwards' : 'none',
              animationDelay: introComplete ? '1.4s' : '0s',
            }}>
              Construyo productos digitales sólidos, escalables y con buena experiencia de usuario,
              del backend al frontend, hago que las ideas cobren vida.
            </p>

            <div style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              opacity: 0,
              animation: introComplete ? 'fadeSlideUp 0.6s ease forwards' : 'none',
              animationDelay: introComplete ? '2.0s' : '0s',
            }}>
              <HeroButton primary href="mailto:kevingadev@gmail.com?subject=Consulta desde el portafolio">
                Trabajemos juntos
              </HeroButton>
              <HeroButton href={cvPdf} download>Descargar CV</HeroButton>
            </div>
          </div>

          {/* Floating devices: laptop + phone, tilting together */}
          <div style={{
            opacity: 0,
            animation: introComplete ? 'fadeSlideUp 0.9s ease forwards' : 'none',
            animationDelay: introComplete ? '1.8s' : '0s',
          }}>
            <div style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
              <div
                ref={cardRef}
                style={{
                  transform: 'perspective(900px) rotateY(0deg) rotateX(0deg)',
                  transition: 'transform 0.25s ease-out',
                  willChange: 'transform',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Laptop src={storePreview} alt="Tienda H2R — detalle de producto" />

                <div style={{
                  width: 'clamp(104px, 9vw, 160px)',
                  marginLeft: 'clamp(24px, 2.4vw, 44px)',
                  marginBottom: '8px',
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 30px 60px -18px rgba(0,0,0,0.9)',
                }}>
                  <img src={preview} alt="Vista previa de una app móvil" style={{ display: 'block', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

// MacBook-style laptop: bezel + notch camera + screen, with a metallic base underneath
function Laptop({ src, alt }) {
  return (
    <div style={{ width: 'clamp(300px, 27vw, 500px)', flexShrink: 0 }}>
      <div style={{
        background: '#0b0b0c',
        borderRadius: '12px 12px 4px 4px',
        padding: '2.2% 2.2% 2.6%',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 40px 90px -30px rgba(0,0,0,0.9)',
        position: 'relative',
      }}>
        {/* camera notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '14%', height: '2.4%', minHeight: '5px',
          background: '#0b0b0c', borderRadius: '0 0 6px 6px',
        }} />
        {/* Screen: image is slightly oversized so the screenshot's scrollbar falls outside the crop */}
        <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '3px', background: '#fff' }}>
          <img
            src={src}
            alt={alt}
            style={{ display: 'block', width: '101.6%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }}
          />
        </div>
      </div>

      {/* base */}
      <div style={{
        height: '11px',
        width: '112%',
        marginLeft: '-6%',
        background: 'linear-gradient(to bottom, #d1d3d8 0%, #8d9097 55%, #4a4c52 100%)',
        borderRadius: '0 0 14px 14px',
        position: 'relative',
        boxShadow: '0 18px 30px -10px rgba(0,0,0,0.8)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '16%', height: '4px', background: 'rgba(0,0,0,0.28)', borderRadius: '0 0 6px 6px',
        }} />
      </div>
    </div>
  )
}

// Per-letter outline text: transparent fill lets the smoke show through; hovering fills a letter
function OutlineText({ text, active, start, italic = false }) {
  return (
    <span style={{ fontStyle: italic ? 'italic' : 'normal', fontWeight: italic ? 300 : 500 }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            opacity: 0,
            animation: active ? 'blurIn 0.7s ease forwards' : 'none',
            animationDelay: active ? `${(start + i) * 0.06}s` : '0s',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

function HeroButton({ href, children, download, primary = false }) {
  const gradientBorder = (intensity) =>
    `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)) padding-box,
     linear-gradient(45deg, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,${intensity}) 100%) border-box`

  const handleEnter = (e) => {
    const s = e.currentTarget.style
    if (primary) {
      s.background = '#ffffff'
      s.transform = 'translateY(-2px)'
      s.boxShadow = '0 8px 28px rgba(255,255,255,0.18)'
      return
    }
    s.background = gradientBorder(0.9)
    s.color = '#ffffff'
    s.boxShadow = '0 0 14px rgba(255,255,255,0.08)'
  }
  const handleLeave = (e) => {
    const s = e.currentTarget.style
    if (primary) {
      s.background = 'rgba(255,255,255,0.92)'
      s.transform = 'translateY(0)'
      s.boxShadow = 'none'
      return
    }
    s.background = gradientBorder(0.55)
    s.color = 'rgba(255,255,255,0.9)'
    s.boxShadow = 'none'
  }

  return (
    <a
      href={href}
      download={download || undefined}
      style={{
        display: 'inline-block',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        padding: '13px 30px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'background 200ms, color 200ms, box-shadow 200ms, transform 200ms',
        letterSpacing: '0.02em',
        cursor: 'pointer',
        color: primary ? '#0a0a0a' : 'rgba(255,255,255,0.9)',
        border: '1px solid transparent',
        background: primary ? 'rgba(255,255,255,0.92)' : gradientBorder(0.55),
        boxShadow: 'none',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  )
}

function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      whiteSpace: 'nowrap',
      zIndex: 3,
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        Scroll down
      </span>

      <div style={{ width: '110px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />

      {/* Mouse icon */}
      <div style={{
        width: '20px',
        height: '32px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.28)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '2px',
          height: '6px',
          borderRadius: '1px',
          background: 'rgba(255,255,255,0.55)',
          animation: 'scrollBob 1.5s ease-in-out infinite',
        }} />
      </div>

      <div style={{ width: '110px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />

      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        to see projects
      </span>
    </div>
  )
}
