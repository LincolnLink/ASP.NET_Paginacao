export const PaginacaoService = {

    getData(){
        return fetch('http://localhost:5175/v1/todos/0/2')
        .then((res) => res.json())

        
    }


    
}