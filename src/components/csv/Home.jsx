import React, { useState, useCallback } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import SelectWidget from './SelectWidget';
import SelectedProducts from './SelectedProducts';


export const AppContext = React.createContext();

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);

	const handleSelection = useCallback((payload) => {
		setIsOpen(false)
		setProducts(payload.selection);
	});

	const appContextValue = {
		setProducts,
		setIsOpen
	};

	return (
		<>
			<ResourcePicker
				resourceType="Product"
				open={isOpen}
				onCancel={() => setIsOpen(false)}
				onSelection={handleSelection}
			/>

			<AppContext.Provider value={ appContextValue }>
				{products.length > 0 ? (
					<SelectedProducts selectedProducts={products}/>
				) : (
					<SelectWidget/>
				)}
			</AppContext.Provider>
		</>
	)
}
