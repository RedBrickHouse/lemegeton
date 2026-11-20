"use strict";

(() => {
  const english = {
    combatTitle:"Combat", combatIntro:"Logan fights with a human blade and demonic power. When his Brand fills, you decide when to change form.",
    combatHuman:"Human swordplay", combatDemon:"Demonic power", combatFootage:"Gameplay footage",
    buildTitle:"What survives a run", buildCopy:"Try new combinations of cards and demonic skills each time you return. Even when Logan falls, the Brand carved into his flesh endures.",
    buildCards:"Cards", buildSkills:"Demonic skills", buildNodes:"Permanent Brand nodes",
    realmTitle:"The Black Realm", realmIntro:"The paths shift each time you enter. Watch for traps, rest at a healing spring, and earn demonic skills by surviving the trials at the altar.",
    realmForest:"Forest path", realmBoss:"Boss battle", realmMerchant:"Demon Merchant", realmContract:"Contract",
    newsTitle:"Latest news", newsAll:"All news", newsGstar:"Play Lemegeton at G-STAR 2026", newsGstarDetail:"November 19–22 at the RED BRICK HOUSE booth, BEXCO Exhibition Center 2, 1F, Busan.",
    newsPartner:"WILDPLAN signs a publishing agreement with RED BRICK HOUSE", infoTitle:"Game details", infoRelease:"Release", infoSoon:"Coming soon", infoPlatform:"Platform",
    infoGenre:"Genre", infoRogue:"Single-player action roguelite", infoControl:"Controls", infoPad:"Full controller support", infoSpecs:"PC requirements on Steam"
  };
  const chinese = {
    combatTitle:"战斗方式", combatIntro:"洛根以人类的剑术和恶魔之力战斗。烙印蓄满后，何时变身由你决定。",
    combatHuman:"人类剑术", combatDemon:"恶魔之力", combatFootage:"实机画面",
    buildTitle:"死亡也抹不去的烙印", buildCopy:"每次重返黑域，都能尝试不同的卡牌与恶魔技能组合。即使洛根倒下，刻在身上的烙印也会留下。",
    buildCards:"卡牌", buildSkills:"恶魔技能", buildNodes:"永久烙印节点",
    realmTitle:"探索黑域", realmIntro:"每次进入黑域，道路都会变化。避开机关，在恢复之泉稍作喘息。通过祭坛的试炼，就能获得恶魔技能。",
    realmForest:"林间小径", realmBoss:"首领战", realmMerchant:"恶魔商人", realmContract:"契约",
    newsTitle:"开发动态", newsAll:"全部动态", newsGstar:"在 G-STAR 2026 试玩 Lemegeton", newsGstarDetail:"11月19日至22日，釜山 BEXCO 第二展馆一楼，RED BRICK HOUSE 展位。",
    newsPartner:"WILDPLAN 与 RED BRICK HOUSE 签订发行协议", infoTitle:"游戏信息", infoRelease:"发售日期", infoSoon:"即将推出", infoPlatform:"平台",
    infoGenre:"类型", infoRogue:"单人动作肉鸽", infoControl:"操作方式", infoPad:"完全支持控制器", infoSpecs:"在 Steam 查看配置要求"
  };
  window.GAME_BODY = { en:english, zh:chinese };

  const combat = document.getElementById("fight");
  const realm = document.getElementById("realm");
  const video = document.getElementById("combat-player");
  if (!combat || !realm || !video) return;
  const forms = [...combat.querySelectorAll("[data-form]")];
  const scenes = [...realm.querySelectorAll("[data-scene]")];
  const image = document.getElementById("scene-image");
  const descriptions = {
    ko: {
      groups:["전투 방식","흑역 스크린샷"],
      human:["적의 공격이 닿는 순간 검을 들어 받아친다. 상대의 자세가 무너지면 파고들어 마지막 일격을 가한다.","로건이 검으로 적의 공격을 받아치는 장면"],
      demon:["악마로 변한 로건은 한층 빨라진 공격으로 적을 몰아붙인다.","악마로 변신한 로건이 연달아 적을 공격하는 장면"],
      trap:["함정 발판", "통로에 깔린 발판을 밟으면 사슬낫이 날아들거나 불길이 솟는다.", "횃불이 켜진 통로 한가운데 붉게 표시된 직사각형 발판"],
      fissure:["갈라진 전장", "돌바닥에 붉은 선이 번지고, 사방에서 적이 다가온다.", "돌바닥에 붉은 균열이 번지는 전투 장면"],
      forest:["숲길","풀이 우거진 숲길에서 로건과 적이 검을 맞댄다.","풀과 바위 사이로 난 흙길에서 적과 검을 맞대는 로건"],
      boss:["보스전","공중에 뜬 가프 아래로 붉은 충격파가 번진다.","날개 달린 가프와 돌바닥 위로 퍼지는 붉은 충격파"],
      merchant:["악마상인","악마상인은 여러 계약을 내민다. 어떤 계약을 고르느냐에 따라 치러야 할 대가가 달라진다.","흑역에서 악마상인과 마주한 로건"],
      contract:["계약","계약을 고르기 전에 얻는 힘과 그 대가를 함께 확인할 수 있다.","세 개의 붉은 인장이 나란히 놓인 계약 선택 화면"]
    },
    en: {
      groups:["Combat style","Black Realm screenshots"],
      human:["Parry just as the blow lands. When your enemy’s stance breaks, move in for a finishing strike.","Gameplay of Logan parrying an attack with his sword"],
      demon:["Once the Brand fills, transform into a demon to unleash a flurry of faster, harder strikes.","Gameplay of Logan chaining attacks in demon form"],
      trap:["Pressure plate", "A step in the wrong place can trigger a chain blade or a burst of flame. Watch your footing in narrow passages.", "A rectangular plate glows red in a torchlit corridor"],
      fissure:["Fractured ground", "Red lines spread across the floor. Look for a gap as enemies close in.", "Red cracks spread across the stone floor during a battle"],
      forest:["Forest path","A path you know can lead somewhere new on your next visit.","Logan crosses blades with an enemy on a dirt path through the woods"],
      boss:["Boss battle","Six bosses and over thirty kinds of demons roam the Black Realm. Even the largest enemies signal their attacks.","A towering boss sends a red attack toward Logan"],
      merchant:["Demon Merchant","The Demon Merchant offers a contract. Every power you borrow comes with terms.","Logan meets the Demon Merchant in the Black Realm"],
      contract:["Contract","Keep drawing on a borrowed power and corruption deepens. In time it comes back as a curse.","Three red seals in the contract selection screen"]
    },
    zh: {
      groups:["战斗方式","黑域截图"],
      human:["在攻击命中的瞬间举剑格挡。等敌人的架势崩溃，便可近身打出终结一击。","洛根持剑格挡敌人攻击的实机片段"],
      demon:["烙印蓄满后化身恶魔，以更快、更猛烈的攻势连续出击。","洛根化身恶魔后连续出击的实机片段"],
      trap:["机关踏板", "踩错踏板会触发锁镰或火焰。在狭窄的通道里，注意脚下。", "火炬照亮的通道中，一块长方形踏板泛着红光"],
      fissure:["开裂的战场", "红色裂纹在地面蔓延。敌人围上来时，要找到可以突围的空隙。", "战斗中的石地上蔓延着红色裂纹"],
      forest:["林间小径","熟悉的道路，下次可能会通向别处。","洛根在林间小道上与敌人交剑"],
      boss:["首领战","黑域中有六个首领和三十多种恶魔。再庞大的敌人，出招前也会露出征兆。","高大的首领向洛根发动红色攻击"],
      merchant:["恶魔商人","途中遇见的恶魔商人会递来契约。借用每一份力量，都有相应的条件。","洛根在黑域遇见恶魔商人"],
      contract:["契约","越是借用商人给的力量，堕落就越深，最终会化为诅咒。","契约选择界面上的三枚红色印记"]
    }
  };
  const styleGroup = combat.querySelector(".combat-tabs");
  const sceneGroup = realm.querySelector(".scene-list");
  let language = "ko";
  let form = "human";
  let selected = 0;

  function renderCombat() {
    const [summary, label] = descriptions[language][form];
    document.getElementById("combat-summary").textContent = summary;
    video.setAttribute("aria-label", label);
  }

  function selectCombat(button) {
    const next = button.dataset.form;
    if (next === form) return;
    const playing = !video.paused && !video.ended;
    form = next;
    video.pause();
    video.poster = "assets/" + form + ".webp";
    video.querySelector("source").src = "assets/" + form + ".mp4";
    video.load();
    forms.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderCombat();
    if (playing) video.play().catch(() => {});
  }

  function renderScene() {
    const key = scenes[selected].dataset.scene;
    const copy = descriptions[language];
    const [title, description, alt] = copy[key];
    const src = scenes[selected].querySelector("img").getAttribute("src");
    image.src = src;
    image.alt = alt;
    scenes.forEach((item, i) => item.setAttribute("aria-pressed", String(i === selected)));
    document.getElementById("scene-description").textContent = description;
    document.getElementById("scene-caption").textContent = title;
  }

  function navigateGroup(group, items) {
    group.addEventListener("keydown", (event) => {
      const i = items.indexOf(event.target);
      if (i < 0 || event.altKey || event.metaKey || event.ctrlKey) return;
      let next;
      if (event.key === "ArrowRight") next = (i + 1) % items.length;
      if (event.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = items.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      items[next].focus();
      items[next].click();
    });
  }

  function setLanguage(next) {
    language = Object.hasOwn(descriptions, next) ? next : "ko";
    const copy = descriptions[language];
    styleGroup.setAttribute("aria-label", copy.groups[0]);
    sceneGroup.setAttribute("aria-label", copy.groups[1]);
    renderCombat();
    renderScene();
  }

  forms.forEach((button) => button.addEventListener("click", () => selectCombat(button)));
  scenes.forEach((button, index) => button.addEventListener("click", () => {selected = index;renderScene();}));
  navigateGroup(styleGroup, forms);
  navigateGroup(sceneGroup, scenes);

  document.addEventListener("visibilitychange", () => {if (document.hidden) video.pause();});
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {if (!entries[0].isIntersecting) video.pause();}).observe(video);
  }
  styleGroup.hidden = false;
  sceneGroup.hidden = false;
  window.addEventListener("game-language", (event) => setLanguage(event.detail));
  setLanguage("ko");
})();
