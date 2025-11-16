import React,{useEffect,useState} from "react"
import { useSearchParams } from "react-router-dom";
import {  auth, Realtimedatabase, Firestoredb } from "./Firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiFoodMenu } from "react-icons/bi";

const Driver = () => {
    const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId"); // Get userId from query param
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(userId);
  const [navhead,setNavhead] = useState('dashboard')
  useEffect(()=>{
    console.log(navhead)
  },[navhead])
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(Firestoredb, "drivers", userId); // Reference to user document
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data()); // Store user data in state
          console.log("data: ",userSnap.data());
          
        } else {
          console.log("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId, Firestoredb]);
    return (
        <>
        Hello {userData && userData.name}
        <Container fluid className="app-container">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="sidebar p-4">
          <h3 className="logo">GoMeal.</h3>
          <ul className="nav flex-column">
            <li className={`nav-item ${navhead=="dashboard" ? "active" : ""}`} onClick={() => setNavhead('dashboard')}><BiFoodMenu /> Dashboard</li>
            <li className="nav-item"><BiFoodMenu /> Delivery List</li>
            <li className="nav-item"><BiFoodMenu /> Messages</li>
            <li className="nav-item"><BiFoodMenu /> Order History</li>
            <li className="nav-item"><BiFoodMenu /> Bills</li>
            <li className="nav-item"><BiFoodMenu /> Settings</li>
          </ul>
          <div className="upgrade-box p-3 mt-3">
            <p>Upgrade your Account to Get Free Voucher</p>
            <Button variant="warning">Upgrade</Button>
          </div>
        </Col>

       
      </Row>
    </Container>
        </>
    )
}
export default Driver