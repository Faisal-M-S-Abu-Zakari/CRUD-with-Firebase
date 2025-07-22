import React, { useState } from "react";
import "./styled_inputs.css";
import { Link } from "react-router-dom";
// here i import the app from firebase , then import the methods to handle it
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
const Write = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  // عندك اربع ميثود هم المسؤولين عن حفظ البيانات
  // 1- export the app from the firebaseConfig file
  // 2-catch the DB by getDatabase methode
  // 3-push it according to ref , and add the folder name (write subfolder also if you need)
  // 4-set the ref , and pass it as object to look nice
  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"));
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDescription: inputValue2,
    })
      .then(() => {
        alert("data saved successfully");
      })
      .catch((error) => {
        alert("error: " + error.message);
      });
  };
  return (
    <div className="enhanced-app">
      <h1 className="enhanced-title">Write Page</h1>

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
        <button className="styled-button" onClick={saveData}>
          Save Data
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

export default Write;
