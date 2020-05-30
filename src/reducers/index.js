import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER, DELETE_LREMINDER} from '../constants';
// import { bake_cookie, read_cookie } from 'sfcookies';

const  reminder = (action) => {
    let {text , dueDate} = action;
    return{
        id:'',
        text,
        dueDate
    }
}

const removeById = (state = [], text) => {

    const reminders = state.filter(reminder => reminder.text !== text);
    console.log('new reduced reminders', reminders[0]);
    return reminders;       
}

const removeLast = (state = []) => {
    let newR = []
   const reminde = state.filter(reminder => newR.push(reminder));
    const reminders = newR.slice(1)
    console.log('new reduced reminders', newR.shift());
    return [ ...reminders];       
}




const reminders = (state = [], action) => {
    let reminders = null;
    // state = read_cookie('reminders');
    switch(action.type) {
        case ADD_REMINDER:
           reminders = [...state, reminder(action)];
           
           return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            
            return reminders;
        case DELETE_LREMINDER:
            reminders = removeLast(state);
            
            return reminders;    
        case CLEAR_REMINDER:
            reminders = [];
           
            return reminders;
        default:
            return state;
    }
}

export default reminders;