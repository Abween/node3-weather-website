const request = require('request');

const geocode= (address, callback)=> {

    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibGluazQyNSIsImEiOiJja241OTNmbXowMXhnMnBtbGRza3BzNTBjIn0.I48QjmnQ8Q9YkJKiTMHfsQ&limit=1";
    request({url, json: true }, (error, {body}={}) => {

        if (error) {
            callback("Unable to connnect to geocoding services!!", undefined);
        }
        else if (body.features.length === 0) {
            callback("Search Location is not found!!!", undefined);
        }
        else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    })
};


module.exports =geocode;