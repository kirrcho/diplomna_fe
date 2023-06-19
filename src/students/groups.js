import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./groups.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../common/spinner";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    };

    axios
      .get(`${process.env.be_url}/groups?page=1`, {headers: headers})
      .then(p => {
        setGroups(p.data.value.groups);
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
      {!isLoading && groups.map(p => <Link key={p.id} to={`/groups/details/${p.id}`}><li>Group {p.groupNumber}</li></Link>)}
  </ul>
};

export default Groups;
