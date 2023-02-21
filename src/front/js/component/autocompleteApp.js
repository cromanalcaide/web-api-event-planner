import React, { useState } from 'react';
import InputAddress from './inputAddress.js';
import ReactGoogleAutocomplete from "react-google-autocomplete";
const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

export const AutoApp = () => {
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
        script.async = true;
        document.body.appendChild(script);

        window.initAutocomplete = () => {
            setAutocomplete(new window.google.maps.places.Autocomplete(inputRef.current));
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [apiKey]);

    useEffect(() => {
        if (autocomplete) {
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const address = place.formatted_address;
                onAddressChange(address);
            });
        }
    }, [autocomplete, onAddressChange]);

    return (
        <div>
            <InputAddress
                onAddressChange={setAddress}
                apiKey="AIzaSyBF5QV-j7b79_4-mlZeEiIlCzuckjzxlrk"
            />
            <p>Your address: {address}</p>
        </div>
    );
};