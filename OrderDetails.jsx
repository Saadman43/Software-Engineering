import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderList = () => {
    // Sample order data
    const [orderDetails, setOrderDetails] = useState();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/orders/' + id, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setOrderDetails(data);
            });
    }, [])

    return (
        <div className="container mt-4">
            <div className='d-flex mb-4'><h1 className="">Order Details</h1><Link to="/orderList" className='btn'>Back to Order List</Link></div>
            {orderDetails ? (
                <div>
                    <div>Created by: {orderDetails.user_name}</div>
                    <div>Total Amount: {orderDetails.total_amount}</div>
                    <div>Billing Address: {orderDetails.address}</div>
                    <div>Delivery Man: {orderDetails.delivery_man}</div>
                    <table className="table py-2">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2 text-left">Product</th>
                                <th className="border p-2 text-left">Qunatity</th>
                                <th className="border p-2 text-left">Unit Price</th>
                                <th className="border p-2 text-left">Sub-total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.order_items.map((orderItem) => (
                                <tr key={orderItem.id}>
                                    <td className="border p-2">{orderItem.product_name}</td>
                                    <td className="border p-2">{orderItem.quantity}</td>
                                    <td className="border p-2">{orderItem.unit_price} &#x09F3;</td>
                                    <td className="border p-2">{orderItem.quantity * orderItem.unit_price} &#x09F3;</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2}></td>
                                <td><b>Total</b></td>
                                <td><b>{orderDetails.total_amount}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default OrderList;