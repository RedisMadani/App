import React, { useCallback, useState } from 'react';
import { ActionList, Button, Popover } from '@shopify/polaris';
import { TimelineAttachmentMajor } from '@shopify/polaris-icons';
import csvExport from "/src/utilities/export-to-csv";



export default function ExportCsvDataPopover({ data }) {
	const [isActive, setIsActive] = useState(false);

	const toggleActive = useCallback(() => {
		setIsActive((isActive) => !isActive);
	}, []);

	const handleExportedAction = useCallback(() => {

		const csvHeadings = ['id', 'name', 'total inventory', 'vendor', 'price'];
		const exportDataRows = data.map(item => {
			return [
				item.id,
				item.handle,
				item.totalInventory.toString(),
				item.vendor,
				item.variants[0].price
			]
		})

		exportDataRows.unshift(csvHeadings);
		csvExport(exportDataRows);
	}, []);

	const activator = (
		<Button onClick={toggleActive} disclosure>
			More actions
		</Button>
	);

	return (
		<div style={{ marginBottom: '20px' }}>
			<Popover
				active={isActive}
				activator={activator}
				autofocusTarget="first-node"
				onClose={toggleActive}
			>
				<ActionList
					actionRole="menuitem"
					items={[
						{
							content: 'Export data',
							onAction: handleExportedAction,
							icon: TimelineAttachmentMajor
						},
					]}
				/>
			</Popover>
		</div>
	);
}

