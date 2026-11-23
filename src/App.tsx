import AgentAnswer from './stages/AgentAnswer'
import ShufflaStudio from './stages/ShufflaStudio'
import ProjectHub from './stages/ProjectHub'
import { PLANNING_TABS } from './pages/Planning'

const GITHUB = 'https://github.com/MCuffs'
const LINKEDIN = 'https://www.linkedin.com/in/arthurminsu'

const WORK = [
  {
    title: '과제 정의와 PoC 설계',
    body: '직군별 인터뷰로 실제 문제를 정의하고, PoC 범위와 성공 기준을 세웁니다. 경영진에게는 사업 가치를, 데이터·개발 조직에게는 기술 구조를 설명합니다.',
  },
  {
    title: '데이터 연동과 구축',
    body: '프라이빗 클라우드 10건 이상, 온프레미스 10건 이상을 구축했습니다. Databricks·BigQuery·Trino·AppsFlyer 연동을 맡았고, 월 200억 건 이상 이벤트 규모의 연동도 이끌었습니다.',
  },
  {
    title: '제품 기획',
    body: '한국 고객의 요구를 제품 기획으로 옮깁니다. AI 에이전트 성과 분석 신규 제품과 AI CRM 기능 20건을 기획하고, 본사 개발 조직과 주 단위로 우선순위와 일정을 조율합니다.',
  },
  {
    title: 'AX 프로젝트 리드',
    body: '게임·식품·교육·커머스 기업의 업무와 데이터 환경을 진단해 AI 적용 과제를 찾고, PoC 검증 기준부터 현업 적용까지 이끕니다. 한국 AI·AX 시장 변화를 분석해 조직 구성과 산업 확장 방향을 경영진에 보고합니다.',
  },
  {
    title: '파트너 협업 프로젝트',
    body: 'SI·리셀러 파트너와 함께하는 프로젝트에서 기술 책임을 맡았습니다. 파트너 인력 기술 교육, 데모 환경 구성, 고객 요건에 맞춘 구성안 설계를 진행했습니다.',
  },
  {
    title: '교육과 정착',
    body: '고객사 임직원 약 300명을 대상으로 직무별 교육을 설계하고 운영했습니다. 한 고객사에서는 교육 뒤 활성 사용자가 2~3명에서 약 12명으로 늘었습니다.',
  },
]

const LOGOS = [
  { name: 'KRAFTON', src: '/images/logos/krafton.svg', w: 104 },
  { name: '위메이드플레이', src: '/images/logos/wemadeplay.png', w: 112 },
  { name: 'Supercent', src: '/images/logos/supercent.png', w: 100 },
  { name: '컴투스홀딩스', src: '/images/logos/com2usholdings.svg', w: 112 },
  { name: 'LINE NEXT', src: '/images/logos/linenext.png', w: 96 },
  { name: '웹젠케이', src: '/images/logos/webzenk.svg', w: 30 },
  { name: '동서식품', src: '/images/logos/dongsuh.svg', w: 104 },
  { name: '하림', src: '/images/logos/harim.svg', w: 46 },
  { name: '일동후디스', src: '/images/logos/ildongfoodis.svg', w: 116 },
  { name: 'GC녹십자웰빙', src: '/images/logos/gcwellbeing.svg', w: 108 },
  { name: '시원스쿨', src: '/images/logos/siwonschool.svg', w: 92 },
  { name: '메이크스타', src: '/images/logos/makestar.svg', w: 104 },
]

const OTHER: { name: string; desc: string; href?: string; link?: string }[] = [
  { name: 'Engage Guide', desc: '운영 모듈·구성 센터 도입용 학습 자료와 시뮬레이터', href: 'https://mcuffs.github.io/engageguide/', link: '사이트' },
  { name: 'TikTok Live Crawler', desc: '방송 중인 스트리머 ID 수집기 (Python·Playwright)', href: `${GITHUB}/tiktok`, link: 'GitHub' },
  { name: 'Retro Tetris', desc: '브라우저 게임 데모', href: 'https://mcuffs.github.io/retro-tetris-demo/', link: '사이트' },
  { name: '릴리스 노트 자동화', desc: '제품 위키의 변경을 매일 4개 언어 릴리스 노트로 정리하는 파이프라인 (릴리스 44건·변경 170건, MCP 서버 포함)' },
  { name: '대시보드 설계 스킬', desc: '질문을 분석 모델로 옮기는 매핑 12종과 업종별 청사진 5종을 담은 에이전트 스킬' },
]

