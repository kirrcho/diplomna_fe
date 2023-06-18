import * as React from "react";
import "./roomDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../common/spinner";
import Modal from "../common/modal";

const RoomDetails = () => {
    let { id } = useParams(); 
    const token = localStorage.getItem('token');
    const [attendances, setAttendances] = useState([]);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [addAttendanceStartDate, setAddAttendanceStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [onAddAttendanceClicked, setOnAddAttendanceClicked] = useState(false);
    const [facultyNumber, setFacultyNumber] = useState("");
    const [roomNumber, setRoomNumber] = useState();
  
    const handleAddAttendance = (event) => {
      event.preventDefault();
      setIsLoading(true);
      setOnAddAttendanceClicked(false);
      axios.post(`${process.env.be_url}/attendances`, { facultyNumber, roomId: id, DayAttended: addAttendanceStartDate }, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        }
      })
      .then(p => {
        if(!p.data.isSuccessful) {
            alert(p.data.error);
        } else {
          setStartDate(new Date());
        }
          setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/login");
        }
      });
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.be_url}/rooms/details/${id}?day=${startDate.toLocaleDateString("en-US")}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
        .then(p => {
            setRoomNumber(p.data.value.roomNumber);
            setAttendances(p.data.value.attendances);
            setIsLoading(false);
            setFacultyNumber("");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate("/login");
          }
        });
    }, [startDate]);

    const updatePresence = (e, attendanceId) => {
        e.preventDefault();
        e.stopPropagation();
        axios.post(`${process.env.be_url}/confirmPresence`, attendanceId, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
    }

  return <>
  {isLoading && <Spinner />}
  {onAddAttendanceClicked && 
    <Modal show={onAddAttendanceClicked} setShow={setOnAddAttendanceClicked}>
        <form onSubmit={handleAddAttendance}>
                <input 
                    type="text"
                    placeholder="Faculty number"
                    value={facultyNumber}
                    onChange={(e) => setFacultyNumber(e.target.value)}
                />
                <DatePicker selected={addAttendanceStartDate} onChange={(date) => setAddAttendanceStartDate(date)} />
            <input type="submit" />
        </form>
    </Modal>
  }
  {!isLoading && <><p id="datePickerParagraph">Select a date: </p>
  <button onClick={() => setOnAddAttendanceClicked(true)} id="add-presence-button">Add Attendance</button>
  <DatePicker selected={startDate} onChange={(date) => {setStartDate(date)}} />
  <h2>Room {roomNumber}</h2>
  <table>
    <thead>
      <tr>
        <th>FacultyNumber</th>
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
                <td><Link to={`/attendances/${p.userId}`}>{p.facultyNumber}</Link></td>
                <td>{p.presenceConfirmed ? 'Yes' : 'No'}</td>
                <td>{p.presenceConfirmedTime}</td>
                <td>{p.timeScanned}</td>
                <td>{p.tutorEmail}</td>
                <td><button id="confirm-button" className={`${p.presenceConfirmed && 'hide'}`} onClick={(e) => updatePresence(e, p.attendanceId)}>Confirm</button></td>
            </tr>
            )}
    </tbody>
</table></>}</>
}

export default RoomDetails;