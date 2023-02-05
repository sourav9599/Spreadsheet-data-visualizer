import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Figure = () => {
    const [figure, setFigure] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/figure')
            .then(response => response.json())
            .then(data => {
                setFigure(data);
            });
    }, []);

    return (
        <div>
            {figure ? <Plot data={figure.data} layout={figure.layout} /> : 'Loading...'}
        </div>
    );
};

export default Figure;