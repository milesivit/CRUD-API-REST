import { useEffect, useState } from "react";
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchObjects, setSearchObjects] = useState(true);
    const [localObjects, setLocalObjects] = useState([]);

    const getObjects = async () => {
        try {
            const response = await fetch(`https://api.restful-api.dev/objects`);
            if (response.status === 200) {
                const data = await response.json();
                setUsers(data);
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
            setSearchObjects(false);
        }
    };
    
    const addObjects = async (newObject) => {
        try {
            const response = await fetch(`https://api.restful-api.dev/objects`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObject),
            });
    
            if (response.status === 200) {
                const createdObject = await response.json();
    
                // Actualiza estado
                const updatedUsers = [...users, createdObject];
                setUsers(updatedUsers);
    
                
                const updatedLocal = [...localObjects, createdObject];
                setLocalObjects(updatedLocal);
                localStorage.setItem("createdObjects", JSON.stringify(updatedLocal));
    
                console.log("Objeto creado");
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
            setSearchObjects(false);
        }
    };

    const handleUpdateQuote = async (id, updatedObject) => {
        try {
            const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedObject),
            });
    
            if (response.status === 200) {
                const updatedItem = await response.json();
    
                const updatedLocal = localObjects.map(obj =>
                    obj.id === id ? updatedItem : obj
                );
                setLocalObjects(updatedLocal);
                localStorage.setItem("createdObjects", JSON.stringify(updatedLocal));
    
                console.log("Objeto actualizado correctamente");
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
            setSearchObjects(false);
        }
    };

    const deleteQuote = async (id) => {
        try {
            const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Objeto eliminado");
    
                // Filtrar el objeto eliminado del estado
                const updatedLocal = localObjects.filter(obj => obj.id !== id);
                setLocalObjects(updatedLocal);
                localStorage.setItem("createdObjects", JSON.stringify(updatedLocal));
            } else {
                console.log("No se pudo eliminar el objeto");
            }
        } catch (error) {
            console.error("Error al eliminar el objeto:", error);
        }
    };
    
    
    

    useEffect(() => {
        const saved = localStorage.getItem("createdObjects");
        if (saved) {
            setLocalObjects(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (searchObjects) {
            setLoading(true);
            getObjects();
        }
        
    }, [searchObjects]);

    return (
        <ObjectsView 
            users={users} 
            loading={loading} 
            error={error} 
            setSearchObjects={setSearchObjects}
            addObjects={addObjects}
            localObjects={localObjects}
            handleUpdateQuote={handleUpdateQuote}
            deleteQuote={deleteQuote}
        />
    );
};

export default ObjectsContainer;
