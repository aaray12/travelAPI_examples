var axios = require("axios").default;
async function getLocationID(city){
  var options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/locations/search',
    params: {query: city, locale: 'en_US'},
    headers: {
      'x-rapidapi-key': 'a0e26770e6mshacbd79b3c68c795p142795jsn2d20c01986cc',
      'x-rapidapi-host': 'hotels4.p.rapidapi.com'
    }
  };

  var hotelReq = await axios.request(options);
  console.log("ID info", hotelReq.data.suggestions[0].entities[1])
  return hotelReq.data.suggestions[0].entities[1].destinationId
}

async function getHotelList(city){
  var options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/properties/list',
    params: {
      destinationId: await getLocationID(city),
      pageNumber: '1',
      checkIn: '2020-01-08',
      checkOut: '2020-01-15',
      pageSize: '25',
      adults1: '1',
      currency: 'USD',
      locale: 'en_US',
      sortOrder: 'PRICE'
    },
    headers: {
      'x-rapidapi-key': 'a0e26770e6mshacbd79b3c68c795p142795jsn2d20c01986cc',
      'x-rapidapi-host': 'hotels4.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log("Chicago Down Town" ,response.data.data.body.searchResults.results);
  }).catch(function (error) {
    console.error(error);
  });
}

// getLocationID("Chicago")
getHotelList("Chicago")