const LIMIT = 5;

class PhotosService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;

    this.photos = [];
    this.totalSize = 0;

    this.currentPhoto = {};
    this.currentIndex = 0;
    this.currentOffset = 0;
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

  loadPhotos({offset, limit=LIMIT}={}){
    const _this = this;
    if(offset) this.currentOffset = offset;

    return this.$http.get('/api/photos', {params: {offset, limit}})
      .then( res => {
        const {data: {photos, totalSize}} = res;
        if(photos.length < 1) return _this.photos;

        _this.photos = photos;
        _this.totalSize = totalSize;
        return photos;
    });
  }

  prev(step = 1){
    const _this = this;
    if (this._setCurrentIndex(this.currentIndex - step)) return;

    const prevOffset = this.currentOffset - 1;
    if(prevOffset < 0) return;

    this.loadPhotos({offset: prevOffset})
      .then( photos => {
        _this._slideTo(photos.length - 1);
      });
  }

  next(step = 1){
    const _this = this;
    if (this._setCurrentIndex(this.currentIndex + step)) return;

    const nextOffset = this.currentOffset + 1;
    this.loadPhotos({offset: nextOffset})
      .then( photos => {
        _this._slideTo(0);
      });
  }

  _slideTo(index){
    this._setCurrentIndex(index);
    this._setSliding();
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
      prev: this.currentIndex !== 0,
      next: this.currentOffset * LIMIT + this.currentIndex + 1 !== this.totalSize
    };
    return this.sliding;
  }
}

export default PhotosService;
