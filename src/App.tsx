// App.tsx
import React from 'react'; 
import { Provider } from 'react-redux';
import { store } from './store/index';
import Home from './pages';
const App: React.FC = () => {
  return   <Provider store={store}> 
         <Home/>
      </Provider>
};

export default App;
