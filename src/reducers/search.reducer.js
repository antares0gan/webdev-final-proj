export default function setSearch(state = {dep: "", des: "", date: ""}, action) {
  switch (action.type) {
    case 'SET_DEP':
      return Object.assign({}, state, {dep: action.dep});
    case 'SET_DES':
      return Object.assign({}, state, {des: action.des});
    case 'SET_DATE':
      return Object.assign({}, state, {date: action.date});
  }
  return state;
}