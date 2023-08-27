import React, { useState } from "react";
import { Dna } from "react-loader-spinner";

export const Loader = (props) => {
  //   const [showLoading, setLoading] = useState(false);

  //   setLoading(props.showLoading);

  return (
    <div className="loader-overlay">
      <Dna
        visible={props.showLoading}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
