import React, { useState } from "react";
import {
  Users,
  UserRound,
  Clock,
  Calendar,
  LogOut,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import './employee.css';
import { useNavigate } from "react-router-dom";

const initialEmployees = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    phone: "(704) 555-0127",
    position: "Full Time Designer",
    joiningDate: "10/09/24",
    profileImg:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    phone: "(205) 555-0100",
    position: "Senior Backend Developer",
    joiningDate: "08/09/24",
    profileImg:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    phone: "(205) 555-0134",
    position: "HR Manager",
    joiningDate: "11/09/24",
    profileImg:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const defaultPositions = [
  "Full Time Designer",
  "Senior Backend Developer",
  "HR Manager",
  "Frontend Developer",
  "UI/UX Designer",
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: "",
    profileImg: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [positionFilter, setPositionFilter] = useState("All");

  // Get unique positions for dropdown
  const allPositions = Array.from(
    new Set([...defaultPositions, ...employees.map((e) => e.position)])
  );

  // Filter employees by search and position
  const filteredEmployees = employees.filter(
    (emp) =>
      (positionFilter === "All" || emp.position === positionFilter) &&
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.position.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    setModalData({
      name: "",
      email: "",
      phone: "",
      position: "",
      joiningDate: "",
      profileImg: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    setModalData(emp);
    setEditingId(emp.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleModalSave = () => {
    if (
      !modalData.name ||
      !modalData.email ||
      !modalData.phone ||
      !modalData.position ||
      !modalData.joiningDate
    ) {
      alert("Please fill all fields");
      return;
    }
    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...modalData, id: editingId } : emp
        )
      );
    } else {
      setEmployees([
        ...employees,
        {
          ...modalData,
          id: employees.length + 1,
          profileImg:
            modalData.profileImg ||
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ]);
    }
    setShowModal(false);
  };
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="employee-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon"></div>
          <h2>LOGO</h2>
        </div>
        <div className="sidebar-section">
          <h3>Recruitment</h3>
          <div className="sidebar-item" onClick={() => navigate("/dashboard")}>
          <Users size={18} />
            <span>Candidates</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h3>Organization</h3>
          <div className="sidebar-item" onClick={() => navigate("/employee")}>
          <UserRound size={18} />
            <span>Employees</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate("/attendance")}>
          <Clock size={18} />
            <span>Attendance</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate("/leave")}>
          <Calendar size={18} />
            <span>Leaves</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h3>Others</h3>
          <div className="sidebar-item">
            
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Employees</h2>
          <div className="header-right">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="position-filter">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
              >
                <option value="All">All Positions</option>
                {allPositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-employee-btn" onClick={handleAdd}>
              <Plus size={18} /> Add Employee
            </button>
            <div className="user-profile">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User"
              />
              <span className="dropdown-arrow">
                <ChevronDown size={16} />
              </span>
            </div>
          </div>
        </div>

        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <img
                      className="profile-pic"
                      src={emp.profileImg}
                      alt={emp.name}
                    />
                  </td>
                  <td>
                    <div className="emp-name">{emp.name}</div>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.joiningDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(emp)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(emp.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Full Name*"
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email*"
                value={modalData.email}
                onChange={(e) =>
                  setModalData({ ...modalData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone*"
                value={modalData.phone}
                onChange={(e) =>
                  setModalData({ ...modalData, phone: e.target.value })
                }
              />
              <select
                value={modalData.position}
                onChange={(e) =>
                  setModalData({ ...modalData, position: e.target.value })
                }
                className="modal-select"
              >
                <option value="">Select Position*</option>
                {allPositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Joining Date* (DD/MM/YY)"
                value={modalData.joiningDate}
                onChange={(e) =>
                  setModalData({ ...modalData, joiningDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Profile Image URL (optional)"
                value={modalData.profileImg}
                onChange={(e) =>
                  setModalData({ ...modalData, profileImg: e.target.value })
                }
              />
              <button className="save-btn" onClick={handleModalSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;