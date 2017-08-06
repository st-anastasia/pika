import angular from 'angular';
import dateformat from 'dateformat';
import _ from 'lodash';

import template from './form.jade';

class PhotoDetailFormController {
  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  close() {
    this.$mdSidenav('right').close();
  }

  photoExposure(){
    let res = _.pick(this.photo.metadata.tags, ['FNumber', 'ExposureTime', 'FocalLength', 'ISO']);
    res = _.pickBy(res, (v) => !_.isNil(v));

    const transformations = {
      'FNumber': (v) => `1 / ${v}`,
      'ExposureTime': (v) => 1 / v,
      'FocalLength': (v) => `${v} mm`,
      'ISO': (v) => `ISO ${v}`
    };
    res = _.transform(res, (result, value, key) => {
      result.push(transformations[key](value));
    }, []);

    return res;
  }

  photoDimesions(){
    const imageSize = this.photo.metadata.imageSize;
    let megaPixel = null;
    let imageSizeString = null;

    if (_.size(imageSize) == 2) {
      megaPixel = `${_.round((imageSize.width * imageSize.height) / 1000000)} MP`
      imageSizeString = `${imageSize.width} x ${imageSize.height}`
    }

    const length = `${_.round(this.photo.length / 1024 / 1024, 2).toFixed(2)} MB`;

    return [megaPixel, imageSizeString, length].filter((v) => !_.isNil(v));
  }

  photoDateString(){
    const date = new Date(this.photo.uploadDate);
    return dateformat(date, 'dd. mmm yyyy');
  }

  photoTimeString(){
    const date = new Date(this.photo.uploadDate);
    return dateformat(date, 'ddd. hh:mm');
  }
}

export default angular.module('photo-detail.form', [])
  .component('photoDetailForm', {
    template: template(),
    controller: PhotoDetailFormController,
    bindings: {
      photo: '=',
    },
  });
