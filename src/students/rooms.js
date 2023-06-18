import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./rooms.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../common/spinner";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    };

    axios
      .get(`${process.env.be_url}/rooms?page=1`, {headers: headers})
      .then(p => {
        setRooms(p.data.value.rooms);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/login");
        }
      });
  }, []);

  return <ul>
      {isLoading && <Spinner />}
      {!isLoading && rooms.map(p => <Link key={p.id} to={`/rooms/details/${p.id}`}><li>Room {p.roomNumber}</li></Link>)}
  </ul>
};

export default Rooms;
