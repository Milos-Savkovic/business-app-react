/*global google*/
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs,
    DirectionsRenderer
} from "react-google-maps";

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
        containerElement: <div style={{ height: `450px`, width: `700px` }} />,
        mapElement: <div style={{ height: `100%`, width: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(44.7782748, 17.187756),
                destination: this.props.city,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (this.props.city === 'Banja Luka') {
                    this.setState({
                        isBanjaLuka: true
                    });
                }
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        distance: result['routes'][0]['legs'][0]['distance'].value
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props => {
    if (props.isBanjaLuka) {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={new google.maps.LatLng(44.7782748, 17.187756)}
            >
                <Marker
                    position={new google.maps.LatLng(44.7782748, 17.187756)}
                />
            </GoogleMap>
        )
    } else {
        console.log(props.distance);
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={new google.maps.LatLng(44.7782748, 17.187756)}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        )
    }
}
    );

export default MyMap;