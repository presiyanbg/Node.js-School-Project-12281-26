import { useState, useEffect } from 'react';
import ApiHandler from '../../components/api-handler.js'

const ShoppingListLogin = () => {
    const [items, setItems] = useState(null);

    const { send, get } = ApiHandler();

    useEffect( async () => {
        const loadItems = await get('/api/items');

        if (loadItems && ! items) {
            setItems([]);

            setItems([...loadItems]);
        }
    }, [])

    return {
        items:items,
    }

}

export default ShoppingListLogin;
