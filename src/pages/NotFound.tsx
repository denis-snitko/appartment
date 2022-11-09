import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Flex
			minHeight="100vh"
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<Box>
				<Text as="h1" fontSize="120px">
					404
				</Text>
			</Box>
			<Box>
				<Button>
					<Link to="/">Back to main page</Link>
				</Button>
			</Box>
		</Flex>
	);
};

export default NotFound;
