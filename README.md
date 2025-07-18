# User Management System

### A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing users with a modern, responsive interface.

## 📸 Screenshots

### 🧾 Dashboard Overview & Search
![Dashboard Overview](./Screenshots/dashboard-overview.png)


---

### 👤 User Management Interface
![User Form](./Screenshots/user-form.png)


---

### 🔍 Users List
![Users List](./Screenshots/users-list.png)


## 🚀 Features

- **User CRUD Operations**: Create, Read, Update, and Delete users
- **Real-time Search**: Filter users by name or email
- **Role Management**: Assign roles (User, Admin, Manager) to users
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Mobile-friendly user interface
- **Loading States**: Visual feedback during API operations
- **Notifications**: Success and error notifications
- **Statistics Dashboard**: View total users, admins, and filtered results

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **CSS3** - Styling and responsive design
- **Fetch API** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


## 🔌 API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/user` | Create a new user |
| PUT | `/api/update/user/:id` | Update user by ID |
| DELETE | `/api/delete/user/:id` | Delete user by ID |

### Request/Response Examples

#### Create User
```json
POST /api/user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "User"
}
```

#### Response
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "User",
    "createdAt": "2023-07-03T10:30:00.000Z",
    "updatedAt": "2023-07-03T10:30:00.000Z"
  }
}
```

## 🎨 Frontend Features

### User Interface Components

- **Header Section**: Statistics dashboard with user counts
- **Search Bar**: Real-time filtering functionality
- **User Form**: Add/Edit user with validation
- **User Cards**: Grid layout displaying user information
- **Notifications**: Success/error message system
- **Loading States**: Visual feedback during operations

### Form Validation

- Name: Required field
- Email: Required and valid email format
- Phone: Required field
- Role: Dropdown selection (User, Admin, Manager)


## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemon": "^2.0.20"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1"
}
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [jionbiju@gmail.com](mailto:jionbiju@gmail.com)

Project Link: [https://github.com/jionbiju/mern-user-management-system](https://github.com/jionbiju/mern-user-management-system)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for the flexible database solution
- Express.js for the robust backend framework
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/jionbiju/mern-user-management-system/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the maintainer at [your.email@example.com](mailto:jionbiju@gmail.com)

---

⭐ If you found this project helpful, please give it a star on GitHub!