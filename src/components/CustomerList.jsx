import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "./CustomerList.css"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname"},
        { field: "lastname"},
        { field: "streetaddress"},
        { field: "postcode"},
        { field: "city"},
        { field: "email"},
        { field: "phone"},
    ])
    const defaultColDef = {
        sortable: true,
        filter: true
    }
    const autoSizeStrategy = {
        type: 'fitCellContents',
        defaultMinWidth: 100,

    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            const data = await response.json();
            setCustomers(data._embedded.customers)
            //console.log(data)
            
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }
    , []);


    return (
        <div className="CustomerList">
            <div className="ag-theme-material" style={{ width: "100%", height: 800}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
        </div>
    )
}