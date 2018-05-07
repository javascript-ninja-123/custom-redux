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


// console.log('custom')
// const customStore = customCreateStore(counter);
// console.log(customStore.getState())
// customStore.dispatch({type:"INCREMENT"})
// console.log(customStore.getState())
