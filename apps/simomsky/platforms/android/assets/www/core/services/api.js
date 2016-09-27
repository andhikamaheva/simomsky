appServices.factory('Api', function($http, $timeout, apiAddress) {

  var httppost = function(path, data){
    //return $http.post(apiAddress + path, data);
    return $http({
      url: apiAddress + path,
      method: 'POST',
      data: data,
      //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

  }

  var httpget = function(path, params){
    return $http({
      url: apiAddress + path,
      method: 'GET',
      params: params
    })
  }

  return {
    login: function(credentials){
      return httppost('/login', credentials);
    },
    logout: function(credentials){
      return httppost('/logout', credentials);
    },
    getMoms: function(id){
      return $http.get(apiAddress + '/moms/' +id);
    },
    addMoms: function(params){
      return httppost('/mom', params);
    },
    getMom: function(id){
      return $http.get(apiAddress + '/mom/' +id);
    },
    search: function(params){
     return $http.post(apiAddress + '/search', params);
   },
    addPregnant: function(params){
    return $http.post(apiAddress + '/pregnant', params);
   },
   addFeedback: function(message){
   return $http.post(apiAddress + '/feedback', message);
  },
  updateQuarterly: function(params){
  return $http.post(apiAddress + '/quarterly', params);
 },
    getPregnants: function(id){
    return $http.get(apiAddress + '/pregnant/' +id);
   },
    getQuarterly: function(id){
     return $http.get(apiAddress + '/quarterly/' +id);
   },
  };

});