type Media = { when?: string; title: string; where: string; href?: string; img?: string; label?: string; credit?: string }

const MEDIA: Media[] = [
  { when: '2026.12', title: 'Activate Your Insights — 데이터로 설계하는 앱 성과 극대화 전략', where: 'TikTok × ThinkingAI 세미나 (예정)', label: 'TikTok × ThinkingAI' },
  { when: '2026.11', title: 'Agent로 비즈니스를 성장시키기 위한 준비물 3가지', where: 'DevFest 인천 2026', label: 'DevFest 인천 2026' },
  { when: '2026.10', title: 'AI 시대, 데과부로 살아남기', where: '수원대학교 데이터과학부 졸업생 특강', img: '/images/media/talk-lecture.jpg' },
  { when: '2026.05', title: "AX는 데이터부터…씽킹AI의 '캠페인 자동화'", where: 'CMTS 2026 커머스마케팅 대전 발표 · 블로터 기사', href: 'https://www.bloter.net/news/articleView.html?idxno=660823', img: '/images/media/talk-cmts.jpg', credit: '사진 블로터' },
  { when: '2025.11', title: 'A Paradigm Shift in User Analytics — 유저 분석의 세대 교체', where: 'ThinkingData Summit 2025 발표 · 게임포커스 기사', href: 'https://gamefocus.co.kr/detail.php?number=170983', img: '/images/media/talk-tds.jpg', credit: '사진 게임포커스' },
  { title: '데이터 기반 CS로 일본 게임 시장 공략하다… ThinkingData, 일본 게임 세미나 성황리 마쳐', where: '한류신문 기사', href: 'http://m.hallyunews.net/bbs/board.php?bo_table=han_leisure&wr_id=1705&page=70', label: '한류신문' },
]

const CAREER = [
  {
    when: '2025.01 – 현재',
    org: 'ThinkingAI (ThinkingData Korea)',
    role: 'AI Solution Engineer',
    points: [
      '기업 고객 프로젝트 40건 이상을 과제 정의부터 구축, 정착까지 리드',
      'PoC 설계, 데이터 연동, 고객용 AI 에이전트 구축',
      'AI 에이전트 성과 분석 신규 제품과 AI CRM 기능 20건 기획, 이메일 채널 출시 전 검수 총괄',
      'AX 프로젝트 리드와 한국 시장 AX 사업 전략 보고',
      '고객사 임직원 약 300명 교육',
    ],
  },
  {
    when: '2024.08 – 2024.12',
    org: 'AIPIM',
    role: 'AI Engineer · 제조 AI (약 40명 규모, 4인 제품팀)',
    points: ['제조 문서에서 공정·산출 값을 뽑아 LCA(탄소발자국) 보고서를 채우는 LLM·RAG 생성기를 기획부터 구축까지 담당 (LangChain·LangGraph, FAISS·pgvector)'],
  },
  {
    when: '2023.07 – 2024.04',
    org: '뱅크몰',
    role: '데이터 분석가 · 전략사업부',
    points: [
      '제휴 성과 분석으로 삼성카드·현대카드·현대캐피탈까지 금융 제휴 확대, 신청 전환 +26%',
      '유료 신용 데이터를 공공 데이터로 바꾸는 이전·API 연동 설계, 이탈 −28%',
      '데이터 기반 플랫폼 개편 PM, 가입 전환 +32.9%',
    ],
  },
  {
    when: '2023.03 – 2023.07',
    org: 'GoGo F&D',
    role: '머신러닝 엔지니어 인턴',
    points: [
      '이륜차 주행 데이터로 안전운전점수 모델(XGBoost·LightGBM)을 개발해 보험사에 납품',
      '정부 지원 과제 제안서 7건 작성, 4건 선정. 이륜차 마이데이터 플랫폼의 협력 기관 6곳 조율',
    ],
  },
]

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function MediaList({ items }: { items: Media[] }) {
  return (
    <ul className="pf-media">
      {items.map((m) => (
        <li key={m.title} className="pf-media__item">
          {m.img ? (
            <div className="pf-media__thumb">
              <img src={m.img} alt="" loading="lazy" decoding="async" />
            </div>
          ) : (
            <div className="pf-media__thumb pf-media__thumb--text" aria-hidden="true">
              <span>{m.label}</span>
            </div>
          )}
          <div className="pf-media__body">
            {m.when && <p className="pf-row__when">{m.when}</p>}
            <p className="pf-media__title">{m.title}</p>
            <p className="pf-media__where">
              {m.where}
              {m.credit && <span className="pf-media__credit"> · {m.credit}</span>}
            </p>
            {m.href && <Ext href={m.href}>기사 보기</Ext>}
          </div>
        </li>
      ))}
    </ul>
  )
}

