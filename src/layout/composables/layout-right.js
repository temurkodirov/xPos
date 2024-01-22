import { toRefs, reactive, computed } from 'vue';

const layoutConfigRight = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null
});

const layoutStateRight = reactive({
    staticMenuDesktopInactiveRight: false,
    overlayMenuActiveRight: false,
    profileSidebarVisibleRight: false,
    configSidebarVisibleRight: false,
    staticMenuMobileActiveRight: false,
    menuHoverActiveRight: false
});

export function useLayoutRight() {
    const changeThemeSettingsRight = (theme, darkTheme) => {
        layoutConfigRight.darkTheme = darkTheme;
        layoutConfigRight.theme = theme;
    };

    const setScaleRight = (scale) => {
        layoutConfigRight.scale = scale;
    };

    const setActiveMenuItemRight = (item) => {
        layoutConfigRight.activeMenuItem = item.value || item;
    };

    const onMenuToggleRight = () => {
        if (layoutConfigRight.menuMode === 'overlay') {
            layoutStateRight.overlayMenuActiveRight = !layoutStateRight.overlayMenuActiveRight;
        }

        if (window.innerWidth > 991) {
            layoutStateRight.staticMenuDesktopInactiveRight = !layoutStateRight.staticMenuDesktopInactiveRight;
        } else {
            layoutStateRight.staticMenuMobileActiveRight = !layoutStateRight.staticMenuMobileActiveRight;
        }
    };

    const isRightSidebarActive = computed(() => layoutStateRight.overlayMenuActiveRight || layoutStateRight.staticMenuMobileActiveRight);

    const isDarkThemeRight = computed(() => layoutConfigRight.darkTheme);

    return {
        layoutConfigRight: toRefs(layoutConfigRight),
        layoutStateRight: toRefs(layoutStateRight),
        changeThemeSettingsRight,
        setScaleRight,
        onMenuToggleRight,
        isRightSidebarActive,
        isDarkThemeRight,
        setActiveMenuItemRight
    };
}
