import React, { useState } from 'react';
import MoreVert from "@mui/icons-material/MoreVert";
import FileDownload from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";

import {
  Users,
  UserRound,
  Clock,
  CalendarRange,
  LogOut,
  Bell,
  Mail,
  ChevronDown,
  Search,
  MoreVertical,
  Download,
  Trash2,
} from 'lucide-react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, DialogActions } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);
const [candidateToDelete, setCandidateToDelete] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    declaration: false,
    agree: false,
  });
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);  // Add state for logout confirmation dialog
  const [isOpen, setIsOpen] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      serialNo: '01',
      name: 'Jacob William',
      email: 'jacob.william@example.com',
      phone: '(252) 555-0111',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+',
      resume: 'resume-1.pdf',
    },
    {
      id: 2,
      serialNo: '02',
      name: 'Guy Hawkins',
      email: 'kenzi.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource Manager',
      status: 'New',
      experience: '2+',
      resume: 'resume-2.pdf',
    },
    {
      id: 3,
      serialNo: '03',
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '3+',
      resume: 'resume-3.pdf',
    },
    {
      id: 4,
      serialNo: '04',
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
      resume: 'resume-4.pdf',
    },
  ]);

  const [filters, setFilters] = useState({
    status: '',
    position: '',
  });

  const handleDownload = (resume) => {
    // Simulate the resume download
    const link = document.createElement('a');
    link.href = `/path/to/resumes/${resume}`; // Adjust path for your storage
    link.download = resume;
    link.click();
  };
  const handleDownloadResume = (resume) => {
    // In a real app, this would trigger an actual download
    alert(`Downloading ${resume}`);
  };
  
  const handleMoveToEmployee = (candidate) => {
    console.log("Move to employee:", candidate.name);
  };
  const handleDelete = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };
  // Delete modal state
   // Delete candidate logic
  const handleDeleteCandidate = () => {
    if (candidateToDelete) {
      setCandidates((prev) =>
        prev.filter((c) => c.id !== candidateToDelete.id)
      );
      setCandidateToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = candidates.map((candidate) =>
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    );
    setCandidates(updated);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const getFilteredCandidates = () => {
    return candidates.filter((candidate) => {
      return (
        (filters.status ? candidate.status === filters.status : true) &&
        (filters.position ? candidate.position === filters.position : true)
      );
    });
  };

  const handleCandidateInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCandidate({
      ...newCandidate,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setNewCandidate({
      ...newCandidate,
      resume: e.target.files[0],
    });
  };

  const handleSaveCandidate = (e) => {
    e.preventDefault();

    // Validate form fields before saving
    if (!newCandidate.name || !newCandidate.email || !newCandidate.phone || !newCandidate.position || !newCandidate.experience || !newCandidate.agree) {
      alert("Please fill in all fields and agree to the terms before saving.");
      return;
    }

    const newId = candidates.length + 1;
    const serialNo = newId.toString().padStart(2, '0');

    const newEntry = {
      id: newId,
      serialNo,
      name: newCandidate.name,
      email: newCandidate.email,
      phone: newCandidate.phone,
      position: newCandidate.position,
      status: 'New',
      experience: newCandidate.experience,
      resume: newCandidate.resume ? newCandidate.resume.name : '',
    };

    // Save new candidate to state
    setCandidates([...candidates, newEntry]);

    // Reset form state and close form
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      declaration: false,
      agree: false,
    });
    setIsFormOpen(false);
  };

  const navItems = [
    {
      title: 'Recruitment',
      items: [
        { icon: <Users size={20} />, label: 'Candidates', href: '#', active: true },
      ],
    },
    {
      title: 'Organization',
      items: [
        { icon: <UserRound size={20} />, label: 'Employees', href: '#',  onClick: () => navigate('/employee')},
        { icon: <Clock size={20} />, label: 'Attendance', href: '#',  onClick: () => navigate('/attendance') },
        { icon: <CalendarRange size={20} />, label: 'Leaves', href: '#',  onClick: () => navigate('/leave') },
      ],
    },
    {
      title: 'Others',
      items: [
        {
          icon: <LogOut size={20} />,
          label: 'Logout',
          href: '#',
          onClick: () => setIsLogoutDialogOpen(true), 
        },
      ],
    },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-square"></div>
          <span className="logo-text">LOGO</span>
        </div>
        <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
      />
    </div>
        
        <nav className="nav-menu">
          {navItems.map((section, index) => (
            <div key={index} className="nav-section">
              <h3 className="nav-title">{section.title}</h3>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={`nav-link ${item.active ? 'active' : ''}`}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Candidates</h1>
          <div className="header-actions">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <button className="icon-button"><Mail size={20} /></button>
            <button className="icon-button"><Bell size={20} /></button>
            <div className="profile" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Profile"
                className="profile-image"
              />
              <ChevronDown size={16} />
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <button>Edit Profile</button>
                  <button>Change Password</button>
                  <button onClick={() => navigate('/login')}>Logout</button>
                </div>
              )}
            </div>
            <button className="add-button" onClick={() => setIsFormOpen(true)}>Add Candidate</button>
          </div>
        </header>

        <div className="filters">
          <div className="filter-group">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Status</option>
              <option value="New">New</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Position</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="hr">Human Resources</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredCandidates().map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.serialNo}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.position}</td>
                  <td>
                    <select
                      className={`status-select`}
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{candidate.experience}</td>
                  <td>
                        <div className="action-cell">
                          <button
                            className="action-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenu(
                                actionMenu === candidate.id
                                  ? null
                                  : candidate.id
                              );
                            }}
                          >
                            <MoreVert />
                          </button>
                          {actionMenu === candidate.id && (
                            <div className="action-menu">
                              <div
                                className="action-item"
                                onClick={() =>
                                  handleDownloadResume(candidate.resume)
                                }
                              >
                                <FileDownload /> Download Resume
                              </div>
                              <div
                                className="action-item"
                                onClick={() => {
                                  setCandidateToDelete(candidate);
                                  setShowDeleteModal(true);
                                  setActionMenu(null);
                                }}
                              >
                                <DeleteIcon style={{ color: "#f44336" }} />{" "}
                                Delete
                              </div>
                              {candidate.status === "Selected" && (
                                <div
                                  className="action-item"
                                  onClick={() =>
                                    handleMoveToEmployee(candidate)
                                  }
                                >
                                  <Add /> Move to Employee
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                  <td>

                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

{/* Delete Confirmation Modal */}
{showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Delete Candidate</h2>
              <button
                className="close-button"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>
                Are you sure you want to delete <b>{candidateToDelete?.name}</b>
                ?
              </p>
              <div className="modal-footer">
                <button
                  className="save-button"
                  style={{ background: "#ccc", color: "#333", marginRight: 12 }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="save-button"
                  style={{ background: "#f44336" }}
                  onClick={handleDeleteCandidate}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLogoutDialogOpen && (
  <Dialog
    open={isLogoutDialogOpen}
    onClose={() => setIsLogoutDialogOpen(false)}
    PaperProps={{
      style: {
        borderRadius: '1rem', // curved corners
        padding: '1.3rem',
        textAlign: 'center',
        minWidth: '200px',
      },
    }}
  >
    <DialogTitle style={{ fontSize: '1.25rem', fontWeight: '600' }}>
    </DialogTitle>
    <DialogContent style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.3rem' }}>
      Are you sure you want to logout?
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center', gap: '1rem', paddingBottom: '1rem' }}>
      <Button
        onClick={() => setIsLogoutDialogOpen(false)}
        variant="contained"
        style={{
          backgroundColor: '#e5e7eb',
          color: '#374151',
          padding: '0.3rem 2rem',
          borderRadius: '9999px', // oval shape
          textTransform: 'none',
          fontWeight: '500',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          navigate('/login');
          setIsLogoutDialogOpen(false);
        }}
        variant="contained"
        style={{
          backgroundColor: '#dc2626',
          color: '#fff',
          padding: '.3rem 1.5rem',
          borderRadius: '9999px', // oval shape
          textTransform: 'none',
          fontWeight: '500',
        }}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
)}



      {isFormOpen && (
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogContent>
            <TextField
              label="Full Name"
              fullWidth
              margin="dense"
              name="name"
              value={newCandidate.name}
              onChange={handleCandidateInputChange}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="dense"
              name="email"
              value={newCandidate.email}
              onChange={handleCandidateInputChange}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="dense"
              name="phone"
              value={newCandidate.phone}
              onChange={handleCandidateInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Position</InputLabel>
              <Select
                name="position"
                value={newCandidate.position}
                onChange={handleCandidateInputChange}
              >
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Experience"
              fullWidth
              margin="dense"
              name="experience"
              value={newCandidate.experience}
              onChange={handleCandidateInputChange}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ marginTop: '10px' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCandidate.agree}
                  onChange={handleCandidateInputChange}
                  name="agree"
                />
              }
              label="Agree to terms"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsFormOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSaveCandidate}
              color="primary"
              disabled={!newCandidate.agree}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
