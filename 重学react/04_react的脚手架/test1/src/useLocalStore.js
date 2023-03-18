import React from "react";

export default function useLocalStore(key) {
  const [name, setName] = React.useState(() => {
    const name = JSON.parse(window.localStorage.getItem(key));
    return name;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(name));
  }, [name]);

  return [name, setName];
}
