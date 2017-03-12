class PhotosService {
  /** @ngInject */
  constructor(client) {
    console.log('constructed')
    this.client = client;

    this.photos = [];
    this.totalSize = 0;

    this.currentPhoto = null;
    this.currentIndex = 0;
    this.currentOffset = 0;
    this.sliding = {
      prev: false,
      next: true
    };
  }

  watches(){
    return [this.photos, this.currentPhoto];
 }

  loadPhoto(id){
    const _this = this;
    this.currentPhoto = this.photos.find(photo => photo._id === id );
    if(!this.currentPhoto){
      this.client.fetch(`/api/photos/${id}`).then(photo => {
        _this.currentPhoto = photo;
        _this.setSliding({state: 'off'});
      });
    }
  }

  loadPhotos({offset}){
    const _this = this;
    if(offset) this.currentOffset = offset;

    return this.client.fetch('/api/photos', {offset}).then( res => {
      if(res.photos.length < 1) return res;

      _this.photos = res.photos;
      _this.totalSize = res.totalSize;
      _this.$scope.$apply();
      return res;
    });
  }

  prev(step = 1){
    const _this = this;
    if (this.setCurrentIndex(this.currentIndex - step)) return;

    const prevOffset = this.currentOffset - 1;
    if(prevOffset < 0) return;

    loadPhotos({offset: prevOffset})
      .then( photos => {
        _this.setCurrentIndex(photos.length - 1);
        _this.setSliding();
      });
  }

  next(step = 1){
    const _this = this;
    if (this.setCurrentIndex(this.currentIndex + step)) return;

    const nextOffset = this.currentOffset + 1;
    loadPhotos({offset: nextOffset})
      .then( photos => {
        _this.setCurrentIndex(0);
        _this.setSliding();
      });
  }

  _setCurrentIndex(index){
    if(index < 0 || index > photos.length - 1) return null;

    this.currentPhoto = photos[index];
    this.currentIndex = index;
    return this.currentIndex;
  }

  _setSliding({state}){
    if (state === 'off') {
      return this.sliding = {next: false, prev: false};
    }

    this.sliding = {
      prev: this.currentIndex !== 0,
      next: this.currentOffset * 50 + this.currentIndex + 1 === this.totalSize
    };
    return this.sliding;
  }
}

export default PhotosService;
