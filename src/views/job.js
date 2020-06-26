import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import FormNewJob from '../components/formNewJob';
import BannerJob from '../components/bannerJob';


const styleContentForm = {
    width: "100%",
    display: "flex",
    justifyContent: "center"
}

export default function JobView (props) {
    const {id} = useParams();

    return (
        <>
            <BannerJob />

            <div style={ styleContentForm }>
                <FormNewJob/>
            </div>
        </>
    );
}