import React, {useState , useEffect} from "react";
import "./UserDirectory.css";

const UserDirectory = () => {
    /*1. Hook useState para manejar el estado de los usuarios*/
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //aquí es donde usaremos useEffect para cargar los datos de usuarios
    useEffect(() => {
        // Usamos la API 'fetch' del navegador para hacer la petición
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
            throw new Error('La respuesta de la red no fue satisfactoria');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data); // Guardamos los usuarios en el estado
            setError(null); // Limpiamos cualquier error previo
        })
        .catch(error => {
            setError(error.message); // Guardamos el mensaje de error
            setUsers([]); // Limpiamos los datos de usuarios
        })
        .finally(() => {
            setLoading(false); // La carga ha terminado (sea con éxito o error)
        });
    }, []); 

    // aquí mostraremos la UI de directorio de usuarios

    return (
        <div className="user-directory-container">
            <h2>Directorio de Usuarios</h2>
            {/* Vista por defecto: cuadros */}

            {loading ? (
                <p>Cargando usuarios…</p>
            ) : error ? (
                <p className="error">Error: {error}</p>
            ) : (
                (
                    <div className="cards-grid">
                        {users.map(u => (
                            <div className="user-card" key={u.id}>
                                <h3>{u.name}</h3>
                                <p className="muted">{u.email}</p>
                                <p>{u.company?.name}</p>
                                <p className="small">{u.phone}</p>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default UserDirectory;