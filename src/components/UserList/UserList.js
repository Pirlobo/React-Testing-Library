import UserService from "../../services/UserService";
import React, { useState, useEffect } from "react";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  const viewUser = (id) => {
    props.history.push(`/user/${id}`);
  };

  useEffect(async () => {
    const fetchUsers = async () => {
      const res = await UserService.getUsers();
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User's Full Name</th>
              <th> Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr data-testid={`user-item-${user.id}`} key={index}>
              {/* Show username and email when hovering */}
                <td className="has-details">
                  {" "}
                  {user.name}
                  <span className="user-details">
                    Username: {user.username}
                    <br />
                    Email: {user.email}
                  </span>
                </td>
                <td>
                  <button
                    data-testid={`btn-item-${index}`}
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewUser(user.id)}
                    className="btn btn-info"
                  >
                    User Details{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
