const PRINT = 'calculation/PRINT' as const;
const REMOVE = 'calculation/REMOVE' as const;
const RESET = 'calculation/RESET' as const;
const CLICK = 'calculation/CLICK' as const;
const ADD_OPERATOR = 'calculation/addOperator' as const;

const initialState: {
  calculationTotal: any;
  viewCalculation: string;
} = {
  calculationTotal: [],
  viewCalculation: '0',
};

export const print = () => ({type: PRINT});
export const remove = () => ({type: REMOVE});
export const reset = () => ({type: RESET});
export const click = (payload: string | number) => ({type: CLICK, payload});
export const addOperator = (payload: string) => ({
  type: ADD_OPERATOR,
  payload,
});

// type CounterAction =
// | ReturnType<typseof add>
// | ReturnType<typeof subtract>

export default function calculation(
  state = initialState,
  action: {type: string; payload: number | string},
) {
  switch (action.type) {
    case CLICK:
      if (typeof action.payload === 'number') {
        const number = action.payload;
        if (
          typeof state.calculationTotal[state.calculationTotal.length - 1] ===
            'string' ||
          state.calculationTotal.length === 0
        ) {
          return {
            ...state,
            calculationTotal: [...state.calculationTotal, number],
          };
        }
        const newcalculationTotal = [...state.calculationTotal];
        if (number === 0) {
          newcalculationTotal[newcalculationTotal.length - 1] *= 10;
        } else {
          newcalculationTotal[newcalculationTotal.length - 1] =
            newcalculationTotal[newcalculationTotal.length - 1] * 10 + number;
        }
        return {
          ...state,
          calculationTotal: newcalculationTotal,
        };
      }
      return {
        ...state,
        calculationTotal: state.calculationTotal.concat(action.payload),
      };
    case ADD_OPERATOR:
      if (!state.calculationTotal.length) {
        return state;
      }
      return {
        ...state,
        calculationTotal: state.calculationTotal.concat(action.payload),
      };
    case REMOVE:
    case RESET:
      return {...state, calculationTotal: [], viewCalculation: '0'};
    case PRINT:
      if (!state.calculationTotal.length) {
        return state;
      }
      if (state.viewCalculation !== '0') {
        const finalOper = state.calculationTotal.reduce(
          (acc: any, cur: any, idx: number) => {
            const operArr = ['+', '-', '*', '/'];
            const arr = [];
            if (operArr.includes(cur)) {
              arr.push(cur, state.calculationTotal[idx + 1]);
              return (acc = arr);
            }
            return acc;
          },
          [],
        );
        const newresult = eval(
          [...state.calculationTotal, ...finalOper].join(''),
        )
          .toString()
          .split();
        return {
          calculationTotal: [...state.calculationTotal, ...finalOper],
          viewCalculation: newresult,
        };
      }
      const changeString = state.calculationTotal.join('');
      const result = eval(changeString).toString().split();
      return {
        ...state,
        viewCalculation: result,
      };
    default:
      return state;
  }
}
