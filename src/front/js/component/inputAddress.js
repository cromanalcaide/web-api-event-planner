import React, { useState } from 'react';
import { AutoApp } from './autoApp.js';

export const InputAddress = () => {
    const [address, setAddress] = useState('');

    return (
        <div>
            <AutoApp onAddressChange={setAddress} />
            <p>Your address: {address}</p>
        </div>
    );
};

