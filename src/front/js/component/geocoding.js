import React, { useState, useRef, useEffect } from 'react';
import "../../styles/addressautocomp.css";

export const Geocoding = () => {
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
                const selectedAddress = place.formatted_address;
                setAddress(selectedAddress);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address: selectedAddress }, (results, status) => {
                    if (status === "OK") {
                        console.log(`Latitud: ${results[0].geometry.location.lat()}, Longitud: ${results[0].geometry.location.lng()}`);
                    } else {
                        console.error("No se pudo obtener la ubicación para la dirección especificada");
                    }
                });
            });
        };

        return () => {
            document.body.removeChild(script);
        }
    }, [apiKey]);

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
};



// evolución

// export const Geocoding = ({ onLocationChange }) => {
//   const [address, setAddress] = useState('');
//   const inputRef = useRef(null);
//   const apiKey = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

//   useEffect(() => {
//     const onLocationChange = (location) => {
//       console.log(`Latitud: ${location.latitude}, Longitud: ${location.longitude}`);
//       // Guardar la ubicación en el estado del componente padre
//       // onLocationChange(location);
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
//     script.async = true;

//     document.body.appendChild(script);

//     script.onload = () => {
//       const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
//       autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         const selectedAddress = place.formatted_address;
//         setAddress(selectedAddress);

//         const geocoder = new window.google.maps.Geocoder();
//         geocoder.geocode({ address: selectedAddress }, (results, status) => {
//           if (status === "OK") {
//             onLocationChange({
//               latitude: results[0].geometry.location.lat(),
//               longitude: results[0].geometry.location.lng(),
//             });
//           } else {
//             console.error("No se pudo obtener la ubicación para la dirección especificada");
//           }
//         });
//       });
//     };

//     return () => {
//       document.body.removeChild(script);
//     }
//   }, [apiKey, onLocationChange]);

//   return (
//     <div className="addressAutocomp-div mx-1 col-xs-5 col-sm-5 col-md-4 col-lg-4 col-xl-4">
//       <input
//         className="form-control form-control-lg"
//         type="text"
//         placeholder="Dirección"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         ref={inputRef}
//       />
//     </div>
//   );
// };
