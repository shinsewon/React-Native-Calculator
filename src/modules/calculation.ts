const PRINT = 'calculation/PRINT' as const;
const REMOVE = 'calculation/REMOVE' as const;
const RESET = 'calculation/RESET' as const;
const CLICK = 'calculation/CLICK' as const;
const ADD_OPERATOR = 'calculation/addOperator' as const;

const initialState: {
  calculationTotal: any[];
  viewCalculation: string | number;
  operatorBox: string[];
} = {
  calculationTotal: [],
  operatorBox: [],
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
        if (state.operatorBox.length) {
          return {
            ...state,
            calculationTotal: [...state.calculationTotal, number],
            operatorBox: [...state.operatorBox, number],
          };
        }
        if (
          typeof state.calculationTotal[state.calculationTotal.length - 1] ===
            'string' ||
          state.calculationTotal.length === 0
        ) {
          return {
            ...state,
            calculationTotal: [...state.calculationTotal, number],
            // operatorBox: [...state.operatorBox, number],
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

      if (typeof action.payload === 'string') {
        return {
          ...state,
          operatorBox: [...state.operatorBox, action.payload],
        };
      }

    case ADD_OPERATOR:
      if (!state.calculationTotal.length) {
        return state;
      }
      if (state.operatorBox.length && state.viewCalculation !== '0') {
        return {
          ...state,
          calculationTotal: [...state.calculationTotal, action.payload],
          operatorBox: [action.payload],
        };
      } else {
        return {
          ...state,
          calculationTotal: state.calculationTotal.concat(action.payload),
        };
      }
    case REMOVE:
    case RESET:
      return {
        ...state,
        calculationTotal: [],
        operatorBox: [],
        viewCalculation: '0',
      };

    case PRINT:
      if (
        state.calculationTotal[state.calculationTotal.length - 2] ===
        state.operatorBox[state.operatorBox.length - 2]
      ) {
        const sum = state.operatorBox.join(' ');

        return {
          ...state,
          viewCalculation: eval(state.viewCalculation + sum),
        };
      }
      if (
        typeof state.calculationTotal[state.calculationTotal.length - 1] ===
        'string'
      ) {
        return {
          ...state,
          calculationTotal: [],
          operatorBox: [],
          viewCalculation: '0',
        };
      }
      //999999넘어갈때
      if (state.viewCalculation > 9999999999) {
        return {
          ...state,
          viewCalculation: '9,999,999,999',
          calculationTotal: [],
        };
      }
      // calculationTotal이 빈 배열일때
      if (!state.calculationTotal.length) {
        return state;
      }
      // viewCalculation이 0이 아니고, calculationTotal이 있을때
      if (state.viewCalculation !== '0' && state.calculationTotal.length) {
        const newResult =
          Math.round(
            eval([...state.calculationTotal, ...state.operatorBox].join('')) *
              10 ** 5,
          ) /
          10 ** 5;
        return {
          ...state,
          calculationTotal: [newResult],
          viewCalculation: newResult,
        };
      }
      const changeString = state.calculationTotal.join('');
      //정수 일때(소수점 X)
      if (Number.isInteger(eval(changeString)) === true) {
        const evalRound = Math.round(eval(changeString) * 10 ** 5) / 10 ** 5;
        return {
          ...state,
          viewCalculation: evalRound,
          calculationTotal: [evalRound],
          operatorBox: state.calculationTotal.slice(
            state.calculationTotal.length - 2,
          ),
        };
      }
      //정수가 아닐때(소수점 O)
      if (Number.isInteger(eval(changeString)) === false) {
        const evalRound = +eval(changeString).toString().split();
        const result = evalRound;
        return {
          ...state,
          viewCalculation: result,
          calculationTotal: [],
          operatorBox: state.calculationTotal.slice(
            state.calculationTotal.length - 2,
          ),
        };
      }

    default:
      return state;
  }
}
