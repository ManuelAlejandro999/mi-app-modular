import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './TodoHistory.css';

const DeletedList = () => {
  const [deleted, setDeleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tasks_deleted'), orderBy('deletedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const items = [];
      snap.forEach(d => items.push({ id: d.id, ...d.data() }));
      setDeleted(items);
      setLoading(false);
    }, (err) => {
      console.error('Error listening tasks_deleted:', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="todo-history">Cargando eliminadas...</div>;
  if (!deleted.length) return <div className="todo-history">No hay tareas eliminadas.</div>;

  return (
    <div className="todo-history">
      <h3>Tareas eliminadas</h3>
      <table className="todo-history-table">
        <thead>
          <tr>
            <th>Texto</th>
            <th>Original ID</th>
            <th>Eliminada</th>
          </tr>
        </thead>
        <tbody>
          {deleted.map(item => (
            <tr key={item.id}>
              <td>{item.text}</td>
              <td>{item.originalId}</td>
              <td>{item.deletedAt ? new Date(item.deletedAt.seconds * 1000).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedList;
