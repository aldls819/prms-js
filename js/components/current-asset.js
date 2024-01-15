import { store, updateStorage } from "../store";
import { toHidden, toShow } from "../util";

const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");

export function initCurrentAsset() {
  renderCurrentAsset();
  addCurrentAssetEventListener();
}

function addCurrentAssetEventListener() {
  $currentAssetValue.addEventListener("click", function (event) {
    if (!store.isFirstEdit) return;
    toHidden(event.target);
    toShow($currentAssetInput);
    toShow($currentAssetButton);

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toHidden($currentAssetInput);
    toShow($currentAssetValue);
    toShow($addItemButton);

    store.currentFunds = Number($currentAssetInput.value);
    renderCurrentAsset();

    store.isFirstEdit = false;

    updateStorage();
  });
}

export function renderCurrentAsset() {
  //optional chaining 사용
  //store.currentFunds? -> store.currentFunds가 없을 경우 undefined 반환
  //undefined 대신 ?? 뒤에 대체할 수 있는 값을 "" 안에 표현해줄 수 있음
  $currentAssetValue.textContent = store.currentFunds?.toLocaleString() ?? "-";
  $currentAssetInput.value = store.currentFunds;
}
