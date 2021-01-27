const PRINT = 'calculation/PRINT' as const;
const RESET = 'calculation/RESET' as const;
const CLICK = 'calculation/CLICK' as const;
const ADD_OPERATOR = 'calculation/addOperator' as const;
export interface ICalculatorState {
  calculationTotal: string[] | number[];
  operatorBox: string[] | number[];
  viewCalculation: string | number;
}

const initialState: ICalculatorState = {
  calculationTotal: [],
  operatorBox: [],
  viewCalculation: '0',
};

export const print = () => ({type: PRINT});
export const reset = () => ({type: RESET});
export const click = (payload: string | number) => ({type: CLICK, payload});
export const addOperator = (payload: string) => ({
  type: ADD_OPERATOR,
  payload,
});

type CalculationAction =
  | ReturnType<typeof print>
  | ReturnType<typeof reset>
  | ReturnType<typeof click>
  | ReturnType<typeof addOperator>;

export default function calculation(
  state: ICalculatorState = initialState,
  action: CalculationAction,
) {
  const {calculationTotal, operatorBox, viewCalculation} = state;
  switch (action.type) {
    case CLICK:
      // 숫자 클릭 했을때
      if (typeof action.payload === 'number') {
        const number = action.payload;
        // 연산자박스에 연산자가 담겨 있을때
        if (operatorBox.length) {
          return {
            ...state,
            calculationTotal: [...calculationTotal, number],
            operatorBox: [...operatorBox, number],
          };
        }
        if (
          typeof calculationTotal[calculationTotal.length - 1] === 'string' ||
          calculationTotal.length === 0
        ) {
          return {
            ...state,
            calculationTotal: [...calculationTotal, number],
          };
        }
        const newcalculationTotal = [...calculationTotal];
        let lastnumber = Number(
          newcalculationTotal[newcalculationTotal.length - 1],
        );
        // 0 클릭 했을때
        if (number === 0) {
          lastnumber *= 10;
        } else {
          lastnumber = lastnumber * 10 + number;
        }
        newcalculationTotal[newcalculationTotal.length - 1] = lastnumber;
        return {
          ...state,
          calculationTotal: newcalculationTotal,
        };
      }
      //소수점'.' 클릭 했을때
      if (action.payload === '.') {
        return {
          ...state,
          calculationTotal: [...calculationTotal, action.payload],
        };
      }
      return state;

    /// +,-,*,/ 눌렀을때
    case ADD_OPERATOR:
      const sum = calculationTotal[calculationTotal.length - 1];
      if (sum === '+' || sum === '-' || sum === '*' || sum === '/') {
        const arr = [...calculationTotal];
        arr[arr.length - 1] = action.payload;
        return {
          ...state,
          calculationTotal: arr,
          operatorBox: [action.payload],
        };
      }
      if (!calculationTotal.length) {
        return state;
      }
      if (operatorBox.length && viewCalculation !== '0') {
        return {
          ...state,
          calculationTotal: [...calculationTotal, action.payload],
          operatorBox: [action.payload],
        };
      } else {
        return {
          ...state,
          calculationTotal: [...calculationTotal].concat(action.payload),
        };
      }
    //초기화
    case RESET:
      return {
        ...state,
        calculationTotal: [],
        operatorBox: [],
        viewCalculation: '0',
      };
    // 합계(=) 눌렀을때
    case PRINT:
      const MAX_NUMBER = 9999999999;
      if (
        calculationTotal[calculationTotal.length - 2] ===
        operatorBox[operatorBox.length - 2]
      ) {
        if (viewCalculation > MAX_NUMBER) {
          return {
            ...state,
            calculationTotal: [MAX_NUMBER],
            viewCalculation: MAX_NUMBER,
            operatorBox: [],
          };
        } else {
          const sum = state.operatorBox.join('');
          return {
            ...state,
            viewCalculation: eval(viewCalculation + sum),
          };
        }
      }
      if (typeof calculationTotal[calculationTotal.length - 1] === 'string') {
        return {
          ...state,
          calculationTotal: [],
          operatorBox: [],
          viewCalculation: '0',
        };
      }
      //999999넘어갈때
      if (viewCalculation >= MAX_NUMBER) {
        return {
          ...state,
          viewCalculation: MAX_NUMBER,
          calculationTotal: [MAX_NUMBER],
        };
      }
      // calculationTotal이 빈 배열일때
      if (!calculationTotal.length) {
        return state;
      }
      // viewCalculation이 0이 아니고, calculationTotal이 있을때
      if (viewCalculation !== '0' && calculationTotal.length) {
        const newResult =
          Math.round(
            eval([...calculationTotal, ...operatorBox].join('')) * 10 ** 5,
          ) /
          10 ** 5;
        if (newResult > MAX_NUMBER) {
          return {
            ...state,
            viewCalculation: MAX_NUMBER,
            calculationTotal: [MAX_NUMBER],
          };
        } else {
          return {
            ...state,
            calculationTotal: [newResult],
            viewCalculation: newResult,
          };
        }
      }
      const changeString = calculationTotal.join('');
      //정수 일때(소수점 X)
      if (Number.isInteger(eval(changeString)) === true) {
        if (+eval(changeString) > MAX_NUMBER) {
          return {
            ...state,
            viewCalculation: MAX_NUMBER,
            calculationTotal: [MAX_NUMBER],
          };
        } else {
          const evalRound = Math.round(eval(changeString) * 10 ** 5) / 10 ** 5;
          return {
            ...state,
            viewCalculation: evalRound,
            calculationTotal: [evalRound],
            operatorBox: calculationTotal.slice(calculationTotal.length - 2),
          };
        }
      }
      //정수가 아니고 합계가 9,999,999,999보다 클때(소수점 O)
      if (Number.isInteger(eval(changeString)) === false) {
        if (+eval(changeString) > MAX_NUMBER) {
          return {
            ...state,
            viewCalculation: MAX_NUMBER,
            calculationTotal: [MAX_NUMBER],
          };
        } else {
          const evalRound = +eval(changeString).toString().split();
          const result = evalRound;
          return {
            ...state,
            viewCalculation: result,
            calculationTotal: [result],
            operatorBox: calculationTotal.slice(calculationTotal.length - 4),
          };
        }
      }
    default:
      return state;
  }
}
