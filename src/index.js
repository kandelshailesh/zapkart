import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'
// import { whyDidYouUpdate } from 'why-did-you-update'
// import whyDidYouRender from "@welldone-software/why-did-you-render"
import reducers from 'redux/reducers'
import sagas from 'redux/sagas'
import Router from 'router' // from router.js
import Localization from 'components/LayoutComponents/Localization'
import { GlobalDebug } from 'utils'
import * as serviceWorker from './serviceWorker'

// app styles
import './global.scss'

GlobalDebug(false)
const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, sagaMiddleware, routeMiddleware]
if (process.env.NODE_ENV === 'development' && true) {
  middlewares.push(logger)
  GlobalDebug(true)
  // whyDidYouRender(React, {
  //   collapseGroups: true,
  //   include: [/.*/],
  //   exclude: [/^Link/, /^Route/, /^BrowserRouter/],
  // });
  // whyDidYouUpdate(React);
}
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <Localization>
      <Router history={history} />
    </Localization>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
export { store, history }
