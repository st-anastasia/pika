import template from './toolbar.jade';

class ToolbarController {
  /** @ngInject */
  constructor($state, $mdSidenav, $location, photosService, Upload) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.photosService = photosService;
    this.Upload = Upload;

    this.searchTerm = '';
    this.uploadProgress = 0;
    this.errorMsg = null;
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  search() {
    this.photosService.loadPhotos({ search: this.searchTerm });
    this.$state.go('photos', { search: this.searchTerm }, { location: 'replace', notify: false });
  }

  uploadPhotos(files) {
    const self = this;
    const uploadCounter = 0;

    files.forEach((file) => {
      Upload.upload({
        url: '/api/photos',
        data: {file: file}
      }).then((response) => {
        uploadCounter++
        if (uploadCounter === files.size) console.log('ready');
      }, (response) => {
        if (response.status > 0) {
          self.errorMsg = response.status + ': ' + response.data;
        }
      }, (evt) => {
        self.uploadProgress = Math.min(100, parseInt(100.0 * evt.loaded / files.size));
      });
    });
  }
}

export default {
  template: template(),
  controller: ToolbarController,
};
