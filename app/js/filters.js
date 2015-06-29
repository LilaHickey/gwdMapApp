'use strict';

/* Filters */

//TODO: refactor these filters, v. redundant

var gwdMapAppFilters = angular.module('gwdMapAppFilters', [])


// pass input field query, list of markers
gwdMapAppFilters.filter('byName', function() {
  return function(markerList, queryTerm) {
  	
    // if no query, return full marker list
    if (typeof(queryTerm)=='undefined') {
  		return markerList;
  	}
    var queryTerm = queryTerm.toLowerCase();
  	var markerList = markerList;
    var filteredMarkerList = [];
    angular.forEach(markerList, function(value, index){
    	name = value.name.toLowerCase();
    	// if venue name matches query, add marker to filtered list of markers
      if (name.indexOf(queryTerm) >=0) {
    		filteredMarkerList.push(value);
    	}
    })
    
    return filteredMarkerList; // returns -1 if queryTerm not in marker
    
  };
});

gwdMapAppFilters.filter('byDay', function(){
  return(function(markerList, queryDay) {
    
    // if no query, return full list
    if(typeof(queryDay)=='undefined') {
      return markerList;
    }
    var queryDay = queryDay.toLowerCase();
    var markerList = markerList;
    var filteredMarkerList = [];
    angular.forEach(markerList, function(value, index){
      console.log(value.day.toLowerCase())
      var day = value.day.toLowerCase();
      // if venue's day matches query, add marker to filtered list of markers
      if (day == queryDay) {
        filteredMarkerList.push(value);
      }
    })
    return filteredMarkerList;
  })
})