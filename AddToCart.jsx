import React, { useState, useContext } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import productStyle from './Product.module.css';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
// Create a cart context for global state management
const CartContext = React.createContext();

// Cart provider component to wrap the application
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [rightPanel, setRightPanel] = useState({ "shoppingCart": false, "login": false, "registration": false });
    const clearCart = () => {
        setCart([]);
    }
    const setRightPanelVisibility = (panelName) => {
        setRightPanel(rightPanel => {
            let updatedRightPanel = { ...rightPanel };
            updatedRightPanel[panelName] = !rightPanel[panelName];
            return updatedRightPanel;
        });
    }

    const addToCart = (product) => {
        setCart(currentCart => {
            // Check if product already exists in cart
            const existingProduct = currentCart.find(item => item.id === product.id);

            if (existingProduct) {
                // If exists, increase quantity
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // If not in cart, add new product with quantity 1
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart =>
            currentCart.filter(item => item.id !== productId)
        );
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max(0, newQuantity) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                rightPanel,
                clearCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                setRightPanelVisibility
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Add to Cart Component
const AddToCart = ({ product }) => {
    const { addToCart, cart } = useCart();
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    // Find the current quantity of this product in the cart
    const cartItem = cart.find(item => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        // Check if product is in stock
        if (product.stock > 0) {
            addToCart(product);
            setShowAddedMessage(true);

            // Hide message after 2 seconds
            setTimeout(() => {
                setShowAddedMessage(false);
            }, 2000);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`d-flex align-items-center justify-content-center px-2 py-2 rounded ${productStyle["add-to-cart-btn"]} ${product.stock > 0 ? '' : 'cursor-not-allowed'}`}
                >
                    <ShoppingCart className="me-1" size={20} />
                    Add to Cart
                </button>

                {/* Quantity Display if in Cart */}
                {currentQuantity > 0 && (
                    <div className="d-flex align-items-center ms-2 bg-light px-3 py-1 rounded" style={{ lineHeight: '20px' }}>
                        <span className="text-sm">In Cart: {currentQuantity}</span>
                    </div>
                )}
            </div>

            {/* Stock Information */}
            {product.stock > 0 ? `` : <p className="mt-2 text-sm text-danger">Out of Stock</p>}

            {/* Added to Cart Message */}
            {showAddedMessage && (
                <div className="absolute top-full left-0 mt-2 bg-green-100 text-green-800 px-3 py-2 rounded shadow-md">
                    Added to cart!
                </div>
            )}
        </div>
    );
};

// Cart Summary Component (Optional)
const CartSummary = () => {
    const [checkoutInProgress, setCheckoutInProgress] = useState(false);
    const [address, setAddress] = useState("");
    const { clearCart, cart, removeFromCart, updateQuantity, rightPanel, setRightPanelVisibility } = useCart();

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

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

    const placeOrder = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.sub) {
                const orderItems = cart.map(item => {
                    return { product_id: item.id, product_name: item.name, quantity: item.quantity, unit_price: item.price.toFixed(2) };
                })
                let orderToCreate = {
                    user_name: decoded.sub,
                    address: address,
                    total_amount: totalPrice,
                    order_items: orderItems
                }
                try {
                    // this endpoint will return CORS error
                    fetch('http://127.0.0.1:8000/orders', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(orderToCreate)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data && data.id) {
                                displayAlert(<div>Your order has been placed.<br/>Order id: #{data.id}</div>, true);
                                setTimeout(() => {
                                    setRightPanelVisibility('shoppingCart');
                                    clearCart();
                                }, 1000);
                            } else {
                                displayAlert('Failed to place your order.', false);
                            }
                        });
                } catch {
                    displayAlert('Failed to place your order.', false);
                }

            }
        } else {
            displayAlert('Please login first to order an item.', false);
        }

    }

    let cartContent = null;
    if (cart.length === 0) {
        cartContent = (
            <div className="text-center text-gray-500 py-4">
                Your cart is empty
            </div>
        );
    } else {
        cartContent = (
            <div className="bg-white shadow-md rounded p-4">
                <h4 className="text-xl font-bold py-4">Cart Summary</h4>
                {cart.map(item => (
                    <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between border-b py-2"
                    >
                        <div className="d-flex align-items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover mr-4"
                                width={100}
                            />
                            <div className='px-2'>
                                <p className="font-semibold py-1">{item.name}</p>
                                <p className="text-gray-500 py-1">{item.price.toFixed(2)} &#x09F3;</p>
                                <div className="d-flex align-items-center py-1">
                                    <div>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="lineHeight10 p-1 me-2 rounded"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className='me-2'>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="bg-gray- lineHeight10 p-1 me-2 rounded"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="btn btn-danger btn-xs"
                                    >
                                        Remove
                                    </button>

                                </div>
                            </div>
                        </div>


                    </div>
                ))}
                <div className="mt-4 d-flex justify-content-between">
                    <span className="font-bold">Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                {checkoutInProgress ? (
                    <div>
                        <div className='mt-4'>Address: <input type='text' className='addressInput' onChange={e => setAddress(e.target.value)} /></div>
                        <button onClick={placeOrder} className='confirmButton'>Confirm</button>
                    </div>
                ) : (
                    <button onClick={() => setCheckoutInProgress(true)} className='checkoutButton'>Checkout</button>
                )}
            </div>
        );
    }

    return (
        <div id="shoppingCart" className={rightPanel && rightPanel['shoppingCart'] ? 'active' : ""}>
            <div className='d-flex'>
                <div>SHOPPING CART</div>
                <X className='cursorPointer' onClick={() => setRightPanelVisibility('shoppingCart')} />
            </div>
            <div>{cartContent}</div>
        </div>
    )
};

export { AddToCart, CartSummary };