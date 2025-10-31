import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './TodoHistory.css';

const CompletedList = () => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tasks_completed'), orderBy('completedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const items = [];
      snap.forEach(d => items.push({ id: d.id, ...d.data() }));
      setCompleted(items);
      setLoading(false);
    }, (err) => {
      console.error('Error listening tasks_completed:', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="todo-history">Cargando completadas...</div>;
  if (!completed.length) return <div className="todo-history">No hay tareas completadas.</div>;

  return (
    <div className="todo-history">
      <h3>Tareas completadas</h3>
      <table className="todo-history-table">
        <thead>
          <tr>
            <th>Texto</th>
            <th>Original ID</th>
            <th>Completada</th>
          </tr>
        </thead>
        <tbody>
          {completed.map(item => (
            <tr key={item.id}>
              <td>{item.text}</td>
              <td>{item.originalId}</td>
              <td>{item.completedAt ? new Date(item.completedAt.seconds * 1000).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedList;
