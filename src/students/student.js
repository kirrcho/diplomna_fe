import * as React from "react";
import "./student.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Spinner from "../common/spinner";
import axios from "axios";

const Student = () => {
  let { id } = useParams(); 
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [attendances, setAttendances] = useState([]);
  const [facultyNumber, setFacultyNumber] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      setIsLoading(true);
      axios.get(`${process.env.be_url}/attendances/${id}?day=${startDate.toLocaleDateString("en-US")}`, {
          headers: {
              'Content-type': 'application/json',
              'Authorization': "Bearer " + token
          }
      })
      .then(p => {
          setFacultyNumber(p.data.value.facultyNumber);
          setAttendances(p.data.value.attendances);
          setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/login");
        }
      });
  }, [startDate]);
  
  return <>
  {isLoading && <Spinner />}
  {!isLoading && <><p id="datePickerParagraph">Select a date: </p>
  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  <h2>Faculty Number {facultyNumber}</h2>
  <table>
    <thead>
        <th>RoomNumber</th>
        <th>PresenceConfirmed</th>
        <th>PresenceConfirmedTime</th>
        <th>TimeScanned</th>
        <th>ConfirmedBy</th>
        <th>Confirm</th>
    </thead>
    <tbody>
        { attendances.map(p => 
            <tr key={p.attendanceId}>
                <td><Link to={`/rooms/details/${p.roomId}`}>{p.roomNumber}</Link></td>
                <td>{p.presenceConfirmed ? 'Yes' : 'No'}</td>
                <td>{p.presenceConfirmedTime}</td>
                <td>{p.timeScanned}</td>
                <td>{p.tutorEmail}</td>
                <td><button id="confirm-button" className={`${p.presenceConfirmed && 'hide'}`} onClick={(e) => updatePresence(e, p.attendanceId)}>Confirm</button></td>
            </tr>
            )}
    </tbody>
</table></>}</>
};

export default Student;
