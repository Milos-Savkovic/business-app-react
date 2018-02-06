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
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL8hbtDdyI1wWhrtyebSc2LaMlV1_lsko",
        loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
        containerElement: <div style={{ height: `450px`, width: `100%`, border: '2px solid #3cb8ff', borderRadius: '5px', }} />,
        mapElement: <div style={{ height: `100%`, width: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillReceiveProps() {
            if ((this.props.city !== 'Banja Luka') && (this.props.city !== undefined)) {
                this.setState({
                    isBanjaLuka: false,
                });

                const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                    origin: new google.maps.LatLng(44.7782748, 17.187756),
                    destination: this.props.city,
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                            distance: result['routes'][0]['legs'][0]['distance'].value,
                        });
                        this.props.handleDistance(this.state.distance, this.props.city);
                    }
                });
            } else if (this.props.city === 'Banja Luka') {
                this.setState({
                    isBanjaLuka: true,
                })
            }
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