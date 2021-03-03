export const ABI = [
  {
    "anonymous": false,
    "inputs": [],
    "name": "AddressIsNotOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "DuplicateUpload",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "DuplicateUploadAndUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "FileDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "name": "FileExists",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      }
    ],
    "name": "FileNotExistOrUserNotOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_fileHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "FileShared",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "NewUpload",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fh",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "owner",
        "type": "bool"
      }
    ],
    "name": "UserIsOwner",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "files",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "insertFile",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "deleteFile",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "shareFile",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "filehash",
        "type": "bytes32"
      }
    ],
    "name": "fileExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "filehash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "isOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const ADDRESS = "0x00B688691826f35ce24D59D9DEf876790C9E495F";

//Laptop address = "0xd934f95a380b0831F85c0eDd659BC713FC2b6F9f"
//PC address 1 = "0x809f30Ddb70Fe9F900D501ABB6C9402D204A6Bb4"
//PC address 2 = "0xcf0F3F64ae720B80140d82db99Cb1f6aE3f0eC8c"
//PC address 3 = "0x6c7f682C4b16849f45CDDd64bEf2d558359e8Ee8"
//PC address 4 = 0xBEcCd6d8fcf5145ed00f6D00b9B592659dFc837E
//PC address 5 = 0x62f3B56D0416cfD3c63cd6E63a7fB879c3212d73
//Clg lab PC 1 = 0xF2491B317eD373dC85F32DC1952F2E84Ff86A782
//Clg lab PC 2(current) = 0x00B688691826f35ce24D59D9DEf876790C9E495F
