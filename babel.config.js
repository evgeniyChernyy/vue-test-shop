module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    {
        "targets": {
          "edge": "15",
          "firefox": "54",
          "chrome": "51",
          "safari": "10"
        }
      }
  ]
}
