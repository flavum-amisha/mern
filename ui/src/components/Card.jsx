import Avatar from "@mui/joy/Avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowCircleRight,
  DeleteForever,
  EditOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setShowDetails } from "../../../client/src/store/Details"; // Correct import path
import axios from "axios";
import EditModal from "./EditData";

export default function Card({ data, handleDelete }) {
  const manager = localStorage.getItem("manager");
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const cardDetails = {
    data: data,
    showModal: true,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSeeMoreDetails = () => {
    navigate("/employee");
    dispatch(setShowDetails(cardDetails));
  };

  const handleEditModalOpen = () => {
    setEditedData({ ...data });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (editedData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:8080/employee/assign-department/",
        editedData
      );
      setLoading(false);
      setEditModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          {manager && (
            <div>
              <EditOutlined onClick={handleEditModalOpen} />
              <DeleteForever
                sx={{ color: "red" }}
                onClick={() => handleDelete(data.employee_id)}
              />
            </div>
          )}
          <div>
            <Avatar
              src="/static/images/avatar/1.jpg"
              sx={{ width: "80px", height: "80px", margin: "auto" }}
            />

            <p>{editedData.name}</p>
            <p>{`Employee id : ${editedData.employee_id}`}</p>
            <p>{`Employee Address : ${editedData.address}`}</p>

            {manager ? (
              <p>
                See More Details{" "}
                <ArrowCircleRight
                  sx={{ color: "blue" }}
                  onClick={handleSeeMoreDetails}
                />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      )}

      <EditModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        initialData={editedData}
        handleEditSubmit={handleEditSubmit}
      />
    </>
  );
}
