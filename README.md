# ⚖️ Lawpick (로픽)
> **내게 딱 맞는 법률 전문가를 찾는 가장 빠른 방법**

Lawpick은 복잡한 법률 문제로 고민하는 사용자들이 자신에게 가장 적합한 **분야별 전문 변호사**를 쉽게 찾을 수 있도록 돕는 매칭 플랫폼입니다. 법제처 API 기반의 **AI 법률 챗봇**을 통해 기본적인 궁금증을 즉시 해결하고, 검증된 전문가와 연결되는 경험을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 맞춤형 변호사 검색 및 매칭
* 분야별, 지역별 데이터를 바탕으로 현재 고민 중인 사건에 특화된 변호사 리스트를 제공합니다.
* 변호사의 상세 이력과 전문 분야를 한눈에 비교할 수 있습니다.

### 2. 법제처 API 기반 '법률 가이드 챗봇'
* **실시간 법령 조회:** 법제처의 최신 법령 데이터를 기반으로 정확한 정보를 제공합니다.
* **간이 상담 서비스:** 복잡한 법률 용어를 쉽게 풀어서 설명해주며, 기초적인 대처 방안을 안내합니다.

### 3. 최신 법률 뉴스 및 인사이트
* 주요 판례나 실생활에 유용한 법률 상식을 뉴스피드 형태로 제공하여 사용자의 법률 접근성을 높입니다.

---

## 🛠 Tech Stack (프론트엔드)
* **Framework:** React (Vite)
* **Language:** JavaScript / JSX
* **Styling:** CSS3
* **API:** 법제처 오픈 API (Open Data)


## 📂 Project Structure

```text
📁 lawpick/ (프로젝트 루트)
├── 📁 .firebase/             # Firebase 배포 및 호스팅 관련 설정 폴더
├── 📁 public/                # 정적 파일 (favicon 등)
├── 📁 src/                   # 💡 핵심 소스 코드 폴더
│   ├── 📁 components/        # 공통으로 사용되는 UI 컴포넌트
│   │   └── Navbar.jsx        # 상단 네비게이션 바
│   │
│   ├── 📁 contexts/          # 전역 상태 관리 (React Context)
│   │   └── AuthContext.jsx   # 로그인/회원가입 등 인증 상태 관리
│   │
│   ├── 📁 data/              # 프론트엔드 정적 데이터
│   │   └── lawyers.js        # 초기 변호사 데이터 리스트 및 이미지 정보
│   │
│   ├── 📁 hooks/             # 재사용 가능한 로직 (Custom Hooks)
│   │   ├── useChatHistory.js # AI 상담 내역 저장/불러오기 훅
│   │   ├── useFavorites.js   # 변호사 찜하기 기능 훅
│   │   └── useReviews.js     # 리뷰 데이터 Firebase 통신(CRUD) 훅
│   │
│   ├── 📁 image/             # 변호사 프로필 등 앱 내 이미지 에셋
│   │
│   ├── 📁 pages/             # 📺 라우터에 연결되는 각각의 화면들
│   │   ├── MainPage.jsx      # 메인 홈페이지 (헤더, 변호사 추천, 리뷰 등)
│   │   ├── LawyerList.jsx    # 변호사 전체 목록 및 검색/필터 화면
│   │   ├── LawyerDetail.jsx  # 개별 변호사 상세 프로필 화면
│   │   ├── ChatBot.jsx       # AI 법률 상담(챗봇) 화면
│   │   ├── NewsPage.jsx      # 최신 법률 동향 및 뉴스 화면
│   │   ├── MyPage.jsx        # 마이페이지 (찜, 리뷰, 상담기록, 비교)
│   │   ├── LoginPage.jsx     # 로그인 화면
│   │   └── SignupPage.jsx    # 회원가입 화면
│   │
│   ├── App.jsx               # 전체 라우터 설정 및 기본 레이아웃 구성
│   ├── firebase.js           # Firebase 초기화 및 연동 설정
│   ├── index.css             # 앱 전체에 적용되는 글로벌 스타일시트
│   └── main.jsx              # React 애플리케이션 진입점(Entry)
│
├── 📄 .env                   # 환경 변수 (Firebase API Key 등 보안 정보)
├── 📄 firebase.json          # Firebase 프로젝트 기본 설정 파일
├── 📄 firestore.rules        # Firestore 데이터베이스 보안 접근 규칙
├── 📄 package.json           # 설치된 라이브러리 및 앱 실행 스크립트 정보
└── 📄 vite.config.js         # Vite 빌드 도구 설정 파일

