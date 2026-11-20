import AgentAnswer from './stages/AgentAnswer'
import ShufflaStudio from './stages/ShufflaStudio'
import ProjectHub from './stages/ProjectHub'

const GITHUB = 'https://github.com/MCuffs'
const LINKEDIN = 'https://www.linkedin.com/in/arthurminsu'

const WORK = [
  {
    title: '프리세일즈와 PoC',
    body: '고객 요구를 정리하고 데모·PoC로 도입 가능성을 검증합니다. 경영진에게는 사업 가치를, 데이터·개발 조직에게는 기술 구조를 설명합니다.',
  },
  {
    title: '데이터 연동과 구축',
    body: '프라이빗 클라우드 10건 이상, 온프레미스 10건 이상을 구축했습니다. Databricks·BigQuery·Trino·AppsFlyer 연동을 맡았고, 월 200억 건 이상 이벤트 규모의 연동도 이끌었습니다.',
  },
  {
    title: '파트너 공동 영업',
    body: 'SI·리셀러 파트너의 기술 담당으로 공동 입찰을 지원했습니다. Salesforce·Amplitude·Braze와 경쟁한 제안, 파트너 인력 기술 교육, 데모 환경 구성을 맡았습니다.',
  },
  {
    title: '제품 기획 피드백',
    body: '한국 고객의 요구를 본사 제품팀에 기획으로 전달합니다. 에이전트 분석·AI 관측 기능 PRD와 로드맵, CRM 기능 20건의 이중 언어 명세를 작성하고 주간 트래커를 운영합니다.',
  },
]

const CLIENTS = ['KRAFTON', '위메이드플레이', '컴투스홀딩스', 'LINE NEXT', '시원스쿨', '녹십자웰빙']

const OTHER = [
  { name: 'Engage Guide', desc: '운영 모듈·구성 센터 도입용 학습 자료와 시뮬레이터', href: 'https://mcuffs.github.io/engageguide/', link: '사이트' },
  { name: '오늘장 마켓', desc: 'CRM 솔루션 검토용 데모 쇼핑몰', href: 'https://mcuffs.github.io/oneuljang-demo/', link: '사이트' },
  { name: 'GameDex RAG PoC', desc: '사내 문서 벡터 검색과 AI 답변 PoC', href: `${GITHUB}/RAG`, link: 'GitHub' },
  { name: 'GEO Rank', desc: 'AI 검색 노출 순위를 추적하는 MVP', href: `${GITHUB}/geo`, link: 'GitHub' },
  { name: 'Streamer Soundboard', desc: 'OBS·TikTok Live 방송용 저지연 사운드보드', href: `${GITHUB}/StreamerSoundboard`, link: 'GitHub' },
  { name: 'TikTok Live Crawler', desc: '방송 중인 스트리머 ID 수집기 (Python·Playwright)', href: `${GITHUB}/tiktok`, link: 'GitHub' },
  { name: 'Retro Tetris', desc: '브라우저 게임 데모', href: 'https://mcuffs.github.io/retro-tetris-demo/', link: '사이트' },
]

const TALKS = [
  { when: '2026.12', title: 'Activate Your Insights — 데이터로 설계하는 앱 성과 극대화 전략', where: 'TikTok × ThinkingAI 세미나 (예정)' },
  { when: '2026.11', title: 'Agent로 비즈니스를 성장시키기 위한 준비물 3가지', where: 'DevFest 인천 2026' },
  { when: '2026.10', title: '데이터·AI 진로 특강', where: '수원대학교 데이터과학부' },
  { when: '2026', title: 'CMTS 2026 · TDS 컨퍼런스 발표', where: '청중 300명 이상' },
]

