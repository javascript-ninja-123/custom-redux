const {createStore} = require('redux');

const counter = (state = 0, action) => {
  switch(action.type){
    case "INCREMENT":
    return state + 1;
    case "DECREMENT":
    return state -1;
    default:
    return state;
  }
}
const store = createStore(counter);
console.log('store getState')
console.log(store.getState())
console.log('store dispatch')
store.dispatch({type:"INCREMENT"})
console.log(store.getState())
console.log('======')

console.log(counter(0,{type:"INCREMENT"}))
console.log(counter(1,{type:"DECREMENT"}))
console.log(counter(1,{type:"dsafads"}))
console.log(counter(undefined,{type:"DECREMENT"}))
console.log('==========')


const customCreateStore = reducer => {
  let state;
  let listeners = [];
  const getState = () => state;

  const dispatch = action => {
    state = reducer(state,action);
    listeners.forEach(listener => listener())
  }
  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l == listener)
    }
  }

  dispatch({});

  return {getState,dispatch,subscribe }
}

class customCreateStore2{
  constructor(reducer){
    this.reducer = reducer;
    this.state;
    this.dispatch({});
  }
  getState(){
    return this.state;
  }
  dispatch(action){
    this.state = this.reducer(this.state,action)
  }
}

console.log('custom')
const customStore = new customCreateStore2(counter);
console.log(customStore.getState())
customStore.dispatch({type:'INCREMENT'})
console.log(customStore.getState())


const INITIAL_STATE = {
  list:[],
  loading:false
}


const listReducer = (state =INITIAL_STATE,action) => {
  switch(action.type){
    case "ADD":
    return {...state, list:[...state.list, action.payload]}
    case "REMOVE":
    return {...state, list:[...state.list.filter(x => x.name !== action.payload.name)]}
    default:
    return state;
  }
}



class customeListStore3{
   constructor(reducer){
    this.reducer = reducer;
    this.state;
    this.dispatch({})
  }

   getState(){
    return this.state
  }

   dispatch(action){
    this.state = this.reducer(this.state,action);
  }

}

const newListStore2 = new customeListStore3(listReducer)
console.log(newListStore2.getState())
newListStore2.dispatch({type:"ADD", payload:{name:'Sungmin Yi'}})
console.log(JSON.stringify(newListStore2.getState(),undefined,2))
newListStore2.dispatch({type:"REMOVE", payload:{name:'Sungmin Yi'}})
console.log(JSON.stringify(newListStore2.getState(),undefined,2))



const todoComposition = (state, action) => {
  switch(action.type){
    case "ADD_TODO":
    return  {
      id:action.payload.id,
      text:action.payload.text,
      completed:false
    }
    case "TOGGLE_TODO":
    if(state.id !== action.payload.id){
        return state;
    }
      return {
        ...state,
        completed:!todo.completed
    }
    default:
    return state;
  }
}


const todo = (state = [],action) => {
  switch(action.type){
    case "ADD_TODO":
    return [
      ...state,
      todoComposition(undefined, action)
    ]
    case "TOGGLE_TODO":
    return state.map(todo => todoComposition(todo,action))
    default:
    return state;
  }
}
console.log('=========')
const newTodoStore = new customeListStore3(todo)
console.log(newTodoStore.getState())
newTodoStore.dispatch({type:"ADD_TODO", payload:{
  id:1,
  text:'what is up'
}})
console.log(newTodoStore.getState())
newTodoStore.dispatch({type:"TOGGLE_TODO",payload:{
  id:1
}})
console.log(newTodoStore.getState())



console.log('====create my own combine reducer=====')
const combineReducer = (reducers) => (state = {}, action) => {
  return Object.keys(reducers).reduce((nextState,key) => {
    nextState[key] = reducers[key](
      state[key],
      action
    )
    return nextState;
  },{})
}
