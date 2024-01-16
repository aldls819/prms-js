import { renderCurrentAsset } from "../components/current-asset";
import { store, removeHistory } from "../store";

const $sectionHistory = document.querySelector(".history");

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(dateid, itemid);
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

export function renderHistoryList() {
  // TODO: 데이터 매핑
  // TODO: 오름차순으로 목록 나열
  // TODO: 항목의 시간 포맷 변경: `HH:mm`
  // TODO: 금액 콤마 포맷 맞추기

  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      //detail 배열이 존재하지 않으면 아무것도 렌더링 되지 않도록 처리
      if (!detail?.length) return "";

      // ` ` 내부에 js 변수 넣기 -> ${}
      // 배열을 문자열로 변환 -> join 사용
      return `<article class="history-per-day">
      <p class="history-date">2021년 12월 1일</p>

      ${detail
        .map(({ description, category, amount, fundAtTheTime, createAt }) => {
          return `<section class="history-item">
        <section class="history-item-column">
          <div class="create-at">${createAt}</div>
          <div class="history-detail">
            <div class="history-detail-row history-detail-title">
              <p>${description}</p>
            </div>
            <div class="history-detail-row history-detail-subtitle">
              <p>${category}</p>
              <p>
                ${amount}
                <span>원</span>
              </p>
            </div>
          </div>
          <div class="delete-section">
            <button class="delete-button">🗑</button>
          </div>
        </section>
        <section class="history-item-caption">
          <p>
            <span>남은 자산</span>
            <span>${fundAtTheTime}</span>
            <span>원</span>
          </p>
        </section>
      </section>`;
        })
        .join("")}
      
    </article>`;
    })
    .join("");
}
