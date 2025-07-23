import React, { useEffect, useState } from "react";
import "./styled_inputs.css";
import { Link, useParams } from "react-router-dom";
// here i import the app from firebase , then import the methods to handle it
import app from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";

const UpdateWrite = () => {
  const { fruitId } = useParams();
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  //   function to fetch the specific fruit according to the id
  const fetchData = async () => {
    const db = getDatabase(app);
    //   to get the specific fruit
    const existFruit = ref(db, "nature/fruits/" + fruitId);
    const snapShot = await get(existFruit);

    if (snapShot.exists()) {
      const targetObject = snapShot.val(); // here to get the value only of this id
      setInputValue1(targetObject.fruitName);
      setInputValue2(targetObject.fruitDescription);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fruitId]);
  const updateData = async () => {
    try {
      const db = getDatabase(app);
      //   here without push , because it is already exist
      const newDocRef = ref(db, "nature/fruits/" + fruitId);
      set(newDocRef, {
        fruitName: inputValue1,
        fruitDescription: inputValue2,
      }).then(() => {
        alert("data updated successfully");
      });
    } catch (error) {
      alert("error : " + error);
    }
  };

  return (
    <div className="enhanced-app">
      <h1 className="enhanced-title">Update Page</h1>

      <div className="inputs-group">
        <div className="input-container">
          <input
            type="text"
            className="styled-input"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
            placeholder=" "
          />
          <label className="floating-label">Fruit Name</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            className="styled-input"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
            placeholder=" "
          />
          <label className="floating-label">Fruit Description </label>
        </div>
      </div>

      <div className="buttons-group">
        <button className="styled-button" onClick={updateData}>
          Update Data
        </button>

        <Link className="styled-link" to="/updateread">
          Go to Update page
        </Link>

        <Link className="styled-link" to="/read">
          Go to Read page
        </Link>
      </div>
    </div>
  );
};

export default UpdateWrite;
