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

    mapping (address => TodoListApp) public ToDoListApp;
}
