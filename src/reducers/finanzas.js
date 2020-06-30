// { desc: string, cant: number }
const initialState = [];

export const agregar = payload => ({
  type: "AGREGAR",
  payload
});

export const eliminar = index => ({
  type: "ELIMINAR",
  index
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "AGREGAR": {
      return [...state, action.payload];
    }
    case "ELIMINAR": {
      const newState = [...state];
      newState.splice(action.index, 1);
      return newState;
    }
    default: {
      return state;
    }
  }
}
