// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;

    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
        uint256 creationTimeStamp;
        uint256 completionTimeStamp;
    }

    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed,
        uint256 creationTimeStamp,
        uint256 completionTimeStamp
    );

    mapping(address => ToDoListApp) public toDoListApps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        ToDoListApp storage toDo = toDoListApps[msg.sender];

        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.completed = false;
        toDo.userId = idNumber;
        toDo.creationTimeStamp = block.timestamp;
        toDo.completionTimeStamp = block.timestamp;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(
            msg.sender,
            toDo.userId,
            _message,
            toDo.completed,
            block.timestamp,
            block.timestamp
        );
    }

    function getCreatorData(
        address _address
    )
        public
        view
        returns (address, uint, string memory, bool, uint256, uint256)
    {
        ToDoListApp memory singleUserData = toDoListApps[_address];

        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.message,
            singleUserData.completed,
            singleUserData.creationTimeStamp,
            singleUserData.completionTimeStamp
        );
    }

    //function to get all the arrays we created

    function getAddresses() external view returns (address[] memory) {
        return creators;
    }

    function getMessage() external view returns (string[] memory) {
        return message;
    }

    function toggle(address _creator) public {
        ToDoListApp storage singleUserData = toDoListApps[_creator];
        singleUserData.completed = !singleUserData.completed;

        if (singleUserData.completed) {
            singleUserData.completionTimeStamp = block.timestamp;
        }
    }
}
