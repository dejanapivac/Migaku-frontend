pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract TipAttendantsContract {
    event TipTransferred(Tip[] tips);
    event TipSent(Tip tip);

    Tip[] tips;

    struct Tip {
        address payable wallet;
        uint tip;
    }

    function sendTips(Tip[] memory tipsArray) public {
         for(uint i=0; i < tipsArray.length; i++){
            tips.push(tipsArray[i]);
        }
        emit TipTransferred(tips);
    }

    function receiveTip() public payable {
        uint amount = findTipAmount();

        payable(msg.sender).transfer(amount);
        emit TipSent(Tip(payable(msg.sender), amount));
    }

    function findTipAmount() public view returns (uint) {
    for (uint i = 0; i < tips.length; i++) {
        if (tips[i].wallet == msg.sender) {
            return tips[i].tip;
        }
    }
    return 0;
    }

    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {   emit Received(msg.sender, msg.value); }

}
