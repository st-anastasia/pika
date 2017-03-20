const LIMIT = 5;

class PhotosService {
  /** @ngInject */
  constructor(client) {
    this.client = client;

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

    this.client.fetch(`/api/photos/${id}`).then(photo => {
      _this._currentPhoto = photo;
      _this._setSliding({state: 'off'});

      return photo;
    });
  }

  loadPhotos({offset, limit=LIMIT}={}){
    const _this = this;
    if(offset) this.currentOffset = offset;

    return this.client.fetch('/api/photos', {query: {offset, limit}})
      .then( res => {
        if(res.photos.length < 1) return res;

        _this.photos = res.photos;
        _this.totalSize = res.totalSize;
        _this.$scope.$apply();
        return res;
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
