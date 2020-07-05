import React from 'react';
import { Card, Button } from 'react-bootstrap';


const JobCard = (props) => (
    <Card className="shadow rounded-lg border-0 my-4">
        <Card.Body> 
            <h2>{ props.title }</h2>
            <p className="text-success" style={{ fontSize: "12px" }}>
                {props.place.town}/{props.place.state} - {props.place.country}
            </p>

            <hr/>

            <h6>Detalhes</h6>
            <p>{ props.details }</p>

            <hr/>

            <Button 
                variant="primary" 
                href={`/job/${props.id}`}
                className="border-0"
                style={{ backgroundColor: "#2D2533" }}>
                Candidatar-se
            </Button>
        </Card.Body>
    </Card>
);


export default function (props) {
    return (
    <>
    {
        props.jobs.map(
            (e,i) => <JobCard key={`jobs-list-item-${i}`} {...e}/>
        )
    }
    </>
    );
}