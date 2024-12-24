import { useEffect, useState } from "react";
import './App.css'; // Import the CSS file

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost/new_wp/wp-json/custom/v1/testimonials')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Fetched Apis</h1>
            <ul class="ul-list">
                {data.map(todo => (
                    <li key={todo.id}>{todo.id}. {todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
