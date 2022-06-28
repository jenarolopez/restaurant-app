import React from "react";
import Button from "../../components/Button";
import AddCategoryModal from "./AddCategoryModal";
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { db } from "../../firebase";

const Menu = () => {
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'category'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  console.log(tasks)
  return (
    <div>
      {addModalOpen && (
        <AddCategoryModal
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      )}
      <Button
        onClick={() => {
          setAddModalOpen(true);
        }}
      >
        Add Category
      </Button>
    </div>
  );
};

export default Menu;
