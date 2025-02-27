// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    ToDoListApp[] public ToDoListApps;

    

    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
        uint256 creationTimeStamp;
        uint256 completionTimeStamp;
        bool deleted;
        uint256 deletionTimeStamp;
        bool edited;
    }

    mapping(address => ToDoListApp[]) public toDoListApps;

    ToDoListApp[] storage allTodosList = new ToDoListApp[](_idUser);

    constructor() {
        ownerOfContract = msg.sender;
    }

    function createList(string calldata _message) external {
        uint256 idNumber = _idUser++;
        ToDoListApp memory toDo = ToDoListApp({
            account: msg.sender,
            userId: idNumber,
            message: _message,
            completed: false,
            creationTimeStamp: block.timestamp,
            completionTimeStamp: 0,
            deleted: false,
            deletionTimeStamp: 0,
            edited: false
        });

        toDoListApps[msg.sender].push(toDo);
        creators.push(msg.sender);
    }

    function getAddresses() external view returns (address[] memory) {
        require(msg.sender == ownerOfContract, "Only the owner can call this function");
        return creators;
    }

    function toggleDelete(uint256 _messageId) public {
        require(_messageId < toDoListApps[msg.sender].length, "Invalid message Id");

        // ToDoListApp storage userMessage = toDoListApps[msg.sender][_messageId];
        // require(!userMessage.deleted, "Cannot delete a deleted message");

        // userMessage.deleted = !userMessage.deleted;

        // if (userMessage.deleted) {
        //     userMessage.deletionTimeStamp = block.timestamp;
        // } else {
        //     userMessage.deletionTimeStamp = 0;
        // }

         ToDoListApp[] storage userMessageList = toDoListApps[msg.sender];

         for(uint256 i =0; i< userMessageList.length; i++){

            if(userMessageList[i].userId == _messageId){
                userMessageList[i].deleted = !userMessageList[i].deleted;
                userMessageList[i].deletionTimeStamp = block.timestamp;
                break;
            }

            
         }

    }

    function editTask(uint _messageId, string calldata _messsage) public  {
        require(_messageId < toDoListApps[msg.sender].length, "Message not found");
        

        // ToDoListApp storage userMessage = toDoListApps[msg.sender][_messageId];
        // require(!userMessage.deleted, "Cannot edit a deleted message");

        // userMessage.message = _messsage;
        // userMessage.edited = true;


        ToDoListApp[] storage userTodoList = toDoListApps[msg.sender];

        for(uint256 i =0; i <userTodoList.length; i++){

            if(userTodoList[i].userId == _messageId){
                 userTodoList[i].message = _messsage;
                 userTodoList[i].edited = true;
                 break;
            }
        }
    }

    function getActiveTodos() public view returns (ToDoListApp[] memory) {
        ToDoListApp[] storage userTodos = toDoListApps[msg.sender];

        uint256 activeCount = 0;
        for (uint i = 0; i < userTodos.length; i++) {
            if (!userTodos[i].deleted) {
                activeCount++;
            }
        }

        ToDoListApp[] memory activeTodos = new ToDoListApp[](activeCount);
        uint256 index = 0;

        for (uint i = 0; i < userTodos.length; i++) {
            if (!userTodos[i].deleted) {
                activeTodos[index] = userTodos[i];
                index++;
            }
        }

        return activeTodos;
    }

    function getAllDeletedTodos() public view returns (ToDoListApp[] memory) {
        ToDoListApp[] memory todoList = toDoListApps[msg.sender];

        uint256 count = 0;
        for (uint256 index = 0; index < todoList.length; index++) {
            if (todoList[index].deleted) {
                count++;
            }
        }

        ToDoListApp[] memory newDeletedTodoList = new ToDoListApp[](count);
        uint256 newIndex = 0;

        for (uint256 i = 0; i < todoList.length; i++) {
            if (todoList[i].deleted) {
                newDeletedTodoList[newIndex] = todoList[i];
                newIndex++;
            }
        }

        return newDeletedTodoList;
    }

    function toggleDone(uint256 _messageId) public {
        require(_messageId < toDoListApps[msg.sender].length, "Message not found");

        // ToDoListApp storage userMessage = toDoListApps[msg.sender][_messageId];
        // require(!userMessage.deleted, "Cannot toggle done a deleted message");

        // userMessage.completed = !userMessage.completed;

        // if(userMessage.completed){
        //     userMessage.completionTimeStamp = block.timestamp;
        // }

        ToDoListApp[] storage userMessage = toDoListApps[msg.sender];
        
        for (uint256 i = 0; i < userMessage.length; i++) 
        {
            if(userMessage[i].userId == _messageId){
                userMessage[i].completed = !userMessage[i].completed;
                 userMessage[i].completionTimeStamp = block.timestamp;

            }
        }



    }
}