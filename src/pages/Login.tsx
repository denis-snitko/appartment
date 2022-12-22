/* eslint-disable react-hooks/rules-of-hooks */
import {
	Box,
	Button,
	// Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	// HStack,
	Input,
	Stack,
	// Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import { PasswordField } from "../components/PasswordField";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Toast from '../components/Toast';

const Login = () => {
	const { user, error, signIn } = useAuth();

	const navigate = useNavigate();

	const submitHandler = (event: any) => {
		event.preventDefault();
		const email = event.target.elements.email.value.trim();
		const password = event.target.elements.password.value.trim();
		
		const values = {
			email,
			password,
		};

		if (email && password) {
			signIn(values, () => navigate("/"));
		}
	};

	if (user) {
		return <Navigate to="/" />;
	}

	return (
		<Container
			maxW="lg"
			py={{ base: "12", md: "24" }}
			px={{ base: "0", sm: "8" }}
		>
			<Stack spacing="8">
				<Stack spacing="6">
					<Stack spacing={{ base: "2", md: "3" }} textAlign="center">
						<Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
							Log in to your account
						</Heading>
						{/* <HStack spacing="1" justify="center">
						<Text color="muted">Don't have an account?</Text>
						<Button variant="link" colorScheme="blue">
							Sign up
						</Button>
					</HStack> */}
					</Stack>
				</Stack>
				<Box
					py={{ base: "0", sm: "8" }}
					px={{ base: "4", sm: "10" }}
					bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
					boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
					borderRadius={{ base: "none", sm: "xl" }}
				>
					<form onSubmit={submitHandler}>
						<Stack spacing="6">
							<Stack spacing="5">
								<FormControl>
									<FormLabel htmlFor="email">Email</FormLabel>
									<Input id="email" type="email" />
								</FormControl>
								<PasswordField />
							</Stack>
							{/* <HStack justify="space-between">
						<Checkbox defaultChecked>Remember me</Checkbox>
						<Button variant="link" colorScheme="blue" size="sm">
						Forgot password?
						</Button>
					</HStack> */}
							<Stack spacing="6">
								<Button variant="primary" type="submit">
									Sign in
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
			{ error && <Toast title={error} status='error' /> }
		</Container>
	);
};

export default Login;
