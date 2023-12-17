import { useState, useEffect } from "react";
import axios from "axios";
import DepartmentCard from "../../../../ui/src/components/Deparment";
import AddDepartment from "../Department/AddDepartment";
import { useSelector,useDispatch } from "react-redux";
import { setDepartmentList } from "../../store/Department";

const List = () => {
  const isLoggedin = true;

  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const manager = true;

  const editState = useSelector((state) => state.edit);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/department/get");
      const { data } = response;
      setDepartment(data.departments);
      dispatch(setDepartmentList(data.departments));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setShowModal(editState);
  }, [editState]);

  const deleteDepartment = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:8080/department/delete/${id}`
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="matchmaking-page">
      <div className="card-container">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            {showModal ? (
              <AddDepartment
                style={{ position: "fixed", top: "100%", right: "50%" }}
              />
            ) : (
              ""
            )}
            {department.map((item) => (
              <div key={item._id}>
                <div className="apartments">
                  <DepartmentCard
                    data={item}
                    deleteDeparment={deleteDepartment}
                  ></DepartmentCard>
                </div>
              </div>
            ))}

            {isLoggedin && manager && (
              <div style={{ position: "relative" }}>
                <AddDepartment />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
