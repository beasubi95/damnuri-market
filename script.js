/*
  담누리마켓 랜딩페이지
  다음 단계에서 Google Sheets / Apps Script 연결을 추가할 수 있습니다.
  지금은 샘플 상품을 표시하지 않고, 운영자가 등록한 상품만 보이도록 기본 안내를 표시합니다.
*/
document.getElementById("year").textContent = new Date().getFullYear();

// 다음 단계에서 아래 PRODUCTS 배열에 상품 정보를 입력하거나,
// Google Apps Script 웹 앱 주소를 연결해 시트의 상품 목록을 불러오도록 확장할 수 있습니다.
const PRODUCTS = [];

const grid = document.getElementById("product-grid");
const note = document.getElementById("data-note");

if (PRODUCTS.length > 0) {
  grid.innerHTML = PRODUCTS.map((product, index) => {
    const visualClass = ["visual-one", "visual-two", "visual-three"][index % 3];
    const price = Number(product.price || 0).toLocaleString("ko-KR");
    const original = Number(product.originalPrice || 0);
    const originalMarkup = original > Number(product.price || 0)
      ? `<del>${original.toLocaleString("ko-KR")}원</del><span class="discount">${Math.round((1 - Number(product.price) / original) * 100)}% OFF</span>`
      : "";
    const imageMarkup = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" style="width:100%;height:100%;object-fit:cover">`
      : `<span class="visual-icon" aria-hidden="true">✳</span>`;
    const button = product.url
      ? `<a class="secondary-button" href="${escapeHtml(product.url)}" target="_blank" rel="noopener noreferrer">공동구매 신청하기</a>`
      : `<span class="secondary-button">신청 링크 준비 중</span>`;
    return `<article class="product-card">
      <div class="product-visual ${visualClass}"><span class="product-label">공동구매</span>${imageMarkup}</div>
      <div class="product-info"><p class="product-category">DAMNURI PICK</p>
      <h3>${escapeHtml(product.name)}</h3><p class="product-description">${escapeHtml(product.description || "")}</p>
      <div class="price-row">${originalMarkup}<strong>${price}원</strong></div>${button}</div>
    </article>`;
  }).join("");
  note.textContent = "상품별 상세 조건은 신청 링크에서 확인해 주세요.";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
