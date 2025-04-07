import { Fragment, useState } from "react";

const ObjectsView = ({ users, loading, error, setSearchObjects, addObjects, localObjects, handleUpdateQuote, deleteQuote }) => {
    const [name, setName] = useState("");
    const [features, setFeatures] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showLocalTable, setShowLocalTable] = useState(true);
    const [editingId, setEditingId] = useState(null); // Nuevo estado

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newObject = {
            name,
            data: {
                features,
                price: Number(price),
                year: Number(year)
            }
        };

        if (editingId) {
            // Editar
            handleUpdateQuote(editingId, newObject);
        } else {
            // Crear
            await addObjects(newObject);
        }

        // Resetear
        setName("");
        setFeatures("");
        setPrice("");
        setYear("");
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const objToEdit = localObjects.find(obj => obj.id === id);
        if (objToEdit) {
            setName(objToEdit.name);
            setFeatures(objToEdit.data?.features || "");
            setPrice(objToEdit.data?.price || "");
            setYear(objToEdit.data?.year || "");
            setEditingId(id);
            setShowForm(true);
            setShowLocalTable(true);
        }
    };

    return (
        <Fragment>
            <h1>Objetos</h1>

            <button onClick={() => {
                setShowForm(!showForm);
                setShowLocalTable(true);
                setEditingId(null); // Resetear edición si se va a crear
                setName("");
                setFeatures("");
                setPrice("");
                setYear("");
            }}>
                Crear Objeto
            </button>

            <button onClick={() => {
                setSearchObjects(true);
                setShowLocalTable(false);
            }}>
                Buscar Objetos
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h2>{editingId ? "Editar Objeto" : "Crear Nuevo Objeto"}</h2>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Características"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Año"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
                </form>
            )}

            {error && <p>Error: {error}</p>}

            {loading ? (
                <p>Cargando Objetos...</p>
            ) : showLocalTable ? (
                <>
                    <h2>Mis Objetos Creados</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localObjects.map((obj) => (
                                <tr key={obj.id}>
                                    <td>{obj.name}</td>
                                    <td>
                                        <button onClick={() => handleEdit(obj.id)}>Editar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteQuote(obj.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h2>Resultados de la API</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </Fragment>
    );
};

export default ObjectsView;
