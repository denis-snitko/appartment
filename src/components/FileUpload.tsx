import { Box, Input, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";

type FileUploadProps = {
	isLoading: boolean;
	name: string;
	uploadHandler: (event: any) => void;
};

const FileUpload: FC<FileUploadProps> = ({
	isLoading,
	name,
	uploadHandler,
}) => {
	return (
		<Box
			borderColor="gray.300"
			borderStyle="solid"
			borderWidth="1px"
			rounded="md"
			transition="all 150ms ease-in-out"
			_hover={{
				shadow: "md",
			}}
		>
			<Box position={"relative"}>
				<Text px="4" py="2">
					{isLoading ? "Загрузка файла" : "Click to upload"}
				</Text>
			</Box>
			<Input
				onChange={(event) => uploadHandler(event)}
				name={name}
				type="file"
				height="100%"
				width="100%"
				position="absolute"
				top="0"
				left="0"
				opacity="0"
				aria-hidden="true"
				accept="image/*, application/pdf"
			/>
			<Box position="absolute" top="55%" right={4}>
				{isLoading && <Spinner size="xs" />}
			</Box>
		</Box>
	);
};

export default FileUpload;
