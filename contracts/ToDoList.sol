// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    ToDoListApp[] public ToDoListApps;
    string[] public message;
    uint256[] public messageId;

    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
        uint256 creationTimeStamp;
        uint256 completionTimeStamp;
        bool deleted;
        uint256 deletionTimeStamp;
    }

    mapping(address => ToDoListApp[]) public toDoListApps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;

        ToDoListApp memory toDo = ToDoListApp({
            account: msg.sender,
            userId: idNumber,
            message: _message,
            completed: false,
            creationTimeStamp: block.timestamp,
            completionTimeStamp: block.timestamp,
            deleted: false,
            deletionTimeStamp: 0
        });

        toDoListApps[msg.sender].push(toDo);

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);
    }

    function getCreatorData(
        address _address
    ) public view returns (ToDoListApp[] memory) {
        return toDoListApps[_address];
    }

    function getAddresses() external view returns (address[] memory) {
        return creators;
    }

    function getMessage() external view returns (string[] memory) {
        return message;
    }

    function toggle(address _creator, uint256 _index) public {
        ToDoListApp[] storage singleUserData = toDoListApps[_creator];
        require(_index < singleUserData.length, "Invalid index");

        singleUserData[_index].completed = true;

        if (singleUserData[_index].completed) {
            singleUserData[_index].completionTimeStamp = block.timestamp;
        }
    }

    function toggleDelete(address _creator, uint256 _index) public {
        ToDoListApp[] storage singleUserData = toDoListApps[_creator];
        require(_index < singleUserData.length, "Invalid index");

        singleUserData[_index].deleted = true;

        if (singleUserData[_index].deleted) {
            singleUserData[_index].deletionTimeStamp = block.timestamp;
        } else {
            singleUserData[_index].deletionTimeStamp = 0;
        }
    }

    function editTask(
        address _creator,
        uint _index,
        string calldata _messsage
    ) external {
        ToDoListApp[] storage singleUserData = toDoListApps[_creator];
        singleUserData[_index].message = _messsage;
    }
}
