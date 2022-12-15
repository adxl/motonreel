import React from "react";

export default React.memo(function ChatAvatar({ seed }) {
  return (
    <img
      src={`https://robohash.org/${seed}?set=set3`}
      alt="avatar"
      style={{ width: 50 }}
    />
  );
});
