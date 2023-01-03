import {
	TableContainer,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Table,
	Text,
	Link,
} from "@chakra-ui/react";
import { FC } from "react";
import { Data } from '../types';

type ListingProps = {
	data: Data[];
};

const Listing: FC<ListingProps> = ({ data }) => {

	const totalSum =
		data && data.map((item) => item.paid).reduce((sum, elem) => sum + elem, 0);

	return (
		<TableContainer>
			<Table variant="striped" size="sm">
				<Thead>
					<Tr>
						<Th isNumeric w={20}>№</Th>
						<Th>Дата</Th>
						<Th>Комментарий</Th>
						<Th>Чек (ссылка)</Th>
						<Th isNumeric>Сумма</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data &&
						data.map((item, index: number) => {
							const formattedDate = item.date.split("-").reverse().join(".");

							return (
								<Tr key={item.id}>
									<Td isNumeric>{index + 1}</Td>
									<Td>{formattedDate}</Td>
									<Td>{item.comment}</Td>
									<Td>
										<Link
											href={item.billUrl}
											target="_blank"
											rel="noopener noreferrer"
											color={'blue.600'}
										>
											Показать чек
										</Link>
									</Td>
									<Td isNumeric>{item.paid}</Td>
								</Tr>
							);
						})}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>
							<Text fontSize="lg" py={2}>
								Итого:
							</Text>
						</Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th isNumeric>
							<Text fontSize="lg" py={2}>
								{totalSum}
							</Text>
						</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
};

export default Listing;
