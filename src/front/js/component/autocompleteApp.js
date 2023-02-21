import React, { useState } from 'react';
import InputAddress from './inputAddress.js';

export const AutoApp = () => {
    const [address, setAddress] = useState('');

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