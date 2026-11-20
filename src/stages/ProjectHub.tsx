import { Badge, Bar, Caret, Collapse, Prompt, Stage, Window, type Act } from '../kit'
import './project-hub.css'

// 프로젝트 허브: 터미널에서 동기화 명령을 돌리면 커뮤니케이션 로그 맨 위에 새 기록 세 줄이 들어오는 장면.
// 레이아웃: 하단 블리드 + 왼쪽 위성(터미널)이 창의 사이드바 위에 반쯤 걸침(examples/static-card 구성).
// 비트: 명령 입력 → 결과 한 줄 → 새 줄이 위에서부터 하나씩 열리며 아래 줄을 밀어냄 → 유지.
// 실제 글자: 목록 제목, 새 기록 세 줄(출처 배지·제목), 터미널 명령과 결과. 고객사 이름은 넣지 않음.

const CMD = 'pm.py sync-slack'
const NEW = [
  { source: 'Slack', tone: 'accent' as const, title: '대시보드 권한 요청' },
  { source: '세일즈맵', tone: 'success' as const, title: '계약 단계 변경' },
  { source: '미팅', tone: 'neutral' as const, title: '킥오프 미팅 정리' },
]
const OLD = [
  [62, 96, 30],
  [52, 120, 30],
  [70, 84, 30],
  [58, 108, 30],
]

type S = { cmd: string; done: boolean; rows: number }

const initial: S = { cmd: '', done: false, rows: 0 }
const poster: S = { cmd: CMD, done: true, rows: NEW.length }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('type')
  await a.type('cmd', CMD, { interval: 55 })
  await a.wait(500)
  a.mark('done')
  a.put({ done: true })
  await a.wait(500)
  a.mark('rows')
  for (let i = 1; i <= NEW.length; i++) {
    a.put({ rows: i })
    await a.wait(380)
  }
  await a.wait(2800)
}

export default function ProjectHub() {
  return (
    <Stage<S>
      width={600}
      height={360}
      compact={{ below: 600, width: 358, height: 350 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#2457C5"
      className="ph"
    >
      {(s, _rect, layout) => (
        <>
          <Window
            className="ph-win"
            sidebarWidth={layout === 'compact' ? 64 : 170}
            sidebar={
              <nav className="ph-nav">
                {(layout === 'compact' ? [0, 0, 0, 0] : [64, 52, 72, 46]).map((w, i) => (
                  <div key={i} className="ph-nav-item" data-on={i === 2 || undefined}>
                    <Bar w={12} h={12} r={3} tone={i === 2 ? 4 : 2} />
                    {w > 0 && <Bar w={w} h={6} r={3} tone={i === 2 ? 4 : 2} />}
                  </div>
                ))}
              </nav>
            }
            title="커뮤니케이션 로그"
          >
            <div className="ph-main">
              <div className="ph-list">
                {NEW.map((r, i) => (
                  <Collapse key={r.title} open={s.rows >= NEW.length - i}>
                    <div className="ph-row ph-row--new">
                      <Badge tone={r.tone} className="ph-badge">
                        {r.source}
                      </Badge>
                      <span className="ph-title">{r.title}</span>
                      <Bar w={28} h={6} r={3} tone={2} className="ph-date" />
                    </div>
                  </Collapse>
                ))}
                {OLD.map(([b, t, d], i) => (
                  <div key={i} className="ph-row">
                    <Bar w={b!} h={18} r={9} tone={1} />
                    <Bar w={t!} h={7} r={3.5} tone={2} />
                    <Bar w={d!} h={6} r={3} tone={1} className="ph-date" />
                  </div>
                ))}
              </div>
            </div>
          </Window>

          <Window chrome="terminal" title="minsu-pm — zsh" className="ph-term">
            <div className="ph-term-body">
              <Prompt path="~/minsu-pm">
                {s.cmd}
                {!s.done && <Caret />}
              </Prompt>
              <div className="ok ph-out" data-on={s.done || undefined}>
                ✓ 로그 3건 · 이슈 1건 반영
              </div>
            </div>
          </Window>
        </>
      )}
    </Stage>
  )
}
