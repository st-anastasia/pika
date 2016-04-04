const photos = [
  {
    "fileName": "11454863.jpg",
    "title": "Sequi ratione.",
    "description": "Est quisquam sit consectetur vel ratione."
  },
  {
    "fileName": "1284946545-omgbhd5.jpg",
    "title": "Laudantium dicta.",
    "description": "Illo ipsum veniam iusto cupiditate rerum reiciendis."
  },
  {
    "fileName": "13121163.jpg",
    "title": "Eos velit.",
    "description": "Ab sit quas commodi ipsa accusantium est consequatur eaque."
  },
  {
    "fileName": "168731824-4ab8e0df62-o.jpg",
    "title": "Est autem.",
    "description": "Doloremque et saepe eum et impedit."
  },
  {
    "fileName": "184705692-96675bf4ca-o.jpg",
    "title": "Eos laborum.",
    "description": "Quibusdam dolorem est dolorem non veniam natus."
  },
  {
    "fileName": "300412891-e4f70681e0-o.jpg",
    "title": "Earum illum.",
    "description": "Dolor ut nihil est aliquam nulla."
  },
  {
    "fileName": "427526663-a631dcea56-o.jpg",
    "title": "Adipisci nihil.",
    "description": "Eius est veritatis repellendus laboriosam hic consectetur eligendi."
  },
  {
    "fileName": "4305481.jpg",
    "title": "Doloremque ullam.",
    "description": "Error impedit omnis ipsa exercitationem."
  },
  {
    "fileName": "4331012.jpg",
    "title": "Tempora est.",
    "description": "Eos a debitis rerum."
  },
  {
    "fileName": "4393923.jpg",
    "title": "Eveniet praesentium.",
    "description": "Doloribus architecto itaque quas omnis magni cumque blanditiis nemo."
  },
  {
    "fileName": "4415446.jpg",
    "title": "Pariatur voluptas.",
    "description": "Eos voluptatibus tempore tenetur repellendus sed rerum molestiae impedit."
  },
  {
    "fileName": "4473376.jpg",
    "title": "Ducimus nam.",
    "description": "Et ex non ullam."
  },
  {
    "fileName": "4631978836-3d54b641ee-b.jpg",
    "title": "Ullam quam.",
    "description": "Quae reprehenderit dolore tempore voluptas dignissimos rerum saepe quisquam."
  },
  {
    "fileName": "479547.jpg",
    "title": "Quos et.",
    "description": "Illum iste quo omnis aliquam hic ut autem."
  },
  {
    "fileName": "509643781-d44765044a-b.jpg",
    "title": "Recusandae libero.",
    "description": "Maiores sed ad molestiae temporibus."
  },
  {
    "fileName": "5424603.jpg",
    "title": "Culpa nisi.",
    "description": "Sed illo quo aut non animi."
  },
  {
    "fileName": "5780860.jpg",
    "title": "Dolor commodi.",
    "description": "Repudiandae est in excepturi incidunt alias."
  },
  {
    "fileName": "6156866.jpg",
    "title": "Perferendis fuga.",
    "description": "Voluptas dolores quam quia eos cumque optio at."
  },
  {
    "fileName": "6262919.jpg",
    "title": "Facere ut.",
    "description": "Repellat iusto ipsam autem natus et molestiae enim."
  },
  {
    "fileName": "6767480.jpg",
    "title": "Occaecati qui.",
    "description": "Sint aut sed rem distinctio eos."
  },
  {
    "fileName": "7758913.jpg",
    "title": "Deleniti dolores.",
    "description": "Sit ipsum dolorem et voluptatem molestiae dolorem enim."
  },
  {
    "fileName": "7797696.jpg",
    "title": "Est dolore.",
    "description": "Ullam nihil dolores et aliquam dolorem."
  },
  {
    "fileName": "7813779.jpg",
    "title": "Et labore.",
    "description": "Distinctio perferendis dolore saepe inventore."
  },
  {
    "fileName": "7829363.jpg",
    "title": "Quis accusantium.",
    "description": "Deleniti officiis ab non doloremque."
  },
  {
    "fileName": "7850173.jpg",
    "title": "Soluta aut.",
    "description": "Officia adipisci accusamus fugiat illo mollitia."
  },
  {
    "fileName": "8700169.jpg",
    "title": "Ut est.",
    "description": "Dolor sed earum voluptates ullam."
  },
  {
    "fileName": "915470039-7054e38ec6-b.jpg",
    "title": "Qui a.",
    "description": "Commodi aut laudantium est iste et ut pariatur omnis."
  },
  {
    "fileName": "cimg0902.jpg",
    "title": "Ab deleniti.",
    "description": "Voluptas laudantium dolorem et ipsam dolores voluptates et consequatur."
  },
  {
    "fileName": "cimg0967.jpg",
    "title": "Ex dolores.",
    "description": "Et accusamus eligendi beatae sunt quasi consequatur."
  },
  {
    "fileName": "cimg1007.jpg",
    "title": "Aliquam quos.",
    "description": "Consequatur dignissimos expedita magni sequi perferendis aut facere."
  },
  {
    "fileName": "daffodil-01-1440x900.jpg",
    "title": "Aspernatur excepturi.",
    "description": "Hic mollitia aut quam."
  },
  {
    "fileName": "daffodil-01.jpg",
    "title": "Cumque eum.",
    "description": "Quisquam assumenda deserunt sequi."
  },
  {
    "fileName": "daffodil-02.jpg",
    "title": "Corporis neque.",
    "description": "Necessitatibus magnam ab cupiditate expedita id cumque natus autem."
  },
  {
    "fileName": "daffodil-03.jpg",
    "title": "Quia modi.",
    "description": "Voluptatem quas vel minus debitis sunt blanditiis aut omnis."
  },
  {
    "fileName": "daffodil-04.jpg",
    "title": "Sit impedit.",
    "description": "Deleniti placeat itaque aut nemo non amet modi hic."
  },
  {
    "fileName": "daffodil-05.jpg",
    "title": "Consequuntur aspernatur.",
    "description": "Dignissimos recusandae odit et architecto fuga consequatur."
  },
  {
    "fileName": "daffodil-06.jpg",
    "title": "Voluptatem explicabo.",
    "description": "Accusamus est eum ea qui sunt doloremque eveniet assumenda."
  },
  {
    "fileName": "daffodil-07.jpg",
    "title": "Nisi qui.",
    "description": "Quia enim odit vel sit enim rerum."
  },
  {
    "fileName": "daffodil-08.jpg",
    "title": "Velit sint.",
    "description": "Aut quod iusto numquam nesciunt voluptas impedit veniam."
  },
  {
    "fileName": "daffodil-09.jpg",
    "title": "Expedita illo.",
    "description": "Enim aut commodi distinctio eum vero repellendus."
  },
  {
    "fileName": "daffodil-10.jpg",
    "title": "Est labore.",
    "description": "Odio ratione officiis sit assumenda sapiente dolorem quos."
  },
  {
    "fileName": "daffodil-11.jpg",
    "title": "Eos ut.",
    "description": "Earum vero molestiae et quod."
  },
  {
    "fileName": "daffodil-12.jpg",
    "title": "Quo non.",
    "description": "Ullam sint aliquam alias quia non."
  },
  {
    "fileName": "daffodil-13.jpg",
    "title": "Consequatur doloribus.",
    "description": "Sapiente voluptatem rerum temporibus."
  },
  {
    "fileName": "eiffel-tower,-paris,-france.jpg",
    "title": "Molestias non.",
    "description": "Corrupti iure in dolor."
  },
  {
    "fileName": "kamille-01.jpg",
    "title": "Eligendi reiciendis.",
    "description": "Et ipsum reprehenderit ut."
  },
  {
    "fileName": "kamille-02.jpg",
    "title": "Est quibusdam.",
    "description": "Ex repellat dolor ea."
  },
  {
    "fileName": "lilie-2.jpg",
    "title": "Et deserunt.",
    "description": "Sed et molestiae in et rerum quo."
  },
  {
    "fileName": "lilie-3.jpg",
    "title": "Odio delectus.",
    "description": "Ea modi dolores nam ullam qui."
  },
  {
    "fileName": "lilie-by-izyliaz.jpg",
    "title": "Numquam ut.",
    "description": "Consectetur est ea facilis."
  },
  {
    "fileName": "lilie-by-schnitzel-of-pain.jpg",
    "title": "Facere enim.",
    "description": "Tempore occaecati aspernatur autem non expedita ut reiciendis unde."
  },
  {
    "fileName": "lilli-by-creation-victim.jpg",
    "title": "Excepturi dolorem.",
    "description": "Non maxime animi earum aspernatur cum qui omnis exercitationem."
  },
  {
    "fileName": "loewenzahn-01.jpg",
    "title": "Reprehenderit consequatur.",
    "description": "Eos quibusdam modi non omnis ratione nam."
  },
  {
    "fileName": "loewenzahn-02.jpg",
    "title": "Ullam sunt.",
    "description": "Impedit facere est aut officia quod occaecati vel placeat."
  },
  {
    "fileName": "loewenzahn-03.jpg",
    "title": "Ut odio.",
    "description": "Autem autem earum cumque aut."
  },
  {
    "fileName": "loewenzahn-04.jpg",
    "title": "Dolores aliquam.",
    "description": "Libero vel sint iste ratione sunt."
  },
  {
    "fileName": "loewenzahn-05.jpg",
    "title": "Sequi dignissimos.",
    "description": "Nihil eum et qui pariatur perspiciatis facilis natus."
  },
  {
    "fileName": "loewenzahn-06.jpg",
    "title": "Ea quo.",
    "description": "Provident molestiae qui velit laudantium."
  },
  {
    "fileName": "loewenzahn-07.jpg",
    "title": "Totam fugit.",
    "description": "Similique sunt earum asperiores odio harum."
  },
  {
    "fileName": "loewenzahn-08.png",
    "title": "Voluptates a.",
    "description": "Praesentium deserunt voluptatum nobis quas ea."
  },
  {
    "fileName": "loewenzahn-09.png",
    "title": "Et occaecati.",
    "description": "Voluptatem tempore nesciunt ut consectetur animi vel eius."
  },
  {
    "fileName": "mohn-01.jpg",
    "title": "Nihil velit.",
    "description": "Delectus occaecati voluptatem architecto magnam in."
  },
  {
    "fileName": "mohn-02.jpg",
    "title": "Quia voluptates.",
    "description": "Et minima esse id quam nostrum illum sed rerum."
  },
  {
    "fileName": "mohn-03.jpg",
    "title": "Velit eligendi.",
    "description": "Ipsa reiciendis nihil recusandae quidem aperiam."
  },
  {
    "fileName": "mohn-04.jpg",
    "title": "Minima eum.",
    "description": "Dolorem dolor doloremque dolorem."
  },
  {
    "fileName": "mohn-05.jpg",
    "title": "Natus tempora.",
    "description": "Beatae est rerum iusto vitae commodi alias."
  },
  {
    "fileName": "old-house-59.4.jpg",
    "title": "Commodi ut.",
    "description": "Hic illum vel expedita corrupti distinctio possimus porro consectetur."
  },
  {
    "fileName": "phalaenopsis-orchids-moth-orchids.jpg",
    "title": "Eius error.",
    "description": "Iste aut quis est et ut culpa."
  },
  {
    "fileName": "sb10066927aj-001.jpg",
    "title": "Reiciendis consequatur.",
    "description": "Nihil dolorem ut explicabo voluptates."
  },
  {
    "fileName": "snowdrop,-the-first-spring-flower.jpg",
    "title": "Magnam nesciunt.",
    "description": "Qui dolorum a est rerum harum."
  },
  {
    "fileName": "strawberry-01.jpg",
    "title": "Tempore quasi.",
    "description": "Voluptas iure a porro eos voluptatem."
  },
  {
    "fileName": "strawberry-02.jpg",
    "title": "Officiis ipsum.",
    "description": "Voluptatem sed itaque voluptas."
  }
].map(entry => {
  entry.url = '/build/' + require('../images/photos_gallery/' + entry.fileName);
  return entry;
});

console.log(photos);

export function getPhotos(){ return photos; }
export function getPhoto(id){ return photos[id]; }
