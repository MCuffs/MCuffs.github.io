import { SlidersHorizontal } from 'lucide-react'
import { Badge, Bar, Button, Card, Chart, Roll, Segmented, Stage, Tabs, Text, Window, type Act } from '../../kit'
import './agent-impact.css'

// 제품 기획 상세: AI 에이전트 성과 분석. examples/table-edit 골드(값이 굴러 바뀜)의 구도와
// 박자를 옮기고, 큰 값과 작은 추세선은 chart-scrub에서 빌림.
// 비트: 지표를 「7일 리텐션」으로 바꿈 → 두 그룹의 값이 굴러 바뀜 → 「이탈 직전 대화」 탭 →
// 대화 유형 막대가 차례로 자람 → 평소보다 크게 튀는 한 줄이 강조됨. 한 번 재생, 정지 화면이 결과.
// 실제 글자: 창 제목, 탭 둘, 지표 둘, 그룹 이름 둘, 유형 셋, 강조 배지. 큰 숫자는 한 쌍. 나머지는 막대.

type S = { metric: 0 | 1; tab: 0 | 1; bars: number; spike: boolean }

const TABS = ['성과 비교', '이탈 직전 대화']
const METRICS = ['결제 전환', '7일 리텐션']

// 그룹마다 지표별 값과 추세(모두 예시)
const GROUPS = [
  {
    name: '대화한 유저',
    values: ['6.8%', '41%'],
    trend: [
      [46, 49, 47, 52, 55, 53, 58, 61, 59, 65, 67, 70],
      [62, 60, 64, 62, 66, 65, 69, 67, 71, 70, 73, 74],
    ],
  },
  {
    name: '대화하지 않은 유저',
    values: ['4.1%', '33%'],
    trend: [
      [41, 43, 40, 42, 39, 42, 40, 43, 41, 40, 42, 41],
      [58, 59, 56, 57, 54, 56, 53, 54, 51, 53, 50, 51],
    ],
  },
]

// 이탈 직전 대화의 유형 분포: now는 이번 분포, usual은 평소 분포(눈금). 아래 세 줄은 막대
const ROWS: { name?: string; w?: number; now: number; usual: number }[] = [
  { name: '환불 문의', now: 0.86, usual: 0.27 },
  { name: '결제 오류', now: 0.49, usual: 0.41 },
  { name: '추천 불만족', now: 0.35, usual: 0.4 },
  { w: 58, now: 0.27, usual: 0.31 },
  { w: 44, now: 0.19, usual: 0.23 },
  { w: 66, now: 0.12, usual: 0.16 },
]
const SPIKE = 0

const initial: S = { metric: 0, tab: 0, bars: 0, spike: false }
const poster: S = { metric: 1, tab: 1, bars: ROWS.length, spike: true }

async function script(a: Act<S>) {
  await a.wait(1000)
  a.mark('metric')
  // 글자를 가리지 않도록 조각의 오른쪽 여백을 누름
  await a.move({ at: 'm-ret', x: 0.9, y: 0.66 })
  await a.wait(150)
  await a.click({ at: 'm-ret', x: 0.9, y: 0.66 })
  a.put({ metric: 1 })
  await a.wait(2000)
  a.mark('tab')
  await a.move({ at: 't-churn', x: 0.94, y: 0.8 })
  await a.wait(150)
  await a.click({ at: 't-churn', x: 0.94, y: 0.8 })
  a.put({ tab: 1 })
  // 손은 빈 곳으로 비켜나고, 그 사이 막대가 위에서부터 자람
  a.move({ at: 'rest-after', x: 0.5, y: 0.5 }, { duration: 600 })
  await a.wait(380)
  a.mark('bars')
  await a.stagger(ROWS, (_row, i) => a.put({ bars: i + 1 }), 90)
  await a.wait(1000)
  a.mark('spike')
  a.put({ spike: true })
  await a.wait(2600)
}

