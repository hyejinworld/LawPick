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
lawpick/
├── node_modules/       # 외부 라이브러리 폴더 (Git 제외)
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   │   └── Navbar.jsx
│   ├── data/           # 정적 데이터 관리
│   │   └── lawyers.js
│   ├── image/          # 프로젝트 내부 이미지 리소스
│   ├── pages/          # 페이지 단위 컴포넌트
│   │   ├── ChatBot.jsx
│   │   ├── LawyerDetail.jsx
│   │   ├── LawyerList.jsx
│   │   ├── MainPage.jsx
│   │   └── NewsPage.jsx
│   ├── App.jsx         # 메인 어플리케이션 로직
│   ├── index.css       # 글로벌 스타일시트
│   └── main.jsx        # 엔트리 포인트 (ReactDOM 랜더링)
├── generate_lawyers.js # 데이터 생성 스크립트
├── index.html          # 메인 HTML 파일
├── lawyers.jpg         # 프로젝트 관련 이미지
├── package-lock.json   # 의존성 잠금 파일
├── package.json        # 프로젝트 정보 및 종속성 관리
├── split_image.js      # 이미지 처리 관련 스크립트
└── vite.config.js      # Vite 설정 파일
