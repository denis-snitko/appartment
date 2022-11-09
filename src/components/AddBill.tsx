import { ChangeEvent, FC, useRef, useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";

import {
	getDownloadURL,
	ref as refStorage,
	uploadBytes,
} from "firebase/storage";
import { push, ref } from "firebase/database";
import { database, storage } from "../firebase";
import FileUpload from "./FileUpload";

type AddBillModalProps = {
	pathname: string;
};

const AddBillModal: FC<AddBillModalProps> = ({ pathname }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [data, setData] = useState({
		date: "",
		billUrl: "",
		comment: "",
		paid: 0,
	});
	const [isLoading, setIsLoading] = useState(false);

	const initialRef = useRef(null);

	const changeHandler = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		if (name === "paid") {
			setData((prev) => ({ ...prev, [name]: Number(value) }));
		} else {
			setData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const uploadHandler = (event: any) => {
		setIsLoading(true);
		const { name } = event.target;
		const file = event.target.files[0];
		const storageRef = refStorage(storage, `bills/${file.name}`);

		uploadBytes(storageRef, file).then((snapshot) => {
			getDownloadURL(refStorage(storage, `${snapshot.metadata.fullPath}`))
				.then((result) => {
					setData((prev) => ({ ...prev, [name]: result }));
				})
				.then(() => setIsLoading(false));
		});
	};

	const submitHandler = (pathname: string) => {
		const { date, paid, billUrl } = data;

		if (!date || !paid || !billUrl) {
			return;
		}

		push(ref(database, "apartment" + pathname), data)
			.then(() => {
				setData({ date: "", billUrl: "", comment: "", paid: 0 });
				onClose();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Button variant="solid" colorScheme="teal" size="sm" onClick={onOpen}>
				Добавить счёт
			</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Добавить счёт</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Дата</FormLabel>
							<Input
								type="date"
								ref={initialRef}
								placeholder="Дата"
								name="date"
								onChange={(event) => {
									changeHandler(event);
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Загрузить чек</FormLabel>
							{/* <Input
								placeholder="Загрузить чек"
								name="billUrl"
								onChange={(event) => {
									changeHandler(event);
								}}
							/> */}
							<FileUpload
								isLoading={isLoading}
								name="billUrl"
								uploadHandler={uploadHandler}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Сумма</FormLabel>
							<Input
								placeholder="Сумма"
								name="paid"
								onChange={(event) => {
									changeHandler(event);
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Комментарий</FormLabel>
							<Textarea
								name="comment"
								placeholder="Комментарий"
								size="sm"
								onChange={(event) => {
									changeHandler(event);
								}}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							isLoading={isLoading}
							disabled={isLoading}
							onClick={() => submitHandler(pathname)}
						>
							Добавить
						</Button>
						<Button onClick={onClose}>Отменить</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddBillModal;
