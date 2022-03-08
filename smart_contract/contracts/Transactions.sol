//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {
    //type unassigned integer 256 bits in size
   uint256 transactionCount; 


     event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

     //create a structure

     struct TransferStruct {
     address sender;
     address receiver;
     uint amount;
     string message;
     uint256 timestamp;
     string keyword;   
     }

    // let transactions = an array of type TransferStruct
     TransferStruct[] transactions;

     function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public {
         transactionCount += 1;
         transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
         //make the transfeer
         emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
     }

     function getAllTransactions() public view returns (TransferStruct[] memory) {
                return transactions;
     }

     function getTransactionCount() public view returns (uint256) {
            return transactionCount;
     }

}