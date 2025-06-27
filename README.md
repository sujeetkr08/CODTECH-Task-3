# DOCUMENTS EDITOR

*COMPANY* : CODTECH IT SOLUTIONS

*NAME* : SUJEET KUMAR

*INTERN ID* : CT04DF1733

*DOMAIN* : FULL STACK WEB DEVELOPMENT

*DURATION* : 4 WEEKS

*MENTOR* : NEELA SANTOSH

*DISCRIPTION :

This repository contains the complete source code for a Real-Time Collaborative Document Editor built using React.js on the frontend, Node.js with Express and Socket.IO on the backend, and MongoDB for data storage. The application allows multiple users to edit the same document simultaneously, with changes reflected in real time across all connected clients. This system is similar in functionality to tools like Google Docs, aimed at improving productivity, team collaboration, and seamless document editing across the web.

🔧 Technology Stack
Frontend: Built with React.js and React Router DOM, the UI is responsive, user-friendly, and designed to handle live content updates using WebSockets. The editor uses a basic <textarea> for plain text but can easily be upgraded to a rich text editor like Quill.js, TipTap, or Monaco Editor.

Backend: The backend server is built with Node.js and Express. It also uses Socket.IO to handle real-time bidirectional communication between the clients and the server. Each user connects to a specific document ID using WebSocket channels.

Database: MongoDB is used as the database to persist document data. When users connect to a document URL for the first time, the backend checks if the document exists in the database. If not, it creates a new entry. As users make changes, the updated content is periodically saved back to MongoDB to ensure data is not lost.

💡 Key Features
Real-Time Collaboration: Multiple users can edit the same document simultaneously. All connected users see each other’s updates in real time.

Automatic Document Creation: When a user visits a new /docs/:id URL, the system automatically creates a new document with that ID if it doesn’t exist.

Periodic Saving: The editor automatically saves the document content to the database every few seconds to ensure persistence.

Socket.IO Integration: Real-time communication is handled using Socket.IO, allowing lightweight and efficient synchronization between users.

UUID-based Document Routing: Each document is identified by a unique UUID, ensuring secure and unique URLs for each session.

🖥️ How It Works
User visits http://localhost:3000/

They click "Create New Document", which generates a unique UUID and redirects them to /docs/:id.

The frontend connects to the backend via Socket.IO, requesting the document by ID.

The backend either returns an existing document or creates a new one in MongoDB.

As the user types, changes are sent to the server and broadcast to other clients connected to the same document.

Every few seconds, the backend saves the current content to MongoDB.

*OUTPUT* :

![Image](https://github.com/user-attachments/assets/794dcede-8d8f-4a81-8d19-dc52983ca6b9)

