import React, { useState, useEffect, useCallback } from 'react';
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('User');
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';


  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
      } else {
        if (response.status === 404) {
          setUsers([]);
        } else {
          showNotification(data.message || 'Failed to fetch users', 'error');
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to connect to server', 'error');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const userData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role
    };

    try {
      let response;
      
      if (editUserId) {
        // Update existing user
        response = await fetch(`${API_BASE_URL}/update/user/${editUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      } else {
        // Create new user
        response = await fetch(`${API_BASE_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message);
        resetForm();
        fetchUsers(); // Refresh the user list
      } else {
        showNotification(data.message || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Failed to connect to server', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || '');
    setRole(user.role || 'User');
    setEditUserId(user._id);
  };


  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/delete/user/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message);
        fetchUsers(); // Refresh the user list
      } else {
        showNotification(data.message || 'Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Failed to connect to server', 'error');
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setRole('User');
    setEditUserId(null);
    setErrors({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className='User'>
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type === 'error' ? 'error' : ''}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification('')}>&times;</button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}

      <div className="container">
        {/* Header with Stats */}
        <div className="header">
          <h2>User Management System</h2>
          <p>Manage your users efficiently with real-time data</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{users.filter(u => u.role === 'Admin').length}</span>
              <span className="stat-label">Admins</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredUsers.length}</span>
              <span className="stat-label">Filtered</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Form */}
        <div className="form-section">
          <h3>{editUserId ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'error' : ''}
                  disabled={loading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'error' : ''}
                  disabled={loading}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">  
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? 'error' : ''}
                  disabled={loading}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
              >
                {loading ? 'Processing...' : (editUserId ? '✓ Update User' : '+ Add User')}
              </button>
              {editUserId && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="users-section">
          <h3>Users List ({filteredUsers.length})</h3>
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>{users.length === 0 ? 'No users yet. Add your first user!' : 'No users match your search.'}</p>
            </div>
          ) : (
            <div className="users-grid">
              {filteredUsers.map((user, index) => (
                <div key={user._id} className="user-card">
                  <div className="user-header">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p className="user-email">📧 {user.email}</p>
                      {user.phone && <p className="user-phone">📱 {user.phone}</p>}
                    </div>
                    <span className={`role-badge ${user.role?.toLowerCase()}`}>
                      {user.role || 'User'}
                    </span>
                  </div>
                  
                  <div className="user-meta">
                    <span className="created-date">
                      Added: {formatDate(user.createdAt)}
                    </span>
                    {user.updatedAt && user.updatedAt !== user.createdAt && (
                      <span className="updated-date">
                        Updated: {formatDate(user.updatedAt)}
                      </span>
                    )}
                  </div>
                  
                  <div className="user-actions">
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="btn-edit"
                      title="Edit User"
                      disabled={loading}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user._id)} 
                      className="btn-delete"
                      title="Delete User"
                      disabled={loading}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;    