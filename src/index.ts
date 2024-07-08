import "./main.scss"

const css = {
  nav: "header__nav",
  mask: "header__mask",
  maskActive: "header__mask--active",
  trigger: "header__nav__sub__trigger",
  triggerActive: "header__nav__sub__trigger--active",
  menu: "header__nav__sub__menu",
  menuActive: "header__nav__sub__menu--active"
};

const triggers = document.querySelectorAll<HTMLElement>(`a.${css.trigger}`);
const buttons = document.querySelectorAll<HTMLElement>(`button.${css.trigger}`);

const menus = document.querySelectorAll<HTMLElement>(`.${css.menu}`);
const nav = document.querySelector<HTMLElement>(`.${css.nav}`);
const mask = document.querySelector<HTMLElement>(`.${css.mask}`);

let height = 0;
let timeout:(number | null) = null;
let menuOpen = null;

const hideMenus = () => {
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
  menuOpen = null;
};

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
        
  showMenu(btn, menu);
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
      menu.style.height = height > 0 ? `${height}px` : `${wrapper.offsetHeight}px`
      
      const input = menu.querySelector("input");
      if(input) {
        input.focus();
      }  
    }, 100);
  }
};

triggers.forEach(trigger => {
  trigger.addEventListener("mouseenter", handleTriggerMouseEnter);
  trigger.addEventListener("mouseleave", handleTriggerMouseLeave);
});

buttons.forEach(btn => {
  btn.addEventListener("click", handleBtnClick);
});

nav?.addEventListener("mouseenter", handleMouseEnter);
nav?.addEventListener("mouseleave", handleMouseLeave);