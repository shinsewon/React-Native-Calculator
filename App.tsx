import React from 'react';
import {SafeAreaView} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './src/modules';
import CalculatorContainer from './src/containers/CalculatorContainer';

const store = createStore(rootReducer, composeWithDevTools());

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
