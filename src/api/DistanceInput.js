import React from 'react';
import TextField from 'material-ui/TextField';
import {
    compose,
    withProps,
} from 'recompose';
import {
    withScriptjs,
} from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const DistanceInput = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL8hbtDdyI1wWhrtyebSc2LaMlV1_lsko&libraries=places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs
)(props => {
    console.log(props);
    return (
        <StandaloneSearchBox >
            {props.children}
        </StandaloneSearchBox>
    );
});

export default DistanceInput;