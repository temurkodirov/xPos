<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import BasketSidebar from "@/components/BasketMenu/BasketSidebar.vue";
import AppConfig from './AppConfig.vue';
import { useLayout } from '@/layout/composables/layout';
import { useLayoutRight } from '@/layout/composables/layout-right';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const { layoutConfigRight, layoutStateRight, isRightSidebarActive } = useLayoutRight();

const outsideClickListener = ref(null);

watch([isSidebarActive, isRightSidebarActive], (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfig.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-input-filled': layoutConfig.inputStyle.value === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple.value
  };
});
const rightContainerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfigRight.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfigRight.darkTheme.value === 'dark',
    'layout-overlay': layoutConfigRight.menuMode.value === 'overlay',
    'layout-static': layoutConfigRight.menuMode.value === 'static',
    'layout-right-static-inactive': layoutStateRight.staticMenuDesktopInactiveRight.value && layoutConfigRight.menuMode.value === 'static',
    'layout-overlay-active': layoutStateRight.overlayMenuActiveRight.value,
    'layout-right-mobile-active': layoutStateRight.staticMenuMobileActiveRight.value,
    'p-input-filled': layoutConfigRight.inputStyle.value === 'filled',
    'p-ripple-disabled': !layoutConfigRight.ripple.value
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;

        layoutStateRight.overlayMenuActiveRight.value = false;
        layoutStateRight.staticMenuMobileActiveRight.value = false;
        layoutStateRight.menuHoverActiveRight.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const sidebarRightEl = document.querySelector('.layout-sidebar-right');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(sidebarRightEl.isSameNode(event.target) || sidebarRightEl.contains(event.target) || sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
  <div class="layout-wrapper" :class="[containerClass, rightContainerClass]">
    <app-topbar></app-topbar>
    <div class="layout-sidebar">
      <app-sidebar></app-sidebar>
    </div>
    <div class="layout-sidebar-right">
      <basket-sidebar ></basket-sidebar>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <app-config></app-config>
  </div>
</template>

<style lang="scss" scoped>
.layout-sidebar-right {
  position: fixed;
  width: 400px;
  height: calc(100vh - 8rem);
  z-index: 999;
  overflow-y: auto;
  user-select: none;
  top: 7rem;
  right: 1rem;
  transition: transform 0.2s, left 0.2s;
  background-color: var(--surface-overlay);
  border-radius: 12px;
  //padding: 0.5rem 1.5rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-main-container {
  padding: 7rem 9.4rem 2rem 4rem;
  transition: margin 0.2s;
}
@media (max-width: 991px) {
  .layout-wrapper.layout-right-mobile-active .layout-sidebar-right {
    transform: translateX(0);
  }
  .layout-wrapper .layout-sidebar-right {
    transform: translateX(100%);
    right: 0;
    top: 0;
    height: 100vh;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .layout-wrapper.layout-right-mobile-active .layout-mask {
    display: block;
    animation: fadein 0.2s;
  }
}
@media (min-width: 992px) {
  .layout-wrapper.layout-static.layout-right-static-inactive .layout-sidebar-right {
    transform: translateX(100%);
    right: 0;
  }
  .layout-wrapper.layout-static .layout-main-container {
    margin-right: 300px;
  }
  .layout-wrapper.layout-static.layout-right-static-inactive .layout-main-container {
    margin-right: 0;
    padding-right: 2rem;
  }
}
</style>
