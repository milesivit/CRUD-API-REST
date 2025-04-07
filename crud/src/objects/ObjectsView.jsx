import { Fragment, useState } from "react";

//todo lo q importo de objectsContainer
const ObjectsView = ({ users, loading, error, setSearchObjects, addObjects, localObjects, UpdateQuote, deleteQuote }) => {
    const [name, setName] = useState(""); //inputs del formulario
    const [features, setFeatures] = useState("");
    const [price, setPrice] = useState(""); //estados
    const [year, setYear] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showLocalTable, setShowLocalTable] = useState(true); //mostrar tabla local o de api
    const [editingId, setEditingId] = useState(null); //saber q estoy editando y q objeto

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
            //edito
            UpdateQuote(editingId, newObject);
        } else {
            //crear
            await addObjects(newObject);
        }

        //todo vacio
        setName("");
        setFeatures("");
        setPrice("");
        setYear("");
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const edit = localObjects.find(obj => obj.id === id);
        if (edit) { //busco las variables para editar
            setName(edit.name);
            setFeatures(edit.data.features);
            setPrice(edit.data.price);
            setYear(edit.data.year);
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
                setEditingId(null); //resetear edicion si se va a crear
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
