import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const OrderList = () => {
    // Sample order data
    const [deliveryMen, setDeliveryMen] = useState();
    const [isPanelVisible, setPanelVisibility] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState({});
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState();
    const token = localStorage.getItem('accessToken');
    let loginInfo = null;
    if (token) {
        loginInfo = jwtDecode(token);
    }

    const displayAlert = (message, isSuccess) => {
        const displayOption = {
            position: "top-left",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
            theme: "colored"
        }
        if (isSuccess) {
            toast.success(message, displayOption);
        } else {
            toast.warn(message, displayOption);
        }
    }

    const handleChange = (orderId, isSelected) => {
        let updatedSelectedOrders = { ...selectedOrders };
        updatedSelectedOrders["order_" + orderId] = isSelected;
        setSelectedOrders(updatedSelectedOrders);
    }
    useEffect(() => {
        let orderUrl = 'http://127.0.0.1:8000/orders';
        if (loginInfo) {
            if (loginInfo.role != 'admin') {
                orderUrl = orderUrl + (loginInfo.role == 'customer' ? '?customer=' : '?delivery_man=') + loginInfo.sub
            }
            fetch(orderUrl, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                });
        }
    }, [])

    useEffect(() => {
        if (isPanelVisible && !deliveryMen) {
            fetch('http://127.0.0.1:8000/delivery_men', {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    setDeliveryMen(data);
                });
        }
    }, [isPanelVisible])

    const assignedOrdersToDeliveryMan = () => {
        let orderIds = "";
        orders.forEach(o => {
            if (selectedOrders["order_" + o.id]) {
                orderIds = orderIds + o.id + ",";
            }
        });
        if (!orderIds) {
            displayAlert(`Select orders.`, false);
        } else if (!selectedDeliveryMan) {
            displayAlert(`Select delivery man.`, false);
        } else if (orderIds && selectedDeliveryMan) {
            fetch('http://127.0.0.1:8000/assigned_orders_to_delivery_man/' + selectedDeliveryMan + "/" + orderIds, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.detail == "Delivery man assigned.") {
                        setPanelVisibility(false);
                        setSelectedOrders({});
                        displayAlert(`Orders are assigned to ${selectedDeliveryMan}`, true);
                    } else {
                        displayAlert(`Failed to assign orders to ${selectedDeliveryMan}.`, false);
                    }
                });
        }
    }

    return (
        <div className="container mt-4">
            <div className='d-flex mb-4'><h1 className="">Order List</h1>{loginInfo && loginInfo.role == "admin" ? <button className='btn' onClick={() => setPanelVisibility(true)}>Assign Delivery Man</button> : null}</div>
            <table className="table">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">ID</th>
                        <th className="border p-2 text-left">Created By</th>
                        <th className="border p-2 text-left">Total Amount</th>
                        <th className="border p-2 text-left">Address</th>
                        {loginInfo && loginInfo.role == "admin" ? <th className="border p-2 text-left">Select</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2"><Link to={"/orderDetails?id=" + order.id} className='color706ef4'>{order.id}</Link></td>
                            <td className="border p-2">{order.user_name}</td>
                            <td className="border p-2">{order.total_amount} &#x09F3;</td>
                            <td className="border p-2">{order.address}</td>
                            {loginInfo && loginInfo.role == "admin" ? (
                                <td className="border p-2">
                                    <input type="checkbox" value={selectedOrders["order_" + order.id]} onChange={(e) => { handleChange(order.id, e.target.checked) }} />
                                </td>
                            ) : null}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isPanelVisible && deliveryMen ? (
                <div id="right-panel-delivery-man-assign">
                    <div className="login-container">
                        <div className="d-flex">
                            <h2 className="login-title">Assign Delivery Man</h2>
                            <X id="close-button" onClick={() => setPanelVisibility(false)} />
                        </div>
                        <div className="form-group">
                            <select value={selectedDeliveryMan} onChange={e => setSelectedDeliveryMan(e.target.value)}>
                                <option value="">Select delivery man</option>
                                {deliveryMen.map(dm => <option selected={dm.user_name == selectedDeliveryMan} value={dm.user_name}>{dm.user_name}</option>)}
                            </select>
                        </div>
                        <button onClick={assignedOrdersToDeliveryMan}>Assign</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default OrderList;