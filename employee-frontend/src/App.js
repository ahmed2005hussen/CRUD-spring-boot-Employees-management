import React, { useState, useEffect } from 'react';
import { Users, Mail, DollarSign, Briefcase, Search, Plus, ArrowLeft, Trash2, X, Edit, Upload } from 'lucide-react';
import './EmployeeApp.css';

const API_BASE = 'http://localhost:8080/api';

const defaultImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
];

const EmployeeManagementSystem = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeImages, setEmployeeImages] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    department: ''
  });
  const [newEmployeeImage, setNewEmployeeImage] = useState(null);
  const [editEmployee, setEditEmployee] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    department: ''
  });
  const [editEmployeeImage, setEditEmployeeImage] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getEmployeeImage = (id) => {
    if (employeeImages[id]) {
      return employeeImages[id];
    }
    return defaultImages[id % defaultImages.length];
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditEmployeeImage(reader.result);
        } else {
          setNewEmployeeImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([
        { id: 1, firstName: 'Ahmed', lastName: 'Hassan', email: 'ahmed.hassan@company.com', salary: 75000, department: 'Engineering' },
        { id: 2, firstName: 'Fatima', lastName: 'Ali', email: 'fatima.ali@company.com', salary: 68000, department: 'Marketing' },
        { id: 3, firstName: 'Omar', lastName: 'Khalil', email: 'omar.khalil@company.com', salary: 82000, department: 'Engineering' },
        { id: 4, firstName: 'Layla', lastName: 'Ibrahim', email: 'layla.ibrahim@company.com', salary: 71000, department: 'HR' },
        { id: 5, firstName: 'Youssef', lastName: 'Mahmoud', email: 'youssef.mahmoud@company.com', salary: 79000, department: 'Sales' },
        { id: 6, firstName: 'Nour', lastName: 'Said', email: 'nour.said@company.com', salary: 73000, department: 'Finance' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch(`${API_BASE}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      
      if (newEmployeeImage) {
        setEmployeeImages({...employeeImages, [data.id]: newEmployeeImage});
      }
      
      setEmployees([...employees, data]);
      setShowAddModal(false);
      setNewEmployee({ firstName: '', lastName: '', email: '', salary: '', department: '' });
      setNewEmployeeImage(null);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(`${API_BASE}/employees`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEmployee)
      });
      const data = await response.json();
      
      if (editEmployeeImage) {
        setEmployeeImages({...employeeImages, [data.id]: editEmployeeImage});
      }
      
      setEmployees(employees.map(emp => emp.id === data.id ? data : emp));
      setShowEditModal(false);
      setEditEmployeeImage(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await fetch(`${API_BASE}/employees/${id}`, { method: 'DELETE' });
        setEmployees(employees.filter(emp => emp.id !== id));
        
        const newImages = {...employeeImages};
        delete newImages[id];
        setEmployeeImages(newImages);
        
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const openEditModal = (employee) => {
    setEditEmployee({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      salary: employee.salary,
      department: employee.department
    });
    setEditEmployeeImage(null);
    setShowEditModal(true);
  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedEmployee) {
    const employee = employees.find(e => e.id === selectedEmployee);
    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-brand">
              <Users size={32} />
              <h1>Employee System</h1>
            </div>
          </div>
        </nav>

        <div className="content-wrapper">
          <button onClick={() => setSelectedEmployee(null)} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Employees</span>
          </button>

          <div className="detail-card">
            <div className="detail-header"></div>
            <div className="detail-content">
              <div className="detail-flex">
                <img src={getEmployeeImage(employee.id)} alt={employee.firstName} className="detail-image" />
                <div className="detail-info">
                  <div className="detail-top">
                    <div>
                      <h2 className="employee-name">{employee.firstName} {employee.lastName}</h2>
                      <p className="employee-dept">{employee.department}</p>
                    </div>
                    <div className="action-buttons">
                      <button onClick={() => openEditModal(employee)} className="edit-button">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button onClick={() => handleDeleteEmployee(employee.id)} className="delete-button">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="detail-grid">
                    <div className="info-box">
                      <div className="info-icon info-icon-blue">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="info-label">Email</p>
                        <p className="info-value">{employee.email}</p>
                      </div>
                    </div>

                    <div className="info-box">
                      <div className="info-icon info-icon-green">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <p className="info-label">Salary</p>
                        <p className="info-value">${employee.salary.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="info-box">
                      <div className="info-icon info-icon-purple">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <p className="info-label">Department</p>
                        <p className="info-value">{employee.department}</p>
                      </div>
                    </div>

                    <div className="info-box">
                      <div className="info-icon info-icon-indigo">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="info-label">Employee ID</p>
                        <p className="info-value">#{employee.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Edit Employee</h2>
                <button onClick={() => setShowEditModal(false)} className="close-button">
                  <X size={24} />
                </button>
              </div>
              <div className="modal-body">
                <div className="image-upload-container">
                  <label htmlFor="edit-image-upload" className="image-upload-label">
                    <div className="image-preview">
                      {editEmployeeImage ? (
                        <img src={editEmployeeImage} alt="Preview" className="preview-img" />
                      ) : (
                        <img src={getEmployeeImage(editEmployee.id)} alt="Current" className="preview-img" />
                      )}
                    </div>
                    <div className="upload-overlay">
                      <Upload size={24} />
                      <span>Change Photo</span>
                    </div>
                  </label>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="image-input"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="First Name"
                  value={editEmployee.firstName}
                  onChange={(e) => setEditEmployee({ ...editEmployee, firstName: e.target.value })}
                  className="modal-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={editEmployee.lastName}
                  onChange={(e) => setEditEmployee({ ...editEmployee, lastName: e.target.value })}
                  className="modal-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editEmployee.email}
                  onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
                  className="modal-input"
                />
                <input
                  type="number"
                  placeholder="Salary"
                  value={editEmployee.salary}
                  onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
                  className="modal-input"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={editEmployee.department}
                  onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}
                  className="modal-input"
                />
                <button onClick={handleUpdateEmployee} className="submit-button">
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <Users size={32} />
            <h1>Employee Management</h1>
          </div>
          <button onClick={() => setShowAddModal(true)} className="add-button">
            <Plus size={20} />
            Add Employee
          </button>
        </div>
      </nav>

      <div className="content-wrapper">
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <div className="card-image-container" onClick={() => setSelectedEmployee(employee.id)}>
                  <img src={getEmployeeImage(employee.id)} alt={employee.firstName} className="card-image" />
                  <div className="card-overlay"></div>
                  <div className="card-header">
                    <h3>{employee.firstName} {employee.lastName}</h3>
                    <p>{employee.department}</p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-info">
                    <Mail size={16} />
                    <span>{employee.email}</span>
                  </div>
                  <div className="card-info">
                    <DollarSign size={16} />
                    <span>${employee.salary.toLocaleString()}</span>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => openEditModal(employee)} className="card-edit-btn">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEmployee(employee.id)} className="card-delete-btn">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="close-button">
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="image-upload-container">
                <label htmlFor="image-upload" className="image-upload-label">
                  <div className="image-preview">
                    {newEmployeeImage ? (
                      <img src={newEmployeeImage} alt="Preview" className="preview-img" />
                    ) : (
                      <div className="empty-preview">
                        <Upload size={48} />
                        <span>Upload Photo</span>
                      </div>
                    )}
                  </div>
                  {newEmployeeImage && (
                    <div className="upload-overlay">
                      <Upload size={24} />
                      <span>Change Photo</span>
                    </div>
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="image-input"
                />
              </div>

              <input
                type="text"
                placeholder="First Name"
                value={newEmployee.firstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                className="modal-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newEmployee.lastName}
                onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                className="modal-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="modal-input"
              />
              <input
                type="number"
                placeholder="Salary"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                className="modal-input"
              />
              <input
                type="text"
                placeholder="Department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                className="modal-input"
              />
              <button onClick={handleAddEmployee} className="submit-button">
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagementSystem;