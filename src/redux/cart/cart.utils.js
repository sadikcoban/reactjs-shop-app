export const addItemToCart = (cartItems, newItem) => {

    //check if the item already exists
    const existingCartItem = cartItems.find(i => i.id === newItem.id);

    //if it exists, increment quantity by one
    if (existingCartItem) {
        return cartItems.map(i => i.id === newItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i);
    }

    //if it doesnot exist, add the newitem to items array
    return [...cartItems, { ...newItem, quantity: 1 }];
}