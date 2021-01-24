import React from 'react';
import {SafeAreaView} from 'react-native';
import CalculatorContainer from './src/containers/CalculatorContainer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/modules';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <CalculatorContainer />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
