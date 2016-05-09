import SideMenuController from './controller';

export default function(){
  return {
    controller: SideMenuController,
    controllerAs: 'sideMenuController',
    template: require('./template.jade')
  };
}
