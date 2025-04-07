import { Fragment, useState } from "react";

const ObjectsView = ({ users, loading, error, setSearchObjects, addObjects }) => {
    const [name, setName] = useState("");
    const [features, setFeatures] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");

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

        await addObjects(newObject); 
        setName("");
        setFeatures("");
        setPrice("");
        setYear("");
        setSearchObjects(true); 
    };

    return (
        <Fragment>
            <h1>Lista de Objetos</h1>

            <form onSubmit={handleSubmit}>
                <h2>Crear Nuevo Objeto</h2>
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
                <button type="submit">Crear Objeto</button>
            </form>

            <button onClick={() => setSearchObjects(true)}>Buscar Objetos</button>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {loading ? (
                <p style={{ color: "blue" }}>Cargando Objetos...</p>
            ) : (
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
            )}
        </Fragment>
    );
};

export default ObjectsView;
