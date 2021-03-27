import React from "react";
import { useLocation } from "react-router-dom";

export default function NoMatch() {
  var location = useLocation();
  return (
    <div className="NoMatch">
      {console.log(
        `inside NoMatch. No match for ${location.pathname}. Redirected.`
      )}
    </div>
  );
}
