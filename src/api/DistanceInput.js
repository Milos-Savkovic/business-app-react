import React from 'react';
import TextField from 'material-ui/TextField';
import { compose, withProps, lifecycle } from 'recompose';
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
    lifecycle({
        componentWillMount() {
            this.setState({
                handleCity: this.props.handleCity,
                places: [],
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox >
            <TextField
                id="mapSearch"
                autoComplete='off'
                placeholder="Search..."
                name="cityName"
                onChange={props.handleCity ? props.handleCity : 0}
                style={{ width: 200 }}
                required
            />
        </StandaloneSearchBox>
    </div>
    );

export default DistanceInput;