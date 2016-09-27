appServices.factory('Api', function() {
  
  var cities = [
    {"id":1,"province_id":1,"name":"Surabaya","latitude":"7","longitude":"22"},
    {"id":2,"province_id":1,"name":"Sidoarjo","latitude":"7","longitude":"22"},
    {"id":3,"province_id":1,"name":"Gresik","latitude":"7","longitude":"22"},
    {"id":4,"province_id":1,"name":"Malang","latitude":"7","longitude":"22"},
    {"id":5,"province_id":1,"name":"Kediri","latitude":"7","longitude":"22"},
    {"id":6,"province_id":1,"name":"Probolinggo","latitude":"7","longitude":"22"},
    {"id":7,"province_id":1,"name":"Blitar","latitude":"7","longitude":"22"},
    {"id":8,"province_id":1,"name":"Mojokerto","latitude":"7","longitude":"22"},
    {"id":9,"province_id":1,"name":"Ngawi","latitude":"7","longitude":"22"},
    {"id":10,"province_id":1,"name":"Nganjuk","latitude":"7","longitude":"22"},
    {"id":11,"province_id":1,"name":"Madiun","latitude":"7","longitude":"22"},
    {"id":12,"province_id":1,"name":"Magetan","latitude":"7","longitude":"22"},
    {"id":13,"province_id":1,"name":"Bojonegoro","latitude":"7","longitude":"22"},
    {"id":14,"province_id":1,"name":"Tuban","latitude":"7","longitude":"22"},
    {"id":15,"province_id":1,"name":"Lamongan","latitude":"7","longitude":"22"},
    {"id":16,"province_id":1,"name":"Jombang","latitude":"7","longitude":"22"}
  ];
  
  var regions = [
    {"id":1,"city_id":1,"latitude":"7","longitude":"22","name":"Surabaya Utara"},
    {"id":2,"city_id":1,"latitude":"7","longitude":"22","name":"Surabaya Pusat"},
    {"id":3,"city_id":1,"latitude":"7","longitude":"22","name":"Surabaya Selatan"},
    {"id":4,"city_id":1,"latitude":"7","longitude":"22","name":"Surabaya Barat"},
    {"id":5,"city_id":1,"latitude":"7","longitude":"22","name":"Surabaya Timur"},
    {"id":6,"city_id":2,"latitude":"7","longitude":"22","name":"Porong"},
    {"id":7,"city_id":2,"latitude":"7","longitude":"12","name":"Krian"}
  ];
  
  var markets = [
    {"id":1,"name":"Pasar Pegirian","address":"Jl. Raya Pegirian No. 5","city_id":1,"region_id":1,"latitude":"-7.219719936826635","longitude":"112.73527113797604","open_hours":"08:00:00","close_hours":"16:00:00","image":"img/dummy-market/1.jpg"},
    {"id":2,"name":"Pasar Kaputran","address":"Jalan Kaputran 35","city_id":1,"region_id":2,"latitude":"-7.277405495318835","longitude":"112.74132220151364","open_hours":"08:00:00","close_hours":"16:00:00","image":"img/dummy-market/2.jpg"},
    {"id":3,"name":"Pasar kutisari","address":"Jalan Kutisari Utara 45","city_id":1,"region_id":3,"latitude":"-7.336020048273609","longitude":"112.74484125974118","open_hours":"06:00:00","close_hours":"10:00:00","image":"img/dummy-market/3.jpg"},
    {"id":4,"name":"Pasar Induk","address":"Jl. Sepanjang 4 Sidoarjo","city_id":2,"region_id":7,"latitude":"-7.359855280033195","longitude":"112.6777216613525","open_hours":"08:00:00","close_hours":"16:00:00","image":"img/dummy-market/1.jpg"},
    {"id":5,"name":"Pasar Keputih","address":"Jalan Keputih 5 Surabaya","city_id":1,"region_id":5,"latitude":"-7.2560776","longitude":"112.75110689999997","open_hours":"08:00:00","close_hours":"18:00:00","image":"img/dummy-market/2.jpg"},
    {"id":6,"name":"Pasar Simo","address":"Jalan Simo 4 Surabaya","city_id":1,"region_id":4,"latitude":"-7.267571801102319","longitude":"112.71136729123532","open_hours":"08:00:00","close_hours":"16:00:00","image":"img/dummy-market/3.jpg"},
    {"id":7,"name":"Pasar Ampel","address":"Jalan Raya Ampel 4 Surabaya","city_id":1,"region_id":1,"latitude":"-7.267571801102319","longitude":"112.71136729123532","open_hours":"08:00:00","close_hours":"16:00:00","image":"img/dummy-market/3.jpg"}
  ];
  
  var categories = [{id: 1, name: 'Ayam dan daging'}, {id: 2, name: 'Sayuran'}, {id: 2, name: 'Minuman'}];
  
  var products = [
    {
      id: 1,
      name: 'Ayam Potong',
      description: 'Ayam potong berkualitas. Daging nya empuk dan gurih sekali kalau dimasak. Coba deh beli dan rasakan kenikmatannya',
      sell_price: 31,
      buy_price: 30,
      category_id: 1,
      user_id: 1,
      images:[
        'img/dummy-product/ayam.jpg'
      ],
      unit: [
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
        {id: 3, name: 'bungkus', code: 'bks', weight: 750}
      ]
    },
    {
      id: 2,
      name: 'Ayam Potong Lunak',
      description: 'Ayam potong lunak berkualitas. Daging nya empuk dan gurih sekali kalau dimasak. Coba deh beli dan rasakan kenikmatannya',
      sell_price: 32,
      buy_price: 31,
      category_id: 1,
      user_id: 1,
      images:[
        'img/dummy-product/ayam.jpg'
      ],
      unit: [
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
        {id: 3, name: 'bungkus', code: 'bks', weight: 750}
      ]
    },
    {
      id: 3,
      name: 'Bawang Merah',
      description: 'Bawang merah berkualitas. Ditanam dengan sistem pertanian modern oleh para ahli.',
      sell_price: 12,
      buy_price: 11,
      category_id: 2,
      user_id: 1,
      images: [
        'img/dummy-product/bawang-merah.jpg'
      ],
      unit: [
        {id: 1, name: 'gram', code: 'gr', weight: 1},
        {id: 1, name: 'ons', code: 'ons', weight: 100},
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
        {id: 3, name: 'bungkus', code: 'bks', weight: 500}
      ]
    },
    {
      id: 4,
      name: 'Bawang Putih',
      description: 'Bawang Putih berkualitas. Ditanam dengan sistem pertanian modern oleh para ahli.',
      sell_price: 15,
      buy_price: 14,
      category_id: 1,
      user_id: 1,
      images: [
        'img/dummy-product/bawang-putih.jpg'
      ],
      unit: [
        {id: 1, name: 'gram', code: 'gr', weight: 1},
        {id: 2, name: 'ons', code: 'ons', weight: 100},
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
        {id: 3, name: 'bungkus', code: 'bks', weight: 500}
      ]
    },
    {
      id: 5,
      name: 'Kalkun',
      description: 'Daging ayam kalkun. Bebas kolesterol. Digemari banyak kalangan',
      sell_price: 300,
      buy_price: 290,
      category_id: 1,
      user_id: 1,
      images: [
        'img/dummy-product/kalkun.jpg'
      ],
      unit: [
        {id: 1, name: 'gram', code: 'gr', weight: 1},
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
      ]
    },
    {
      id: 6,
      name: 'Daging Sapi',
      description: 'Daging sapi pilihan. berwarna merah menandakan daging masih segar.',
      sell_price: 80,
      buy_price: 79,
      category_id: 1,
      user_id: 1,
      images: [
        'img/dummy-product/daging.jpg'
      ],
      unit: [
        {id: 1, name: 'gram', code: 'gr', weight: 1},
        {id: 2, name: 'kilogram', code: 'kg', weight: 1000},
      ]
    }
  ]
  
  return {
    getCities: function(){
      return cities;
    },
    getRegions: function(city_id){
      var reg = [];
      for (var i = 0; i < regions.length; i++){
        if ( Number(regions[i].city_id) == Number(city_id) ){
          reg.push(regions[i]);
        }
      }
      return reg;
    },
    getMarkets: function(region_id){
      var mar = [];
      for (var i = 0; i < markets.length; i++){
        if ( Number(markets[i].region_id) == Number(region_id) ){
          mar.push(markets[i]);
        }
      }
      return mar;
    },
    getCategories: function(){
      return categories;
    },
    getProducts: function(){
      return products;
    },
    getProduct: function(id){
      var index = products.map(function(p) { return p['id']; }).indexOf(Number(id))
      return products[index];
    }
  };
});
