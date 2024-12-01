import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const NotificationCenter = ({ isDarkMode }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState(new Set());

  useEffect(() => {
    // Load read notifications from localStorage
    const stored = localStorage.getItem('readNotifications');
    if (stored) {
      setReadNotifications(new Set(JSON.parse(stored)));
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const q = query(
        collection(db, 'notifications'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      
      const snapshot = await getDocs(q);
      const notificationData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }));
      
      setNotifications(notificationData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    const notificationIds = notifications.map(n => n.id);
    const newReadNotifications = new Set([...readNotifications, ...notificationIds]);
    setReadNotifications(newReadNotifications);
    localStorage.setItem('readNotifications', JSON.stringify([...newReadNotifications]));
  };

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !readNotifications.has(n.id)).length;

  return (
    <>
      {/* Notification Bell */}
      <button
        className="notification-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            markAllAsRead();
          }
        }}
        style={{ 
          color: isDarkMode ? 'white' : '#2c3e50',
          position: 'relative',
          background: 'none',
          border: 'none',
          padding: '8px',
        }}
      >
        <i className="bi bi-bell-fill fs-5"></i>
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="notification-panel"
            style={{
              background: isDarkMode ? '#2d2d2d' : 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 1000
            }}
          >
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className={isDarkMode ? 'text-light' : 'text-dark'}>Notifications</h6>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-close"
                  style={{
                    filter: isDarkMode ? 'invert(1)' : 'none'
                  }}
                  aria-label="Close notifications"
                />
              </div>
              {notifications.length === 0 ? (
                <p className="text-muted small mb-0">No notifications yet</p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className="notification-item p-2 mb-2 rounded"
                    style={{
                      background: isDarkMode ? '#1f1f1f' : '#f8f9fa'
                    }}
                  >
                    <h6 className={`mb-1 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                      {notification.title}
                    </h6>
                    <p className="small mb-1" style={{ color: isDarkMode ? '#ccc' : '#666' }}>
                      {notification.body}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationCenter; 