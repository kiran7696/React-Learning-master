import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const AddEditUser = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userAddress: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]);
  const createUser = async () => {
    if (id) {
      try {
        await axios.put(`http://localhost:4000/users/${id}`, { userDetails });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("http://localhost:4000/users", { userDetails });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getUserById = async () => {
    try {
      const userDetailsById = await axios.get(
        `http://localhost:4000/users/${id}`
      );
      const { userDetails } = userDetailsById.data;
      console.log(userDetails, "userDetails");
      setUserDetails(userDetails);
    } catch (error) {}
  };
  return (
    <div className="col-md-8 m-auto mt-5 shadow p-3 mb-5 bg-white rounded">
      <div className="row">
        <div className="col-md-10">
          {location?.state?.isView ? <h2>View User</h2> : <h2>{id ? "Update" : "Add"} Employee</h2>}
        </div>
        <Link className="col-md-2" to="/">
          X
        </Link>
      </div>
      <form className="mt-2">
        <div className="form-group">
          <label className="mb-2">User Name</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.userName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, userName: e.target.value })
            }
            disabled={location?.state?.isView}
          />
        </div>
        <div className="form-group">
          <label className="mb-2">User Email</label>
          <input
            type="email"
            className="form-control"
            value={userDetails.userEmail}
            onChange={(e) =>
              setUserDetails({ ...userDetails, userEmail: e.target.value })
            }
            disabled={location?.state?.isView}
          />
        </div>
        <div className="form-group">
          <label className="mb-2">User Address</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.userAddress}
            onChange={(e) =>
              setUserDetails({ ...userDetails, userAddress: e.target.value })
            }
            disabled={location?.state?.isView}
          />
        </div>

        {location?.state?.isView ? null : <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={createUser}
        >
          {id ? "Update" : "Add"} Employee
        </button>}
      </form>
    </div>
  );
};

export default AddEditUser;
