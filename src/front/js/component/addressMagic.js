import { useState } from "react";
// import ReactGoogleAutocomplete from "react-google-autocomplete";

export const AddressMagic = () => {

    const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;
    const [location, setLocation] = useState("");

    return (
        <div>
            <div>
                <input type="text" placeholder="Enter your address" />
                <p>Your address: {location}</p>
            </div>
            {/* <ReactGoogleAutocomplete
                className="form-control m-2"
                placeholder="Location"
                apiKey={config}
                onPlaceSelected={(place) => {
                    setLocation(place.formatted_address);
                }}
                style={{ height: "50px" }}
            /> */}
        </div>
    )
}
