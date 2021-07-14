module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      nav: [
        // mac
        "Noteworthy",
        "ヒラギノ明朝 ProN",
        "Hiragino Mincho ProN",
        // windows
        "Segoe Print",
        "Yu Mincho Light",
        "YuMincho",
        "Yu Mincho",
        "游明朝体",
      ],
      body: [
        // mac
        "ヒラギノ明朝 ProN",
        "Hiragino Mincho ProN",
        // windows
        "Yu Mincho Light",
        "YuMincho",
        "Yu Mincho",
        "游明朝体",
      ]
    },
    extend: {
      colors: {
        "nav-yellow": "#FCBB76",
        "side-yellow": "#ffebcd",
        "border-yellow": "#ffd1a3",
        "hover-yellow": "#FCBB76",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
