# Seoul Shirts Society - 디자인 가이드라인

## 색상 시스템

1. 배경색: `bg-neutral-50` (#f9fafb)
2. 주요 텍스트 색상: `text-neutral-900` (#111827)
3. 보조 텍스트 색상: `text-neutral-600` (#4b5563)
4. 경량 텍스트 색상: `text-neutral-500` (#6b7280)
5. 버튼 배경색: `bg-neutral-900` (#111827)
6. 버튼 텍스트 색상: `text-white` (#ffffff)
7. 흰색 배경: `bg-white` (#ffffff)
8. 경계선 색상: `border-neutral-300` (#d1d5db)
9. 호버 경계선 색상: `hover:border-neutral-400` (#9ca3af)
10. 스켈레톤 로딩 색상: `bg-neutral-200` (#e5e7eb)

## 타이포그래피

11. 기본 폰트: Pretendard
12. 문서 기본 텍스트 크기: `text-base`
13. 제목 텍스트 크기: `text-3xl` (모바일), `text-6xl` (데스크톱), `text-7xl` (대형 화면)
14. 카드 타이틀 크기: `text-xs`
15. 가격 텍스트 크기: `text-xs`
16. 제품 상세 페이지 제목: `text-3xl` (모바일), `text-4xl` (데스크톱)
17. 제품 설명 텍스트: `text-lg`
18. 카테고리 라벨: `text-sm`, `uppercase`, `tracking-wide`
19. 헤더 로고 크기: `text-xl`
20. 푸터 텍스트 크기: `text-sm`

## 간격 및 여백

21. 기본 페이지 패딩: `p-8`
22. 컨텐츠 최대 너비: `max-w-6xl`
23. 제품 그리드 간격: `gap-3` (모바일), `gap-4` (데스크톱)
24. 제품 카드 내부 패딩: `px-3 py-1`
25. 헤더 패딩: `px-6 py-4`
26. 푸터 패딩: `px-6 py-8`
27. 중앙 메시지 상단 여백: `mt-[25%]`
28. 제품 그리드 상단 여백: `mt-16` (모바일), `mt-20` (데스크톱)
29. 섹션 간 여백: `space-y-6`
30. 가격 상단 여백: `mt-2`

## 반응형 디자인 중단점

31. 모바일 기준점: 기본 스타일
32. 태블릿 기준점: `md:` (768px)
33. 데스크톱 기준점: `lg:` (1024px)
34. 너비 조정 (모바일): `w-[calc(50%-6px)]`
35. 너비 조정 (태블릿): `md:w-[calc(33.333%-11px)]`
36. 컬럼 레이아웃 (모바일): 2열
37. 컬럼 레이아웃 (태블릿/데스크톱): 3열
38. 제품 상세 레이아웃 (모바일): 1열
39. 제품 상세 레이아웃 (데스크톱): 2열
40. 푸터 레이아웃 (모바일): 세로 정렬, `flex-col`

## 그리드 및 레이아웃

41. 홈 컨테이너: `relative overflow-x-hidden`
42. 티셔츠 이미지 포지셔닝: `relative -ml-[40vw] w-[180vw]`
43. 제품 그리드 레이아웃: `flex flex-wrap`
44. 제품 상세 그리드: `grid grid-cols-1 gap-8 lg:grid-cols-2`
45. 헤더 레이아웃: `flex items-center justify-between`
46. 푸터 레이아웃: `flex flex-col items-center justify-between gap-4 md:flex-row`
47. 사이즈 선택 그리드: `grid grid-cols-4 gap-2`
48. 컬러 선택 레이아웃: `flex gap-2`
49. 수량 조절 레이아웃: `flex items-center gap-4`
50. 전체 페이지 높이: `min-h-screen`

## 카드 디자인

51. 제품 카드 종횡비: `aspect-square`
52. 카드 라운딩: `rounded-lg`
53. 카드 그림자: `shadow-sm`, `hover:shadow-md`
54. 카드 이미지 영역: `relative flex-1`
55. 카드 이미지 패딩: `p-2`
56. 이미지 크기 조정: `object-contain`
57. 호버 시 이미지 확대: `group-hover:scale-105`
58. 카드 텍스트 영역 높이: `min-h-0 flex-shrink-0`
59. 텍스트 자름 처리: `truncate`
60. 카드 배경색: `bg-white`

## 버튼 디자인

61. 기본 버튼 높이: `py-4`
62. 사이즈 선택 버튼: `border py-2 text-sm font-medium`
63. 색상 선택 버튼: `rounded-full border-2 px-4 py-2 text-sm font-medium capitalize`
64. 수량 조절 버튼 크기: `h-10 w-10`
65. 버튼 활성화 상태: `border-neutral-900 bg-neutral-900 text-white`
66. 버튼 비활성화 상태: `border-neutral-300 bg-white text-neutral-900`
67. 장바구니 버튼 너비: `w-full`
68. 버튼 전환 효과: `transition-colors`
69. 버튼 마우스 호버: `hover:border-neutral-400`
70. 버튼 정렬: `items-center justify-center`

## 컴포넌트 특수 효과

71. 이미지 전환 효과: `transition-transform`
72. 카드 전환 효과: `transition-all`
73. 회전 애니메이션: `animate-pulse`
74. 배경 블러 효과: `backdrop-blur-sm`
75. 헤더 배경 투명도: `bg-white/80`
76. Z-인덱스 계층: `z-50` (헤더)
77. 스크롤 동작: `scroll-behavior: smooth`
78. 텍스트 줄바꿈 방지: `whitespace-nowrap`
79. 오버플로우 처리: `overflow-hidden`
80. 요소 정렬: `items-center`

## 이미지 및 미디어

81. 제품 이미지 크기 조정: `object-cover` (상세 페이지)
82. 티셔츠 배경 이미지 크기: `h-auto w-full`
83. 이미지 우선순위: `priority` (중요 이미지)
84. 이미지 크기 지정: `fill` (컴포넌트 전체 채우기)
85. 크기 응답형: `sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"`
86. 장바구니 아이콘 크기: `width="24" height="24"`
87. 아이콘 선 두께: `strokeWidth={1.5}`
88. 아이콘 선 모양: `strokeLinecap="round" strokeLinejoin="round"`
89. 상품 배지 크기: `h-5 w-5`
90. 배지 위치: `absolute -right-2 -top-2`

## 상호작용 및 상태

91. 링크 호버 효과: `hover:text-neutral-900`
92. 버튼 비활성화 상태: `disabled`
93. 로딩 상태 표시: `isLoading ? <스켈레톤> : <컨텐츠>`
94. 선택된 사이즈/색상 강조: 선택된 항목에 `border-neutral-900 bg-neutral-900 text-white` 적용
95. 오류 상태 표시: 오류 시 별도의 UI로 표시
96. 장바구니 아이템 카운트 표시: `totalItems > 0` 조건부 렌더링
97. 마우스 그룹 호버: `group-hover:` 클래스 활용
98. 스크롤바 커스터마이징: `::-webkit-scrollbar` 스타일링
99. 스크롤바 호버 효과: `hover:bg-neutral-400`
100.  포커스 시각적 피드백: 선택 요소에 시각적 강조 적용
