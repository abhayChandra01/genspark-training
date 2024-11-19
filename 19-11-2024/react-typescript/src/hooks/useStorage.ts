import { useState } from "react";

function useStorage<T>(key: string) {
  const getData = (): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const [items, setItems] = useState<T[]>(getData);

  const add = (item: T) => {
    const updatedItems = [...items, item];
    localStorage.setItem(key, JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const remove = (id: number | string) => {
    const updatedItems = items.filter((item: any) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const update = (updatedItem: T) => {
    const updatedItems = items.map((item: any) =>
      item.id === (updatedItem as any).id ? updatedItem : item
    );
    localStorage.setItem(key, JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const get = () => items;

  return { items, add, remove, update, get };
}

export default useStorage;
