import React, { Component } from "react";

import { GoogleMap, GoogleMapLoader, Marker, SearchBox, PlacesService } from "react-google-maps";

const searchStyles = {
    border: '1px solid transparent',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    fontSize: '14px',
    height: '32px',
    marginTop: '27px',
    outline: 'none',
    padding: '0 12px',
    textOverflow: 'ellipses',
    width: '400px',
}

const mapCenter = {
    lat: 36.002453,
    lng: -78.905869,
}

export default class CozyFiMap extends React.Component {
  constructor() {
      super();
      //BINDS THIS TO EACH FUNCTION
      this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
      this.handlePlacesChanged = this.handlePlacesChanged.bind(this);

      this.state = {
          bounds: null,
          center: mapCenter,
          markers: []
      }
  }


  handleBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
  }

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      markers.push({
        position: place.geometry.location,
      });
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
    var infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);

  }

    ///////////////////////////
//    initMap() {
//   // Create a map to show the results, and an info window to
//   // pop up if the user clicks on the place marker.
//   // var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);mapCenter
//
// }
//
// function placeDetailsByPlaceId(service, map, infowindow) {
//   // Create and send the request to obtain details for a specific place,
//   // using its Place ID.
//   var request = {
//     placeId: document.getElementById('place-id').value
//   };
//
//   service.getDetails(request, function (place, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       // If the request succeeds, draw the place location on the map
//       // as a marker, and register an event to handle a click on the marker.
//       var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//       });
//
//       google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//           'Place ID: ' + place.place_id + '<br>' +
//           place.formatted_address + '</div>');
//         infowindow.open(map, this);
//       });
//
//       map.panTo(place.geometry.location);
//     }
//   });
// }

// Run the initialize function when the window has finished loading.
/////////////////////////////
  render() {
    return (
      <GoogleMap
        center={this.state.center}
        containerProps={{
          style: {
            height: '500px',
            width: '500px',
          },
        }}
        defaultZoom={15}
        onBoundsChanged={this.handleBoundsChanged}
        ref="map"
      >
        <SearchBox
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.handlePlacesChanged}
          ref="searchBox"
          placeholder="Search for a coworking space"
          style={searchStyles}
        />
        {this.state.markers.map((marker, index) => (
          <Marker position={marker.position} key={index} />
        ))}
      </GoogleMap>
    );
  }
}
