import styled from "styled-components";

const FormStyle = styled.div`
	.section-form {
		background-color: rgb(229, 224, 255);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 3rem;
		color: rgb(42, 56, 115);

		svg {
			height: 4rem;
			width: 4rem;
		}
		.form {
			background-color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;

			border: 3px dashed black;
			border-radius: 10px;
			padding: 2rem 5rem;
		}

		.btn-upload {
			border: none;
			background-color: rgb(142, 167, 233);

			color: white;
			padding: 10px 20px;
			border-radius: 7px;
			font-weight: 600;
		}

		.btn-upload:hover {
			background-color: rgb(114, 134, 211);
		}
	}

	.section-table {
		width: 90vw;
		margin: 3rem auto;
		border-radius: 10px;
	}
`;

export default FormStyle;
