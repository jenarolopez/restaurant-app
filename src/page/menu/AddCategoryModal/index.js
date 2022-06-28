import React from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddCategoryModal = ({ addModalOpen, setAddModalOpen }) => {
  const [category, setCategory] = React.useState("");
  const handleSubmit = async () => {
   
    try {
      await addDoc(collection(db, "category"), {
        name: category,
        created: Timestamp.now(),
      });
      setAddModalOpen(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      isOpen={addModalOpen}
      setIsOpen={setAddModalOpen}
      title={"Add Category"}
      onOk={() => {
        handleSubmit();
      }}
      onCancel={() => {
        setAddModalOpen(false);
      }}
      okText={"Save"}
    >
      <div className="my-7">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category Name
        </label>
        <Input
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
};
export default AddCategoryModal;
