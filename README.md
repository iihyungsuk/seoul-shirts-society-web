# Seoul Shirts Society

미니멀하고 현대적인 티셔츠 판매 웹사이트입니다. 세로로 긴 흰색 티셔츠 이미지를 배경으로 사용하며, 티셔츠 내부 영역 안에 판매 상품 카드들이 나열됩니다.

## 기술 스택

- Next.js 15 (App Router)
- React 19 + TypeScript
- 상태 관리: React Query (서버 상태), Zustand (클라이언트 상태)
- Tailwind CSS
- FSD (Feature-Sliced Design) 아키텍처

## 주요 기능

- 홈페이지 (티셔츠 목록)
- 제품 상세 페이지
- 장바구니 기능

## 로컬 개발 환경 설정

1. 저장소 클론

```bash
git clone https://github.com/your-username/seoul-shirts-society-web.git
cd seoul-shirts-society-web
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 서버 실행

```bash
pnpm dev
```

4. 브라우저에서 http://localhost:3000 접속

## 빌드 및 배포

프로덕션 빌드:

```bash
pnpm build
```

빌드 결과물 실행:

```bash
pnpm start
```

## 프로젝트 구조 (FSD)

```
app/               # Next.js App Router (route files만)
src/
  app/             # 글로벌 providers, 스타일, 설정
  pages/           # FSD 'pages' layer (비즈니스 로직)
  widgets/         # Composite UI 블록
  features/        # 사용자 상호작용 단위
  entities/        # 비즈니스 엔티티
  shared/          # 재사용 리소스(유틸, UI 키트 등)
```

## 라이센스

MIT
