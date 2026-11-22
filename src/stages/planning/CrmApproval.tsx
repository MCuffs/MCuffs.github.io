import { SquarePen } from 'lucide-react'
import { Bar, Button, Card, Collapse, Field, Icon, Row, Stage, Text, Window, type Act, type IconName, type Layout } from '../../kit'
import './crm-approval.css'

// AI CRM: 에이전트가 준비하고 사람이 승인하는 장면. examples/ai-cards 골드를 옮김.
// 비트: 요청 입력 → 전송 → 대화 안에 캠페인 초안 카드가 열림 → 대상·메시지·발송 시각이
// 위에서부터 채워짐 → 승인 버튼이 강조색으로 → 커서가 승인 → 같은 버튼이 「발송 예약됨」.
// 한 번 재생, 정지 화면이 결과.
//
// 카드가 읽히게 하는 것 (골드에서 가져온 규칙):
// - 카드는 답변의 일부. 대화 안에서 자기 높이로 열리고(Collapse drop) 지난 대화가 위로 밀려남.
// - 값은 자기 자리의 골격 막대에서 글자로 바뀜(loading 골드). 줄 높이와 폭이 같아 아무것도 움직이지 않음.
// - 확정은 카드 자신의 버튼에서. 라벨과 아이콘이 같은 Button 안에서 바뀌고 다른 요소로 바꿔 끼우지 않음.
// - 버튼은 카드 오른쪽 끝에 붙어 왼쪽으로 자람: 누른 자리의 커서가 새 라벨을 덮지 않음.
//
// 실제 글자: 요청, 대상·메시지·발송 세 줄(라벨과 값), 버튼, 창 제목, 입력란 안내 문구.
// 사이드바와 지난 대화는 막대.

const Q = '7일 동안 접속하지 않은 고객에게 복귀 쿠폰 보내 줘'

// 값마다 골격 막대는 글자 폭과 비슷하게
const ROWS = [
  { label: '대상', value: '7일 미접속 고객 12,480명', bar: 150 },
  { label: '메시지', value: '3,000원 복귀 쿠폰이 도착했어요', bar: 178 },
  { label: '발송', value: '내일 오전 10시', bar: 84 },
]

// 지난 대화: 질문 말풍선 폭, 답변 두 줄 폭. 맨 위 턴은 답변 두 줄만 보이고,
// 좁은 화면은 한 턴을 덜 둠
const PAST: [number, string, string][] = [
  [170, '78%', '52%'],
  [150, '72%', '46%'],
  [190, '84%', '58%'],
  [130, '66%', '40%'],
]

const NAV: { icon: IconName; w: number }[] = [
  { icon: 'home', w: 34 },
  { icon: 'send', w: 52 },
  { icon: 'user', w: 44 },
  { icon: 'calendar', w: 60 },
]
// 여덟 줄: 마지막 줄이 무대 아래로 나가되 창의 아래 끝보다는 안쪽에서 끝남
const HISTORY = [96, 72, 112, 84, 104, 66, 92, 78]

type S = { draft: string; sent: boolean; card: boolean; filled: number; done: boolean }

const initial: S = { draft: '', sent: false, card: false, filled: 0, done: false }
const poster: S = { draft: '', sent: true, card: true, filled: ROWS.length, done: true }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('type')
  await a.type('draft', Q, { interval: 55 })
  await a.wait(450)
  a.mark('send')
  a.put({ sent: true, draft: '' })
  await a.wait(700)
  a.mark('card')
  a.put({ card: true })
  await a.wait(1000)
  a.mark('fill')
  for (let i = 1; i <= ROWS.length; i++) {
    a.put({ filled: i })
    await a.wait(i === ROWS.length ? 800 : 620)
  }
  a.mark('approve')
  await a.click({ at: 'approve', x: 0.84, y: 0.68 })
  a.put({ done: true })
  await a.wait(500)
  a.mark('done')
  await a.move(a.layout === 'compact' ? { at: 'card', x: 0.24, y: 0.74 } : { at: 'card', x: 1.14, y: 0.8 })
  await a.wait(2600)
}

function Scene({ s, layout }: { s: S; layout: Layout }) {
  const ready = s.filled >= ROWS.length
  const toolbar = <Button variant="ghost" size="small" icon={<SquarePen size={14} strokeWidth={2} />} aria-label="새 대화" />
  const body = (
    <div className="pc-body">
      <div className="pc-thread">
        {/* 지난 대화는 막대: 처음에는 창을 채우고, 카드가 열리면 위로 밀려나며 흐려짐 */}
        {(layout === 'compact' ? PAST.slice(1) : PAST).map(([q, a1, a2], i) => (
          <div className="pc-past" key={i}>
            {i > 0 && <Bar w={q} h={30} r={15} tone={1} className="pc-past-q" />}
            <Bar w={a1} h={8} r={4} tone={2} />
            <Bar w={a2} h={8} r={4} tone={2} />
          </div>
        ))}
        <Collapse open={s.sent} reveal="drop" from="below">
          <div className="pc-q">
            <Text>{Q}</Text>
          </div>
        </Collapse>
        <Collapse open={s.card} reveal="drop">
          <Card className="pc-card" pad={layout === 'compact' ? 'small' : 'medium'} gap={layout === 'compact' ? 14 : 16} data-target="card">
            <div className="pc-rows">
              {ROWS.map((r, i) => (
                <div className="pc-row" key={r.label} data-ready={s.filled > i || undefined}>
                  <span className="pc-label">{r.label}</span>
                  <span className="pc-slot">
                    <Bar w={r.bar} h={8} r={4} tone={2} className="pc-sk" />
                    <span className="pc-value">{r.value}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="pc-foot">
              <Button
                className="pc-approve"
                variant={ready ? 'primary' : 'tertiary'}
                size="large"
                data-target="approve"
                data-wait={!ready || undefined}
                data-done={s.done || undefined}
                icon={s.done ? <Icon name="check" size={16} stroke={2.4} /> : undefined}
              >
                {s.done ? '발송 예약됨' : '승인'}
              </Button>
            </div>
          </Card>
        </Collapse>
      </div>
      <Field className="pc-composer" value={s.draft} placeholder="캠페인을 요청하세요" focused={!s.sent} />
    </div>
  )

  // 좁은 화면은 다시 짠 구도: 사이드바 없이 대화 창만
  if (layout === 'compact') {
    return (
      <Window title="CRM 에이전트" className="pc-win" toolbar={toolbar}>
        {body}
      </Window>
    )
  }

  return (
    <Window
      title="CRM 에이전트"
      className="pc-win"
      toolbar={toolbar}
      sidebarWidth={188}
      sidebar={
        <div className="pc-side">
          {NAV.map((n) => (
            <Row key={n.icon} pad={8} lead={<Icon name={n.icon} filled size={14} />} title={<Bar w={n.w} tone={3} />} />
          ))}
          <Bar w={40} h={5} tone={3} className="pc-side-label" />
          {HISTORY.map((w, i) => (
            <Row key={i} pad={8} selected={i === 0} title={<Bar w={w} tone={i === 0 ? 4 : 2} />} />
          ))}
        </div>
      }
    >
      {body}
    </Window>
  )
}

export default function CrmApproval() {
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
      cursor={{ at: { wide: { x: 760, y: 384 }, compact: { x: 304, y: 258 } } }}
      className="pc"
    >
      {(s, _rect, layout) => <Scene s={s} layout={layout} />}
    </Stage>
  )
}
