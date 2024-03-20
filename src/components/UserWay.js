import React, { useEffect } from "react";

const UserWayWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.userway.org/widget.js?account=KisCkMAI7h";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return null;
};
export default UserWayWidget;
