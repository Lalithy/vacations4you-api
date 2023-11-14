import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AgentRegister = () => {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    newPassword: "",
    confirm_newPassword: "",
  });
  const { name, email, newPassword, confirm_newPassword } = formData;

  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isAgentDataUpdated, setIsAgentDataUpdated] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    if (params.id) {
      getAgentById(params.id);
    }
  }, []);

  const getAgentById = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/user/${id}`);
    console.log(res);
    if (res.status === 200) {
      setFormData({
        ...formData,
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    updateAgent();
  };

  const updateAgent = async () => {
    const res = await axios.put(
      `http://localhost:5000/api/user/update/${formData.id}`,
      { name: formData.name, email: formData.email }
    );
    console.log(res);
    if (res.status === 200) {
      setIsAgentDataUpdated(true);
    }
  };

  const onSubmitResetPassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirm_newPassword) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
      resetPassword();
    }
  };

  const resetPassword = async () => {
    const res = await axios.put(
      `http://localhost:5000/api/user/resetPassword/${formData.id}`,
      { password: formData.newPassword }
    );
    console.log(res);
    if (res.status === 200) {
      setIsPasswordReset(true);
      setFormData({
        ...formData,
        newPassword: "",
        confirm_newPassword: "",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsPasswordsMatch(true);
    setIsAgentDataUpdated(false);
    setIsPasswordReset(false);
  };

  return (
    <>
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
          {isAgentDataUpdated && (
            <>
              <Snackbar
                open={isAgentDataUpdated}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Agent succesfully updated
                </Alert>
              </Snackbar>
            </>
          )}
          {isPasswordReset && (
            <>
              <Snackbar
                open={isPasswordReset}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Password reset successfull
                </Alert>
              </Snackbar>
            </>
          )}
          <h5 className="card-title mb-4">
            <b>Bhagya Travels</b>
          </h5>
          <form onSubmit={(e) => onSubmitUpdate(e)}>
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
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="contained" type="sumbit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title mb-4">
            <b>Password Reset</b>
          </h5>
          <form onSubmit={(e) => onSubmitResetPassword(e)}>
            <div className="row">
              <div className="col-lg-6 mb-3 ">
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-lg-6 mb-3 ">
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Re-Enter New Password"
                  type="password"
                  name="confirm_newPassword"
                  value={confirm_newPassword}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="contained" color="error" type="sumbit">
                Reset password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgentRegister;
