import React from 'react'
import Router from './routes/Router'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Router />
      <Notification/>
    </div>
  )
}

export default App