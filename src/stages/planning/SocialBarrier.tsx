import type { ReactNode } from 'react'
import { Image, MessagesSquare, PenLine, Search, Video } from 'lucide-react'
import { Avatar, Badge, Bar, Collapse, Field, Meter, Row, Stage, Text, Toggle, Window, type Act, type Layout } from '../../kit'
import './social-barrier.css'

// 소셜 데이터 분석: 한국 채널을 켜면 소비자 글이 들어오고, 질문을 바꾸면 구매 장벽이 유형별로 정리되는 장면.
// 바탕 골드: examples/loading (실제 창 안에서 줄이 위에서 아래로 차례로 채워짐) + static-card 구도(위·좌우 여백, 아래로 잘림).
// 비트: 블로그 켬 → 글 두 줄 도착 → 카페 켬 → 글 두 줄 도착 → 질문을 지우고 다시 입력 → 장벽 막대가 위에서부터 자람.
// 실제 글자: 채널 이름 넷, 질문, 장벽 유형 셋. 글 내용·작성자·원문은 막대.

const Q_BEFORE = '긍·부정 비율'
const Q_AFTER = '왜 구매하지 않는가'

const CHANNELS = [
  { id: 'video', label: '동영상', icon: Video },
  { id: 'photo', label: '사진 SNS', icon: Image },
  { id: 'blog', label: '블로그', icon: PenLine },
  { id: 'cafe', label: '카페', icon: MessagesSquare },
] as const

// 새로 들어오는 글. 화면에서는 뒤에 온 글이 위에 놓인다
const NEW = [
  { ch: '블로그', w: [150, 108] },
  { ch: '블로그', w: [118, 136] },
  { ch: '카페', w: [164, 92] },
  { ch: '카페', w: [126, 120] },
] as const

const OLD = [
  { ch: '동영상', w: [138, 104] },
  { ch: '사진 SNS', w: [112, 128] },
  { ch: '동영상', w: [156, 88] },
  { ch: '사진 SNS', w: [124, 112] },
  { ch: '동영상', w: [144, 96] },
  { ch: '사진 SNS', w: [108, 132] },
  { ch: '동영상', w: [132, 100] },
  { ch: '사진 SNS', w: [150, 84] },
  { ch: '동영상', w: [116, 120] },
  { ch: '사진 SNS', w: [140, 92] },
] as const

const BARRIERS = [
  { label: '가격 부담', value: 0.78 },
  { label: '조리 번거로움', value: 0.54 },
  { label: '보관 불편', value: 0.36 },
  { label: null, value: 0.2 },
] as const

/** 좁은 화면의 글 띠에 보이는 줄 수 */
const SHOWN = 2

type S = {
  blog: boolean
  cafe: boolean
  /** 들어온 새 글 수 */
  rows: number
  q: string
  focus: boolean
  asked: boolean
  /** 자란 장벽 막대 수 */
  bars: number
}

const initial: S = { blog: false, cafe: false, rows: 0, q: Q_BEFORE, focus: false, asked: false, bars: 0 }
const poster: S = { blog: true, cafe: true, rows: NEW.length, q: Q_AFTER, focus: false, asked: true, bars: BARRIERS.length }

async function script(a: Act<S>) {
  await a.wait(800)

  a.mark('blog')
  await a.click({ at: 'tg-blog', x: 0.72, y: 0.72 })
  a.put({ blog: true })
  await a.wait(380)
  a.put({ rows: 1 })
  await a.wait(300)
  a.put({ rows: 2 })
  await a.wait(260)

  a.mark('cafe')
  await a.click({ at: 'tg-cafe', x: 0.72, y: 0.72 })
  a.put({ cafe: true })
  await a.wait(380)
  a.put({ rows: 3 })
  await a.wait(300)
  a.put({ rows: 4 })
  await a.wait(800)

  a.mark('ask')
  await a.click({ at: 'q', x: a.layout === 'compact' ? 0.86 : 0.66, y: 0.56 })
  a.put({ focus: true })
  await a.wait(280)
  for (let n = Q_BEFORE.length - 1; n >= 0; n--) {
    a.put({ q: Q_BEFORE.slice(0, n) })
    await a.wait(48)
  }
  await a.wait(220)
  await a.type('q', Q_AFTER, { interval: 85 })
  await a.wait(420)

  a.mark('answer')
  a.put({ focus: false, asked: true, bars: 1 })
  for (let i = 2; i <= BARRIERS.length; i++) {
    await a.wait(120)
    a.put({ bars: i })
  }
  await a.wait(350)
  await a.move({ wide: { x: 470, y: 392 }, compact: { x: 252, y: 180 } }, { duration: 800 })
  await a.wait(2400)
}

function Post({ ch, w, fresh }: { ch: string; w: readonly [number, number]; fresh?: boolean }) {
  return (
    <Row pad={8} className="ps-post" lead={<Avatar plain size={26} />} title={<Bar w={w[0]} tone={fresh ? 4 : 3} />} subtitle={<Bar w={w[1]} tone={2} />}>
      <Badge tone={fresh ? 'accent' : 'neutral'} className="ps-tag">
        {ch}
      </Badge>
    </Row>
  )
}

function Channel({ id, label, icon, on }: { id: string; label: string; icon: ReactNode; on: boolean }) {
  return (
    <Row pad={8} className="ps-ch" data-on={on || undefined} lead={<span className="ps-ch__icon">{icon}</span>} title={<Text className="ps-ch__label">{label}</Text>}>
      <Toggle on={on} data-target={`tg-${id}`} />
    </Row>
  )
}

