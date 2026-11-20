import { Bar, Button, Field, Stage, Window, type Act } from '../kit'
import './shuffla-studio.css'

// Shuffla 스튜디오: 요청 한 줄을 넣고 생성하면 카드뉴스 세 장이 자리를 잡는 장면.
// 레이아웃: 하단 블리드(창이 위·좌우 여백, 아래로 잘림). 잘리는 곳은 카드 아래 캡션 막대뿐.
// 비트: 요청 입력 → 생성 클릭 → 버튼이 「생성 중」 → 카드가 왼쪽부터 골격에서 완성본으로 → 「완료」 유지.
// 실제 글자: 주소, 요청, 버튼, 카드 제목 세 개.

const PROMPT = '가을 신메뉴 카드뉴스 3장'
const CARDS = [
  { tone: 'cream', kicker: 'NEW', title: ['가을', '신메뉴'] },
  { tone: 'green', kicker: '01', title: ['단호박', '크림빵'] },
  { tone: 'orange', kicker: '02', title: ['10월', '한정 판매'] },
] as const

type S = { draft: string; phase: 'idle' | 'busy' | 'done'; ready: number }

const initial: S = { draft: '', phase: 'idle', ready: 0 }
const poster: S = { draft: PROMPT, phase: 'done', ready: 3 }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('type')
  await a.type('draft', PROMPT, { interval: 70 })
  await a.wait(300)
  await a.move({ at: 'generate', x: 0.84, y: 0.62 })
  await a.wait(150)
  a.mark('click')
  await a.click({ at: 'generate', x: 0.84, y: 0.62 })
  a.put({ phase: 'busy' })
  await a.wait(1400)
  a.mark('resolve')
  for (let i = 1; i <= CARDS.length; i++) {
    a.put({ ready: i })
    await a.wait(320)
  }
  a.put({ phase: 'done' })
  await a.move({ at: 'generate', x: 0.6, y: 2.6 }, { duration: 700 })
  await a.wait(2400)
}

const LABEL = { idle: '생성', busy: '생성 중', done: '완료' } as const

export default function ShufflaStudio() {
  return (
    <Stage<S>
      width={600}
      height={340}
      compact={{ below: 600, width: 358, height: 270 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#ff6200"
      cursor={{ at: { wide: { x: 560, y: 320 }, compact: { x: 330, y: 250 } } }}
      className="sh"
    >
      {(s) => (
        <WindowScene s={s} />
      )}
    </Stage>
  )
}


function WindowScene({ s }: { s: S }) {
  return (
    <Window url="shuffla.io/studio" urlShape="pill" className="sh-win">
      <div className="sh-body">
        <div className="sh-ask">
          <Field className="sh-field" value={s.draft} placeholder="만들 카드뉴스를 적어 주세요" focused={s.phase === 'idle'} />
          <Button variant="primary" data-target="generate" className="sh-go">
            {LABEL[s.phase]}
          </Button>
        </div>
        <div className="sh-cards">
          {CARDS.map((c, i) => (
            <figure key={i} className="sh-card" data-ready={s.ready > i || undefined}>
              <div className="sh-slide sh-slide--sk">
                <Bar w={34} h={6} r={3} tone={2} />
                <Bar w="72%" h={12} r={4} tone={2} />
                <Bar w="54%" h={12} r={4} tone={2} />
              </div>
              <div className={`sh-slide sh-slide--real sh-slide--${c.tone}`}>
                <span className="sh-kicker">{c.kicker}</span>
                <span className="sh-title">
                  {c.title[0]}
                  <br />
                  {c.title[1]}
                </span>
                <span className="sh-foot">
                  <Bar w={44} h={5} r={2.5} tone={1} className="sh-foot-bar" />
                  <span className="sh-page">{i + 1}/3</span>
                </span>
              </div>
              <figcaption className="sh-cap">
                <Bar w={[64, 52, 70][i]!} h={6} r={3} tone={2} />
                <Bar w={[40, 46, 36][i]!} h={6} r={3} tone={1} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Window>
  )
}
