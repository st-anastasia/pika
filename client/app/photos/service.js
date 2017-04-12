import _ from 'lodash';

const LIMIT = 50;

class PhotosService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;

    this.photos = [];
    this.pages = [];
    this.totalSize = 0;

    this.currentPhoto = {};
    this.currentIndex = 0;
    this.currentPage = 1;
    this.sliding = {
      prev: false,
      next: true
    };
  }

  loadPhoto(id){
    const _this = this;
    if (this.currentPhoto.id === id) return;

    const foundIndex = this.photos.findIndex(photo => photo._id === id );
    if(foundIndex >= 0 ) {
      this._slideTo(foundIndex);
      return;
    }

    this.$http.get(`/api/photos/${id}`).then(({data}) => {
      _this._currentPhoto = data;
      _this._setSliding({state: 'off'});

      return photo;
    });
  }

  loadPhotos({page=1, limit=LIMIT}={}){
    const _this = this;

    return this.$http.get('/api/photos', {params: {page, limit}})
      .then( res => {
        const {data: {photos, totalSize}} = res;
        _this.currentPage = page;
        _this.photos = photos;
        _this.totalSize = totalSize;
        _this._paginate();
        return photos;
    });
  }

  prev(step = 1){
    const _this = this;
    if (this._slideTo(this.currentIndex - step) !== null) return;

    const prevPage = this.currentPage - 1;
    if(prevPage < 0) return;

    this.loadPhotos({page: prevPage})
      .then( photos => {
        _this._slideTo(photos.length - 1);
      });
  }

  next(step = 1){
    const _this = this;
    if (this._slideTo(this.currentIndex + step) !== null) return;

    const nextPage = this.currentPage + 1;
    this.loadPhotos({page: nextPage})
      .then( photos => _this._slideTo(0) );
  }

  _paginate(){
    let start = this.currentPage - 2;
    if (start < 1) start = 1;

    let end = start + 5;
    if (this.totalSize / LIMIT < 5 ) {
      start =   1;
      end   =   Math.ceil(this.totalSize / LIMIT ) + 1;
    }

    this.pages = _.range(start, end);
  }

  _slideTo(index){
    if (this._setCurrentIndex(index) === null) return null;

    this._setSliding();
    return this.currentIndex;
  }

  _setCurrentIndex(index){
    if(index < 0 || index > this.photos.length - 1) return null;

    this.currentPhoto = this.photos[index];
    this.currentIndex = index;
    return this.currentIndex;
  }

  _setSliding({state}={}){
    if (state === 'off') {
      return this.sliding = {next: false, prev: false};
    }

    this.sliding = {
      prev: this._offset() !== 0,
      next: this._offset() + 1 !== this.totalSize
    };
    return this.sliding;
  }

  _offset(){
    return (this.currentPage - 1) * LIMIT + this.currentIndex;
  }
}

export default PhotosService;
