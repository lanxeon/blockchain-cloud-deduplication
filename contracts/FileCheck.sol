pragma solidity >=0.4.22 <0.7.0;


contract FileCheck {
    // uint public fileCount = 0;

    struct File {
        bytes32 fileHash;
        string name;
        mapping(address => bool) owner;
        bool exists;
    }

    mapping(bytes32 => File) public files;

    event NewUpload(bytes32 fh, address indexed addr, string name);
    event DuplicateUpload(bytes32 fh, address indexed addr);
    event DuplicateUploadAndUser(bytes32 fh, address indexed addr);
    event FileDeleted(bytes32 fh, address indexed addr);
    event FileNotExistOrUserNotOwner(bytes32 fh);
    event FileShared(bytes32 _fileHash, address _from, address _to);
    event AddressIsNotOwner();

    //backend events
    event UserIsOwner(bytes32 fh, address indexed addr, string name, bool owner);
    event FileExists(bytes32 fh, bool exists);

    // constructor() public {}

    function insertFile(bytes32 _fileHash, address _address, string memory _name)
    public {
        if (!files[_fileHash].exists) {
            files[_fileHash].fileHash = _fileHash;
            files[_fileHash].name = _name;
            files[_fileHash].owner[_address] = true;
            files[_fileHash].exists = true;
            emit NewUpload(_fileHash, _address, _name);
        }
        else if (!files[_fileHash].owner[_address]) {
          files[_fileHash].owner[_address] = true;
          emit DuplicateUpload(_fileHash, _address);
        }
        else {
            emit DuplicateUploadAndUser(_fileHash, _address);
        }
    }

    function deleteFile(bytes32 _fileHash, address _address) public {
        if(files[_fileHash].exists) {
            files[_fileHash].owner[_address] = false;
            emit FileDeleted(_fileHash, _address);
        }
        else emit FileNotExistOrUserNotOwner(_fileHash);
    }


    function shareFile(bytes32 _fileHash, address _from, address _to)
    public {
        if(files[_fileHash].exists)
        {
            if(files[_fileHash].owner[_from]) {
                files[_fileHash].owner[_to] = true;
                emit FileShared(_fileHash, _from, _to);
            }

            else emit AddressIsNotOwner();
        }

        else emit FileNotExistOrUserNotOwner(_fileHash);
    }

    function fileExists(bytes32 filehash) public returns(bool) {
        if(!files[filehash].exists)
            return false;
        
        return true;
    }

    function fileExistsCheck(bytes32 filehash) public {
        if(!files[filehash].exists)
            emit FileExists(filehash, false);
        
        else emit FileExists(filehash, true);
    }

    function isOwner(bytes32 filehash, address addr)
    public {
        if(fileExists(filehash)) {
            if(files[filehash].owner[addr])
                emit UserIsOwner(filehash, addr, files[filehash].name, true);
            else 
                emit UserIsOwner(filehash, addr, files[filehash].name, false);
        } else 
            emit FileExists(filehash, false);
    }

    // function insertFolder(bytes32[] _fileHash, address _address, string memory _name) public
    // {

    // }
}
