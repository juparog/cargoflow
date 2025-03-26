import { useCallback, useEffect, useState } from "react";

export function useItemMarks() {
  const [itemMarkedItems, setItemMarkedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItemMarks = localStorage.getItem("itemMarkedItems");
    if (storedItemMarks) {
      setItemMarkedItems(JSON.parse(storedItemMarks));
    }
  }, []);

  const toggleItemMark = useCallback((id: string) => {
    setItemMarkedItems((prevItemMarks) => {
      const newItemMarks = prevItemMarks.includes(id)
        ? prevItemMarks.filter((itemMarkId) => itemMarkId !== id)
        : [...prevItemMarks, id];

      localStorage.setItem("itemMarkedItems", JSON.stringify(newItemMarks));
      return newItemMarks;
    });
  }, []);

  return { itemMarkedItems, toggleItemMark };
}
