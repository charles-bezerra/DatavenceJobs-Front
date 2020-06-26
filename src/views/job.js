import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import FormNewJob from '../components/formNewJob';

export default function JobView (props) {
    const {id} = useParams();

    return (
        <>
            <h1>Job id is: {id}</h1>  

            <div className="w-100 align-center">
                <FormNewJob/>
            </div>
        </>
    );
}