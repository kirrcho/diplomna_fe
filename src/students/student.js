import * as React from "react";
import "./student.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      setIsLoading(true);
      axios.get(`${process.env.be_url}/users/${id}?day=${startDate.toLocaleDateString("en-US")}`, {
          headers: {
              'Content-type': 'application/json',
              'Authorization': "Bearer " + token
          }
      })
      .then(p => {
          setUserDetails({
            firstName: p.data.value.firstName,
            lastName: p.data.value.lastName,
            facultyNumber: p.data.value.facultyNumber,
            groupId: p.data.value.groupId,
            year: p.data.value.year,
            groupNumber: p.data.value.groupNumber
          });
          setAttendances(p.data.value.attendances);
          setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/login");
        }
      });
  }, [startDate, location]);
  
  return <>
  {isLoading && <Spinner />}
  {!isLoading && <><p id="datePickerParagraph">Select a date: </p>
  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  <h2>{userDetails.firstName + ' ' + userDetails.lastName} - {userDetails.facultyNumber}</h2>
  <h4><Link to={`/groups/details/${userDetails.groupId}?year=${userDetails.year}`}>Group: {userDetails.groupNumber}</Link></h4>
  <table>
    <thead>
      <tr>
        <th>RoomNumber</th>
        <th>PresenceConfirmed</th>
        <th>PresenceConfirmedTime</th>
        <th>TimeScanned</th>
        <th>ConfirmedBy</th>
        <th>Confirm</th>
      </tr>
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
