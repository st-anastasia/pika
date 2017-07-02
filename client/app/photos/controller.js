class PhotosController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosService) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.photosService = photosService;
    this.photosService.$scope = $scope;
    this.uploadMonths = [];
    this.photos = {};

    this.initWatchers();
    this.loadPhotos();
  }

  initWatchers() {
    this.$scope.$watch(() => this.photosService.photos, this.filterPhotosByUploadMonth.bind(this));
  }

  showPhoto(id) {
    this.$state.go('photo-detail', { id });
  }

  showPage(page) {
    this.$state.go('photos', { page, search: this.photosService.search },
                   { location: 'replace' });
  }

  loadPhotos() {
    const page = this.currentPage();
    const search = this.$stateParams.search;

    this.photosService.loadPhotos({ page, search });
  }

  currentPage() {
    return parseInt(this.$stateParams.page, 10) || this.photosService.currentPage;
  }

  pageButtonClass(page) {
    if (page === this.photosService.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  filterPhotosByUploadMonth(photos) {
    const uploadMonth = (photo) => {
      const date = new Date(photo.uploadDate);
      const month = date.toLocaleString('en', { month: 'short' });
      return `${month} ${date.getFullYear()}`;
    };

    this.photos = photos.reduce(
      (photosByMonth, photo) => {
        const photoUploadMonth = uploadMonth(photo);
        if (!photosByMonth[photoUploadMonth]) {
          photosByMonth[photoUploadMonth] = [];
        }

        photosByMonth[photoUploadMonth].push(photo);
        return photosByMonth;
      },
      {},
    );
  }

}

export default PhotosController;
