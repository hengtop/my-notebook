import React from "react";

export default function useScrollPosition() {
  const [positionY, setPositionY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setPositionY(window.scrollY);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.addEventListener("scroll", handleScroll);
    };
  }, []);

  return positionY;
}
