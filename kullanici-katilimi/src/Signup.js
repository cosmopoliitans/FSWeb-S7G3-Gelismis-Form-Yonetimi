import { useState, useEffect } from "react";

function Singup() {
  return (
    <div className="container">
      <h2>SIGN UP</h2>
      <form>
        <label for="name">Name, username</label>
        <br />
        <input type="text" id="name" name="name"></input>
        <br />
        <label for="email">E-mail</label>
        <br />
        <input type="email" id="email" name="email"></input>
        <br />
        <label for="password">Password</label>
        <br />
        <input type="password" id="pwd" name="pwd"></input>
        <br />
        <br />
        <label for="checkbox">
          I accept the terms of service and privacy policy.
        </label>
        <input type="checkbox" id="checkbox" name="checkbox"></input>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Singup;
