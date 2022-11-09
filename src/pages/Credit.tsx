import { Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Listing from "../components/Listing";
import { RootState } from "../store";
import { fetchData } from "../store/dataSlice";

const Credit = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const { entities, status } = useSelector((state: RootState) => state.data);

	useEffect(() => {
		dispatch(fetchData(pathname));
	}, [dispatch, pathname]);

	if (status === "loading") {
		return (
			<Center bg="transparent" h="100vh">
				<Spinner size="md" />
			</Center>
		);
	}

	if (!entities.length) {
		return (
			<Center bg="transparent" h="100vh">
					No data
			</Center>
		);
	}

	return <Listing data={entities} />;
};

export default Credit;
