import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import "./styled_inputs.css";

const Read = () => {
  const [fruitArray, setFruitArray] = useState([]);
  const [loading, setLoading] = useState(false);

  //   هان نفس فكرة كتابة الفواكه و حتى ابسط و لكن هان طورت شوي من الفكرة وضفت التحميل
  const fetchData = async () => {
    setLoading(true);
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "nature/fruits");
      const snapShot = await get(dbRef);
      if (snapShot.exists()) {
        // i add Note.txt file to clear this step
        setFruitArray(Object.values(snapShot.val()));
      } else {
        alert("لا توجد بيانات متاحة");
      }
    } catch (error) {
      alert("حدث خطأ في جلب البيانات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enhanced-app">
      <h1 className="enhanced-title">Read Page</h1>

      <div className="buttons-group">
        <button
          className="styled-button"
          onClick={fetchData}
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

export default Read;
