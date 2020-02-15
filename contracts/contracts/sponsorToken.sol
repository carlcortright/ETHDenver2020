pragma solidity ^0.5.0;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

// For USDC Token contract
contract ERC20Token {
  function transferFrom(address from, address to, uint value) public;
  function transfer(address recipient, uint256 amount) public;
  function balanceOf(address account) public returns (uint256);
}
 
contract SponsorToken is ERC20, ERC20Mintable, ERC20Detailed{
	// Metadata about fundraise
    uint256 private fundraiseAmount;
   	uint8 private interestRate;

    uint256 private fundraiseStartTime;
    uint256 private fundraiseEndTime;
    uint256 private fundraiseLength;

    uint256 private openLoanStartTime;

   	string private description;
   	address private recipient;

    ERC20Token contractUSDC;


   	// Fundraise states
   	enum States { Fundraising, OpenLoan, ConvertLoan, ClosedLoan }

   	// Current state
   	States currentState;
   	uint256 startLoanBalanceUSDC;
   	mapping (address => uint256) private contributedUSDC;
   	address[] lenders;


    constructor(
    	string memory _name,
    	string memory _symbol,
    	uint8 _decimals,
    	uint256 _fundraiseAmount,
    	uint8 _interestRate,
    	uint256 _fundraiseLength,
    	string memory _description,
    	address _addressUSDC,
    	address _recipient
    ) 
    	ERC20Detailed(
    		_name,
    		_symbol,
    		_decimals
    	) 
    	public 
    { 
      // Set metadata
      description = _description;
      fundraiseAmount = _fundraiseAmount;
      interestRate = _interestRate;
      contractUSDC = ERC20Token(_addressUSDC);

      // Start time of fundraiser is unix time of block
      // End time is start + length of fundraise
      fundraiseStartTime = now;
      fundraiseLength = _fundraiseLength;
      fundraiseEndTime = fundraiseStartTime + fundraiseLength;

      // Address that creates contract is recipient
      recipient = _recipient;

      // Init state
      currentState = States.Fundraising;
      startLoanBalanceUSDC = 0;
   	}
    
    // Getter methods
    function getFundraiseAmount() public view returns (uint256) {
    	return fundraiseAmount;
    }

	function getFundraiseLength() public view returns (uint256) {
    	return fundraiseLength;
    }

	function getInterestRate() public view returns (uint256) {
    	return interestRate;
    }

    function getDescription() public view returns (string memory) {
        return description;
    }
    
    // Checks for state transitions
    function enoughFundsRaised() private returns (bool) {
        return (contractUSDC.balanceOf(address(this)) >= fundraiseAmount);
    }

    function isFundraiseOver() private view returns (bool) {
        return (now >= fundraiseEndTime);
    }
    
    function loanRepaid() private returns (bool) {
        return (contractUSDC.balanceOf(address(this)) >= calcLoanRepayment());
    }

    function allSponsorTokensReturned() private returns (bool) {
    	return (balanceOf(address(this)) == totalSupply());
    }
    
    // Public function for anyone to update state based on contract funds
    // Returns true of state changed, false if state remains the same
    // Should we return the state?
    function changeState() public returns (bool) {
    	if (currentState == States.Fundraising) {
            if (enoughFundsRaised()) {
            	startLoanBalanceUSDC = contractUSDC.balanceOf(address(this));
            	kickOffLoan();
          	    currentState = States.OpenLoan;

          	    return true;
            }
            if (isFundraiseOver()) {
          	    returnContributions();
                currentState = States.ClosedLoan;

                return true;
            }
    	} else if (currentState == States.OpenLoan) {
    		// Check if enough USDC has been deposited into contract to begin converts
    		if (loanRepaid()) {
    			currentState = States.ConvertLoan;

    			return true;
    		}
    	} else if (currentState == States.ConvertLoan) {
    		// Check if all the sponsor tokens have been returned to contract
    		if (allSponsorTokensReturned()) {
    			currentState = States.ClosedLoan;

    			return true;
    		}
    	} else { 
    		// state is closed, nothing actionable
    		return false;
    	}

    	return false;
    }

    // Function for a lender to contribute USDC to fundraiser
    function contribute(uint256 amount) public returns (bool) {
        require (currentState == States.Fundraising);
        require (amount + contractUSDC.balanceOf(address(this)) <= fundraiseAmount);

        // TransferFrom USDC amount into contract address
        contractUSDC.transferFrom(msg.sender, address(this), amount);

        lenders.push(msg.sender);
        // Default value for mapping value uint is 0, so no need to check if value exists or not
        contributedUSDC[msg.sender] += amount;

        return true;
    }

    function kickOffLoan() private {
    	require (currentState == States.Fundraising);
        require (checkUSDCAccounting());

        // Mint tokens to each lender equivalent to amount of USDC they put in
      	uint i;
    	for(i = 0; i < lenders.length; i++){
    		mint(lenders[i], contributedUSDC[lenders[i]]);
    	}
    	// TODO: Turn off minting here

    	// Send USDC Loan to recipient
    	contractUSDC.transfer(recipient, contractUSDC.balanceOf(address(this)));

    	openLoanStartTime = now;
    }

    function checkUSDCAccounting() private returns (bool) {
    	uint256 totalInternalUSDC = 0;
    	uint i;
    	for(i = 0; i < lenders.length; i++){
    		totalInternalUSDC += contributedUSDC[lenders[i]];
    	}
    	return (totalInternalUSDC == contractUSDC.balanceOf(address(this)));
    }

    // TODO
    function calcLoanInterest() private returns (uint256) {
        return 0;
    }

    function calcLoanRepayment() private returns (uint256) {
    	return startLoanBalanceUSDC + calcLoanInterest();
    }
    
    // In case of failed fundraise return funds to lenders
    function returnContributions() private {
    	require (currentState == States.Fundraising);
        uint i;
    	for(i = 0; i < lenders.length; i++){
    		contractUSDC.transfer(lenders[i], contributedUSDC[lenders[i]]);
    	}
    }

}