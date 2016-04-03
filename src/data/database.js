let photos = [
  {
   id: 0, 
   title: 'Photo',
   url: 'http://www.kortenkamp.de/sites/bhkortenkamp.buchhandelsweb.de/files/fruehlingserwachen-a2-small.jpg',
   description: 'Your photos'
  },
  {
   id: 1,
   title: 'Photo',
   url: 'http://fc02.deviantart.net/fs9/i/2006/066/6/6/muscle_Car_by_ArcAngelTyrael.jpg',
   description: 'Photo description'
  },
  {
   id: 2,
   title: 'Photo',
   url: 'http://fc02.deviantart.net/fs9/i/2006/066/6/6/muscle_Car_by_ArcAngelTyrael.jpg',
   description: 'Photo description'
  },
  {
   id: 3,
   title: 'Photo 3',
   url: 'http://fc02.deviantart.net/fs9/i/2006/066/6/6/muscle_Car_by_ArcAngelTyrael.jpg',
   description: 'Photo description'
  }
];

export function getPhotos(){ return photos; }
export function getPhoto(id){ return photos[id]; }
