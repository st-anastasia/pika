function themingConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      default: '400',
      'hue-1': '50',
      'hue-2': '800',
    })
    .backgroundPalette('blue-grey', {
      default: '50',
      'hue-1': '800',
      'hue-2': '900',
    })
    .accentPalette('cyan', {
      default: '500',
    });
}

export default themingConfig;

