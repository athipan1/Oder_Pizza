import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuItems as initialMenuItems } from '../data/menuItems';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialMenuItems;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const addOrder = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending', // รอดำเนินการ
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      items: [...cart]
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price)
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p =>
      p.id === updatedProduct.id ? { ...updatedProduct, price: Number(updatedProduct.price) } : p
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);
