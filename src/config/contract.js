export const ABI = [
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "bytes32",
			},
		],
		name: "files",
		outputs: [
			{
				name: "fileHash",
				type: "bytes32",
			},
			{
				name: "name",
				type: "string",
			},
			{
				name: "exists",
				type: "bool",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x98c9adff",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "fh",
				type: "bytes32",
			},
			{
				indexed: true,
				name: "addr",
				type: "address",
			},
			{
				indexed: false,
				name: "name",
				type: "string",
			},
		],
		name: "NewUpload",
		type: "event",
		signature: "0x9e424276c496701a898128b02175cede1197cd3ed9e0e9a1e52dff156ac81a25",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "fh",
				type: "bytes32",
			},
			{
				indexed: true,
				name: "addr",
				type: "address",
			},
		],
		name: "DuplicateUpload",
		type: "event",
		signature: "0xacdc05323c0d556721555dd4635c1e81cbbee7f5b05fd0db53757ef95ed8c75d",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "fh",
				type: "bytes32",
			},
			{
				indexed: true,
				name: "addr",
				type: "address",
			},
		],
		name: "DuplicateUploadAndUser",
		type: "event",
		signature: "0x0c6807321cb269a6d2a3ade9b9e5f645bda2dc9d5c90e7a8b51e1e81ad2c5be4",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "fh",
				type: "bytes32",
			},
			{
				indexed: true,
				name: "addr",
				type: "address",
			},
		],
		name: "FileDeleted",
		type: "event",
		signature: "0xe9d807989e1b989644726a2599acb272adc7eeafbc532de494ba8ded05935351",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "fh",
				type: "bytes32",
			},
		],
		name: "FileNotExistOrUserNotOwner",
		type: "event",
		signature: "0x2971a1519f3fb1288cf94a10b4e2c6bbb75b9588f753e44c26f6b9270b5cdbce",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "_fileHash",
				type: "bytes32",
			},
			{
				indexed: false,
				name: "_from",
				type: "address",
			},
			{
				indexed: false,
				name: "_to",
				type: "address",
			},
		],
		name: "FileShared",
		type: "event",
		signature: "0x7eaae5561b99c52aa935c7718653858a2708e6422f302150625e40234db3a391",
	},
	{
		anonymous: false,
		inputs: [],
		name: "AddressIsNotOwner",
		type: "event",
		signature: "0xa4f1b762ad8362e76aa9a45037ba1eb8d320e09b94fc04e80e1401f456dca760",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_fileHash",
				type: "bytes32",
			},
			{
				name: "_address",
				type: "address",
			},
			{
				name: "_name",
				type: "string",
			},
		],
		name: "insertFile",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0xea7290c6",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_fileHash",
				type: "bytes32",
			},
			{
				name: "_address",
				type: "address",
			},
		],
		name: "deleteFile",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x7af80dd3",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_fileHash",
				type: "bytes32",
			},
			{
				name: "_from",
				type: "address",
			},
			{
				name: "_to",
				type: "address",
			},
		],
		name: "shareFile",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x48edf4c2",
	},
];

export const ADDRESS = "0x62f3B56D0416cfD3c63cd6E63a7fB879c3212d73";

//Laptop address = "0xd934f95a380b0831F85c0eDd659BC713FC2b6F9f"
//PC address 1 = "0x809f30Ddb70Fe9F900D501ABB6C9402D204A6Bb4"
//PC address 2 = "0xcf0F3F64ae720B80140d82db99Cb1f6aE3f0eC8c"
//PC address 3 = "0x6c7f682C4b16849f45CDDd64bEf2d558359e8Ee8"
//PC address 4 = 0xBEcCd6d8fcf5145ed00f6D00b9B592659dFc837E
//PC address 5(current) = 0x62f3B56D0416cfD3c63cd6E63a7fB879c3212d73
