import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {print, remove, reset, click, addOperator} from '../modules/calculation';
import {Button} from '../components';
import {BUTTON} from '../utils/config';
import {RootState} from '../modules';
import Icon from 'react-native-vector-icons/Entypo';

const CalculatorContainer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const calculator = useSelector((state: RootState) => state.calculation);

  const handleOnClick = (btn: string | number) => {
    if (typeof btn === 'number' || btn === '.') {
      dispatch(click(btn));
    }
    if (btn === '+' || btn === '-' || btn === '*' || btn === '/') {
      dispatch(addOperator(btn));
    }
    if (btn === '=') {
      dispatch(print());
    }
    if (btn === 'DEL') {
      dispatch(remove());
    }
    if (btn === 'C') {
      dispatch(reset());
    }
  };

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
      height: '70%',
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: 'red',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      height: '20%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
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
          {calculator.viewCalculation.toLocaleString(2)}
        </Text>
      </View>
      <View style={styles.buttons}>
        {BUTTON.map((btn: string | number, index: number) => {
          const changeBackgroundColor =
            typeof btn === 'number'
              ? darkMode
                ? '#303946'
                : '#fff'
              : darkMode === true
              ? '#414853'
              : '#e6d9d9';

          const delBackgroundChange =
            btn === '.'
              ? darkMode
                ? '#303946'
                : '#fff'
              : darkMode === true
              ? '#414853'
              : '#dedede';
          const resetBackgroundChange =
            typeof btn === 'number'
              ? darkMode
                ? '#303946'
                : '#fff'
              : darkMode === true
              ? '#414853'
              : '#ededed';

          return btn === '=' ||
            btn === '/' ||
            btn === '*' ||
            btn === '-' ||
            btn === '+' ? (
            <Button
              key={index}
              btn={btn}
              backgroundColor={'#fed330'}
              fontColor={true}
              handleOnClick={() => handleOnClick(btn)}
              darkMode={darkMode}
              minWidth={'20%'}
            />
          ) : btn === 0 ? (
            <Button
              key={index}
              btn={btn}
              backgroundColor={changeBackgroundColor}
              handleOnClick={() => handleOnClick(btn)}
              darkMode={darkMode}
              minWidth={'30%'}
            />
          ) : btn === '.' || btn === 'DEL' ? (
            <Button
              key={index}
              btn={btn}
              backgroundColor={delBackgroundChange}
              handleOnClick={() => handleOnClick(btn)}
              darkMode={darkMode}
              minWidth={'30%'}
            />
          ) : btn === 'C' ? (
            <Button
              key={index}
              btn={btn}
              backgroundColor={resetBackgroundChange}
              handleOnClick={() => handleOnClick(btn)}
              darkMode={darkMode}
              minWidth={'30%'}
            />
          ) : (
            <Button
              key={index}
              btn={btn}
              backgroundColor={resetBackgroundChange}
              handleOnClick={() => handleOnClick(btn)}
              darkMode={darkMode}
              minWidth={'20%'}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CalculatorContainer;
