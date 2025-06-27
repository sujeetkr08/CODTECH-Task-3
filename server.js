const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/collab-docs');

const docSchema = new mongoose.Schema({
  _id: String,
  content: String
});
const Document = mongoose.model('Document', docSchema);

app.get('/api/docs/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).send("Document not found");
  res.json(doc);
});

io.on('connection', socket => {
  socket.on('get-document', async (docId) => {
    const doc = await findOrCreateDoc(docId);
    socket.join(docId);
    socket.emit('load-document', doc.content);

    socket.on('send-changes', delta => {
      socket.broadcast.to(docId).emit('receive-changes', delta);
    });

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(docId, { content: data });
    });
  });
});

async function findOrCreateDoc(id) {
  if (!id) return;
  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, content: '' });
}

server.listen(4000, () => console.log('Backend running on http://localhost:4000'));
