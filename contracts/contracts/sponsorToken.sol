pragma solidity ^0.5.0;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
 
contract SponsorToken is ERC20, ERC20Mintable, ERC20Detailed{
	// Metadata about fundraise
    uint256 private fundraiseAmount;
    uint8 private fundraiseLength;
   	uint8 private interestRate;
   	string private description;
   	address private recipient;

   	// Fundraise states
   	enum States { Fundraising, OpenLoan, ConvertLoan, ClosedLoan };

   	// Current state
   	States currentState;
   	uint256 balanceUSDC;
   	mapping (address => uint256) private balancesUSDC;


    constructor(
    	string _name,
    	string _symbol,
    	uint8 _decimals,
    	uint256 _fundraiseAmount,
    	uint8 _fundraiseLength,
    	uint8 _interestRate,
    	string _description
    ) 
    	ERC20Detailed(
    		_name,
    		_symbol,
    		_decimals
    	) 
    	public 
    { 
      // Set metadata
      description = _description
      fundraiseAmount = _fundraiseAmount
      fundraiseLength = _fundraiseLength
      interestRate = _interestRate

      // Address that creates contract is recipient
      recipient = msg.sender

      // Init state
      currentState = States.Fundraising
      balanceUSDC = 0
   	}
    
    function fundraiseAmount() public view returns (uint8) {
    	return fundraiseAmount
    }

	function fundraiseLength() public view returns (uint8) {
    	return fundraiseLength
    }

	function interestRate() public view returns (uint8) {
    	return interestRate
    }

    function description() public view returns (string memory) {
        return description;
    }
    
    // Function for a lender to contribute USDC to fundraiser
    function contribute() public view returns (bool) {
      // Get current amount raised
      // Compare sum of contribution + currount amount raised vs fundraiseAmount
      // If sum > fundraiseAmount, fail tx
      // Else accept USDC, add to total amount, add USDC to mapping

      // If fundraiseAmount is reached, transition into OpenLoan state????
    }
    
    // Public function for anyone to update state based on contract funds
    // Returns true of state changed, false if state remains the same
    // Should we return the state?
    function changeState() public returns (bool) {
    	if (currentState == States.Fundraising) {
          if (balanceUSDC >= fundraiseAmount) {
          	currentState = States.OpenLoan;

          	return true;
          }
          if (isFundraiseOver()) {
          	// Return contributions
            currentState = States.ClosedLoan;

            return true;
          }
    	} else if (currentState == States.OpenLoan) {
    		// Check if enough USDC has been deposited into contract to begin converts
    	} else if (currentState == States.ConvertLoan) {
    		// Check if all the sponsor tokens have been returned to contract
    	} else { // state is closed

    		return false;
    	}

    	return false;
    }

    function isFundraiseOver() private returns (bool) {

    }
    
    // In case of failed fundraise return funds to lenders
    function returnContributions() private returns (bool) {

    }

}