import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AgentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    status: true,
    user_role: "Agent",
  });
  const { name, email, password, confirm_password } = formData;

  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isAgentCreated, setIsAgentCreated] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
      console.log(formData);
      createNewAgent();
    }
  };

  const createNewAgent = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/user/save",
      formData
    );
    console.log(res);
    if (res.status === 200) {
      setIsAgentCreated(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsPasswordsMatch(true);
    setIsAgentCreated(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        {!isPasswordsMatch && (
          <>
            <Snackbar
              open={!isPasswordsMatch}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Passwords does not match
              </Alert>
            </Snackbar>
          </>
        )}
        {isAgentCreated && (
          <>
            <Snackbar
              open={isAgentCreated}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Agent succesfully registered
              </Alert>
            </Snackbar>
          </>
        )}
        <h5 className="card-title mb-4">
          <b>Agent Register</b>
        </h5>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="col-lg-6 mb-3 ">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Agency Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-6 mb-3 ">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-6 mb-3 ">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-6 mb-3 ">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Re-Enter Password"
                type="password"
                name="confirm_password"
                value={confirm_password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="contained" type="sumbit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentRegister;
