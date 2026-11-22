import { Check, ShoppingBag } from 'lucide-react'
import { Avatar, Bar, Button, Collapse, Count, LockScreen, Notification, Phone, Stage, Text, Window, type Act } from '../../kit'
import './kakao-send.css'

// 메신저 알림 발송과 결과 회수. examples/device-pair 골드를 옮김.
// 구도: 운영 화면 창은 위·왼쪽 여백에 고정되어 아래로 잘리고, 휴대폰이 창의 오른쪽 가장자리에 걸침.
// 휴대폰 아래에 깔리는 것은 창의 빈 여백과 막대 목록뿐이고, 버튼과 퍼널은 왼쪽 열에 온전히 남음.
// 비트: 「발송」 클릭 → 발송 수가 굴러 올라감 → 잠금 화면에 알림 도착 → 도달 → 클릭. 한 번 재생, 정지 화면은 세 수치가 채워진 상태.
// 실제 글자: 작업 이름, 버튼, 퍼널 이름 셋과 수치, 알림(앱 이름·본문). 나머지는 막대.
// 좁은 화면: 사이드바를 빼고 퍼널을 세 칸으로 다시 짬. 창은 오른쪽·아래로 잘리고 휴대폰은 퍼널 아래에 섬.

const FUNNEL = [
  { label: '발송', value: 2439 },
  { label: '도달', value: 2358 },
  { label: '클릭', value: 663 },
] as const
const TOTAL = FUNNEL[0].value

const NAV = [52, 44, 60, 40, 56, 48]
const ROWS = [
  [84, 96],
  [64, 72],
  [92, 84],
  [70, 100],
  [78, 64],
  [60, 88],
] as const

// 휴대폰 잠금 화면 배경. 사이트 강조색 계열의 파랑만 씀
const WALL =
  'radial-gradient(120% 70% at 25% 0%, rgba(255, 255, 255, 0.32), transparent 65%), linear-gradient(172deg, #9db7e4 0%, #7e9fdb 52%, #6a8dd2 100%)'

type S = { pressed: boolean; filled: number; notified: boolean }

const initial: S = { pressed: false, filled: 0, notified: false }
const poster: S = { pressed: true, filled: 3, notified: true }

// 버튼의 오른쪽 아래 모서리: 글자를 가리지 않는 자리
const AIM = { at: 'send', x: 0.84, y: 0.76 }

async function script(a: Act<S>) {
  await a.wait(900)
  await a.move(AIM)
  await a.wait(200)
  a.mark('click')
  await a.click(AIM)
  a.put({ pressed: true })
  await a.wait(240)
  a.mark('sent')
  a.put({ filled: 1 })
  // 커서는 누른 자리에 그대로 둠: 버튼이 왼쪽으로 늘어나므로 글자 오른쪽 아래 모서리에 남고, 가만히 있으면 무대가 흐리게 지움
  await a.wait(760)
  a.mark('notify')
  a.put({ notified: true })
  await a.wait(1150)
  a.mark('reach')
  a.put({ filled: 2 })
  await a.wait(1150)
  a.mark('tap')
  a.put({ filled: 3 })
  await a.wait(3000)
}

export default function KakaoSend() {
  return (
    <Stage<S>
      width={900}
      height={480}
      compact={{ below: 600, width: 358, height: 410 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#2457C5"
      cursor={{ at: { wide: { x: 420, y: 330 }, compact: { x: 170, y: 84 } } }}
      className="pk"
    >
      {(s, _rect, layout) => (
        <>
          <Window
            className="pk-win"
            sidebar={layout === 'wide' ? <Sidebar /> : undefined}
            sidebarWidth={132}
            lead={
              <span className="pk-crumbs">
                <Bar w={40} h={6} tone={2} />
                <Bar w={64} h={6} tone={3} />
              </span>
            }
            toolbar={
              layout === 'wide' ? (
                <span className="pk-tools">
                  <Bar w={16} h={16} r={5} tone={2} />
                  <Bar w={16} h={16} r={5} tone={2} />
                  <Avatar plain size={20} />
                </span>
              ) : undefined
            }
          >
            <div className="pk-body">
              <div className="pk-col">
                <div className="pk-head">
                  <div className="pk-heading">
                    <Text className="pk-title">출고 알림</Text>
                    <div className="pk-meta">
                      <Bar w={46} h={6} tone={2} />
                      <Bar w={78} h={6} tone={2} />
                    </div>
                  </div>
                  <Button
                    variant={s.pressed ? 'tertiary' : 'primary'}
                    icon={s.pressed ? <Check size={14} strokeWidth={2.4} /> : undefined}
                    data-target="send"
                    className="pk-send"
                  >
                    {s.pressed ? '발송 완료' : '발송'}
                  </Button>
                </div>

                <div className="pk-funnel">
                  {FUNNEL.map((f, i) => {
                    const on = s.filled > i
                    const zero = f.value.toLocaleString('en-US').replace(/\d/g, '0')
                    return (
                      <div key={f.label} className="pk-step" data-on={on || undefined}>
                        <span className="pk-step__name">
                          <Text className="pk-step__label">{f.label}</Text>
                        </span>
                        <span className="pk-step__track">
                          <span className="pk-step__fill" style={{ width: `${(f.value / TOTAL) * 100}%` }} />
                        </span>
                        <span className="pk-step__num">
                          {/* 비어 있을 때의 0도 Count로 그려 굴러 올라가는 숫자의 끝자리와 같은 자리에 둠 */}
                          <Count value={0} className="pk-step__zero" />
                          <Count className="pk-step__value" value={on ? f.value : 0} format={(n) => (n === 0 ? zero : Math.round(n).toLocaleString('en-US'))} duration={860} stagger={45} />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="pk-list">
                <Bar w={56} h={6} tone={3} className="pk-list__head" />
                {ROWS.map(([name, detail], i) => (
                  <div key={i} className="pk-row">
                    <Bar w={20} h={20} r={10} tone={2} />
                    <Bar w={name} tone={3} />
                    <Bar w={detail} tone={2} />
                    <Bar w={44} h={16} r={8} tone={1} className="pk-row__state" />
                  </div>
                ))}
              </div>
            </div>
          </Window>

          <Phone width={288} frame="pro" dark wallpaper={WALL} className="pk-phone">
            <LockScreen size="satellite" stack="top" date="11월 20일 금요일">
              <Collapse open={s.notified} reveal="drop">
                <Notification
                  icon={<ShoppingBag size={22} strokeWidth={2} />}
                  title="쇼핑몰"
                  body="주문하신 상품이 출고되었습니다"
                  time="지금"
                />
              </Collapse>
            </LockScreen>
          </Phone>
        </>
      )}
    </Stage>
  )
}

function Sidebar() {
  return (
    <nav className="pk-nav">
      {NAV.map((w, i) => (
        <div key={i} className="pk-nav__item" data-active={i === 1 || undefined}>
          <Bar w={12} h={12} r={4} tone={i === 1 ? 4 : 2} />
          <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
        </div>
      ))}
    </nav>
  )
}
