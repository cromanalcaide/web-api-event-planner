import React, { useState, useEffect, useRef } from 'react';

export const InputAddress = ({ onAddressChange, apiKey }) => {
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
        <input
            ref={inputRef}
            type="text"
            placeholder="Enter your address"
        />
    );
};

