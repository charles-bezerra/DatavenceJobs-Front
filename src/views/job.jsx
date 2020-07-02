import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FormNewJob from '../components/formNewJob';
import BannerJob from '../components/bannerJob';
import ContentLoading from "../components/contentLoading";

import api from '../services/api';


const styleContentForm = {
    width: "100%",
    padding: "30px 0 30px 0",
    display: "flex",
    justifyContent: "center"
}


const Content = (props) => (
    <>
        <BannerJob {...props} />
        
        <section style={ styleContentForm } id="#form">
            <FormNewJob job={props} />
        </section>
    </>
);


export default function JobView (props) {
    const [content, setContent] = useState(<ContentLoading/>);
    const {id} = useParams();

    function onResponse(response) {
        const job = response.data;
        if (job) {
            setContent(<Content {...job} />);
        } 
        else {
            setContent(<></>);
        }
    }


    useEffect(() => {
        api
        .get(`/job/${id}`)
        .then( onResponse )
        .catch( (error) => {
            console.log(error);
        });
        
    }, [id]);


    return content;
}