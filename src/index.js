import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  <BrowserRouter>
  {/* <React.StrictMode> */}
    <Suspense fallback={<div>Loading...</div>}>
    <App />
    </Suspense>
 
  {/* </React.StrictMode> */}
  </BrowserRouter>,document.getElementById('root')
)


