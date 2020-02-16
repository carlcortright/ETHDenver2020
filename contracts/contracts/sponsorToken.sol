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
   	uint256 private interestRate;

    uint256 private fundraiseStartTime;
    uint256 private fundraiseEndTime;

    uint256 private openLoanStartTime;

   	address private recipient;

    ERC20Token contractUSDC;

   	// Fundraise states
   	enum States { Fundraising, OpenLoan, ConvertLoan, ClosedLoan }

   	// Current state
   	States currentState;
   	// How much USDC the contract owns (through contract interaction, no transfers)
    uint256 contractBalanceUSDC;
    // Total USDC that was loaned at end of Fundraising/ start of OpenLoan
   	uint256 startLoanBalanceUSDC;
   	// Total USDC that was paid by recipient at end of OpenLoan/ start of ConvertLoan
   	uint256 totalLoanPayment;

   	mapping (address => uint256) private contributedUSDC;
   	address[] lenders;

    constructor(
    	string memory _name,
    	string memory _symbol,
    	uint8 _decimals,
    	uint256 _fundraiseAmount,
    	uint256 _interestRate,
    	uint256 _fundraiseEndTime,
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
      fundraiseAmount = _fundraiseAmount;
      interestRate = _interestRate;
      contractUSDC = ERC20Token(_addressUSDC);
      recipient = _recipient;

      // Start time of fundraiser is unix time of block
      fundraiseStartTime = now;
      fundraiseEndTime = _fundraiseEndTime;

      // Init state
      currentState = States.Fundraising;
   	}
    
    ///*******************///
    ///  Getter methods   ///
    ///*******************///

    function getFundraiseAmount() public view returns (uint256) {
    	return fundraiseAmount;
    }

	function getInterestRate() public view returns (uint256) {
    	return interestRate;
    }

    function getContractBalanceUSDC() public view returns (uint256) {
    	return contractBalanceUSDC;
    }

    function getEndTimeFundraiser() public view returns (uint256) {
    	return fundraiseEndTime;
    }

    function getStartTimeFundraiser() public view returns (uint256) {
    	return fundraiseStartTime;
    }

    function getStartTimeOpenLoan() public view returns (uint256) {
        return openLoanStartTime;
    }

    function getTotalLoanPayment() public view returns (uint256) {
    	return totalLoanPayment;
    }

    function getCurrentContribution(address lender) public view returns (uint256) {
    	return contributedUSDC[lender];
    }
    
    function getLoanState() public view returns (States){
    	return currentState;
    }
    ///************************///
    ///    State Transitions   ///
    ///************************///
    function enoughFundsRaised() private view returns (bool) {
        return (contractBalanceUSDC >= fundraiseAmount);
    }

    function isFundraiseOver() private view returns (bool) {
        return (now >= fundraiseEndTime);
    }
    
    function isLoanRepaid() private view returns (bool) {
        return (contractBalanceUSDC >= calcLoanRepayment());
    }

    function allSponsorTokensReturned() private view returns (bool) {
    	return (balanceOf(address(this)) == totalSupply());
    }

    ///*************************///
    ///  Token Moving Methods   ///
    ///*************************///

    // Function for a lender to contribute USDC to fundraiser
    function contribute(uint256 amount) public returns (bool) {
        require (currentState == States.Fundraising);
        require (amount + contractBalanceUSDC <= fundraiseAmount);

        if (isFundraiseOver()) {
        	// Fundraise failed, returned USDC to original lenders
      	    returnContributions();

            currentState = States.ClosedLoan;
        }

        // TransferFrom USDC amount into contract address
        contractUSDC.transferFrom(msg.sender, address(this), amount);

        lenders.push(msg.sender);
        // Default value for mapping value uint is 0, so no need to check if value exists or not
        contributedUSDC[msg.sender] += amount;
        contractBalanceUSDC += amount;

        if (enoughFundsRaised()) {
        	// Set total amount of USDC funds raised
        	startLoanBalanceUSDC = contractBalanceUSDC;
        	kickOffLoan();

      	    currentState = States.OpenLoan;
        }
        
        return true;
    }

    // In case of failed fundraise return funds to lenders
    function returnContributions() private {
    	require (currentState == States.Fundraising);
        uint i;
    	for(i = 0; i < lenders.length; i++){
    		contractUSDC.transfer(lenders[i], contributedUSDC[lenders[i]]);
    		contractBalanceUSDC -= contributedUSDC[lenders[i]];
    	}

    	require (contractBalanceUSDC == 0);
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
    	contractUSDC.transfer(recipient, contractBalanceUSDC);
    	contractBalanceUSDC = 0;

    	openLoanStartTime = now;
    }

    function payLoan(uint256 amount) private {
    	require (currentState == States.OpenLoan);
    	// Only allow recipient to payback loan
    	require (msg.sender == recipient);

		contractUSDC.transferFrom(address(this), msg.sender, amount);
		contractBalanceUSDC += 0;

		if (isLoanRepaid()) {
			// Set total amount of USDC paid back
			totalLoanPayment = contractBalanceUSDC;

			currentState = States.ConvertLoan;
		}
    }

    function convertSponsorToken(uint256 amount) private {
    	require (currentState == States.ConvertLoan);
    	require (contractBalanceUSDC >= amount);

    	// Pull sponsor tokens from sender
        transferFrom(msg.sender, address(this), amount);

        // Calculate equivalent amount of USDC and send to original sender
        uint256 toSendUSDC = amount * sponsorTokenToUSDC();
        contractUSDC.transfer(msg.sender, toSendUSDC);

        contractBalanceUSDC -= toSendUSDC;

        if (allSponsorTokensReturned()) {
			currentState = States.ClosedLoan;
		}
    }

    function sponsorTokenToUSDC() public view returns (uint256) {
    	return totalLoanPayment / totalSupply();
    }

    function checkUSDCAccounting() private returns (bool) {
    	uint256 totalInternalUSDC = 0;
    	uint i;
    	for(i = 0; i < lenders.length; i++){
    		totalInternalUSDC += contributedUSDC[lenders[i]];
    	}
    	return ((totalInternalUSDC == contractBalanceUSDC) && (contractBalanceUSDC >= contractUSDC.balanceOf(address(this))));
    }

    function calcLoanInterest() private view returns (uint256) {
        uint timeElapsedSeconds = now - openLoanStartTime;
        // Number of years calculated as timeElapsed in seconds / 1 years worth of seconds (31622400)
        return fundraiseAmount * (1 + (interestRate / 10000)) ** (timeElapsedSeconds / 31622400);
    }

    function calcLoanRepayment() private view returns (uint256) {
    	return startLoanBalanceUSDC + calcLoanInterest();
    }

}