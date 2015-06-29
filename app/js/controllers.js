'use strict';

/* Controllers */


var gwdMapAppControllers = angular.module('gwdMapAppControllers', ['uiGmapgoogle-maps'])

gwdMapAppControllers.controller('mapCtrl', ['$scope', '$http', '$filter',
	function($scope, $http, $filter) {

    $scope.searchQuery = ''; //user-input search term. searches venue name
    $scope.dayOfWeek = 'day'; //user-input day of week
    $scope.venueMarkers = [] // base list of markers
    $scope.filteredMarkers = [] // filtered list of markers

    $scope.map = { center: { latitude: 30.3, longitude: -97.7 }, zoom: 10 }; //TODO: calculate lat/long centering
    
		$http.get('venues/venues.json').success(function(data) {
      $scope.details = data;
      var markers = []
      var marker;
      //loop through json entries generating markers
      angular.forEach(data,function(value,index){ 
        marker = {
  				id: index,
          name: value.name,
  				day: value.day,
  				coords: {
	    	    latitude: value.coords['latitude'],
	        	longitude: value.coords['longitude']
	    	  }
          //TODO: add custom-color icon to differentiate day of week
	      }
        markers.push(marker)
      })

      $scope.venueMarkers = markers; //populate list of markers 
      $scope.filteredMarkers = $scope.venueMarkers; //populate initial (un)filtered list of markers
    });


    // testing marker events. this code works but causes jerky map-recentering. (TODO)
    /*$scope.map.filteredMarkersEvents = {
        mouseover: function (marker, eventName, model, args) {
          marker.showLabel = true;
          $scope.$apply();
        },
        mouseout: function (marker, eventName, model, args) {
           model.options.labelContent = " ";
           marker.showLabel = false;
           $scope.$apply();
        }
    };*/
    
    $scope.$watch("searchQuery", function(searchQuery) {
      //console.log("input field watch triggered");
      //console.log($scope.filteredMarkers);
      
      // if no input, return
      if ($scope.filteredMarkers.length == 0 || typeof(searchQuery) == 'undefined')
       {
        return ;
       }
      // filter base marker list on custom filter
      $scope.filteredMarkers = $filter("byName")($scope.venueMarkers, searchQuery);
     
    });
    $scope.$watch("searchDay", function(searchDay) {
      //console.log("select field watch triggered");
      //console.log($scope.venueMarkers);
      // if no input, return
      if ($scope.filteredMarkers.length == 0 || typeof(searchDay) == 'undefined')
      {
        return ;
      }
      // filter base marker list on custom filter
      $scope.filteredMarkers = $filter("byDay")($scope.venueMarkers, searchDay);
    })
  }
]);

