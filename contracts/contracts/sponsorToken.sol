pragma solidity ^0.5.0;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
 
contract SponsorToken is ERC20, ERC20Mintable, ERC20Detailed{
	// Metadata about fundraise
    uint8 private fundraiseAmount
    uint8 private fundraiseLength
   	uint8 private interestRate
   	string private description

   	// Fundraise states
   	enum States { Fundraising, OpenLoan, ConvertLoan, ClosedLoan }

    constructor(
    	string _name,
    	string _symbol,
    	uint8 _decimals,
    	uint8 _fundraiseAmount,
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
      description = _description
      fundraiseAmount = _fundraiseAmount
      fundraiseLength = _fundraiseLength
      interestRate = _interestRate
   	}

}