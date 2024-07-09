import "./main.scss"

const css = {
  nav: "header__nav",
  mask: "header__mask",
  maskActive: "header__mask--active",
  trigger: "header__nav__sub__trigger",
  triggerActive: "header__nav__sub__trigger--active",
  menu: "header__nav__sub__menu",
  menuActive: "header__nav__sub__menu--active",
  primary: "header__nav__primary",
  primaryActive: "header__nav__primary--active",
  bm: "header__nav__sub__trigger--bm",
  close: "[data-close]",
};

const triggers = document.querySelectorAll<HTMLElement>(`a.${css.trigger}`);
const buttons = document.querySelectorAll<HTMLElement>(`button.${css.trigger}`);
const closeButtons = document.querySelectorAll<HTMLElement>(`${css.close}`);

const menus = document.querySelectorAll<HTMLElement>(`.${css.menu}`);
const nav = document.querySelector<HTMLElement>(`.${css.nav}`);
const mask = document.querySelector<HTMLElement>(`.${css.mask}`);
const primary = document.querySelector<HTMLElement>(`.${css.primary}`);

let height = 0;
let timeout:(number | null) = null;
let menuOpen = null;

const hideMenus = () => {
  if(isMobile()) {
    height = 0;
  }
  
  menus.forEach((el) => {
    el.classList.remove(css.menuActive);
    el.style.height = '0px';
  });

  triggers.forEach(el => {
    el.classList.remove(css.triggerActive);
  });

  buttons.forEach(el => {
    el.classList.remove(css.triggerActive);
  });

  mask?.classList.remove(css.maskActive);
  primary?.classList.remove(css.primaryActive);

  menuOpen = null;
};

const isMobile = () => {
  return window.innerWidth < 700;
}

const ct = () => {
  if(timeout) {
    clearTimeout(timeout);
  }
}

const handleMouseEnter = () => {
  ct();
};

const handleMouseLeave = () => {
  ct();
  
  timeout = window.setTimeout(() => {
    height = 0;
    hideMenus();
  }, 400);
};

const handleTriggerMouseLeave = (e) => {
  ct();
};

const handleTriggerMouseEnter = (e) => {
  if(!menuOpen) {
    height = 0;
  }

  e.preventDefault();
  const trigger = e.currentTarget;
  const menu = trigger.nextElementSibling;
  const delay = menuOpen ? 200 : 0;
        
  ct();
  
  timeout = window.setTimeout(() => {
    showMenu(trigger, menu);
  }, delay);
};

const handleBtnMouseEnter = (e) => {
  const btn = e.currentTarget;
  const menu = btn.nextElementSibling;
  const delay = menuOpen ? 200 : 0;
  
  if(menuOpen !== menu) {
    ct();
    
    timeout = window.setTimeout(() => {
      height = 0;
      hideMenus();
    }, delay);
  }
}

const handleBtnClick = (e) => {
  const btn = e.currentTarget;
  const menu = btn.nextElementSibling;
        
  if(btn.classList.contains(css.bm)) {
    showBurgerMenu();
  }
  else {
    showMenu(btn, menu);
  }
};

const showBurgerMenu = () => {
  mask?.classList.add(css.maskActive);
  primary?.classList.add(css.primaryActive);
};

const showMenu = (trigger, menu) => {
  const wrapper = menu?.querySelector(".wrapper");
  
  if(wrapper) {
    hideMenus();

    menuOpen = menu;
    trigger.classList.add(css.triggerActive);
    menu.classList.add(css.menuActive);
    menu.style.transition = 'none';
    menu.style.height = height > 0 ? `${height}px` : `0px`;
    
    mask?.classList.add(css.maskActive);
    
    // delay until dom element is available
    window.setTimeout(() => {
      menu.style.transition = 'height ease 0.3s';
      height = wrapper.offsetHeight;

      if(isMobile()) {
        menu.style.height = "100vh";
      }
      else {
        menu.style.height = height > 0 ? `${height}px` : `${wrapper.offsetHeight}px`
      }
      
      const input = menu.querySelector("input");
      if(input) {
        input.focus();
      }  
    }, 100);
  }
  else {
    hideMenus();
  }
};

triggers.forEach(trigger => {
  trigger.addEventListener("mouseenter", handleTriggerMouseEnter);
  trigger.addEventListener("mouseleave", handleTriggerMouseLeave);
});

buttons.forEach(btn => {
  btn.addEventListener("click", handleBtnClick);
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", hideMenus);
});

nav?.addEventListener("mouseenter", handleMouseEnter);
nav?.addEventListener("mouseleave", handleMouseLeave);