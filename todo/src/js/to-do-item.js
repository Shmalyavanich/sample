import {ENDPOINTS} from './constants';
import {STATUSES} from './constants';


export class ToDoItem {

    constructor({id = 0, finishDate, caption, description, status = STATUSES.NEW}) {
        this.item = {};
        this.item.id = id;
        this.item.status = status;
        this.item.finishDate = new Date(finishDate);
        this.item.caption = caption;
        this.item.description = description;
        this.item = Object.preventExtensions(this.item);
    }


    getStatus (statuseId){
        return this.item.status;
    }


    setStatus(statuseId){
        this.item.status = STATUSES[statuseId];
    }

    getItemById(){
        const itemEndpoint = ENDPOINTS.SERVER_PATH + this.item.id;

        const itemPromise = fetch(itemEndpoint)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });

        return itemPromise;
    }


    getDescription(){
        const descriptionEndpoint = ENDPOINTS.SERVER_PATH + this.item.id + ENDPOINTS.DESCRIPTION_PATH;

        const descPromise = fetch(descriptionEndpoint)
            .then((response) => {
                return response.json();
            }).then((data) => {
                const description = data.description ? data.description : '';
                return description;
            });

        return descPromise;
    }


    getCaption(){
        return this.item.caption;
    }


    save(){
        const savePromise = fetch(ENDPOINTS.SERVER_PATH, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(this.item)
        })

        return savePromise;
    }


    update(){
        const updatePromise = fetch(ENDPOINTS.SERVER_PATH, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(this.item)
        })

        return updatePromise;
    }


    delete(){
        const deleteEndpoint = ENDPOINTS.SERVER_PATH + this.item.id

        const deletePromise = fetch(deleteEndpoint, {
            method: 'delete',
        })

        return deletePromise;
    }

}
