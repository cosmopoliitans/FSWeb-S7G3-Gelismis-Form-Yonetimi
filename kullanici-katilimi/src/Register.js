import React from "react";

function Register(props) {
  const { registeredUser } = props;
  return (
    <div className="register-container">
      <h2>New User</h2>
      {registeredUser.map((user) => (
        <ul className="user-list">
          <li key="name">Name: {user.name}</li>
          <li key="email">E-mail: {user.email}</li>
          <li key="password">Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
}

export default Register;
