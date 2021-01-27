import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  print,
  reset,
  click,
  addOperator,
  ICalculatorState,
} from '@modules/calculation';
import {RootState} from '@modules/index';
import Button from '@components/Button';
import {BUTTONS} from '@utils/config';
import Icon from 'react-native-vector-icons/Entypo';

const CalculatorContainer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const calculator: ICalculatorState = useSelector(
    (state: RootState) => state.calculation,
  );

  const handleOnClick = useCallback((btn: string | number) => {
    if (typeof btn === 'number' || btn === '.') {
      dispatch(click(btn));
    }
    if (btn === '+' || btn === '-' || btn === '*' || btn === '/') {
      dispatch(addOperator(btn));
    }
    if (btn === '=') {
      dispatch(print());
    }
    if (btn === 'C') {
      dispatch(reset());
    }
  }, []);

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      height: '40%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#FF6666',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '40%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '60%',
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setDarkMode(!darkMode)}>
          <Icon
            name={darkMode ? 'light-up' : 'moon'}
            size={24}
            color={darkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{calculator.calculationTotal}</Text>
        <Text style={styles.resultText}>
          {calculator.viewCalculation.toLocaleString()}
        </Text>
      </View>
      <View style={styles.buttons}>
        {BUTTONS.map((btn: string | number, index: number) => {
          const getBackgroundColor = (btn: string | number): string => {
            if (btn === '.') {
              if (darkMode) {
                return '#303946';
              } else {
                if (darkMode) {
                  return '#414853';
                } else {
                  return '#fff';
                }
              }
            }
            if (typeof btn === 'number') {
              if (darkMode) {
                return '#303946';
              } else {
                return '#fff';
              }
            } else {
              if (darkMode) {
                return '#414853';
              } else {
                return '#ededed';
              }
            }
          };

          if (
            btn === '=' ||
            btn === '/' ||
            btn === '*' ||
            btn === '-' ||
            btn === '+'
          ) {
            return (
              <Button
                key={index}
                btn={btn}
                backgroundColor={'#fed330'}
                fontColor={true}
                handleOnClick={handleOnClick}
                darkMode={darkMode}
                minWidth={'20%'}
              />
            );
          }
          if (btn === 0 || btn === 'C') {
            return (
              <Button
                key={index}
                btn={btn}
                backgroundColor={getBackgroundColor(btn)}
                handleOnClick={handleOnClick}
                darkMode={darkMode}
                minWidth={'30%'}
              />
            );
          }
          if (btn === '.' || btn === 'DEL') {
            return (
              <Button
                key={index}
                btn={btn}
                backgroundColor={getBackgroundColor(btn)}
                handleOnClick={handleOnClick}
                darkMode={darkMode}
                minWidth={'30%'}
              />
            );
          } else {
            return (
              <Button
                key={index}
                btn={btn}
                backgroundColor={getBackgroundColor(btn)}
                handleOnClick={handleOnClick}
                darkMode={darkMode}
                minWidth={'20%'}
              />
            );
          }
        })}
      </View>
    </View>
  );
};

export default CalculatorContainer;
