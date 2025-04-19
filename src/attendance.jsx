import React, { useState } from "react";

import {
  Users,
  UserRound,
  Clock,
  Calendar,
  LogOut,
  Search,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import "./attendance.css";
import { useNavigate } from 'react-router-dom';

const initialData = [
  {
    id: 1,
    name: "Jane Copper",
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Home page Alignment",
    status: "Present",
  },
  {
    id: 2,
    name: "Arlene McCoy",
    profile: "https://randomuser.me/api/portraits/women/68.jpg",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Login page design, Dashboard Home page design",
    status: "Present",
  },
  {
    id: 3,
    name: "Cody Fisher",
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    position: "Senior",
    department: "Backend Development",
    task: "--",
    status: "Absent",
  },
  {
    id: 4,
    name: "Janney Wilson",
    profile: "https://randomuser.me/api/portraits/women/65.jpg",
    position: "Junior",
    department: "Backend Development",
    task: "Dashboard login page integration",
    status: "Present",
  },
  {
    id: 5,
    name: "Leslie Alexander",
    profile: "https://randomuser.me/api/portraits/men/85.jpg",
    position: "Team Lead",
    department: "Human Resource",
    task: "4 scheduled interview, Sorting of resumes",
    status: "Present",
  },
];

const statusOptions = ["All", "Present", "Absent"];

export default function Attendance() {
  const [data, setData] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState(null);
  const [statusMenu, setStatusMenu] = useState(null);

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    position: "",
    department: "",
    task: "",
    status: "",
  });

  // Filtered data
  const filteredData = data.filter(
    (row) =>
      (statusFilter === "All" || row.status === statusFilter) &&
      (row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.position.toLowerCase().includes(search.toLowerCase()) ||
        row.department.toLowerCase().includes(search.toLowerCase()) ||
        row.task.toLowerCase().includes(search.toLowerCase()))
  );

  // Status change in table
  const handleStatusChange = (id, status) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              status,
            }
          : row
      )
    );
    setStatusMenu(null);
  };

  // Open edit modal
  const handleEdit = (row) => {
    setEditRow(row.id);
    setEditForm({
      name: row.name,
      position: row.position,
      department: row.department,
      task: row.task,
      status: row.status,
    });
    setEditModal(true);
    setActionMenu(null);
  };

  // Save edit
  const handleEditSave = () => {
    setData((prev) =>
      prev.map((row) =>
        row.id === editRow
          ? {
              ...row,
              ...editForm,
            }
          : row
      )
    );
    setEditModal(false);
    setEditRow(null);
  };

  // Delete row
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setData((prev) => prev.filter((row) => row.id !== id));
    }
    setActionMenu(null);
  };
  const navigate = useNavigate();

  return (
    <div className="attendance-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">LOGO</span>
        </div>
        <div className="sidebar-search-wrap">
          <Search size={16} className="sidebar-search-icon" />
          <input type="text" placeholder="Search" className="sidebar-search" />
        </div>
        <div className="sidebar-section">
          <h3>Recruitment</h3>
          <div className="sidebar-item active" onClick={() => navigate("/dashboard")}>
          <Users size={18} />
            <span>Candidates</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h3>Organization</h3>
          <div className="sidebar-item active" onClick={() => navigate("/employee")}>
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
          <div className="sidebar-item" onClick={() => navigate("/login")}>
          <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">Attendance</div>
          <div className="topbar-actions">
            <div className="topbar-icon">
              <Search size={18} />
            </div>
            <div className="topbar-icon">
              <svg width="18" height="18" fill="none">
                <rect width="18" height="18" rx="4" fill="#fff" />
                <path
                  d="M9 14.5a.75.75 0 0 0 .75-.75h-1.5a.75.75 0 0 0 .75.75Zm5.25-3.75v-2.25A5.25 5.25 0 0 0 9 3.25a5.25 5.25 0 0 0-5.25 5.25v2.25l-1.5 1.5v.75h15v-.75l-1.5-1.5Z"
                  stroke="#581c87"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <div className="user-profile">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
              />
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="attendance-content">
          <div className="attendance-controls">
            <div className="attendance-status-filter">
              <button
                className="status-dropdown-btn"
                onClick={() => setShowStatusDropdown((v) => !v)}
              >
                Status
                <ChevronDown size={16} style={{ marginLeft: 5 }} />
              </button>
              {showStatusDropdown && (
                <div className="status-dropdown-list">
                  {statusOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`status-dropdown-item${
                        statusFilter === opt ? " selected" : ""
                      }`}
                      onClick={() => {
                        setStatusFilter(opt);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="attendance-search">
              <Search size={16} className="attendance-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="attendance-table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Employee Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <img
                        src={row.profile}
                        alt={row.name}
                        className="attendance-profile-pic"
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.position}</td>
                    <td>{row.department}</td>
                    <td>{row.task}</td>
                    <td>
                      <div className="status-cell">
                        <button
                          className={`status-btn status-${row.status.toLowerCase()}`}
                          onClick={() =>
                            setStatusMenu(statusMenu === row.id ? null : row.id)
                          }
                        >
                          {row.status}
                          <ChevronDown size={14} />
                        </button>
                        {statusMenu === row.id && (
                          <div className="status-menu">
                            {["Present", "Absent"].map((opt) => (
                              <div
                                key={opt}
                                className={`status-menu-item${
                                  row.status === opt ? " selected" : ""
                                }`}
                                onClick={() => handleStatusChange(row.id, opt)}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button
                          className="action-menu-btn"
                          onClick={() =>
                            setActionMenu(actionMenu === row.id ? null : row.id)
                          }
                        >
                          <MoreVertical size={18} />
                        </button>
                        {actionMenu === row.id && (
                          <div className="action-menu">
                            <div
                              className="action-menu-item"
                              onClick={() => handleEdit(row)}
                            >
                              Edit
                            </div>
                            <div
                              className="action-menu-item"
                              onClick={() => handleDelete(row.id)}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", color: "#aaa" }}
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Attendance</h2>
              <button
                className="close-button"
                onClick={() => setEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Employee Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Position"
                value={editForm.position}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, position: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Department"
                value={editForm.department}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, department: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Task"
                value={editForm.task}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, task: e.target.value }))
                }
              />
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, status: e.target.value }))
                }
                className="modal-select"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <button className="save-btn" onClick={handleEditSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}