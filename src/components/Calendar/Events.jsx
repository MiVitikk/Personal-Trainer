import React, {  useEffect } from 'react';
import { parseISO, addMinutes } from 'date-fns';

export default function Events({ fetchedEvents }) {
    

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
            const data = await response.json();

            const fetchedTrainings = data._embedded.trainings;
            console.log(fetchedTrainings)

            const eventsData = fetchedTrainings.map(training => {
                const startDate = parseISO(training.date);
                const endDate = addMinutes(startDate, training.duration);

                return {
                    title: training.activity,
                    start: startDate,
                    end: endDate,
                };
            });

            fetchedEvents(eventsData)
            console.log(eventsData)


        } catch (e) {
            console.error('Error fetching trainings:', e);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    return null;
}