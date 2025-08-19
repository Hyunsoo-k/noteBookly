## noteBookly
카카오의 브런치스토리를 참고하여 만든 에세이 데스크탑 전용 웹 애플리케이션 (모바일 전용은 별도로 개발 예정)

## 특징
tiptap을 이용한 WYSIWYG 구현과 WYSIWYG 내에서 이미지 리사이징, contenteditable요소와 react-hook-form의 결합을 중점으로 구현하였습니다.

## 기술 스택
- typescript
- react
- vite
- tiptap
- react-hook-form
- tanstack-query
- supabase

## 배포
Vercel

## 설치
```
npm install
```

## 개발환경 실행
```
npm run dev
```

## 폴더 구조
```
root
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ App.module.scss
│  ├─ App.tsx
│  ├─ assets
│  ├─ axios
│  ├─ components
│  ├─ editor
│  ├─ hooks
│  ├─ index.css
│  ├─ main.tsx
│  ├─ queryKey
│  ├─ supabase
│  ├─ types
│  ├─ utils
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
