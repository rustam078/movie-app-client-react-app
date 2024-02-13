import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styles from "./NotificationComponent.module.css";

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); // New state for notification count
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:9190/test");
    const stomp = Stomp.over(socket);

    stomp.connect({}, function (frame) {
      console.log("Connected: " + frame);
      setStompClient(stomp);
      stomp.subscribe("/topic/uploadNotification", function (message) {
        console.log(message.body);
        const newMessage = message.body;
        const parts = newMessage.split("^");
        const firstPart = parts[0];
        const secondPart = parts[1];
        console.log(secondPart);
        const newMessageObject = { firstPart, secondPart };
        setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    const uniqueNotifications = messages.filter(
      (msg, index, self) =>
        self.findIndex((m) => m.firstPart === msg.firstPart) === index
    );
    setNotificationCount(uniqueNotifications.length);
  }, [messages]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
    setNotificationCount(0); // Reset notification count when opening the notification popup
  };

  const clearNotifications = () => {
    setMessages([]); // Clear all messages
  };

  //   const sendMessage = (message) => {
  //     if (stompClient && stompClient.connected) {
  //       stompClient.send('/app/sendMessage', {}, message);
  //     } else {
  //       console.error('WebSocket connection not established yet.');
  //     }
  //   };

  return (
    <>
      <div className={styles.notificationIcon} onClick={toggleNotification}>
        <span className={styles.nicon}>🔔</span>
        {notificationCount > 0 && (
          <div className={styles.notificationBadge}>{notificationCount}</div>
        )}
      </div>
      <div className={styles.notificationContainer}>
        {isOpen && (
          <div className={styles.notificationCardContainer}>
            {messages.length > 0 ? (
              messages
                .filter(
                  (msg, index, self) =>
                    self.findIndex((m) => m.firstPart === msg.firstPart) ===
                    index
                )
                .map((msg, index) => (
                  <div key={index} className={styles.notificationCard}>
                    <div className={styles.notificationMessage}>
                      <img
                        src={`http://localhost:9190/images/${msg.secondPart}`}
                        alt="No image found"
                        className={styles.poster}
                      />
                      <p>{msg.firstPart}</p>
                    </div>
                  </div>
                ))
            ) : (
              <div className={styles.notificationCard}>
                <div className={styles.notificationMessage1}>
                  No notifications available
                </div>
              </div>
            )}

            <button onClick={clearNotifications} className={styles.clearButton}>
              Clear
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationComponent;
