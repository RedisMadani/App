import  React, { useContext } from 'react';
import { Page, Layout, Button } from "@shopify/polaris";

import SelectForm from './SelectForm';
import { AppContext } from './Home';


function Select() {
	const { setIsOpen } = useContext(AppContext);

	return (
		<Page title="Products CSV Export">
			<Layout>
				<Layout.Section oneHalf>
					<h2 style={{ paddingBottom: '4px' }}> Specifc exports </h2>
					<Button primary onClick={setIsOpen}>
						Export specific products
					</Button>
				</Layout.Section>
				<Layout.Section oneHalf>
					<SelectForm/>
				</Layout.Section>
			</Layout>
		</Page>
	)
}

export default Select;

