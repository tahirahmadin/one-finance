import React from "react";

const Loader = ({ src }) => {
  return (
    <div className="loader3d">
      <object type="image/svg+xml" data={src} className="loader3d_svg"></object>
    </div>
  );
};

export default Loader;
