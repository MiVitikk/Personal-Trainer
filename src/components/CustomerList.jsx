import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "./CustomerList.css"
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => <Button onClick={() => deleteCustomer(params.data._links.self.href)}>Delete</Button>
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params  => <EditCustomer updateCustomer={updateCustomer} customer={params.data}/>
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

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            const data = await response.json();
            setCustomers(data._embedded.customers)
            console.log(data)
            
        }
        catch (e) {
            console.error(e)
        }
    }

    const saveCustomer = async (customer) => {
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(customer)
        }
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', options)
            const data = await response.json()
        }
        catch (e) {
            console.error(e)
        }
        fetchCustomers();
    };

    const deleteCustomer = async (url) => {
        const options = {
            method: 'DELETE'
        }

        try {
            if(confirm("Delete customer?")){
                const response = await fetch (url, options);
                fetchCustomers();
            }
        }
        catch (e) {
            console.error(e)
        }
    
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCustomers()
    }
    , []);


    return (
        <div className="CustomerList">
            <AddCustomer saveCustomer={saveCustomer} />
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