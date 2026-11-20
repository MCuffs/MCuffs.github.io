import { SquarePen } from 'lucide-react'
import { Bar, Button, Collapse, Field, Stage, Stream, Text, Window, type Act } from '../kit'
import './agent-answer.css'

// 히어로: 분석 에이전트가 데이터 질문에 답하는 장면. examples/ai-chat 골드를 옮김.
// 비트: 질문 입력 → 전송 → 분석 중 → 답변이 단어 단위로 흐름 → 근거 칩. 한 번 재생, 정지 화면이 결과.
// 실제 글자: 질문, 답변, 근거 두 개, 입력창 안내 문구. 앞 대화는 막대.

const Q = '이번 달 첫 구매율이 왜 떨어졌어?'
const A =
  '첫 구매율이 11월 둘째 주부터 4.1%에서 3.2%로 떨어졌습니다. 신규 회원 쿠폰이 모바일 결제 화면에 보이지 않아, 쿠폰을 찾다가 결제를 그만둔 사람이 늘었습니다. 쿠폰 노출을 고치면 대부분 회복될 것으로 보입니다.'
const WORDS = A.split(' ').length

type S = { draft: string; sent: boolean; phase: 'idle' | 'thinking' | 'answer'; words: number; sources: boolean }

const initial: S = { draft: '', sent: false, phase: 'idle', words: 0, sources: false }
const poster: S = { draft: '', sent: true, phase: 'answer', words: WORDS, sources: true }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('type')
  await a.type('draft', Q, { interval: 60 })
  await a.wait(450)
  a.mark('send')
  a.put({ sent: true, draft: '' })
  await a.wait(450)
  a.put({ phase: 'thinking' })
  await a.wait(1200)
  a.mark('stream')
  a.put({ phase: 'answer' })
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i })
    await a.wait(70)
  }
  await a.wait(300)
  a.mark('sources')
  a.put({ sources: true })
  await a.wait(2600)
}

export default function AgentAnswer() {
  return (
    <Stage<S>
      width={640}
      height={420}
      compact={{ below: 600, width: 358, height: 342 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#2457C5"
      className="aa"
    >
      {(s) => (
        <Window title="분석 에이전트" className="aa-win" toolbar={<Button variant="ghost" size="small" icon={<SquarePen size={14} strokeWidth={2} />} aria-label="새 대화" />}>
          <div className="aa-body">
            <div className="aa-thread">
              <div className="aa-turn aa-turn--past">
                <Bar w={150} h={30} r={15} tone={1} className="aa-past-q" />
                <Bar w="78%" h={8} r={4} tone={2} />
                <Bar w="90%" h={8} r={4} tone={2} />
                <Bar w="44%" h={8} r={4} tone={2} />
              </div>
              <div className="aa-turn aa-turn--past">
                <Bar w={190} h={30} r={15} tone={1} className="aa-past-q" />
                <Bar w="86%" h={8} r={4} tone={2} />
                <Bar w="62%" h={8} r={4} tone={2} />
              </div>
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="aa-q">
                  <Text>{Q}</Text>
                </div>
              </Collapse>
              <Collapse open={s.phase === 'thinking'}>
                <Text className="aa-thinking">분석 중</Text>
              </Collapse>
              <Collapse open={s.phase === 'answer'}>
                <div className="aa-a" data-on>
                  <Stream className="aa-stream" text={A} count={s.words} />
                  <div className="aa-sources" data-on={s.sources || undefined}>
                    <span className="aa-source">첫 구매 퍼널 · 최근 14일</span>
                    <span className="aa-source">결제 화면 오류 이벤트</span>
                  </div>
                </div>
              </Collapse>
            </div>
            <Field className="aa-composer" value={s.draft} placeholder="데이터에 대해 질문하세요" focused={!s.sent} />
          </div>
        </Window>
      )}
    </Stage>
  )
}
