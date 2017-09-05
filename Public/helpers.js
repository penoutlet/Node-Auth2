var axios = require('axios');

  $('#search').on('click', ()=>{
    console.log('clicked')
    GetMovie();
    });


  GetMovie: function(){
    axios.get('http://www.omdbapi.com/?apikey=2393c630',{
      params:  {
        t: "The Hobbit"
    }
  }).then((data)=>{
          console.log(data.data);
          // res.render(data.data);
          // $('#resultsdiv').append(data.data);
            });
         },
  };
