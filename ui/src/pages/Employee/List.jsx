import { useState, useEffect } from "react";
import Card from "../../components/Card";
import axios from "axios";

const Employees = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    gender: "",
    foodPreferences: "",
    smokePreferences: "",
    alcoholPreferences: "",
  });

  const handleChange = (e, filterName) => {
    const value = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:8080/employee/employee"
        );
        setIsLoading(false);
        setData(result.data.employees);
      } catch (e) {
        console.log("User Can't be Fetched");
      }
    };

    fetchData();

    console.log("useEffect executed");
  }, []);

  const sortByLocation = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        "http://localhost:8080/employee/sort-by-location"
      );
      setIsLoading(false);
      setData(result.data.employees);
    } catch (e) {
      console.log(e);
    }
  };

  const sortByName = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:8080/employee/sort-by-name?sortOrder=${direction}`
      );
      setIsLoading(false);
      setData(result.data.employees);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    sortByName();
  }, [direction]);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8080/employee/delete/${id}`
      );
      setIsLoading(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="matchmaking-page">
      <div className="filter-box" style={{ width: "100%", overflowX: "auto" }}>
        <div className="gender-preferences">
          <h5>Filter by</h5>
          <button onClick={sortByLocation}>
            Location
          </button>
        </div>

        <div className="food-preferences">
          <h5>Filter by</h5>
          <button>Name</button>

          {/* <ArrowUpward onClick={()=>{
              setDirection("asc")
            }}/>
            <ArrowDownward onClick={()=>setDirection("desc")}/> */}
        </div>
      </div>

      <div className="card-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                <Card
                  data={item}
                  setshowModal={showModal}
                  handleDelete ={handleDelete}
                />
              </div>
              ))
            ) : (
              <div>No data available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Employees;
