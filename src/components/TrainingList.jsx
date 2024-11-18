import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { Button } from "@mui/material";
import "./TrainingList.css"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: "date", headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "activity", headerName: "Activity" },
        { field: "customerName", headerName: "Customer" },
        { 
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => <Button onClick={() => deleteTraining(params.data._links.self.href)}>Delete</Button>
        }
    ])
    const defaultColDef = {
        sortable: true,
        filter: true
    }
    const autoSizeStrategy = {
        type: 'fitCellContents',
        defaultMinWidth: 100,

    };

    const fetchCustomer = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return `${data.firstname} ${data.lastname}`;
        }
        catch (e) {
            console.error(e);
            return "Unknown Customer"
        }
    }

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            const data = await response.json();
            const trainingsWithCustomers = await Promise.all(
                data._embedded.trainings.map(async (training) => {
                    const customerName = await fetchCustomer(training._links.customer.href); 
                    return {
                        ...training,
                        date: format(new Date(training.date), "MM/dd/yyyy HH:mm"), 
                        customerName 
                    };
                })
            );

            setTrainings(trainingsWithCustomers); 
            console.log(trainingsWithCustomers);

            console.log(trainingsWithCustomers);


        }
        catch (e) {
            console.error(e);
        }
    }

    const deleteTraining = async (url) => {
        const options = {
            method: 'DELETE'
        }
        try {
            if (confirm("Delete Training?")){
                const response = await fetch(url, options)
                fetchTrainings();
            }
        }
        catch (e) {
            console.error(e)
        }
    }





    useEffect(() => {
        fetchTrainings();
    }, []);

    const gridRef = useRef();

    return (
        <div className="TrainingList">
            <div className="ag-theme-material" style={{ width: "100%", height: "800px" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={trainings}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    onGridReady={params => gridRef.current = params.api}
                />
            </div>
        </div>
    )
}