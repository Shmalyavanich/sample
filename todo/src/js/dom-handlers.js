import {STATUSES} from './constants';
import {NODE_SELECTORS} from './constants';
import {DISPLAY_CLASSES} from './constants';
import {ToDoItem} from './to-do-item';


export class DomHandlers {

    hideLoader(){
        this.hideElementByClass(NODE_SELECTORS.TODO_LOADER);
    }


    showLoader(){
        this.showElementByClass(NODE_SELECTORS.TODO_LOADER);
    }


    hideElementByClass(className){
        document.querySelector(className).classList.add(DISPLAY_CLASSES.HIDDEN);
    }

    hideElementByNode(element){
        element.classList.add(DISPLAY_CLASSES.HIDDEN);
    }


    showElementByClass(className){
        document.querySelector(className).classList.remove(DISPLAY_CLASSES.HIDDEN);
    }


    hideForm(){
        this.hideElementByClass(NODE_SELECTORS.TODO_FORM);
    }


    showForm(){
        this.showElementByClass(NODE_SELECTORS.TODO_FORM);
    }


    hideDescription(){
        this.hideElementByClass(NODE_SELECTORS.ITEM_DESC);
    }


    showDescription(){
        this.showElementByClass(NODE_SELECTORS.ITEM_DESC);
    }


    switchOnDeleteBtn(){
        document.querySelector(NODE_SELECTORS.DELETE_BUTTON).disabled = false;
    }


    switchOffDeleteBtn(){
        document.querySelector(NODE_SELECTORS.DELETE_BUTTON).disabled = true;
    }


    renderItems(data){
        const toDoList = document.querySelector(NODE_SELECTORS.TODO_LIST);

        while (toDoList.firstChild) {
            toDoList.removeChild(toDoList.firstChild);
        }

        data.forEach((item) => {
            const caption = item.caption ? item.caption : '';

            const newItemContent = `
                <div class="todo__item js-todo__item" data-id="` + item.id + `">
                    <div class="todo__info">
                        <div class="todo__name">
                            ` + caption + `
                        </div>

                        <div class="todo__status">
                            status: <span class="todo__status-name">` + item.status + `</span>
                        </div>
                    </div>

                    <div class="todo__description-btn">
                        <button class="button js-view-desc">view description</button>
                    </div>
                </div>`;

            toDoList.insertAdjacentHTML('beforeEnd', newItemContent);
        });
    }


    getItemId(element){
        return element.closest(NODE_SELECTORS.TODO_ITEM).getAttribute('data-id');
    }


    getFormStatus(){
        const form = document.querySelector(NODE_SELECTORS.TODO_FORM);
        const inputStatus = form.querySelector(NODE_SELECTORS.INPUT_STATUS);
        return inputStatus.value;
    }


    setFormStatus(status){
        const form = document.querySelector(NODE_SELECTORS.TODO_FORM);
        const inputStatus = form.querySelector(NODE_SELECTORS.INPUT_STATUS);
        const statusLabel = form.querySelector(NODE_SELECTORS.STATUS_LABEL);

        inputStatus.value = status;
        statusLabel.innerHTML = status;
    }


    fillForm(data){
        const form = document.querySelector(NODE_SELECTORS.TODO_FORM);
        const inputCaption = form.querySelector(NODE_SELECTORS.INPUT_CAPTION);
        const inputDate = form.querySelector(NODE_SELECTORS.INPUT_DATE);
        const inputDesc = form.querySelector(NODE_SELECTORS.INPUT_DESC);
        const inputId = form.querySelector(NODE_SELECTORS.INPUT_ID);

        const caption = data.caption ? data.caption : '';
        const date = data.finishDate ? data.finishDate : '';
        const description = data.description ? data.description : '';

        inputCaption.value = caption;
        inputDate.value = date;
        inputDesc.value = description;
        inputId.value = data.id;
        this.setFormStatus(data.status);
    }


    showItemDescription(e){
        const currentId = {id: this.getItemId(e.target)};
        const toDoItem = new ToDoItem(currentId);

        this.hideForm();
        this.showDescription();
        const descPromise = toDoItem.getDescription();

        descPromise.then((description) => {
            document.querySelector(NODE_SELECTORS.ITEM_DESC_CONTENT).innerHTML = description;
        });
    }


    getFormData() {
        let data = {};
        const formData = new FormData(document.querySelector(NODE_SELECTORS.TODO_FORM));

        for(let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        return data;
    }


    formReset(){
        document.querySelector(NODE_SELECTORS.TODO_FORM).reset();
        this.setFormStatus(STATUSES.NEW);
    }

}
