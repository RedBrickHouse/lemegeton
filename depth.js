"use strict";

(() => {
  const english = {
    depthEnemyTitle: "Demons and bosses",
    depthEnemyLead: "Six bosses and more than thirty kinds of demon inhabit the Black Realm. Watch for the movement that gives an attack away. Time your parry, break their stance, and move in for the finishing blow.",
    depthBossWatch: "Watch boss fight", depthDemonWatch: "Watch combat",
    depthBossName: "The winged boss", depthBossCaption: "On a narrow path beside the flames, the winged boss presses Logan back.",
    depthDemonName: "At close quarters", depthDemonCaption: "Red light cuts across the ground as Logan strikes back at point-blank range.",
    depthPactTitle: "The Demon Merchant’s contract",
    depthPactLead: "The merchant in the Black Realm offers power for a price. The more you draw on it, the deeper the corruption takes root. In time, it returns as a curse.",
    depthDeal: "Give up 20 maximum health for 20 attack power.", depthOfferOpen: "See the terms", depthOfferClose: "Return to the merchant",
    depthMerchantName: "Meeting the Demon Merchant", depthContractName: "Blood Contract — Terms",
    depthMerchantAlt: "Logan meets the Demon Merchant beside a torchlit stone pillar.", depthContractAlt: "Blood Contract is selected. Maximum health falls from 100 to 80, and attack power increases by 20."
  };
  const chinese = {
    depthEnemyTitle: "恶魔与首领",
    depthEnemyLead: "黑域中盘踞着六位首领和三十多种恶魔。留意敌人出招前的动作，抓准时机弹反，击溃架势，再趁势打出终结一击。",
    depthBossWatch: "观看首领战", depthDemonWatch: "观看战斗",
    depthBossName: "有翼首领", depthBossCaption: "在烈焰旁的狭道上，有翼的首领将洛根逼向一角。",
    depthDemonName: "近身交锋", depthDemonCaption: "红光划过地面，洛根近身反击。",
    depthPactTitle: "恶魔商人的契约", depthPactLead: "黑域中的商人愿意交出力量，却要你付出代价。这股力量用得越多，堕落就越深，最终化为诅咒。",
    depthDeal: "以 20 点生命上限换取 20 点攻击力。", depthOfferOpen: "查看契约条件", depthOfferClose: "回到商人处",
    depthMerchantName: "与恶魔商人相遇", depthContractName: "Blood Contract 契约条件",
    depthMerchantAlt: "洛根在火把照亮的石柱旁遇见恶魔商人。", depthContractAlt: "选中的 Blood Contract 将生命上限从 100 降至 80，攻击力增加 20。"
  };
  const selected = document.getElementById("pact-image");
  const toggle = document.getElementById("pact-switch");
  const legend = document.getElementById("pact-caption");
  const label = toggle.querySelector("span");
  const arrow = toggle.querySelector("i");
  const korean = {
    ...Object.fromEntries([...document.querySelectorAll("#encounters [data-t], #pact [data-t]")].map((element) => [element.dataset.t, element.textContent])),
    depthMerchantAlt: selected.alt,
    depthContractAlt: "Blood Contract 선택 화면. 최대 체력이 100에서 80으로 줄고 공격력이 20 오른다.",
    depthMerchantName: legend.textContent,
    depthContractName: "Blood Contract 조건",
    depthOfferClose: "상인에게 돌아가기"
  };
  const languageCopy = {ko:korean, en:english, zh:chinese};
  window.DEPTH_COPY = languageCopy;
  let language = "ko";
  let contractVisible = false;

  function syncOffer() {
    const text = languageCopy[language];
    const titleKey = contractVisible ? "depthContractName" : "depthMerchantName";
    const altKey = contractVisible ? "depthContractAlt" : "depthMerchantAlt";
    const path = contractVisible ? "assets/contract.webp" : "assets/merchant.webp";
    if (selected.getAttribute("src") !== path) selected.src = path;
    selected.alt = text[altKey];
    selected.dataset.altT = altKey;
    legend.textContent = text[titleKey];
    label.textContent = text[contractVisible ? "depthOfferClose" : "depthOfferOpen"];
    arrow.textContent = contractVisible ? "←" : "→";
    toggle.href = contractVisible ? "assets/merchant.webp" : "assets/contract.webp";
    toggle.setAttribute("aria-expanded", String(contractVisible));
  }

  toggle.setAttribute("role", "button");
  toggle.setAttribute("aria-controls", "pact-image pact-caption");
  toggle.addEventListener("click", (event) => {
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey || event.defaultPrevented) return;
    event.preventDefault();
    contractVisible = !contractVisible;
    syncOffer();
  });
  toggle.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      event.preventDefault();
      toggle.click();
    }
  });
  window.addEventListener("game-language", (event) => {
    language = Object.hasOwn(languageCopy,event.detail) ? event.detail : "ko";
    syncOffer();
  });
  syncOffer();
})();
