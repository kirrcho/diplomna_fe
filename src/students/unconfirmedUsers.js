import * as React from "react";
import "./unconfirmedUsers.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../common/spinner";
import Modal from "../common/modal";

const UnconfirmedUsers = () => {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
      setIsLoading(true);
      axios.get(`${process.env.be_url}/unconfirmedUsers`, {
          headers: {
              'Content-type': 'application/json',
              'Authorization': "Bearer " + token
          }
      })
      .then(p => {
          setStudents(p.data.value);
          setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/login");
        }
      });
  }, []);

  const confirmAccount = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${process.env.be_url}/users/confirm`, id , {
        headers: {
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        }
    })
    .then(() => {
      navigate(0);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        navigate("/login");
      }
    });
  }

  const removeAccount = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${process.env.be_url}/users/remove`, id , {
        headers: {
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        }
    })
    .then(() => {
      navigate(0);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        navigate("/login");
      }
    });
  }

  return <>
    {isLoading && <Spinner />}
    {showConfirmAlert && 
      <Modal show={showConfirmAlert} setShow={setShowConfirmAlert}>
        <div class="cd-popup" role="alert">
          <div class="cd-popup-container">
              <p>Are you sure you want to add this user?</p>
              <button onClick={(e) => {confirmAccount(e)}} className="styleButton">Yes</button>
              <button className="styleButton" onClick={() => {setShowConfirmAlert(false)}}>No</button>
          </div>
        </div>
      </Modal>
    }
    {showRemoveAlert && 
      <Modal show={showRemoveAlert} setShow={setShowRemoveAlert}>
        <div class="cd-popup" role="alert">
          <div class="cd-popup-container">
              <p>This action will remove the user completely. Proceed ?</p>
              <button onClick={(e) => {removeAccount(e)}} className="styleButton">Yes</button>
              <button className="styleButton" onClick={() => {setShowRemoveAlert(false)}}>No</button>
          </div>
        </div>
      </Modal>
    }
    {!isLoading && <>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>FacultyNumber</th>
                <th>Email</th>
                <th>Confirm</th>
                <th>Cancel</th>
            </tr>
            </thead>
            <tbody>
              { students.map(p => 
                  <tr key={p.id}>
                      <td><Link to={`/users/${p.id}`}>{p.firstName} {p.lastName}</Link></td>
                      <td>{p.facultyNumber}</td>
                      <td>{p.email}</td>
                      <td><button className="styleButton" onClick={(e) => {
                        setShowConfirmAlert(true);
                        setId(p.id);
                      }}>Confirm</button></td>
                      <td><button className="styleButton danger" onClick={(e) => {
                        setShowRemoveAlert(true);
                        setId(p.id);
                      }}>Remove</button></td>
                  </tr>
                )}
            </tbody>
        </table>
    </>}
  </>
};

export default UnconfirmedUsers;
