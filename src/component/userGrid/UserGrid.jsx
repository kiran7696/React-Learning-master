import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserGrid = () => {
  const [userData, setUserData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [searchText , setSearchText] = useState('')
  const navigate = useNavigate();
  const getuserList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUserData(response?.data);
      setMenuList(response?.data);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getuserList();
  }, []);

  useEffect(()=>{
    
    let filteredResult = menuList;
    filteredResult = filteredResult.filter((item)=>item?.userDetails?.userName.includes(searchText));
    setUserData(filteredResult);
  },[searchText])

  const viewUser = (id) => {
    navigate(`/view-user/${id}`,{state:{isView:true}})
  }
  const deleteUserfromGrid = async(id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      getuserList();
      //setTimeout(()=>{getuserList()},1000)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="col-md-9 mt-5 m-auto">
        <div className="row">
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search by Name"
              onChange={(e)=>{setSearchText(e.target.value)}}
            />
          </div>
          <div className="col-md-2">
            <Link className="btn btn-success" to="add-user">
              Add User
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">User Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{item?.userDetails?.userName}</td>
                    <td>{item?.userDetails?.userEmail}</td>
                    <td>{item?.userDetails?.userAddress}</td>
                    <td>
                      <span className="btn btn-secondary" onClick={()=>viewUser(item.id)}>View</span>{" "}
                      <Link
                        className="btn btn-primary"
                        to={`edit-user/${item.id}`}
                      >
                        Edit
                      </Link>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUserfromGrid(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserGrid;
