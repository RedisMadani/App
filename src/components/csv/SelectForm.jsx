import React, { useCallback, useState, useEffect } from 'react'
import { Button, Form, FormLayout, TextField } from "@shopify/polaris";
import { gql, useLazyQuery } from "@apollo/client";
import csvExport from "/src/utilities/export-to-csv";

/*********************************************************************
**********************************************************************
HOW TO PROPERLY MAKE A REQUEST ON CLICK
https://www.apollographql.com/docs/react/data/queries/#refetching
OR
https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery
***********************************************************************
***********************************************************************/


let GET_PRODUCTS = gql`		
query ($products: Int!) {
	products(first: $products) {
	  edges {
		node {
		  id
		  title
		  description
		  totalInventory
		  vendor
		  priceRangeV2 {
			minVariantPrice {
			  amount
			}
		  }
		}
	  }
	}
  }
`

export default function SelectForm() {

	const [number, setNumber] = useState(1);
	const [requestVariables, setRequestVariables] = useState({ variables: { products: 1 } });

	const [requestInProgress, setRequestInProgess] = useState(false);
	const [getProducts] = useLazyQuery(GET_PRODUCTS, requestVariables);


	useEffect(() => {
		setRequestVariables({ variables: { products: Number(number) } });
	}, [number])

	const handleNumberChange = useCallback((value) => {
		 setNumber(Number(value));
	}, []);


	const exportToCsv = useCallback((data) => {
		if (data) {
			const csvHeadings = ['id', 'name', 'total inventory', 'vendor', 'price'];
			const exportDataRows = data.edges.map(item => {

				return [
					item.node.id,
					item.node.title,
					item.node.totalInventory.toString(),
					item.node.vendor,
					item.node.priceRangeV2.minVariantPrice.amount
				]
			})

			exportDataRows.unshift(csvHeadings);
			console.log(exportDataRows);
			csvExport(exportDataRows);
		}
	});

	const handleSubmit = useCallback(async () => {
	    setRequestInProgess(true);
		const products = (await getProducts()).data.products;
	    setRequestInProgess(false);
		
		if(!requestInProgress) {
			exportToCsv(products);
		}
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<FormLayout>

				<TextField
					value={number.toString()}
					onChange={handleNumberChange}
					type="number"
					min={ 1 }
					autoComplete=""
					label="Export first N product"
					helpText={
						number ? <span>Do you want to export the following number of products: {number} ?</span> : null
					}
				/>

				<Button submit primary>Submit</Button>
			</FormLayout>
		</Form>
	)
}