function Illustration({ children, note = '설명용 일러스트 · 실제 제품 화면이 아닙니다' }: { children: React.ReactNode; note?: string }) {
  return (
    <figure className="pf-figure">
      {children}
      <figcaption className="pf-figure__note">{note}</figcaption>
    </figure>
  )
}

export default function App() {
  return (
    <>
      <header className="pf-top">
        <div className="pf-wrap pf-top__in">
          <a className="pf-top__name" href="#top">
            정민수
          </a>
          <nav className="pf-top__nav">
            <a href="#work">하는 일</a>
            <a href="#planning">제품 기획</a>
            <a href="#projects">프로젝트</a>
            <a href="#talks">발표</a>
            <a href="#career">경력</a>
            <Ext href={GITHUB}>GitHub</Ext>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="pf-wrap pf-hero">
          <div className="pf-hero__copy">
            <p className="pf-eyebrow">AI Solution Engineer · ThinkingAI</p>
            <h1 className="pf-hero__name">
              정민수 <span>Minsu Jung</span>
            </h1>
            <p className="pf-hero__lede">기업의 AI·데이터 도입 프로젝트를 과제 정의부터 PoC, 구축, 정착까지 이끕니다.</p>
            <p className="pf-hero__sub">게임·식품·커머스·콘텐츠 기업의 프로젝트를 리드하고, 현장에서 찾은 요구를 제품 기획으로 옮기며, 고객용 AI 에이전트를 직접 만듭니다. 사이드 프로젝트로 AI 카드뉴스 SaaS를 만들어 운영했습니다.</p>
            <div className="pf-links">
              <Ext href={GITHUB}>GitHub</Ext>
              <Ext href={LINKEDIN}>LinkedIn</Ext>
            </div>
          </div>
          <div className="pf-hero__demo">
            <Illustration>
              <AgentAnswer />
            </Illustration>
          </div>
        </section>

        <section className="pf-wrap pf-trust" aria-label="프로젝트를 리드한 고객사">
          <p className="pf-trust__label">AI·데이터 프로젝트를 리드한 고객사</p>
          <div className="pf-marquee">
            <ul className="pf-marquee__track">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <li key={`${l.name}-${i}`} aria-hidden={i >= LOGOS.length || undefined}>
                  <img src={l.src} alt={i >= LOGOS.length ? '' : l.name} style={{ width: l.w }} decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">하는 일</p>
            <h2>ThinkingAI에서 맡고 있는 일</h2>
          </div>
          <div className="pf-work">
            <div className="pf-stat">
              <span className="pf-stat__num">40+</span>
              <span className="pf-stat__label">리드한 기업 고객 프로젝트</span>
            </div>
            <dl className="pf-work__list">
              {WORK.map((w) => (
                <div key={w.title} className="pf-work__item">
                  <dt>{w.title}</dt>
                  <dd>{w.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="planning" className="pf-wrap pf-section">
          <div className="pf-head pf-head--more">
            <div>
              <p className="pf-eyebrow">제품 기획</p>
              <h2>기획하고 출시까지 맡은 기능</h2>
            </div>
            <a className="pf-more" href="/planning/">
              더보기
            </a>
          </div>
          <ul className="pf-rows pf-rows--top">
            {PLANNING_TABS.map((t) => (
              <li key={t.id} className="pf-row pf-row--plan">
                <span className="pf-row__name">{t.title}</span>
                <span className="pf-row__desc">{t.lede}</span>
                <a href={`/planning/#${t.id}`}>자세히</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">프로젝트</p>
            <h2>만든 것들</h2>
          </div>

          <article className="pf-feature pf-feature--text">
            <div className="pf-feature__copy">
              <p className="pf-meta">ThinkingAI · 2025.01 – 현재</p>
              <h3>AX 프로젝트 리드</h3>
              <p>엔터프라이즈 고객의 AX 프로젝트를 과제 정의부터 PoC, 연동과 검증, 교육, 본사 조율까지 맡았습니다. 고객사별로 한 일은 상세 페이지에 정리했습니다.</p>
              <div className="pf-links pf-links--small">
                <a href="/ax/">더보기</a>
              </div>
            </div>
            <div className="pf-feature__copy">
              <ul className="pf-feature__list">
                <li>
                  <a href="/ax/#krafton">KRAFTON</a> — PoC 2건 설계와 수행, 데이터 범위 검토, AI 에이전트 도입 준비
                </li>
                <li>
                  <a href="/ax/#supercent">Supercent</a> — 분석·실험 PoC 운영, 데이터 정합성 검증, 대시보드 정비
                </li>
                <li>
                  <a href="/ax/#dongsuh">동서식품</a> — 직영몰 CRM 도입 검토, 보안 대응, 사내 AI 연결 검증
                </li>
                <li>
                  <a href="/ax/#harim">하림</a> — 소셜 데이터 수집 범위 설계, 구매 장벽 분석 에이전트
                </li>
                <li>
                  <a href="/ax/#ildong">일동후디스</a> — 자사몰 CRM 전환 설계, 테스트 몰 기술 검증
                </li>
                <li>
                  <a href="/ax/#webzenk">웹젠케이</a> — 구축형 분석 환경 온보딩, 트래킹 정책 설계
                </li>
              </ul>
            </div>
          </article>

          <article className="pf-feature pf-feature--text">
            <div className="pf-feature__copy">
              <p className="pf-meta">ThinkingAI · 2026</p>
              <h3>고객용 AI 에이전트</h3>
              <p>맨 위 일러스트처럼 현업 담당자가 질문하면 데이터를 조회해 이유까지 답하는 에이전트를 고객 데이터 위에 만듭니다.</p>
            </div>
            <div className="pf-feature__copy">
              <ul className="pf-feature__list">
                <li>식품 기업용 소셜 데이터 구매 장벽 분석 에이전트. 데이터 호출을 65회에서 약 20회로 줄여 응답 시간 단축</li>
                <li>대화만으로 템플릿·변수·대상·발송을 끝내는 카카오 발송 에이전트</li>
                <li>구독형 콘텐츠 서비스 데모용 휴면 원인 분석 에이전트. 휴면 유저를 다섯 가지 원인으로 판정</li>
                <li>사내 문서와 고객 이슈를 답하는 지식 에이전트</li>
              </ul>
            </div>
          </article>

          <article className="pf-feature pf-feature--stage">
            <div className="pf-feature__demo">
              <Illustration note="설명용 일러스트 · 서비스는 2026년 10월 종료">
                <ShufflaStudio />
              </Illustration>
            </div>
            <div className="pf-feature__copy">
              <p className="pf-meta">사이드 프로젝트 · 2026.01 – 2026.07</p>
              <h3>Shuffla — AI 카드뉴스 SaaS</h3>
              <p>브랜드 주소와 요청 한 줄로 SNS 카드뉴스를 만들고 편집하는 서비스를 혼자 만들고 운영했습니다.</p>
              <ul>
                <li>LLM·이미지 생성 파이프라인, 브랜드 메모리와 템플릿</li>
                <li>요금제·결제·사용량 분석까지 운영 기능 구현</li>
                <li>생성 품질과 응답 시간·운영 비용 사이를 조정</li>
              </ul>
              <p className="pf-tech">Next.js · Supabase · Puppeteer</p>
              <div className="pf-links pf-links--small">
                <Ext href={`${GITHUB}/snsagent`}>GitHub</Ext>
              </div>
            </div>
          </article>

          <article className="pf-feature pf-feature--stage pf-feature--flip">
            <div className="pf-feature__demo">
              <Illustration>
                <ProjectHub />
              </Illustration>
            </div>
            <div className="pf-feature__copy">
              <p className="pf-meta">업무 자동화 · 2026.11</p>
              <h3>프로젝트 허브</h3>
              <p>고객사와 제품 프로젝트마다 Lark 위키·Base 공간을 두고, Claude가 Slack과 CRM 기록을 읽어 커뮤니케이션 로그·이슈·일정으로 정리하는 운영 체계를 만들었습니다.</p>
              <ul>
                <li>고객사 14곳과 제품 프로젝트 5개를 한 Base에서 관리</li>
                <li>명령 한 번으로 Slack·CRM 동기화, 주간 브리핑 생성</li>
                <li>개인 기록 저장소로 내보내기 (금액·연락처 제외 규칙 적용)</li>
              </ul>
              <p className="pf-tech">Lark CLI · Python · Claude Code</p>
            </div>
          </article>


          <div className="pf-others">
            <h3 className="pf-others__title">그 밖의 프로젝트</h3>
            <ul className="pf-rows">
              {OTHER.map((o) => (
                <li key={o.name} className="pf-row">
                  <span className="pf-row__name">{o.name}</span>
                  <span className="pf-row__desc">{o.desc}</span>
                  {o.href ? <Ext href={o.href}>{o.link}</Ext> : <span className="pf-row__none">사내 도구</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="talks" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">발표 · 대회</p>
            <h2>발표·강연과 기사</h2>
          </div>
          <MediaList items={MEDIA} />

          <div className="pf-others">
            <h3 className="pf-others__title">대회</h3>
            <ul className="pf-rows">
              <li className="pf-row pf-row--dated">
                <span className="pf-row__when">2026.10</span>
                <span className="pf-row__name">SaveTax 해커톤 30위 (참가 1,093명)</span>
                <span className="pf-row__desc">조달 상품 과다 가격 탐지</span>
              </li>
              <li className="pf-row pf-row--dated">
                <span className="pf-row__when">2026.10</span>
                <span className="pf-row__name">SK하이닉스 AI 해커톤 2026 1차 예선 통과</span>
                <span className="pf-row__desc" />
              </li>
            </ul>
          </div>
        </section>

        <section id="career" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">경력</p>
            <h2>지나온 곳</h2>
          </div>
          <ol className="pf-career">
            {CAREER.map((c) => (
              <li key={c.org} className="pf-career__item">
                <span className="pf-row__when">{c.when}</span>
                <div>
                  <p className="pf-career__org">
                    {c.org} <span>{c.role}</span>
                  </p>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="pf-edu">
            <div>
              <h3>학력</h3>
              <p>
                수원대학교 데이터과학부 학사 (2018.03 – 2024.02)
                <br />
                논문: SNS 크롤링 기반 사건 지수화 (2022)
              </p>
            </div>
            <div>
              <h3>자격·교육</h3>
              <p>SQLD (2024) · ADsP (2021) · LG CNS AI Genius 4기 (2022)</p>
            </div>
            <div>
              <h3>언어</h3>
              <p>한국어, 영어(업무에서 본사·해외 협력사와 매일 사용)</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-wrap">
        <div className="pf-foot">
          <span>© 2026 정민수</span>
          <span className="pf-links pf-links--small">
            <Ext href={GITHUB}>GitHub</Ext>
            <Ext href={LINKEDIN}>LinkedIn</Ext>
          </span>
        </div>
      </footer>
    </>
  )
}
