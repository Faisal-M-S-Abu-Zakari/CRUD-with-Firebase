import React, { useState } from "react";
import "./styled_inputs.css";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { Link } from "react-router-dom";
const UpdateRead = () => {
  const [fruitArray, setFruitArray] = useState([]);
  const [loading, setLoading] = useState(false);
  // هان نفس خطوات القراءة و لكن بدك توصل للاي دي تبع الفاكهة , لذلك من فايل الملاحظات هتلاقي انه بحولها لاوبجيكت ... كالتالي
  const updateData = async () => {
    setLoading(true);
    try {
      const db = getDatabase(app);
      const newDocRef = ref(db, "nature/fruits");
      const snapshot = await get(newDocRef);
      if (snapshot.exists()) {
        const myData = snapshot.val(); // here it is an object that conatain keys and values ==> open Note.txt to see what i mean
        console.log(myData);
        // i need to access to keys to catch the fruit :
        //********important***** ==> Object.keys(myData); // this return array of keys
        // so i have to loop on it to catch specific key
        const updatedFruits = Object.keys(myData).map((myFiredId) => {
          return {
            // myData is an js object , but i can treat it as an array
            ...myData[myFiredId],
            // the values is fruitName and fruitDescription , and i want to render fruit id , so i have to add it here
            fruitId: myFiredId,
          };
        });

        setFruitArray(updatedFruits);
      }
    } catch (error) {
      alert("error : " + error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFruite = async (fruitId) => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "nature/fruits/" + fruitId);
    await remove(newDocRef);
    window.location.reload();
  };
  return (
    <div className="enhanced-app">
      <h1 className="enhanced-title">Updated Page</h1>

      <div className="buttons-group">
        <button
          className="styled-button"
          onClick={updateData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Display Data"}
        </button>
      </div>

      {fruitArray.length > 0 && (
        <div className="glass-data-container">
          <h2 className="glass-data-title">Stored Fruits</h2>
          <div className="glass-data-grid">
            {fruitArray.map((item, index) => (
              <div key={index} className="glass-data-card">
                <div className="glass-card-header">
                  <h3 className="glass-fruit-name">{item.fruitName}</h3>
                </div>
                <div className="glass-card-content">
                  <p className="glass-fruit-definition">
                    {item.fruitDescription}
                  </p>
                </div>
                <div className="glass-card-content">
                  <Link
                    className="styled-link"
                    to={`/updatewrite/${item.fruitId}`}
                  >
                    Update
                  </Link>
                  {/* i add the button to delete the fruit according to it's id  */}
                  <button
                    style={{
                      padding: "13px 25px",
                      fontSize: "13px",
                      border: "none",
                      background: "red",
                      borderRadius: "10px",
                    }}
                    onClick={() => deleteFruite(item.fruitId)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="buttons-group">
        <Link className="styled-link" to="/updateread">
          Go to Update page
        </Link>
        <Link className="styled-link" to="/write">
          Go to Write Page
        </Link>
      </div>
    </div>
  );
};

export default UpdateRead;
