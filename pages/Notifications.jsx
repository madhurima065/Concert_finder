import { useContext } from "react";
import Navbar from "../components/Navbar";
import {
  NotificationContext
} from "../context/NotificationContext";

function Notifications() {

  const { notifications } =
    useContext(
      NotificationContext
    );

  return (
    <>
      <Navbar />

      <div className="container">

        <h1
          className="section-title"
        >
          Notifications
        </h1>

        {notifications.map(
          (notification) => (
            <div
              key={
                notification.id
              }
              className="notification"
            >
              {
                notification.message
              }
            </div>
          )
        )}

      </div>
    </>
  );
}

export default Notifications;