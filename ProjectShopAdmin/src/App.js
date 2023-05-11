import React from "react";
import CPC from "./components/margins/component";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './components/margins/reducer';

function App() {
    const store = createStore(reducer);
    return (
        <React.Fragment>
            <Provider store={store}>
                <CPC />
            </Provider>
        </React.Fragment>
    );
}
export default App;
