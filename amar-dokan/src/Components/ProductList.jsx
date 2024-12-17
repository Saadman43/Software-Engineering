import React, { useState, useEffect } from 'react';

const ProductList = () => {
    // Sample product data
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/products', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [])

    return (
        <div className="container mt-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <table className="table">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">ID</th>
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2 text-left">Price</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Sub category</th>
                        <th className="border p-2 text-left">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.price} &#x09F3;</td>
                            <td className="border p-2">{product.category}</td>
                            <td className="border p-2">{product.subCategory}</td>
                            <td className="border p-2">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;