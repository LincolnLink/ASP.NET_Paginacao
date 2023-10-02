/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import { PaginacaoService } from "./PaginacaoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Paginacao = () =>{
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        PaginacaoService.getData()
        .then((data) =>{
            console.log(data);
            setCustomers(data)
        })
    }, []);

    return(<>
    <h1>Paginação</h1>
    <div className="card">
            <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
    </div>
    
    </>)
}

export default Paginacao;