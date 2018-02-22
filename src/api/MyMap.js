/*global google*/
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs,
    DirectionsRenderer,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL8hbtDdyI1wWhrtyebSc2LaMlV1_lsko&libraries=places",
        loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
        containerElement: <div style={{ height: `450px`, width: `100%`, border: '2px solid #3cb8ff', borderRadius: '5px', }} />,
        mapElement: <div style={{ height: `100%`, width: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillMount() {
            this.setState({
                center: {
                    lat: 44.7782748, lng: 17.187756,
                },
                onDirectionsService: (city) => {
                    const DirectionsService = new google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: new google.maps.LatLng(44.7782748, 17.187756),
                        destination: city,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                                distance: result['routes'][0]['legs'][0]['distance'].value,
                            });
                            this.props.handleDistance(this.state.distance, city);

                        }
                    });
                },
                handleNewCityToParent: (city) => {
                    this.state.onDirectionsService(city);
                },
            });
        },
    })
)(props => {
    console.log(props);
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={props.center}
        >
            <SearchBox
                controlPosition={google.maps.ControlPosition.TOP}
            >
                <input
                    onKeyPress={(e) => {
                        if (e.which === 13) {
                            e.preventDefault();
                            const city = e.target.value;
                            props.handleNewCityToParent(city);
                        }
                    }}
                    type="text"
                    placeholder="Search..."
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </SearchBox>
            <Marker
                position={new google.maps.LatLng(44.7782748, 17.187756)}
            />
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    )
}
);

export default MyMap;