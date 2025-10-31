import React, { useState, useEffect } from 'react'; // <-- Añade useEffect
import { db } from '../../firebaseConfig'; // <-- Importa nuestra config
import { collection, query, orderBy, onSnapshot, addDoc, doc, deleteDoc, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore"; // <-- Importa funciones de Firestore
import "./TodoList.css";
import CompletedList from './CompletedList';
import DeletedList from './DeletedList';
import './TodoHistory.css';

const TodoList = () => {
    // Estado local
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Suscripción en tiempo real a Firestore
    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setTasks(items);
        }, (error) => {
            console.error('Error leyendo tasks en tiempo real:', error);
        });

        return () => unsubscribe();
    }, []);

    // Añadir tarea a Firestore
    const handleAddTask = async (e) => {
        e.preventDefault();
        const text = inputValue.trim();
        if (!text) return;
        try {
            await addDoc(collection(db, 'tasks'), {
                text,
                completed: false,
                createdAt: serverTimestamp()
            });
            setInputValue("");
        } catch (err) {
            console.error('Error añadiendo tarea:', err);
        }
    };

    // Alternar completado: actualizar el documento original y mantener la colección tasks_completed
    const toggleComplete = async (task) => {
        try {
            const ref = doc(db, 'tasks', task.id);
            if (!task.completed) {
                // Marcar como completada: actualizar el doc y añadir/actualizar entrada en tasks_completed
                await updateDoc(ref, { completed: true, completedAt: serverTimestamp() });

                const completedDocData = {
                    originalId: task.id,
                    text: task.text,
                    completed: true,
                    createdAt: task.createdAt || serverTimestamp(),
                    completedAt: serverTimestamp()
                };

                // Si ya existe una entrada en tasks_completed para este originalId, actualizarla; si no, crearla.
                const qExist = query(collection(db, 'tasks_completed'), where('originalId', '==', task.id));
                const existSnap = await getDocs(qExist);
                if (!existSnap.empty) {
                    const updates = [];
                    existSnap.forEach(d => {
                        updates.push(updateDoc(doc(db, 'tasks_completed', d.id), completedDocData));
                    });
                    await Promise.all(updates);
                } else {
                    await addDoc(collection(db, 'tasks_completed'), completedDocData);
                }
            } else {
                // Desmarcar: actualizar el doc y eliminar la(s) entrada(s) en tasks_completed
                await updateDoc(ref, { completed: false, completedAt: null });

                // Buscar y eliminar entradas en tasks_completed que apunten a este originalId
                const qCompleted = query(collection(db, 'tasks_completed'), where('originalId', '==', task.id));
                const snapCompleted = await getDocs(qCompleted);
                const deletions = [];
                snapCompleted.forEach(d => {
                    deletions.push(deleteDoc(doc(db, 'tasks_completed', d.id)));
                });
                if (deletions.length) await Promise.all(deletions);
            }
        } catch (err) {
            console.error('Error alternando completado:', err);
        }
    };

    // Eliminar tarea: copiar a `tasks_deleted`, borrar cualquier entrada en tasks_completed y luego borrar el original
    const deleteTask = async (task) => {
        try {
            const deletedDoc = {
                originalId: task.id,
                text: task.text,
                completed: !!task.completed,
                createdAt: task.createdAt || serverTimestamp(),
                deletedAt: serverTimestamp()
            };

            // Añadir a tasks_deleted
            await addDoc(collection(db, 'tasks_deleted'), deletedDoc);

            // Borrar entradas relacionadas en tasks_completed
            const qCompleted = query(collection(db, 'tasks_completed'), where('originalId', '==', task.id));
            const snapCompleted = await getDocs(qCompleted);
            const deletions = [];
            snapCompleted.forEach(d => {
                deletions.push(deleteDoc(doc(db, 'tasks_completed', d.id)));
            });
            if (deletions.length) await Promise.all(deletions);

            // Borrar original
            await deleteDoc(doc(db, 'tasks', task.id));
        } catch (err) {
            console.error('Error eliminando tarea (mover a tasks_deleted):', err);
        }
    };

    return (
        <div className="todo-list-container">
            <h2>Lista de Tareas</h2>
            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Añade una nueva tarea"
                />
                <button type="submit">Añadir</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0'}}>
                        <span style={{textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.6 : 1}}>{task.text}</span>
                        <div style={{display: 'flex', gap: 8, marginLeft: 12}}>
                            <button
                                onClick={() => toggleComplete(task)}
                                aria-label={task.completed ? 'Marcar como no completada' : 'Marcar como completada'}
                                title={task.completed ? 'Desmarcar' : 'Marcar completa'}
                                className="todo-icon"
                            >
                                ✓
                            </button>
                            <button
                                onClick={() => deleteTask(task)}
                                aria-label="Eliminar tarea"
                                title="Eliminar"
                                className="todo-icon todo-delete"
                            >
                                ✖
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Completed and deleted lists shown below the tasks (stacked) */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 18}}>
                <CompletedList />
                <DeletedList />
            </div>
        </div>
    );
};

export default TodoList;