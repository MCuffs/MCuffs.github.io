import { useEffect, useState } from 'react'

const GITHUB = 'https://github.com/MCuffs'
const LINKEDIN = 'https://www.linkedin.com/in/arthurminsu'

export type Block = {
  label: string
  body?: string[]
  points?: string[]
}

export type Tab = {
  id: string
  tab: string
  meta: string
  title: string
  lede: string
  blocks: Block[]
  logo?: { src: string; alt: string; h?: number }
  demo?: React.ComponentType
}

function readHash(tabs: Tab[]) {
  const id = window.location.hash.replace('#', '')
  return tabs.some((t) => t.id === id) ? id : tabs[0].id
}

export default function Detail({
  eyebrow,
  title,
  lede,
  tabs,
  note,
  current,
}: {
  eyebrow: string
  title: string
  lede: string
  tabs: Tab[]
  note?: string
  current: 'planning' | 'ax'
}) {
  const [active, setActive] = useState(() => readHash(tabs))

  useEffect(() => {
    const onHash = () => setActive(readHash(tabs))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [tabs])

  const select = (id: string) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    select(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  const shown = tabs.find((t) => t.id === active) ?? tabs[0]
  const [replay, setReplay] = useState(0)
  const Demo = shown.demo

  return (
    <>
      <header className="pf-top">
        <div className="pf-wrap pf-top__in">
          <a className="pf-top__name" href="/">
            정민수
          </a>
          <nav className="pf-top__nav pf-top__nav--detail">
            <a href="/planning/" aria-current={current === 'planning' ? 'page' : undefined}>
              제품 기획
            </a>
            <a href="/ax/" aria-current={current === 'ax' ? 'page' : undefined}>
              AX 프로젝트
            </a>
            <a href="/">메인</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="pf-wrap pd-hero">
          <p className="pf-eyebrow">{eyebrow}</p>
          <h1 className="pd-hero__title">{title}</h1>
          <p className="pd-hero__lede">{lede}</p>
        </section>

        <div className="pd-tabsbar">
          <div className="pf-wrap">
            <div className="pd-tabs" role="tablist" aria-label={title}>
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={t.id === shown.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={t.id === shown.id ? 0 : -1}
                  className="pd-tab"
                  onClick={() => select(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {t.tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="pf-wrap pd-panel" role="tabpanel" id={`panel-${shown.id}`} aria-labelledby={`tab-${shown.id}`} key={shown.id}>
          <div className="pd-panel__head">
            {shown.logo && <img className="pd-logo" src={shown.logo.src} alt={shown.logo.alt} style={{ height: shown.logo.h ?? 32 }} />}
            <p className="pf-meta">{shown.meta}</p>
            <h2>{shown.title}</h2>
            <p className="pd-panel__lede">{shown.lede}</p>
          </div>
          {Demo && (
            <figure className="pd-demo">
              <Demo key={replay} />
              <figcaption className="pd-demo__note">
                <span>설명용 데모 · 실제 제품 화면이 아니며 수치는 예시입니다</span>
                <button type="button" className="pd-demo__replay" onClick={() => setReplay((n) => n + 1)}>
                  다시 보기
                </button>
              </figcaption>
            </figure>
          )}
          <dl className="pd-blocks">
            {shown.blocks.map((b) => (
              <div key={b.label} className="pd-block">
                <dt>{b.label}</dt>
                <dd>
                  {b.body?.map((p) => <p key={p}>{p}</p>)}
                  {b.points && (
                    <ul>
                      {b.points.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {note && <p className="pd-note">{note}</p>}
          <div className="pf-links pf-links--small pd-back">
            <a href={current === 'planning' ? '/#planning' : '/#projects'}>메인으로 돌아가기</a>
          </div>
        </section>
      </main>

      <footer className="pf-wrap">
        <div className="pf-foot">
          <span>© 2026 정민수</span>
          <span className="pf-links pf-links--small">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}
