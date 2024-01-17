import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    basketMenuActive: false,
    staticBasketDesktopInactive: false,
    staticBasketMobileActive: false,

});

export function useLayout() {
    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };
    const basketMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.basketMenuActive = !layoutState.basketMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticBasketDesktopInactive = !layoutState.staticBasketDesktopInactive;
        } else {
            layoutState.staticBasketMobileActive = !layoutState.staticBasketMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);
    const isBasketActive = computed(() => layoutState.basketMenuActive || layoutState.staticBasketMobileActive)
    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, setScale, onMenuToggle, isSidebarActive, isBasketActive, isDarkTheme, setActiveMenuItem };
}