// 창 옆 메뉴: 글자 없이 막대만. 넓은 구도에서만 보임
function Side() {
  const item = (w: number, on?: boolean) => (
    <div key={w} className="pa-nav" data-on={on || undefined}>
      <Bar w={12} h={12} r={4} tone={on ? 5 : 3} />
      <Bar w={w} h={7} tone={on ? 5 : 3} />
    </div>
  )
  return (
    <div className="pa-side">
      {[62, 78, 54].map((w) => item(w))}
      <Bar w={38} h={6} tone={2} className="pa-side__group" />
      {item(70, true)}
      {[48, 74, 58].map((w) => item(w))}
      <Bar w={46} h={6} tone={2} className="pa-side__group" />
      {[66, 52].map((w) => item(w))}
    </div>
  )
}

export default function AgentImpact() {
  return (
    <Stage<S>
      width={900}
      height={480}
      compact={{ below: 600, width: 358, height: 342 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#2457C5"
      cursor={{ at: { at: 'rest', x: 0.5, y: 0.5 } }}
      className="pa"
    >
      {(s, _rect, layout) => {
        const wide = layout === 'wide'
        const chart = wide ? { width: 266, height: 56 } : { width: 120, height: 28 }
        return (
          <Window
            title="에이전트 성과"
            sidebar={wide ? <Side /> : undefined}
            sidebarWidth={164}
            toolbar={<Button variant="ghost" size="small" icon={<SlidersHorizontal size={14} strokeWidth={2} />} aria-label="필터" />}
            className="pa-win"
            body={{ className: 'pa-body' }}
          >
            <Tabs className="pa-tabs" items={TABS} value={s.tab} targets={['t-compare', 't-churn']} />
            <span className="pa-rest" data-target="rest" />
            <span className="pa-rest pa-rest--after" data-target="rest-after" />
            <div className="pa-panes">
              {/* 성과 비교: 두 그룹의 값이 나란히, 지표를 바꾸면 그 자리에서 굴러 바뀜 */}
              <div className="pa-pane" data-on={s.tab === 0 || undefined}>
                <div className="pa-controls">
                  <Segmented items={METRICS} value={s.metric} targets={['m-pay', 'm-ret']} />
                </div>
                <div className="pa-cards">
                  {GROUPS.map((g, i) => (
                    <Card key={g.name} pad={wide ? 'medium' : 'small'} gap={wide ? 14 : 10} className="pa-card" data-lead={i === 0 || undefined}>
                      <div className="pa-card__head">
                        <Text className="pa-card__label">{g.name}</Text>
                        <div className="pa-card__value">
                          <Roll stagger={30} delay={i * 90}>
                            {g.values[s.metric]!}
                          </Roll>
                        </div>
                      </div>
                      <div className="pa-card__chart">
                        <Chart data={g.trend[s.metric]!} max={80} width={chart.width} height={chart.height} area={i === 0} />
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="pa-table">
                  {[
                    [96, 44, 52, 36],
                    [124, 40, 60, 30],
                    [88, 48, 44, 38],
                    [108, 36, 56, 32],
                  ].map((row, r) => (
                    <div key={r} className="pa-tr" data-head={r === 0 || undefined}>
                      {row.map((w, c) => (
                        <Bar key={c} w={r === 0 ? Math.round(w * 0.6) : w} h={r === 0 ? 6 : 7} tone={r === 0 ? 2 : c === 0 ? 3 : 2} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 이탈 직전 대화: 유형별 막대와 평소 분포 눈금. 한 줄만 눈금을 크게 넘음 */}
              <div className="pa-pane" data-on={s.tab === 1 || undefined}>
                <div className="pa-caption">
                  <Bar w={128} h={7} tone={3} />
                  <Bar w={56} h={7} tone={2} />
                </div>
                <div className="pa-list">
                  {ROWS.map((row, i) => (
                    <div key={i} className="pa-row" data-spike={(s.spike && i === SPIKE) || undefined}>
                      <span className="pa-row__name">{row.name ? <Text>{row.name}</Text> : <Bar w={row.w!} h={7} tone={3} />}</span>
                      <span className="pa-track">
                        <span className="pa-tick" style={{ left: `${row.usual * 100}%` }} />
                        <span className="pa-fill" data-on={s.bars > i || undefined} style={{ ['--v' as string]: `${row.now * 100}%` }} />
                      </span>
                      <span className="pa-note">{i === SPIKE && <Badge tone="accent">평소의 3.2배</Badge>}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Window>
        )
      }}
    </Stage>
  )
}
