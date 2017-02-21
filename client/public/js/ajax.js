var app = new Vue({

  // We want to target the div with an id of 'events'
  el: '#houses',
  data: {
    house:{
      seller:'',
      address:'',
      price:'',
      image:'',
      longitude:'',
      latitude:''
    },
    updated:{
      _id:'',
      seller:'',
      address:'',
      price:'',
      image:'',
      longitude:'',
      latitude:''
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
    },

  // Adds an event to the existing events array
  addHouse: function() {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/house',
      data:{seller:app.house.seller,
            address:app.house.address,
            price:app.house.price,
            image:app.house.image},
      success: function(data) {
        app.fetchHouses()
        app.house = {
        seller:'',
        address:'',
        price:'',
        image:'',
        longitude:'',
        latitude:''};
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
            image:app.updated.image},
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
        }

      },
      error: function(error) {
        console.log(error);
      }
    });
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
