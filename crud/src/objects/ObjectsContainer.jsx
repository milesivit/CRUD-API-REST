import { useEffect, useState } from "react";
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchObjects, setSearchObjects] = useState(false);

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

    const addObjects = async () => {
        
        try {
            const response = await fetch(`https://api.restful-api.dev/objects`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObject),
            });
            if (response.ok) {
                const createdObject = await response.json();

                // Actualiza estado
                const updatedUsers = [...users, createdObject];
                setUsers(updatedUsers);

                // Guarda en localStorage
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                console.log("objeto creado");
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

    useEffect(() => {
        // Este se ejecuta solo una vez cuando se monta el componente
        const localData = localStorage.getItem("users");
        if (localData) {
            setUsers(JSON.parse(localData));
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
        />
    );
};

export default ObjectsContainer;
