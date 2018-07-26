import {ENDPOINTS} from './constants';


export class ToDoList {

    getList(){
        const listPromise = fetch(ENDPOINTS.SERVER_PATH)
            .then((response) => {
                return response.json();
            })

        return listPromise;
    }

}
