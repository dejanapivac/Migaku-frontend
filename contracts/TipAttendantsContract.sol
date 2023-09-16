pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract TipAttendantsContract {
    Tip[] tips;

    struct Tip {
        address payable wallet;
        uint tip;
    }

    function sendTips(Tip[] memory tipsArray) public payable {
         for(uint i=0; i < tipsArray.length; i++){
            tips.push(tipsArray[i]);
        }
    }

    function receiveTip() public payable {
        uint amount = findTipAmount();  
    
        (bool success, ) = payable(msg.sender).call{
            value: amount  * 10**18
        }("");
        require(success, "Failed to send tip");
    }

    function findTipAmount() public returns (uint) {
        for (uint i = 0; i < tips.length; i++) {
            if (tips[i].wallet == msg.sender) {
                uint amount = tips[i].tip;
                delete tips[i];
                return amount;
            }
         }
        return 0;
    }

}
