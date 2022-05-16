var axios = require('axios');

var config = {
    method: 'get',
    url: 'https://api.rinaorc.com/player/maxou78770',
    headers: {
        'Content-type': 'application/json',
        'API-Key': 'cf194b67-c4f7-4403-bc9a-47bd22642d65'
    }
};

axios(config)
    .then(function (response) {
        console.table(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
