import React, { useState, useEffect } from 'react';
import { formatISO, parseISO } from 'date-fns';

export default function Events(props) {
    const [trainings, setTrainings] = React.useState({
        id: '',
        duration: '',
        activity: '',
        date: '',
    })

    const fetchTrainings = async () => {
        try{
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            const data = await response.json()
            setTrainings(data)
            console.log(trainings)
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchTrainings();
    }, []);
}