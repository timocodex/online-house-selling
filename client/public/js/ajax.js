var x
var y
var app = new Vue({

  // We want to target the div with an id of 'events'
  el: '#houses',
  data: {
    house:{
      seller:'',
      address:'',
      price:'',
      image:'',
      longitude:0,
      latitude:0
    },
    updated:{
      _id:'',
      seller:'',
      address:'',
      price:'',
      image:'',
      longitude:0,
      latitude:0
    },
    houses:[]
  },

  // Anything within the ready function will run when the application loads
  mounted: function() {
    this.fetchHouses()
  },

  // Methods we want to use in our application are registered here
  methods: {
    fetchHouses: function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/house',
        success: function(data) {
          app.houses = data

        },
        error: function(error) {
          console.log(error);
        }
      });
      var map = new GMaps({
        div: '#akuPeta',
        lat: -6.92133941054468,
        lng: 107.6307529269252,
        click: function(e){
          map.removeMarkers()
          map.addMarker({
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
          })
          console.log(e.latLng.lat());
          console.log(e.latLng.lng());
          x = e.latLng.lat()
          y = e.latLng.lng()
        }
      });
      map.addMarker({
        lat:-6.92133941054468,
        lng:107.6307529269252
      })
    },

  // Adds an event to the existing events array
  addHouse: function() {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/house',
      data:{seller:app.house.seller,
            address:app.house.address,
            price:app.house.price,
            image:app.house.image,
            latitude:x,
            longitude:y},
      success: function(data) {
        app.fetchHouses()
        app.house = {
        seller:'',
        address:'',
        price:'',
        image:'',
        longitude:0,
        latitude:0};
      },
      error: function(error) {
        console.log(error);
      }
    });
  },
  updateHouse: function(id) {
    $.ajax({
      type: 'PUT',
      url: `http://localhost:3000/api/house/${id}`,
      data:{seller:app.updated.seller,
            address:app.updated.address,
            price:app.updated.price,
            image:app.updated.image,
            latitude:x,
            longitude:y
          },
      success: function(data) {
        app.fetchHouses()
      },
      error: function(error) {
        console.log(error);
      }
    });
  },
  open: function(id){
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/api/house/${id}`,
      success: function(data) {
        app.updated ={
          _id:data._id,
          seller:data.seller,
          address:data.address,
          price:data.price,
          image:data.image,
          latitude:data.latitude,
          longitude:data.longitude
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
    setTimeout(function(){
      var map = new GMaps({
        div: '#akuPeta2',
        lat: app.updated.latitude,
        lng: app.updated.longitude,
        click: function(e){
          map.removeMarkers()
          map.addMarker({
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
          })
          console.log(e.latLng.lat());
          console.log(e.latLng.lng());
          x = e.latLng.lat()
          y = e.latLng.lng()
        }
      });
      map.addMarker({
        lat:app.updated.latitude,
        lng:app.updated.longitude
      })
    },1000)
  },
  deleteHouse: function(id){
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/api/house/${id}`,
      success: function(data) {
        app.fetchHouses()
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  }
});
