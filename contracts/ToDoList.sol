// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Todolist {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;

    struct ToDoListApp {
        address account;
        uint256 userId;
        string messsage;
        bool completed;
    }

    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    )

    mapping (address => TodoListApp) public toDoListApps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        TodoListApp storage toDo = toDoListApps[msg.sender];

        todo.account = msg.sender;
        toDo.message = _message;
        toDo.completed = false;
        toDo.userId = idNumber

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);
        
        emit ToDoEvent(msg.sender,toDo.userId,_message,toDo.completed)
    }

    function getCreatorData(address _address ) public view returns(address, uint,string memory, bool){
        TodoListApp memory singleUserData = toDoListApps[_addresss];

        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.messsage,
            singleUserData.completed

        )
    }

    //function to get all the arrays we created

    function getAddresses() external view returns (address[] memory){
        return creators;
    }

    functiom
}
