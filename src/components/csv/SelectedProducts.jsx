import React, { useContext } from 'react'
import { Page, ResourceList, Card } from '@shopify/polaris';
import ExportCsvDataPopover from '/src/components/base/ExportCsvDataPopover';
import { AppContext } from './Home';
import SelectedProductItem from './SelectedProductItem';


export default function SelectedProducts({ selectedProducts }) {
	const { setProducts } = useContext(AppContext);

	return (
		<Page primaryAction={{
			content: "Go back",
			onAction() {
				setProducts([]);
			}
		}}
		>
			<ExportCsvDataPopover data={selectedProducts} />
			<Card>
				<ResourceList
					showHeader
					resourceName={{ singular: "Product", plural: "Products" }}
					items={selectedProducts}
					renderItem={SelectedProductItem}
				/>
			</Card>
		</Page>
	)
}
