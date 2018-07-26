import {DomHandlers} from './dom-handlers';
import {ToDoList} from './to-do-list';


export class Application {

    renderItemsList(){
        const domHandlers = new DomHandlers();
        const toDoList = new ToDoList();
        const listPromise = toDoList.getList();

        listPromise.then((data) => {
            domHandlers.renderItems(data);
            domHandlers.hideLoader();
        });
    }

}
