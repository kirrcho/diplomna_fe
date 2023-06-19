import * as React from "react";
import "./groupDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../common/spinner";

const GroupDetails = () => {
    let { id } = useParams();
    let [searchParams] = useSearchParams();
    let queryYear = searchParams.get("year");
    const token = localStorage.getItem('token');
    const [year, setYear] = useState(queryYear ? new Date(`1/1/${queryYear}`) : new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [groupNumber, setGroupNumber] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.be_url}/groups/details/${id}?year=${year.getFullYear()}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
        .then(p => {
            setGroupNumber(p.data.value.groupNumber);
            setStudents(p.data.value.students);
            setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate("/login");
          }
        });
    }, [year]);
    
    return <>
        {isLoading && <Spinner />}
        {!isLoading && <>
            <p id="datePickerParagraph">Select a date: </p>
            <DatePicker yearItemNumber={9} showYearPicker selected={year} dateFormat={"yyyy"} onChange={(year) => {setYear(year)}} />
            <h2>Group {groupNumber}</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>FacultyNumber</th>
                </tr>
                </thead>
                <tbody>
                    { students.map(p => 
                        <tr key={p.id}>
                            <td><Link to={`/users/${p.id}`}>{p.firstName} {p.lastName}</Link></td>
                            <td>{p.facultyNumber}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </>}
    </>
}

export default GroupDetails;