export const colors = {
  accentPrimary: '#09DF6B',
  accentPrimaryDark: '#43A047',
  accentPrimaryLight: '#183022',
  accentPrimaryLightest: '#81C784',

  greyDark: '#999999',
  greyLight: '#aaaaaa',
  greyLighter: '#dedede',

  white: '#fff',
  whiteDarker: '#cecece',

  backgroundDark: '#000000',
  backgroundLight: '#e2e2e2'
};

export const palette = {
  primary: {
    main: colors.accentPrimary,
  },
  secondary: {
    main: colors.accentPrimaryLight,
    contrastText: colors.accentPrimary,
  },
};

export const typography = {
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: 13,
  useNextVariants: true
};

export const baseTheme = {
  colors,
  palette,
  typography
};

export const getTheme = darkMode => ({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: darkMode
      ? 'dark'
      : 'light',
    text: {
      ...baseTheme.text,
      secondaryLight: darkMode
        ? colors.greyDark
        : colors.greyLighter,
      secondary: darkMode
        ? colors.whiteDarker
        : colors.greyLight,
      primary: darkMode
        ? colors.white
        : colors.greyDark
    },
    background: {
      ...baseTheme.palette.background,
      default: darkMode
        ? colors.backgroundDark
        : colors.backgroundLight
    }
  }
});
