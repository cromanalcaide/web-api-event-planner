import React, { useState, useRef, useEffect } from 'react';
import "../../styles/addressautocomp.css";
import axios from 'axios';

export const AddressAutocomp = () => {
  const [address, setAddress] = useState('');
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

  return (
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
  );
}