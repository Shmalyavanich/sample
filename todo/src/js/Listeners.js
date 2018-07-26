import {ENDPOINTS} from './constants';
import {STATUSES} from './constants';
import {NODE_SELECTORS} from './constants';
import {DomHandlers} from './dom-handlers';
import {ToDoItem} from './to-do-item';
import {Application} from './app';


export class Listeners {

    constructor(){
        this.saveStatuse = 0; //0 - save, 1 - update
    }


    start(){
        document.addEventListener('click', (e) => {

            if(e.target.classList.contains(NODE_SELECTORS.VIEW_DESC)){
                const domHandlers = new DomHandlers();
                domHandlers.showItemDescription(e);
            } else {
                let todoItemElement = e.target.closest(NODE_SELECTORS.TODO_ITEM);

                if(todoItemElement){
                    this.toDoItemEdit(e);
                }
            }

            if(e.target.classList.contains(NODE_SELECTORS.SAVE_ITEM)){
                e.preventDefault();
                this.toDoItemsave();
            }

            if(e.target.classList.contains(NODE_SELECTORS.UPDATE_STATUS)){
                e.preventDefault();
                this.toDoItemUpdateStatus();
            }

            if(e.target.classList.contains(NODE_SELECTORS.ADD_ITEM)){
                this.showAddForm();
            }

            if(e.target.classList.contains(NODE_SELECTORS.DELETE_ITEM)){
                e.preventDefault();
                console.log('asaa');
                this.toDoItemDelete();
            }

        });

    }


    showAddForm(){
        const domHandlers = new DomHandlers();
        domHandlers.hideDescription();
        domHandlers.showForm();
        domHandlers.formReset();
        this.saveStatuse = 0;
        domHandlers.switchOffDeleteBtn();
    }


    toDoItemsave(){
        const app = new Application();
        const domHandlers = new DomHandlers();
        let formData = domHandlers.getFormData();
        let savePromise;
        const item = new ToDoItem(formData);

        if(this.saveStatuse == 0){
            savePromise = item.save();
        } else if(this.saveStatuse == 1){
            savePromise = item.update();
        }

        savePromise.then((data) => {
            domHandlers.formReset();
            domHandlers.showLoader();
            app.renderItemsList();
            this.saveStatuse = 0;
        });
    }


    toDoItemEdit(e){
        const domHandlers = new DomHandlers();
        const itemId = {id: domHandlers.getItemId(e.target)};
        const toDoItem = new ToDoItem(itemId);
        const itemPromise = toDoItem.getItemById();

        this.saveStatuse = 1;
        domHandlers.switchOnDeleteBtn();

        itemPromise.then((item) => {
            domHandlers.hideDescription();
            domHandlers.showForm();
            domHandlers.fillForm(item);
        });
    }


    toDoItemUpdateStatus(){
        const domHandlers = new DomHandlers();
        const statusesCount = Object.keys(STATUSES).length;
        const itemStatus = domHandlers.getFormStatus();
        const statuses = Object.values(STATUSES);
        const statusIndex = statuses.indexOf(itemStatus);
        let newStatus = '';

        if(statusIndex < statusesCount - 1){
            newStatus = statuses[statusIndex + 1];
        } else {
            newStatus = statuses[0];
        }

        domHandlers.setFormStatus(newStatus);
    }


    toDoItemDelete(){
        const domHandlers = new DomHandlers();
        const app = new Application();
        let formData = domHandlers.getFormData();
        const item = new ToDoItem(formData);
        const deletePromise = item.delete();

        deletePromise.then((data) => {
            domHandlers.formReset();
            domHandlers.switchOffDeleteBtn();
            this.saveStatuse = 0;
            app.renderItemsList();
        });
    }

}
