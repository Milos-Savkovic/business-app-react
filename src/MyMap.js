import React from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
        containerElement: <div style={{ height: `450px`, width: `700px` }} />,
        mapElement: <div style={{ height: `100%`, width: `100%` }} />,
        google: 'https://api.google.com/some/script.js'
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 44.77583, lng: 17.18556 }}
    >
        <Marker
            position={{ lat: 44.77583, lng: 17.18556 }}
        />
    </GoogleMap>
    );

export default MyMap;