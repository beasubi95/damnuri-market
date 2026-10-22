# 담누리마켓 공동구매 랜딩페이지

GitHub Pages에서 실행할 수 있는 정적 웹사이트입니다.

## 파일 구성
- `index.html`: 페이지 콘텐츠
- `style.css`: 디자인과 반응형 레이아웃
- `script.js`: 상품 표시 로직

## GitHub Pages 배포
1. 저장소의 **Settings** 탭을 엽니다.
2. 왼쪽 메뉴에서 **Pages**를 선택합니다.
3. **Build and deployment**에서 `Deploy from a branch`를 선택합니다.
4. Branch를 `main`, 폴더를 `/(root)`로 선택하고 **Save**를 누릅니다.
5. 잠시 기다린 뒤 Pages 화면에 표시되는 사이트 주소를 확인합니다.

## 상품 등록
현재는 실제 판매 상품이나 가격을 임의로 넣지 않았습니다.
`script.js`의 `PRODUCTS` 배열에 아래와 같은 객체를 추가하면 상품 카드가 표시됩니다.

```js
const PRODUCTS = [
  {
    name: "실제 상품명",
    description: "상품의 특징을 간단히 소개합니다.",
    price: 19900,
    originalPrice: 25000,
    image: "https://example.com/product.jpg",
    url: "https://실제-구매-또는-신청-링크"
  }
];
```

이미지와 링크에는 운영자가 사용할 권한이 있는 실제 HTTPS 주소를 입력하세요.
상품의 가격, 기간, 배송비, 교환·반품 조건을 확인한 뒤 공개하세요.

## Google Sheets 연결
현재 버전에는 Google Sheets 연결이나 주문 저장 기능이 포함되어 있지 않습니다.
다음 단계에서 Google Apps Script 웹 앱을 통해 상품 목록을 읽고 신청 정보를 기록하도록 연결할 수 있습니다.

## 보안 주의
- 비밀번호, API 비밀키, 고객 개인정보를 GitHub 저장소에 올리지 마세요.
- 공개 시트에 고객 이름, 전화번호, 주소, 주문 정보가 노출되지 않도록 하세요.
- 실제 결제 기능은 포함되어 있지 않습니다. 결제는 신뢰할 수 있는 결제 서비스 또는 판매처 링크를 통해 처리하세요.
