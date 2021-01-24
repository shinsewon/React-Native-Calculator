const PRINT = 'calculation/PRINT' as const;
const REMOVE = 'calculation/REMOVE' as const;
const RESET = 'calculation/RESET' as const;
const CLICK = 'calculation/CLICK' as const;
const MARK = 'calculation/MARK' as const;
const ADD_OPERATOR = 'calculation/addOperator' as const;

const initialState: {
  calculationTotal: any;
  viewCalculation: string;
} = {
  // number: [], //얘도 안씀
  // operator: [], //현재 안씀
  // currentNumber: 0, // 음 얘도 안씀
  calculationTotal: [],
  viewCalculation: '0',
};

export const print = () => ({type: PRINT});
export const remove = () => ({type: REMOVE});
export const reset = () => ({type: RESET});
export const click = (payload) => ({type: CLICK, payload});
export const mark = (payload: string) => ({type: MARK, payload});
export const addOperator = (payload: string) => ({
  type: ADD_OPERATOR,
  payload,
});

// type CounterAction =
// | ReturnType<typseof add>
// | ReturnType<typeof subtract>

export default function calculation(state = initialState, action: any) {
  switch (action.type) {
    case CLICK:
      console.log('1)CLICK.state>>>', state);
      return {
        ...state,
        calculationTotal: state.calculationTotal.concat(action.payload),
      };
    case ADD_OPERATOR:
      console.log('2)ADD_OPERATOR.state>>>', state);
      return {
        ...state,
        calculationTotal: state.calculationTotal.concat(action.payload),
      };
    case REMOVE:
      console.log('3)REMOVE.state>>>', state);
    case RESET:
      console.log('4)RESET.state>>>', state);
      return {...state, calculationTotal: [], viewCalculation: '0'};
    case PRINT:
      const changeString = state.calculationTotal.join('');
      const result = eval(changeString).toString().split();
      return {
        ...state,
        viewCalculation: result,
        calculationTotal: result,
      };

    case MARK:
      return state + action.payload;
    default:
      return state;
  }
}

// export default function calculation(state = initialState, action: any) {
//   switch (action.type) {
//     case CLICK:
//       return {...state, currentNumber: action.payload};
//     case ADD_OPERATOR:
//       const newState = {...state};
//       newState.operator = state.operator.concat(action.payload);
//       newState.number = state.number.concat(Number(state.currentNumber));
//       newState.currentNumber = '';
//       return newState;
//     case ADD:
//       return state + action.payload;
//     case SUBTRACT:
//       return state - action.payload;
//     case DELETE:
//       return state - 10;
//     case RESET:
//       return 0;
//     case PRINT:
//       console.log('찍히냐');
//     // let result = eval(state).toString;

//     case MARK:
//       return state + action.payload;
//     default:
//       return state;
//   }
// }

// case 'DEL':
//   setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
//   return;
// case 'C':
//   setLastNumber('');
//   setCurrentNumber('');
//   return;
// case '=':
//   setLastNumber(currentNumber + '=');
//   calculate();
//   return;
