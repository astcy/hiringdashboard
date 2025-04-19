import React, { useState, useEffect } from 'react';
import { Calendar, Clock, File, LogOut, Users, X, ChevronLeft, ChevronRight, Upload, Search, Download } from 'lucide-react';
import './leave.css';
import { useNavigate  } from 'react-router-dom';
    

const Leave = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendarInModal, setShowCalendarInModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [designation, setDesignation] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const handleNavigation = (path) => {
    navigate(path); // ✅ updated
  };
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    navigate('/login'); // ✅ updated
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Mock data for present employees
  const presentEmployees = [
    {
      id: 1,
      name: 'Jane Cooper',
      designation: 'Full Time Designer',
      status: 'Present',
      profileImg: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Cody Fisher',
      designation: 'Senior Backend Developer',
      status: 'Present',
      profileImg: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  // Mock leave applications
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      employeeId: 1,
      name: 'Jane Cooper',
      designation: 'Full Time Designer',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Pending',
      profileImg: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      document: {
        name: 'leave_request.pdf',
        url: '#'
      }
    },
    {
      id: 2,
      employeeId: 2,
      name: 'Cody Fisher',
      designation: 'Senior Backend Developer',
      date: '8/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      profileImg: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      document: {
        name: 'medical_certificate.pdf',
        url: '#'
      }
    }
  ]);

  // Filter leaves based on search query and status
  const filteredLeaves = leaveApplications.filter(leave => {
    const matchesSearch = 
      leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || leave.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get only approved leaves
  const approvedLeaves = leaveApplications.filter(leave => leave.status === 'Approved');

  // Calendar functions
  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Status dropdown component with working popup
  const StatusDropdown = ({ status, leaveId }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const updateStatus = (newStatus) => {
      setLeaveApplications(prev => 
        prev.map(leave => 
          leave.id === leaveId 
            ? { ...leave, status: newStatus }
            : leave
        )
      );
      setIsOpen(false);
    };

    return (
      <div className="status-dropdown">
        <button 
          className={`status-button ${status.toLowerCase()}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {status} <span className="arrow">▼</span>
        </button>
        {isOpen && (
          <div className="status-popup">
            <div className="status-option" onClick={() => updateStatus('Approved')}>Approved</div>
            <div className="status-option" onClick={() => updateStatus('Pending')}>Pending</div>
            <div className="status-option" onClick={() => updateStatus('Rejected')}>Rejected</div>
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = (inModal = false) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const daysOfWeek = inModal ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] 
                               : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Calculate approved leave dates for calendar
    const leaveDates = approvedLeaves.map(leave => {
      const [month, day, year] = leave.date.split('/');
      return {
        date: new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day)),
        status: leave.status
      };
    });
    
    // Check if a date has approved leave
    const hasLeave = (date) => {
      return leaveDates.find(leave => 
        leave.date.getDate() === date && 
        leave.date.getMonth() === month && 
        leave.date.getFullYear() === year &&
        leave.status === 'Approved'
      );
    };

    const handleDateSelect = (day) => {
      if (inModal) {
        const selectedDate = new Date(year, month, day);
        setSelectedDate(formatDate(selectedDate));
        setShowCalendarInModal(false);
      }
    };

    return (
      <div className={`calendar ${inModal ? 'modal-calendar' : ''}`}>
        <div className="calendar-header">
          <ChevronLeft className="calendar-nav" onClick={prevMonth} />
          <span>{`${monthNames[month]}, ${year}`}</span>
          <ChevronRight className="calendar-nav" onClick={nextMonth} />
        </div>
        <div className="calendar-days">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day-name">{day}</div>
          ))}
          
          {Array(firstDay).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}
          
          {Array(days).fill(null).map((_, index) => {
            const day = index + 1;
            const leave = hasLeave(day);
            return (
              <div 
                key={day} 
                className={`calendar-day ${leave ? 'has-leave approved' : ''} ${inModal ? 'selectable' : ''}`}
                onClick={() => handleDateSelect(day)}
              >
                {day}
                {leave && <div className="leave-indicator"></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleDownload = (document) => {
    // In a real application, this would trigger the actual file download
    alert(`Downloading ${document.name}`);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowCalendarInModal(false);
    setSelectedDate('');
    setEmployeeSearch('');
    setLeaveReason('');
    setDesignation('');
  };

  const handleSubmit = () => {
    // Validate if employee is present
    const employee = presentEmployees.find(emp => 
      emp.name.toLowerCase() === employeeSearch.toLowerCase()
    );

    if (!employee) {
      alert('Only present employees can apply for leave');
      return;
    }

    if (!selectedDate || !leaveReason || !designation) {
      alert('Please fill in all required fields');
      return;
    }

    const newLeave = {
      id: leaveApplications.length + 1,
      employeeId: employee.id,
      name: employee.name,
      designation: designation,
      date: selectedDate,
      reason: leaveReason,
      status: 'Pending',
      profileImg: employee.profileImg,
      document: null
    };

    setLeaveApplications([...leaveApplications, newLeave]);
    toggleModal();
  };

  return (
    <div className="leave-management">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon"></div>
          <h2>LOGO</h2>
        </div>
        
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search" 
            className="sidebar-search"
          />
        </div>
        
        <div className="sidebar-section">
          <h3>Recruitment</h3>
          <div className="sidebar-item" onClick={() => handleNavigation('/dashboard')}>            <Users size={18} />
            <span>Candidates</span>
          </div>
        </div>
        
        <div className="sidebar-section">
          <h3>Organization</h3>
          <div className="sidebar-item" onClick={() => handleNavigation('/employee')}>            
            <Users size={18} />
            <span>Employees</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation('/attendance')}> 
            <Clock size={18} />
            <span>Attendance</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation('/leave')}>    
            <Calendar size={18} />
            <span>Leaves</span>
          </div>
        </div>
        
        <div className="sidebar-section">
          <h3>Others</h3>
          <div className="sidebar-item" onClick={handleLogoutClick}>
          <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Leaves</h2>
          <div className="header-right">
            <div className="notification-icons">
              <div className="icon-wrapper">
                <div className="mail-icon"></div>
              </div>
              <div className="icon-wrapper">
                <div className="bell-icon"></div>
              </div>
            </div>
            <div className="user-profile">
              <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User" />
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </div>
        
        <div className="controls">
          <div className="dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              {statusFilter === 'all' ? 'Status' : statusFilter} <span className="arrow">▼</span>
            </button>
            {showStatusDropdown && (
              <div className="status-filter-dropdown">
                <div onClick={() => { setStatusFilter('all'); setShowStatusDropdown(false); }}>All</div>
                <div onClick={() => { setStatusFilter('approved'); setShowStatusDropdown(false); }}>Approved</div>
                <div onClick={() => { setStatusFilter('pending'); setShowStatusDropdown(false); }}>Pending</div>
                <div onClick={() => { setStatusFilter('rejected'); setShowStatusDropdown(false); }}>Rejected</div>
              </div>
            )}
          </div>
          
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="add-leave-button" onClick={toggleModal}>
            Add Leave
          </button>
        </div>
        
        <div className="content-area">
          {/* Leave Applications Table */}
          <div className="leave-table">
            <h3>Applied Leaves</h3>
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map(leave => (
                  <tr key={leave.id}>
                    <td>
                      <div className="profile-pic">
                        <img src={leave.profileImg} alt={leave.name} />
                      </div>
                    </td>
                    <td>
                      <div className="employee-info">
                        <div className="employee-name">{leave.name}</div>
                        <div className="employee-designation">{leave.designation}</div>
                      </div>
                    </td>
                    <td>{leave.date}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <StatusDropdown status={leave.status} leaveId={leave.id} />
                    </td>
                    <td>
                      {leave.document && (
                        <div className="doc-download" onClick={() => handleDownload(leave.document)}>
                          <Download size={18} className="doc-icon" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Calendar View */}
          <div className="calendar-view">
            <h3>Leave Calendar</h3>
            {renderCalendar()}
            
            <div className="approved-leaves">
              <h3>Approved Leaves</h3>
              {approvedLeaves.map(leave => (
                <div className="approved-leave-item" key={leave.id}>
                  <div className="leave-employee">
                    <img src={leave.profileImg} alt={leave.name} />
                    <div className="leave-employee-info">
                      <div className="leave-employee-name">{leave.name}</div>
                      <div className="leave-employee-designation">{leave.designation}</div>
                    </div>
                  </div>
                  <div className="leave-date">{leave.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {showLogoutDialog && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h3
        style={{
          marginBottom: '1.5rem',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827',
        }}
      >
        Are you sure you want to logout?
      </h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={handleConfirmLogout}
          style={{
            backgroundColor: '#dc2626',
            color: '#fff',
            padding: '0.5rem 1.5rem',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: '500',
            cursor: 'pointer',
            flex: 1,
            transition: 'background 0.3s ease',
          }}
        >
          Yes
        </button>
        <button
          onClick={handleCancelLogout}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            padding: '0.5rem 1.5rem',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: '500',
            cursor: 'pointer',
            flex: 1,
            transition: 'background 0.3s ease',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Add Leave Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Leave</h2>
              <button className="close-button" onClick={toggleModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <div className="form-control">
                  <div className="search-container-modal">
                    <Search size={16} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search Employee Name" 
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      list="employees"
                    />
                    <datalist id="employees">
                      {presentEmployees.map(emp => (
                        <option key={emp.id} value={emp.name} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="form-control">
                  <input 
                    type="text" 
                    placeholder="Designation*" 
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="form-control">
                  <div className="date-picker" onClick={() => setShowCalendarInModal(!showCalendarInModal)}>
                    <input 
                      type="text" 
                      placeholder="Leave Date*" 
                      value={selectedDate}
                      readOnly
                    />
                    <Calendar size={16} className="calendar-icon" />
                  </div>
                  {showCalendarInModal && (
                    <div className="calendar-popup">
                      {renderCalendar(true)}
                    </div>
                  )}
                </div>
                <div className="form-control">
                  <div className="document-upload">
                    <input type="text" placeholder="Documents" readOnly />
                    <Upload size={16} className="upload-icon" />
                  </div>
                </div>
              </div>
              
              <div className="form-group full-width">
                <div className="form-control">
                  <input 
                    type="text" 
                    placeholder="Reason*" 
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="save-button" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;