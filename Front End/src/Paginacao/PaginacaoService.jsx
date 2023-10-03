/* eslint-disable no-unused-vars */
export const PaginacaoService = {

    async getData(pagev, pageSizev){
        const page = pagev;
        const pageSize = pageSizev;
        const response = await fetch('http://localhost:5175/v1/todos?page=${page}&pageSize=${pageSize}');
        const data = await response.json();
        return data;
    }


    
}