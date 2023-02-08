
import React from 'react'
import routes from './router/index'
import {useRoutes} from 'react-router-dom'
function App() {
  const element=useRoutes(routes)
  return (
    <div className="App">
    {element}
</div>
  );
}

export default App;
