import React, { useLayoutEffect, useState } from "react";

const FadingHeading: React.FC = () => {
  const [opacity, setOpacity] = useState<number>(0);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <h1
      style={{ opacity: opacity, transition: "opacity 1s ease-in-out" }}
      className="text-3xl font-bold my-4"
    >
      Welcome to the Customer Details Page
    </h1>
  );
};

export default FadingHeading;
