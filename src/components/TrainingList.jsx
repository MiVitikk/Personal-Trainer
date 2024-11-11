import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import "./TrainingList.css"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: "date", headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "activity", headerName: "Activity" },
        { field: "customer.href.firstname", headerName: "Customer"}
    ])
    const defaultColDef = {
        sortable: true,
        filter: true
    }
    const autoSizeStrategy = {
        type: 'fitCellContents',
        defaultMinWidth: 100,

    };

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            const data = await response.json();
            const formattedTrainings = data._embedded.trainings.map((training) => ({
                ...training,
                date: format(new Date(training.date), "MM/dd/yyyy kk.mm"), 
              }));
        
              setTrainings(formattedTrainings);
            console.log(data);

        }
        catch (e) {
            console.error(e);
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