function Scene({ s, layout }: { s: S; layout: Layout }) {
  const compact = layout === 'compact'
  const on = (id: string) => (id === 'blog' ? s.blog : id === 'cafe' ? s.cafe : true)

  const ask = (
    <Field
      className="ps-q"
      value={s.q}
      focused={s.focus}
      leading={<Search size={14} strokeWidth={2} className="ps-q__icon" />}
      box={{ 'data-target': 'q' }}
    />
  )

  const channels = (compact ? CHANNELS.slice(2) : CHANNELS).map((c) => (
    <Channel key={c.id} id={c.id} label={c.label} on={on(c.id)} icon={<c.icon size={15} strokeWidth={2} />} />
  ))

  // 넓은 화면: 새 글이 위에 끼어들고 아래 글은 창 밖으로 밀려남.
  // 좁은 화면: 두 줄만 보이는 띠. 새 글이 들어오면 맨 아래 글이 접혀 나감
  const newest = NEW.map((_, i) => i).reverse()
  // 좁은 화면에서는 채널마다 한 줄씩만 들어와, 끝에 블로그와 카페가 한 줄씩 남는다
  const got = Math.ceil(s.rows / 2)
  const list = compact ? (
    <div className="ps-list">
      {[2, 0].map((i, k) => (
        <Collapse key={`n${i}`} open={got >= SHOWN - k}>
          <Post ch={NEW[i]!.ch} w={NEW[i]!.w} fresh />
        </Collapse>
      ))}
      {OLD.slice(0, SHOWN).map((p, j) => (
        <Collapse key={`o${j}`} open={got + j < SHOWN}>
          <Post ch={p.ch} w={p.w} />
        </Collapse>
      ))}
    </div>
  ) : (
    <div className="ps-list">
      {newest.map((i) => (
        <Collapse key={`n${i}`} open={s.rows > i}>
          <Post ch={NEW[i]!.ch} w={NEW[i]!.w} fresh />
        </Collapse>
      ))}
      {OLD.map((p, i) => (
        <Post key={`o${i}`} ch={p.ch} w={p.w} />
      ))}
    </div>
  )

  const result = (
    <div className="ps-result">
      {/* 처음 질문의 답: 긍·부정 비율. 내용은 막대 */}
      <div className="ps-sent" data-off={s.asked || undefined}>
        <div className="ps-split">
          <Bar w={128} h={8} r={4} tone={5} shrink={false} />
          <Bar w="auto" h={8} r={4} tone={2} className="ps-split__rest" />
        </div>
        <div className="ps-legend">
          <Bar w={8} h={8} r={4} tone={5} />
          <Bar w={46} tone={3} />
        </div>
        <div className="ps-legend">
          <Bar w={8} h={8} r={4} tone={2} />
          <Bar w={58} tone={3} />
        </div>
        <div className="ps-quote ps-sent__note">
          <Bar w={196} tone={2} />
          <Bar w={172} tone={2} />
          <Bar w={184} tone={2} />
          <Bar w={104} tone={2} />
        </div>
      </div>
      {/* 바꾼 질문의 답: 구매 장벽 유형 */}
      <div className="ps-barriers">
        {(compact ? BARRIERS.filter((b) => b.label) : BARRIERS).map((b, i) => (
          <div key={i} className="ps-barrier" data-filler={b.label ? undefined : ''} data-on={s.bars > i || undefined}>
            {b.label ? <Text className="ps-barrier__label">{b.label}</Text> : <span className="ps-barrier__label"><Bar w={40} tone={3} /></span>}
            <Meter value={s.bars > i ? b.value : 0} />
          </div>
        ))}
      </div>
    </div>
  )

  const quotes = (
    <div className="ps-quotes">
      {[
        [168, 132],
        [150, 176, 96],
        [172, 118],
        [158, 180, 84],
      ].map((ws, i) => (
        <div key={i} className="ps-quote">
          {ws.map((w, j) => (
            <Bar key={j} w={w} tone={2} />
          ))}
        </div>
      ))}
    </div>
  )

  if (compact) {
    return (
      <Window className="ps-win" lead={ask}>
        <div className="ps-body">
          <div className="ps-chips">{channels}</div>
          {list}
          <div className="ps-pane">{result}</div>
        </div>
      </Window>
    )
  }

  return (
    <Window
      className="ps-win"
      sidebarWidth={196}
      lead={ask}
      sidebar={
        <nav className="ps-side">
          <Bar w={48} tone={3} className="ps-side__head" />
          {channels}
          <Bar w={36} tone={3} className="ps-side__head ps-side__head--next" />
          {[84, 62, 96, 70, 88, 58, 76].map((w, i) => (
            <div key={i} className="ps-kw">
              <Bar w={w} tone={2} />
              <Bar w={18} tone={1} />
            </div>
          ))}
        </nav>
      }
    >
      <div className="ps-body">
        {list}
        <aside className="ps-pane">
          {result}
          {quotes}
        </aside>
      </div>
    </Window>
  )
}

export default function SocialBarrier() {
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
      cursor={{ at: { wide: { x: 318, y: 392 }, compact: { x: 252, y: 180 } } }}
      className="ps"
    >
      {(s, _rect, layout) => <Scene s={s} layout={layout} />}
    </Stage>
  )
}
