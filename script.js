
/*
  담누리마켓 공동구매 홈페이지
  Google Sheets + Apps Script 자동 연동
*/

const API_URL =
  "https://script.google.com/macros/s/AKfycbyOz8xhcVUsQWtKUiQp06HjL3y_23JbMaGTHlabXOGf7AV4qtLkSaCTjKxs33bVX3epqg/exec";

document.getElementById("year").textContent =
  new Date().getFullYear();

const grid = document.getElementById("product-grid");
const note = document.getElementById("data-note");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function safeUrl(value) {
  try {
    const url = new URL(String(value || "").trim());

    return ["https:", "http:"].includes(url.protocol)
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("ko-KR");
}

function showMessage(message) {
  grid.innerHTML = "";
  note.textContent = message;
}

function renderProducts(products) {
  if (!Array.isArray(products)) {
    showMessage("상품 데이터 형식이 올바르지 않습니다.");
    return;
  }

  if (products.length === 0) {
    showMessage("현재 진행 중인 공동구매 상품이 없습니다.");
    return;
  }

  grid.innerHTML = products.map((product, index) => {
    const visualClass =
      ["visual-one", "visual-two", "visual-three"][index % 3];

    const name = escapeHtml(product.name || "상품명 없음");
    const description = escapeHtml(product.description || "");

    const price = Number(product.price || 0);
    const original = Number(product.originalPrice || 0);

    const discount = original > price && price > 0
      ? Math.round((1 - price / original) * 100)
      : 0;

    const originalMarkup = discount > 0
      ? `<del>${formatPrice(original)}원</del>
         <span class="discount">${discount}% OFF</span>`
      : "";

    const imageUrl = safeUrl(product.image);
    const purchaseUrl = safeUrl(product.url);

    const imageMarkup = imageUrl
      ? `<img src="${escapeHtml(imageUrl)}"
              alt="${name}"
              loading="lazy"
              style="width:100%;height:100%;object-fit:cover">`
      : `<span class="visual-icon" aria-hidden="true">✳</span>`;

    const button = purchaseUrl
      ? `<a class="secondary-button"
            href="${escapeHtml(purchaseUrl)}"
            target="_blank"
            rel="noopener noreferrer">
            공동구매 신청하기
         </a>`
      : `<span class="secondary-button">
           신청 링크 준비 중
         </span>`;

    const priceMarkup = price > 0
      ? `${originalMarkup}<strong>${formatPrice(price)}원</strong>`
      : `<strong>가격 문의</strong>`;

    return `
      <article class="product-card">
        <div class="product-visual ${visualClass}">
          <span class="product-label">공동구매</span>
          ${imageMarkup}
        </div>
        <div class="product-info">
          <p class="product-category">DAMNURI PICK</p>
          <h3>${name}</h3>
          <p class="product-description">${description}</p>
          <div class="price-row">${priceMarkup}</div>
          ${button}
        </div>
      </article>
    `;
  }).join("");

  note.textContent =
    "상품별 상세 조건은 신청 링크에서 확인해 주세요.";
}

// Google Apps Script JSONP 데이터 연결
function loadProducts() {
  showMessage("공동구매 상품을 불러오는 중입니다.");

  const callbackName =
    "damnuriCallback_" + Date.now();

  const script = document.createElement("script");
  let finished = false;

  const timeout = setTimeout(() => {
    finish();
    showMessage(
      "상품 정보를 불러오지 못했습니다. 잠시 후 새로고침해 주세요."
    );
  }, 15000);

  function finish() {
    if (finished) return false;
    finished = true;
    clearTimeout(timeout);
    delete window[callbackName];
    script.remove();
    return true;
  }

  window[callbackName] = function(data) {
    if (!finish()) return;

    if (data && data.error) {
      showMessage("상품 데이터를 확인할 수 없습니다.");
      return;
    }

    renderProducts(data);
  };

  script.onerror = function() {
    if (!finish()) return;
    showMessage(
      "상품 연결에 실패했습니다. Apps Script 배포 설정을 확인해 주세요."
    );
  };

  script.src =
    API_URL + "?callback=" + encodeURIComponent(callbackName);

  document.head.appendChild(script);
}

loadProducts();
