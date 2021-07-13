import angular from 'angular';
import dateformat from 'dateformat';
import _ from 'lodash';

import template from './form.pug';

class PhotoDetailFormController {
  /** @ngInject */
  constructor($mdSidenav, photosClient) {
    this.$mdSidenav = $mdSidenav;
    this.client = photosClient
  }

  close() {
    this.$mdSidenav('right').close();
  }

  updatePhoto(){
    this.client.update(this.photo);
  }

  photoExposure() {
    if (_.isEmpty(this.photo)) {
      return [];
    }

    const tags = this.photo.metadata.tags
    const keys = ['FNumber', 'ExposureTime', 'FocalLength', 'ISO']
    const transformations = {
      FNumber: v => `1 / ${v}`,
      ExposureTime: v => Math.round(1 / v),
      FocalLength: v => `${v} mm`,
      ISO: v => `ISO ${v}`
    };
    return keys
      .filter((k) => !_.isNil(tags[k]))
      .map((k) => {
        const value = tags[k]
        return transformations[k](value)
      });
  }

  photoDimesions() {
    if (_.isEmpty(this.photo)) {
      return [];
    }

    const imageSize = this.photo.metadata.imageSize;
    let megaPixel = null;
    let imageSizeString = null;

    if (_.size(imageSize) == 2) {
      megaPixel = `${_.round(imageSize.width * imageSize.height / 1000000)} MP`;
      imageSizeString = `${imageSize.width} x ${imageSize.height}`;
    }

    const length = `${_.round(this.photo.length / 1024 / 1024, 2).toFixed(2)} MB`;

    return [megaPixel, imageSizeString, length].filter(v => !_.isNil(v));
  }

  photoDateString() {
    if (_.isEmpty(this.photo)) {
      return '';
    }

    const date = new Date(this.photo.metadata.createDate);
    return dateformat(date, 'dd. mmm yyyy');
  }

  photoTimeString() {
    if (_.isEmpty(this.photo)) {
      return '';
    }

    const date = new Date(this.photo.metadata.createDate);
    return dateformat(date, 'ddd. hh:mm');
  }
}

export default angular
  .module('photo-detail.form', [])
  .component('photoDetailForm', {
    template: template(),
    controller: PhotoDetailFormController,
    bindings: {
      photo: '='
    }
  });