const CAREER = [
  {
    when: '2025.01 – 현재',
    org: 'ThinkingAI (ThinkingData Korea)',
    role: 'AI Solution Engineer',
    points: [
      '기업 고객 40곳 이상의 계약과 도입을 기술 측면에서 담당',
      '프리세일즈·PoC, 데이터 연동, 고객용 AI 에이전트 구축, 본사 제품 기획 피드백',
      '고객사 임직원 약 300명 교육',
    ],
  },
  {
    when: '2026.01 – 2026.07',
    org: 'Shuffla',
    role: '창업자 · 프로덕트 리드 (병행)',
    points: ['AI 카드뉴스 생성 SaaS를 혼자 만들고 운영, 2026.10 서비스 종료'],
  },
  {
    when: '2024.08 – 2024.12',
    org: 'AIPIM',
    role: 'AI Engineer · 제조 AI (4인 팀)',
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
    role: 'IT 기획 인턴',
    points: ['정부 지원 과제 제안서 7건 작성, 4건 수행. 이륜차 데이터 플랫폼의 협력 기관 6곳 조율'],
  },
]

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
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
            <p className="pf-hero__lede">기업이 AI·데이터 플랫폼을 첫 미팅부터 실제 운영까지 가져가도록 기술 검토, PoC, 구축을 맡고 있습니다.</p>
            <p className="pf-hero__sub">게임·커머스·콘텐츠 기업의 계약과 도입을 기술 측면에서 이끌고, 고객용 AI 에이전트를 직접 만듭니다. AI 카드뉴스 SaaS를 창업해 운영했고, 지금은 모바일 게임을 만들고 있습니다.</p>
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

        <section id="work" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">하는 일</p>
            <h2>ThinkingAI에서 맡고 있는 일</h2>
          </div>
          <div className="pf-work">
            <div className="pf-stat">
              <span className="pf-stat__num">40+</span>
              <span className="pf-stat__label">기업 고객 계약·도입 담당</span>
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
          <p className="pf-clients">
            <span className="pf-clients__label">함께한 고객사</span>
            {CLIENTS.join(' · ')}
          </p>
        </section>

        <section id="projects" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">프로젝트</p>
            <h2>만든 것들</h2>
          </div>

          <article className="pf-feature pf-feature--text">
            <div className="pf-feature__copy">
              <p className="pf-meta">ThinkingAI · 2026</p>
              <h3>고객용 AI 에이전트</h3>
              <p>맨 위 일러스트처럼 현업 담당자가 질문하면 데이터를 조회해 이유까지 답하는 에이전트를 고객 데이터 위에 만듭니다.</p>
            </div>
            <div className="pf-feature__copy">
              <ul className="pf-feature__list">
                <li>식품 기업 마케팅팀용 소셜 데이터 구매 장벽 분석 에이전트 (PoC). 데이터 호출을 줄여 응답 시간을 2분 11초에서 1분 10초로 단축</li>
                <li>카카오 알림톡 캠페인용 대화형 에이전트. 멀티테넌트 웹훅 릴레이와 도구 7개짜리 MCP 서버를 함께 설계</li>
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
              <p className="pf-meta">창업 · 2026.01 – 2026.07</p>
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

          <article className="pf-feature pf-feature--stage">
            <a className="pf-feature__demo pf-shot" href="https://mcuffs.github.io/bluemushroom/" target="_blank" rel="noreferrer">
              <img src="/images/game-family.webp" alt="게임 「아빠 전쟁」의 아빠 가족 캐릭터 그림" decoding="async" />
            </a>
            <div className="pf-feature__copy">
              <p className="pf-meta">개인 프로젝트 · 개발 중</p>
              <h3>아빠 전쟁 — 모바일 캐주얼 게임</h3>
              <p>아들이 장난으로 건 「아빠 의리 테스트」에 아빠가 진심으로 반응해 학교로 뛰어가는 세로형 캐주얼 액션 게임입니다. 기획, 밸런스, 에셋 발주, Unity 개발을 직접 하고 있습니다.</p>
              <p className="pf-tech">Unity · C#</p>
              <div className="pf-links pf-links--small">
                <Ext href="https://mcuffs.github.io/bluemushroom/">파랑버섯 스튜디오</Ext>
              </div>
            </div>
          </article>

          <div className="pf-others">
            <h3 className="pf-others__title">그 밖의 프로젝트</h3>
            <ul className="pf-rows">
              {OTHER.map((o) => (
                <li key={o.name} className="pf-row">
                  <span className="pf-row__name">{o.name}</span>
                  <span className="pf-row__desc">{o.desc}</span>
                  <Ext href={o.href}>{o.link}</Ext>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="talks" className="pf-wrap pf-section">
          <div className="pf-head">
            <p className="pf-eyebrow">발표 · 대회</p>
            <h2>발표와 강연</h2>
          </div>
          <ul className="pf-rows">
            {TALKS.map((t) => (
              <li key={t.title} className="pf-row pf-row--dated">
                <span className="pf-row__when">{t.when}</span>
                <span className="pf-row__name">{t.title}</span>
                <span className="pf-row__desc">{t.where}</span>
              </li>
            ))}
            <li className="pf-row pf-row--dated">
              <span className="pf-row__when">2026.10</span>
              <span className="pf-row__name">SaveTax 해커톤 30위 (참가 1,093명)</span>
              <span className="pf-row__desc">대회 · 조달 상품 과다 가격 탐지</span>
            </li>
            <li className="pf-row pf-row--dated">
              <span className="pf-row__when">2026.10</span>
              <span className="pf-row__name">SK하이닉스 AI 해커톤 2026 1차 예선 통과</span>
              <span className="pf-row__desc">대회</span>
            </li>
          </ul>
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
              <p>수원대학교 데이터과학부 학사 (2018.03 – 2024.02)</p>
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
