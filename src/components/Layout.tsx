import { ReactNode } from "react";
import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
	Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Navigate,
	Outlet,
	NavLink as RouterLink,
	useNavigate,
	useLocation,
} from "react-router-dom";
import useAuth from "../auth/useAuth";
import AddBill from "./AddBill";

const links = [
	{
		id: 1,
		label: "Кредит",
		path: "/credit",
	},
	{
		id: 2,
		label: "Ремонт",
		path: "/repair",
	},
	{
		id: 2,
		label: "Копилка",
		path: "/moneybox",
	},
];

const NavLink = ({ path, children }: { path: string; children: ReactNode }) => (
	<Link
		px={6}
		py={1}
		rounded={"sm"}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.300", "gray.700"),
		}}
		_activeLink={{
			bg: useColorModeValue("gray.300", "gray.700"),
		}}
		as={RouterLink}
		to={path}
	>
		{children}
	</Link>
);

export default function Layout() {
	const navigate = useNavigate();

	const { user, signOut } = useAuth();
	const { pathname } = useLocation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const logoutHandler = () => {
		signOut(() => navigate("/login"));
	};

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			<Box bg="gray.100" px={4}>
				<Container maxW="container.2xl">
					<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
						<IconButton
							size={"md"}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={"Open Menu"}
							display={{ md: "none" }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<HStack spacing={8} alignItems={"center"}>
							<HStack
								as={"nav"}
								spacing={1}
								display={{ base: "none", md: "flex" }}
							>
								{links.map(({ id, label, path }) => (
									<NavLink key={id} path={path}>
										{label}
									</NavLink>
								))}
							</HStack>
						</HStack>
						<Flex alignItems={"center"}>
							<Box me={4}>
								<AddBill pathname={pathname} />
							</Box>
							<Button
								variant="solid"
								colorScheme="orange"
								size="sm"
								onClick={logoutHandler}
							>
								Выйти
							</Button>
						</Flex>
					</Flex>

					{isOpen ? (
						<Box pb={4} display={{ md: "none" }}>
							<Stack as={"nav"} spacing={4}>
								{links.map(({ id, label, path }) => (
									<NavLink key={id} path={path}>
										{label}
									</NavLink>
								))}
							</Stack>
						</Box>
					) : null}
				</Container>
			</Box>

			<Box p={4}>
				<Container maxW="container.2xl">
					<Outlet />
				</Container>
			</Box>
		</>
	);
}
