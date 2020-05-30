import { ADD_REMINDER,
         DELETE_REMINDER,
         DELETE_LREMINDER,
         CLEAR_REMINDER
} from '../constants';

export const addReminder = (text, dueDate) => {
    // var li = document.createElement("li");
    // var text1 = document.createTextNode(dueDate);
    // li.appendChild(text1);

    // document.getElementsByClassName("list-group-item").innerHTML = dueDate;
    const action ={
        type: ADD_REMINDER,
        text,
        dueDate
    }
    console.log('action in addReminder', action);
    return action;
}

export const deleteReminder = (id) => {
    const action ={
        type: DELETE_REMINDER,
        id
    }
    console.log('deleted in actions', action);
    return action;
}


export const delLastReminder = ()=>{
    const action ={
        type: DELETE_LREMINDER,
        
    }
    console.log('deleted in actions', action);
    return action;
}

export const  clearReminders = () => {
    return {
        type: CLEAR_REMINDER
    }
}