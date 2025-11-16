// import React, {useState} from 'react';
// import app from "../components/Firebase.js";
// import { getDatabase, ref, set, push } from "firebase/database";
// import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

// function Adduser() {

  
//   let [inputValue1, setInputValue1] = useState("");
//   let [inputValue2, setInputValue2] = useState("");

//   const saveData = async () => {
//     const auth = getAuth(app)
//     await createUserWithEmailAndPassword(auth, inputValue1,inputValue1)
//     // const db = getDatabase(app);
//     // const newDocRef = push(ref(db, "nature/fruits"));
//     // set(newDocRef, {
//     //   fruitName: inputValue1,
//     //   fruitDefinition: inputValue2
//     // }).then( () => {
//     //   alert("data saved successfully")
//     // }).catch((error) => {
//     //   alert("error: ", error.message);
//     // })
//   }


//   return (
//     <div>

//       <h1>WRITE/HOMEPAGE</h1>

//       <input type='email' value={inputValue1} 
//       onChange={(e) => setInputValue1(e.target.value)}/> 

//       <input type='password' value={inputValue2} 
//       onChange={(e) => setInputValue2(e.target.value)}/> <br/>

//       <button onClick={saveData}>SAVE DATA</button>
//     </div>
//   )
// }

// export default Adduser