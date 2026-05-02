import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Campus Notifications</h1>
        <p>Top 10 High Priority Updates</p>
      </header>
      
      {loading ? (
        <p className="loading">Loading notifications...</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notif, index) => (
            <div key={notif.ID || index} className={`notification-card ${notif.Type?.toLowerCase()}`}>
              <div className="card-header">
                <span className="type-badge">{notif.Type}</span>
                <span className="timestamp">{new Date(notif.Timestamp).toLocaleString()}</span>
              </div>
              <p className="message">{notif.Message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
