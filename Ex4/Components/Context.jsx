import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

const categoriesList = [
  { name: "Personal", notes: [] },
  {
    name: "Work",
    notes: [
      {
        id: 1,
        date: "12/01/2023",
        hour: "13:21",
        content: "Need to feed my dog",
      },
      {
        id: 2,
        date: "13/01/2023",
        hour: "14:21",
        content: "Need to wash my car",
      },
    ],
  },
  { name: "Ideas", notes: [] },
  { name: "Lists", notes: [] },
];

export default function Context({ children }) {
  const [categories, setCategories] = useState(categoriesList);
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [counter, setCounter] = useState(2);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        notes,
        setNotes,
        category,
        setCategory,
        counter,
        setCounter,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
