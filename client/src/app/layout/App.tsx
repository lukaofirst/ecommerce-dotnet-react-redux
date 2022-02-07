import { useEffect } from 'react';

function App() {
    useEffect(() => {
        const getData = async () => {
            const request = await fetch('https://localhost:5001/api/products');
            const response = (await request.json()) as JSON;

            console.log(response);
        };

        getData();
    }, []);

    return <div></div>;
}

export default App;
