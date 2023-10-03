/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import { PaginacaoService } from "./PaginacaoService";
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';


const Paginacao = () =>{
    
    const [items, setItems] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    

    useEffect(() => {
        // const data = PaginacaoService.getData(page, pageSize)
        // .then((data) =>{
        //     console.log(data);
        //     setItems(data.data);
        //     setTotalRecords(data.total)
        // })

        const params = {
            page: page,
            pageSize: pageSize,
          };
      
          // Transforme o objeto de parâmetros em uma string de consulta
          const queryParams = new URLSearchParams(params).toString();
      
          // Construa a URL da API com os parâmetros
          const apiUrl = `http://localhost:5175/v1/todos?${queryParams}`;
        
        //fetch("http://localhost:5175/v1/todos?page=${page}&pageSize=${pageSize}")
        fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            console.log("aki: ", response);
            setItems(response.data);
            setTotalRecords(response.total)
        })
        

        
    }, [page, pageSize]);

    const onPageChange = (event) => {
        setPage(event.first / pageSize + 1);
        //?
        setPageSize(event.rows);
      };
    
    const onPageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return(<>
    <h1>Paginação</h1>
    <div className="card">
            <DataTable 
                value={items}                                 
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" style={{ width: '25%' }}></Column>
                <Column field="title" header="Titulo" style={{ width: '25%' }}></Column>
                <Column field="createdAt" header="Data de Criação" style={{ width: '25%' }}></Column>
                <Column field="done" header="Feito" style={{ width: '25%' }}></Column>                
            </DataTable>
            <Paginator
                rows={pageSize}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                first={(page - 1) * pageSize}
                rowsPerPageOptions={[5, 10, 25, 50]}
                //onRowsPerPageChange={onPageSizeChange}            
            ></Paginator>
    </div>
    
    </>)
}

export default Paginacao;