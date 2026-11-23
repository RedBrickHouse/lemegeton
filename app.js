"use strict";

(() => {
  const byId = (id) => document.getElementById(id);
  const labels = [...document.querySelectorAll("[data-t]")];
  const ariaLabels = [...document.querySelectorAll("[data-aria-t]")];
  const altLabels = [...document.querySelectorAll("[data-alt-t]")];
  const korean = {
    ...window.DEPTH_COPY?.ko, ...window.BUILD_COPY?.ko,
    motionPause:"티저 일시정지", motionReplay:"티저 다시 재생",
    ...Object.fromEntries(labels.map((el) => [el.dataset.t, el.textContent])),
    ...Object.fromEntries(ariaLabels.map((el) => [el.dataset.ariaT, el.getAttribute("aria-label")])),
    ...Object.fromEntries(altLabels.map((el) => [el.dataset.altT, el.alt])),
    title:document.title, description:document.querySelector('meta[name="description"]').content
  };
  const translations = {
    ko:korean,
    en:{
      ...window.GAME_BODY?.en, ...window.DEPTH_COPY?.en, ...window.BUILD_COPY?.en,
      skip:"Skip to content", home:"Lemegeton home", nav:"Main navigation", navStory:"Story", navCombat:"Combat", navMedia:"Black Realm", navNews:"News", language:"Display language", menu:"Menu",
      heroTitle:"Lemegeton", heroLine:"Logan carved a demon’s name into his flesh.", wish:"Wishlist on Steam", watch:"Watch with sound", soon:"Coming soon",
      storyTitle:"The Black Baptism", storyOne:"The Black Baptism turned people into demons. Only the walls of Novar held them back.",
      storyTwo:"A human blade could not touch a demon. Logan carved a demon’s name into his flesh and walked beyond the walls alone.",
      storyAlt:"A silver-haired figure stands beside a burning gate.", trailerTitle:"Lemegeton — Official teaser", close:"Close", openVideo:"Open video file",
      title:"Lemegeton | Official website", description:"An action roguelite of human swordplay and demonic power. Watch the official teaser, see combat in action, and explore the Black Realm.",
      navPact:"Contracts",
      navBuild:"Progression",
      heroGenre:"Dark fantasy action roguelite",
      discover:"Explore the game",
      jumpBoss:"Demons & bosses",
      jumpPact:"The Demon Merchant",
      jumpBuild:"Cards & Brands",
      motionStart:"Play teaser",
      motionPause:"Pause teaser",
      motionReplay:"Replay teaser",
      storyNext:"See Logan in combat",
      realmTrap:"Pressure plate",
      realmFissure:"Red sigils",
      newsDev:"Dev diary · Building one-against-many combat",
      newsDevDetail:"WILDPLAN on developing fights against multiple enemies."
    },
    zh:{
      ...window.GAME_BODY?.zh, ...window.DEPTH_COPY?.zh, ...window.BUILD_COPY?.zh,
      skip:"跳到正文", home:"Lemegeton 主页", nav:"主导航", navStory:"世界观", navCombat:"战斗", navMedia:"探索黑域", navNews:"动态", language:"显示语言", menu:"菜单",
      heroTitle:"Lemegeton", heroLine:"洛根将恶魔的名字刻进了身体。", wish:"加入 Steam 愿望单", watch:"开启声音观看", soon:"即将推出",
      storyTitle:"黑色洗礼", storyOne:"黑色洗礼降临，人们化作恶魔。只有诺瓦尔的城墙挡住了它们。",
      storyTwo:"人类的刀刃伤不到恶魔。洛根将恶魔的名字刻进身体，提剑独自走出了城墙。", storyAlt:"燃烧的大门旁站着一个银发身影。",
      trailerTitle:"Lemegeton 官方预告片", close:"关闭", openVideo:"打开视频文件", title:"Lemegeton | 官方网站", description:"以人类剑术与恶魔之力战斗的动作肉鸽游戏。观看官方预告片、实机战斗与黑域截图。",
      navPact:"契约",
      navBuild:"成长",
      heroGenre:"暗黑奇幻动作肉鸽",
      discover:"探索游戏",
      jumpBoss:"恶魔与首领",
      jumpPact:"恶魔商人的契约",
      jumpBuild:"卡牌与烙印",
      motionStart:"播放预告片",
      motionPause:"暂停预告片",
      motionReplay:"重播预告片",
      storyNext:"查看洛根的战斗",
      realmTrap:"机关踏板",
      realmFissure:"红色法阵",
      newsDev:"开发日志 · 打造以一敌多的战斗",
      newsDevDetail:"WILDPLAN 分享如何设计与多个敌人同时交战的体验。"
    }
  };
  const steam = {ko:"koreana",en:"english",zh:"schinese"};
  const select = byId("language");
  function setLanguage(value) {
    const lang = Object.hasOwn(translations, value) ? value : "ko";
    const copy = translations[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    select.value = lang;
    labels.forEach((el) => el.textContent = copy[el.dataset.t] ?? korean[el.dataset.t]);
    ariaLabels.forEach((el) => el.setAttribute("aria-label", copy[el.dataset.ariaT] ?? korean[el.dataset.ariaT]));
    altLabels.forEach((el) => el.alt = copy[el.dataset.altT] ?? korean[el.dataset.altT]);
    document.title = copy.title;
    document.querySelector('meta[property="og:title"]').content = copy.title;
    document.querySelector('meta[property="og:description"]').content = copy.description;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelectorAll('a[href^="https://store.steampowered.com/"]').forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set("l", steam[lang]);link.href = url.href;
    });
    window.dispatchEvent(new CustomEvent("game-language",{detail:lang}));
  }

  const header = byId("top");
  const toggle = byId("menu-button");
  const nav = byId("main-nav");
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks.map((link) => byId(link.hash.slice(1)));
  const compact = matchMedia("(max-width: 760px)");
  function closeMenu() {
    header.removeAttribute("data-menu-open");toggle.setAttribute("aria-expanded","false");
  }
  function resizeMenu() {
    closeMenu();
    toggle.hidden = !compact.matches;
  }
  header.dataset.enhanced = "";
  resizeMenu();
  compact.addEventListener("change", resizeMenu);
  toggle.addEventListener("click", () => {
    if (header.hasAttribute("data-menu-open")) {closeMenu(); return;}
    header.setAttribute("data-menu-open","");
    toggle.setAttribute("aria-expanded","true");
    navLinks[0].focus({preventScroll:true});
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !header.hasAttribute("data-menu-open")) return;
    closeMenu();
    const section = byId(link.hash.slice(1));
    section.setAttribute("tabindex","-1");section.focus({preventScroll:true});
  });
  document.addEventListener("pointerdown",(event) => {if (!header.contains(event.target)) closeMenu();});
  header.addEventListener("focusout",(event) => {if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();});
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.hasAttribute("data-menu-open")) {closeMenu();toggle.focus();}
  });

  let frame = 0;
  function markCurrent() {
    frame = 0;
    const line = header.offsetHeight + 36;
    let current = -1;
    sections.forEach((section,index) => {if (section.getBoundingClientRect().top <= line) current = index;});
    if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) current = sections.length - 1;
    navLinks.forEach((link,index) => {
      if (index === current) link.setAttribute("aria-current","location");
      else link.removeAttribute("aria-current");
    });
  }
  function scheduleMark() {if (!frame) frame = requestAnimationFrame(markCurrent);}
  window.addEventListener("scroll",scheduleMark,{passive:true});
  window.addEventListener("resize",scheduleMark);
  document.fonts.ready.then(scheduleMark);

  const hero = byId("home");
  const motion = hero.querySelector(".hero-motion");
  const motionButton = byId("motion-toggle");
  const filmDialog = byId("trailer-dialog");
  const film = byId("trailer-player");
  const artDialog = byId("art-dialog");
  const art = byId("art-image");
  const teaserLink = hero.querySelector("[data-trailer]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let wantsPlayback = !reducedMotion.matches;
  let pausedByUser = false;
  let heroVisible = false;
  let finished = false;
  let mediaOpener = null;

  function updateMotion() {
    const moving = !motion.paused && !motion.ended;
    hero.toggleAttribute("data-moving", moving && motion.readyState >= 2);
    hero.toggleAttribute("data-paused-frame", !moving && !finished && !motion.error && motion.currentTime > 0 && motion.readyState >= 2);
    motionButton.setAttribute("aria-pressed", String(moving));
    const label = finished ? "motionReplay" : moving ? "motionPause" : "motionStart";
    motionButton.querySelector("span").textContent = translations[select.value][label];
  }
  function syncMotion() {
    if (!wantsPlayback || !heroVisible || document.hidden || mediaOpener || document.querySelector("dialog[open]")) {
      motion.pause();
      return;
    }
    if (!motion.paused) return;
    if (!motion.hasAttribute("src")) motion.src = teaserLink.href;
    motion.play().catch((error) => {
      if (error.name === "AbortError") return;
      wantsPlayback = false;
      updateMotion();
    });
  }
  function finishTeaser() {
    finished = true;
    wantsPlayback = false;
    motion.pause();
    updateMotion();
  }
  motionButton.hidden = false;
  motionButton.addEventListener("click", () => {
    wantsPlayback = motion.paused || finished;
    pausedByUser = !wantsPlayback;
    if (finished) motion.currentTime = 0;
    finished = false;
    if (motion.error) motion.load();
    syncMotion();
  });
  ["playing","pause","loadeddata","seeked"].forEach((eventName) => motion.addEventListener(eventName, updateMotion));
  motion.addEventListener("ended", finishTeaser);
  motion.addEventListener("error", () => { wantsPlayback = false; updateMotion(); });
  reducedMotion.addEventListener("change", () => {
    wantsPlayback = !reducedMotion.matches && !pausedByUser && !finished;
    syncMotion();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncMotion();
    }).observe(hero);
  } else {
    const checkVisibility = () => {
      const rect = hero.getBoundingClientRect();
      heroVisible = rect.bottom > 0 && rect.top < innerHeight;
      syncMotion();
    };
    window.addEventListener("scroll", checkVisibility, {passive:true});
    checkVisibility();
  }
  const dialogObserver = new MutationObserver(syncMotion);
  document.querySelectorAll("dialog").forEach((dialog) => dialogObserver.observe(dialog, {attributes:true, attributeFilter:["open"]}));

  function refreshMedia() {
    updateMotion();
    if (!mediaOpener) return;
    const copy = translations[select.value];
    if (filmDialog.open) {
      byId("trailer-title").textContent = copy[mediaOpener.dataset.videoTitle] || copy.trailerTitle;
    }
    if (artDialog.open) {
      byId("art-title").textContent = copy[mediaOpener.dataset.imageTitle];
      art.alt = mediaOpener.querySelector("img")?.alt || byId("art-title").textContent;
    }
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-trailer],a[data-video],a[data-image]");
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const isArt = link.hasAttribute("data-image");
    const dialog = isArt ? artDialog : filmDialog;
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    mediaOpener = link;
    document.querySelectorAll("main video").forEach((video) => video.pause());
    dialog.showModal();
    if (isArt) {
      art.src = link.href;
      byId("close-art").focus();
    } else {
      film.poster = link.querySelector("img")?.currentSrc || "assets/folio/teaser-plate.webp";
      film.src = link.href;
      if (link === teaserLink) {
        film.muted = false;
        if (!finished) film.currentTime = motion.currentTime;
      }
      filmDialog.querySelector(".direct-video").href = link.href;
      byId("close-film").focus();
      film.play().catch(() => {});
    }
    refreshMedia();
  });
  for (const [dialog,close] of [[filmDialog,byId("close-film")],[artDialog,byId("close-art")]]) {
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (dialog === filmDialog) {
        if (mediaOpener === teaserLink && film.readyState >= 1) {
          if (film.ended) finishTeaser();
          else if (motion.readyState >= 1) {
            finished = false;
            motion.currentTime = film.currentTime;
          }
        }
        film.pause();
        film.removeAttribute("src");
        film.load();
      }
      if (dialog === artDialog) art.removeAttribute("src");
      mediaOpener?.focus({preventScroll:true});
      mediaOpener = null;
      syncMotion();
    });
  }
  window.addEventListener("game-language", refreshMedia);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) film.pause();
    syncMotion();
  });

  let saved;
  try {saved = localStorage.getItem("lemegeton-language");} catch {}
  setLanguage(new URLSearchParams(location.search).get("lang") || saved);
  select.addEventListener("change",() => {
    setLanguage(select.value);
    try {localStorage.setItem("lemegeton-language",select.value);} catch {}
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {url.searchParams.set("lang",select.value);history.replaceState(null,"",url);}
    scheduleMark();
  });
  scheduleMark();
})();
