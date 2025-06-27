import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Editor() {
  const { id: docId } = useParams();
  const [content, setContent] = useState('');
  const editorRef = useRef();

  useEffect(() => {
    socket.emit('get-document', docId);

    socket.once('load-document', (data) => {
      setContent(data);
    });

    socket.on('receive-changes', (delta) => {
      setContent(delta);
    });

    return () => {
      socket.off('receive-changes');
    };
  }, [docId]);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('save-document', content);
    }, 2000);
    return () => clearInterval(interval);
  }, [content]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit('send-changes', value);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Document Editor</h2>
      <textarea
        ref={editorRef}
        value={content}
        onChange={handleChange}
        rows={25}
        cols={100}
        style={{ fontSize: 16 }}
      />
    </div>
  );
}
