appServices.factory('Cart', ['$localstorage', function($localstorage) {
  
  var user = JSON.parse($localstorage.get('user'));
  
  var order = {
    total: 0,
    address: {
      id: null,
      street: null,
      detail: '',
      latitude: null,
      longitude: null
    },
    delivery_time: {
      start: null,
      end: null
    },
    payment_method_id: null,
    market_id: null,
    customer_id: user.id,
    phone: user.profile.phone,
    items: []
  };
  
  var emptyOrder = angular.copy(order);
  
  
  return {
    
    getCarts: function() {
      if( $localstorage.get('order') != undefined) order = JSON.parse($localstorage.get('order'));
      return order;
    },
    
    addItems: function(product, qty, unit){
      
      if( $localstorage.get('order') != undefined) order = JSON.parse($localstorage.get('order'));
      
      var index = order.items.map(function(item) { return Number(item['product_id']); }).indexOf(Number(product.id))
      
      var item = {
        product_id: product.id,
        product_name: product.name,
        product_image: product.images[0],
        price: product.sell_price,
        subtotal: 0,
        counts:[]
      }
      var count = {
        qty: qty,
        unit_id: unit.id,
        unit_code: unit.code,
        unit_weight: unit.weight
      }
      var total = Number(qty) * Number(unit.weight) * Number(product.sell_price)
      
      //Jika product tidak ada dalam order item, tambahkan baru. Jika ada, update.
      if(index == -1){
        
        item.subtotal = total;
        item.counts.push(count);
        order.items.push(item);
        
      } else {
        
        var found = order.items[index];
        var unitindex = found.counts.map(function(c) { return Number(c['unit_id']); }).indexOf(Number(unit.id))
        
        if(unitindex == -1){
          found.counts.push(count);
        } else {
          var count = found.counts[unitindex];
          count.qty = Number(count.qty) + Number(qty);
        }
        found.subtotal = Number(found.subtotal) + (Number(qty) * Number(unit.weight) * Number(product.sell_price))
        
      }
      order.total = Number(order.total) + total;
      
      $localstorage.set('order', JSON.stringify(order) );
      
    },
    
    removeItem: function(product_id){
      var order = JSON.parse($localstorage.get('order'));
      var index = order.items.map(function(item) { return Number(item['product_id']); }).indexOf(Number(product_id));
      
      var counts = order.items[index].counts;
      for(var i = 0; i < counts.length; i++){
        order.total = Number(order.total) - ( Number(counts[i].qty) * Number(counts[i].unit_weight) * Number(order.items[index].price) );
      }
      order.items.splice(index, 1);
      
      $localstorage.set('order', JSON.stringify(order) );
      this.reset(order.total);
      
    },
    
    increaseUnitItem: function(product_id, qty, unit_id){
      var order = JSON.parse($localstorage.get('order'));
      var index = order.items.map(function(item) { return Number(item['product_id']); }).indexOf(Number(product_id));
      
      var found = order.items[index];
      var unitindex = found.counts.map(function(c) { return Number(c['unit_id']); }).indexOf(Number(unit_id));
      
      found.subtotal = Number(found.subtotal) + (Number(qty) * Number(found.price) * Number(found.counts[unitindex].unit_weight));
      found.counts[unitindex].qty = Number(found.counts[unitindex].qty) + Number(qty);
      
      order.total = Number(order.total) + ( Number(found.counts[unitindex].unit_weight) * Number(qty) * Number(order.items[index].price) );
      
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    decreaseUnitItem: function(product_id, qty, unit_id){
      var order = JSON.parse($localstorage.get('order'));
      var index = order.items.map(function(item) { return Number(item['product_id']); }).indexOf(Number(product_id));
      
      var found = order.items[index];
      var unitindex = found.counts.map(function(c) { return Number(c['unit_id']); }).indexOf(Number(unit_id));
      
      found.subtotal = Number(found.subtotal) - (Number(qty) * Number(found.price) * Number(found.counts[unitindex].unit_weight));;
      found.counts[unitindex].qty = Number(found.counts[unitindex].qty) - Number(qty);
      
      order.total = Number(order.total) - ( Number(found.counts[unitindex].unit_weight) * Number(qty) * Number(order.items[index].price) );
      
      if ( found.counts[unitindex].qty == 0){
        found.counts.splice(unitindex, 1);
      }
      if( found.counts.length == 0 ){
        order.items.splice(index, 1);
      }
      
      $localstorage.set('order', JSON.stringify(order) );
      this.reset(order.total);
    },
    
    updateTime: function(start, end){
      var order = JSON.parse($localstorage.get('order'));
      order.delivery_time.start = start;
      order.delivery_time.end = end;
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    updateAddress: function(address){
      //console.log(address); stop();
      var order = JSON.parse($localstorage.get('order'));
      order.address.id = address.id;
      order.address.street = address.street;
      order.address.detail = address.detail;
      order.address.latitude = address.latitude;
      order.address.longitude = address.longitude;
      order.distance = address.distance_to_market;
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    updateAddressDetail: function(detail){
      var order = JSON.parse($localstorage.get('order'));
      order.address.detail = detail;
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    updatePhone: function(phone){
      var order = JSON.parse($localstorage.get('order'));
      order.phone = phone;
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    updatePayment: function(id){
      var order = JSON.parse($localstorage.get('order'));
      order.payment_method_id = Number(id);
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    updateMarket: function(id){
      var order = JSON.parse($localstorage.get('order'));
      order.market_id = Number(id);
      $localstorage.set('order', JSON.stringify(order) );
    },
    
    deleteAll: function(){
      $localstorage.remove('order');
    },
    
    reset: function(total){
      if( total === 0 ){
        $localstorage.set('order', JSON.stringify(emptyOrder) );
      }
    }
  };
}]);
