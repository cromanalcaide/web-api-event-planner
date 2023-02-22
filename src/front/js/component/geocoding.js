import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const Geocoding = () => {

    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const apiKey = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                setAddress(place.formatted_address);
            });
        };
    }, []);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios
            .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
            .then((response) => {
                const location = response.data.results[0].geometry.location;
                setLatitude(location.lat);
                setLongitude(location.lng);
                setError('');
            })
            .catch((error) => {
                setError('Hubo un error al buscar la ubicación. Inténtalo de nuevo más tarde');
            });
    };

    return (

        <div>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" value={address} onChange={handleAddressChange} />
                    <button type="submit">Buscar</button>
                </form>
                {error && <p>{error}</p>}
                {latitude && <p>Latitud: {latitude}</p>}
                {longitude && <p>Longitud: {longitude}</p>}
            </div>
            <div className="addressAutocomp-div mx-1 col-xs-5 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ref={inputRef}
                />
            </div>
        </div>
    );
}   
