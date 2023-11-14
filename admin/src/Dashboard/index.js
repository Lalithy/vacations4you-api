import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [age, setAge] = React.useState("10");
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    getAllAgents();
  }, []);

  const getAllAgents = async () => {
    const res = await axios.get("http://localhost:5000/api/user/all");
    if (res.status === 200) {
      setAgents(res.data);
      console.log(res);
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [pageSize, setPageSize] = useState(5);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "Travel Agent",
      flex: 1,
      renderCell: (params) => <div>{params.row.name}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => <div>{params.row.email}</div>,
    },
    {
      field: "view",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <i
          className="bi bi-pencil-square"
          style={{ color: "green", fontSize: "25px", cursor: "pointer" }}
          onClick={() => navigate(`/agent-edit/${params.row._id}`)}
        ></i>
      ),
    },
  ];

  return (
    <>
      <div className="row mb-2">
        <div className="col-lg-4 mb-2">
          <div className="card" style={{ backgroundColor: "#4095C4" }}>
            <div className="card-body">
              <h5 className="card-title">
                Total Travel Agents{" "}
                <GroupsIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></GroupsIcon>
              </h5>
              <h2 className="card-text">{agents.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-2">
          <div className="card" style={{ backgroundColor: "#2C6BAA" }}>
            <div className="card-body">
              <h5 className="card-title">
                Last Month Income{" "}
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></AttachMoneyIcon>
              </h5>
              <h2 className="card-text">250000.00</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-2">
          <div className="card" style={{ backgroundColor: "#404FA5" }}>
            <div className="card-body">
              <h5 className="card-title">
                This Month Income{" "}
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></AttachMoneyIcon>
              </h5>
              <h2 className="card-text">56000.00</h2>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={agents}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          loading={false}
          getRowId={(row) => row._id}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </>
  );
};

export default Dashboard;
