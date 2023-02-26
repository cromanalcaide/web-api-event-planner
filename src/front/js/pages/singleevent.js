import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "../../styles/singleevent.css"

export const Singleevent = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
    console.log(params);

    return (
        <div className = "row single-div">
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
        </div>
    )
};

Singleevent.propTypes = {
	match: PropTypes.object
};