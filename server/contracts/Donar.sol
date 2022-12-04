// SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Donar is ERC20 {

    /**
     * @title The Donar Contract
     * @author Okhamena Azeez and Daniel Nwangwu
     * @dev The contract allows you to donate to the Ngo and the donor receives the native token of the Donar contract which is DON
     * @notice This also uses the ERC-20 Token Implementation from openZeppelin Contracts
     */

    /** Errors that indicates failed access or Transactions */
    error Donar__NeedMoreMaticSent();
    error Donar__InvalidAddress();
    error Donar__onlyOwner();
    error Donar__CannotDonateToYourSelf();
    error Donar__NgoCannotBeDonor();
    error Donar__InsuffientsFunds();
    error Donar__InvalidAmount();
    error Donar__NgoAlreadyRegistered();
    error Donar__FieldCannotBeEmpty();
    error Donar__NgoHaveNotRegistered();
    

     /**Array that Tracks the number of Ngo and Donors we have */
    // address[] private s_donorsList;
    // address[] private s_ngoList;
    address[] private s_ngoList;
    address[] private s_donorsList;
    address[] public s_CheckList;

    /**This is the array that tracks the list of successful transaction and it's Details */
    donorDetails[] private s_donorDetailsList;

       /** State Variables */
    uint256 private immutable i_ngoRegistrationFee;
    address private immutable i_owner;
    uint256 private interestRate;
    uint256 private donorId;
    uint256 private _NumberOfDonationsMade;
    
    /** 
     * @dev 1.The event emitted when a donation is made
     *       owner == msg.sender
     *       ngo  == address of the Ngo,
     *       profitMade == amount of profitMade by the Donar company
     *       amountDonatedToNgo == amount sent to the Ngo from the donations made by the donor
     */
    event DonationMade(
        address indexed owner,
        address indexed ngo,
        uint256 profitMade,
        uint256 amountDonatedToNgo
    );
    
    /**
     * @dev 1. The events emitted when a Ngo makes donations to the address that needs help
     *      ngo == address of the Ngo
     *      amount == donated to the ngo
     *      to == address that wants help
     */
    event NgoDonatedToHelpMe(
        address indexed ngo,
        uint256 amount,
        address indexed to
    );

    /**
     * @dev This is the Event emmited when the Donar Company withdra amount specified by the company
     * donarCompany == i_owner
     */
    event DonarProfiWithDrawn(address indexed donarCompany);

    /** Mappings */
    mapping(address => uint256) private _totalAccumulatedDonorFund;
    mapping(address => uint256) private _donorProfit;
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _checkIfIhaveDonatedBefore;
    mapping(address => donorDetails) private individualDonorToDetail;
    mapping(uint256 => address) private _donorIdToAddress;
    mapping(address => uint256) private _addressToDonorId;
    mapping(address => uint256) private _addressToDonorAmount;
    mapping(address => NgoDetails) private NgoDetailsMapping;
    mapping(address => bool) public _ngoVerificationStatus;

    /**
     * @dev This is the datatype that hold the donorDetails after a donation has been made
     */
    struct donorDetails {
        address donor;
        uint256 amountDonated;
        uint256 profitGained;
    }

    /**
     * @dev This is the datatype that hold the ngo details
     */
    struct NgoDetails {
        address ngo;
        string name;
        string description;
        uint256 donationsRecieved;
    }
    /**
     * @dev This is the modifier that restrict some to actions to only the deployer of the smart contract
     */
    modifier onlyOwner() {
        if (i_owner != msg.sender) {
            revert Donar__onlyOwner();
        }
        _;
    }
/**
 * @dev This is the first function that is run immediately a smart contract is deployed
 * @notice  Anything set in the constructor is the initial state of the smart contract  
 * _name == Name of the ERC-20 tokens
 * _symbol == Symbol of the ERC-20 tokens
 * acceptedNgoRegisterationFee = This is the least amount accepted for donations by the Donar contract, it can be set dynamically
 */
    constructor(
        uint256 acceptedNgoRegisterationFee,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        i_ngoRegistrationFee = acceptedNgoRegisterationFee;
        i_owner = msg.sender;
    }

    /**
    * @dev This function registers a new ngo
    */
    function registerNgo(address _address, string memory _name , string memory _description) public onlyOwner {
        for (uint i = 0; i < s_ngoList.length; i++) {
            if (s_ngoList[i] == _address) {
                revert Donar__NgoAlreadyRegistered();
            }
        }


        if(_address == address(0)){
            revert Donar__InvalidAddress();
        }
        if(bytes(_name).length <= 0  || bytes(_description).length <= 0){
            revert Donar__FieldCannotBeEmpty();
        }
        NgoDetails memory newNgo = NgoDetails(_address, _name, _description, 0);
        NgoDetailsMapping[_address] = newNgo;
        s_ngoList.push(_address);
        _ngoVerificationStatus[_address] = true;
    }

    /**
    * @dev This function gets registered ngo details of a particular ngo address
    * @param -Takes an ngo address 
    * @return - returns registered attributes of the ngo
    */
    function getNgoDetails(address _address) public view returns (address, string memory, string memory, uint256) {
        return (NgoDetailsMapping[_address].ngo, NgoDetailsMapping[_address].name, NgoDetailsMapping[_address].description, NgoDetailsMapping[_address].donationsRecieved);
    }

    /**
    * @dev This function gets all registered ngo addresses
    * @return - addresses of all registered ngos
    */
    function getNgoList() public view returns (address[] memory) {
        return s_ngoList;
    }

    /**
    * @dev This function gets all donors addresses
    * @return - addresses of all  donors that have donated
    */
    function getDonorsList() public view returns (address[] memory) {
    return s_donorsList;
    }

    

   /**
    * @dev 1.This function is used to verify if an address in the donor list is the  address performing the donate function
    * @return Returns the index of the array if the cndition is true
    */
   /**
    * @dev This function allows you to make donations to an Ngo
    * @notice ---- conditions to check before a donation is made ------
    *         1. if any address in the donor list is the address of the ngo , it will revert
    *         2. if msg.sender   == 0x0000000000000000000000000000000000000000, it will revert
    *         3. if address of ngo == 0x0000000000000000000000000000000000000000, it will revert
    *         4. if the address of msg.sender  == address of the ngo, it will revert
    *         5. if the amount specified to be donated is lesser than the i_ngoRegistrationFee, it will revert
    *@notice  ------- What happens after a donation is made by the donor ------
    *               1. The address of the donor get pushed into the donor array
    *               2.  The address of the ngo get pushed to the ngo array
    *               3. The donar Dao takes 10% of the donations and send the remaining to the Ngo
    *               4. The Donar token is minted to the donor depending on how many percent is taken by the Donar contract        
    *              5. The msg.sender donation status is set to true 
    *         
    */
    function donate(address _toNgo) public payable {
        uint256 profitMade = ((10 * msg.value) / 100);
        interestRate += profitMade;


        
        

        for (uint256 i = 0; i < s_donorsList.length; i++) {
            if (s_donorsList[i] == _toNgo) {
                revert Donar__NgoCannotBeDonor();
            }
        }

         
            //10,"Donar","Don"
             //10,"Donar","Don"
        // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"k","k"
        
         if(!_ngoVerificationStatus[_toNgo]){
             revert Donar__NgoHaveNotRegistered();
         }
        

       

        

        //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        //10,"Donar","Don"
        // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"k","k"

        // uint256 deleteIndex = getReturnSameAddress();

        s_donorsList.push(msg.sender);

        // delete s_donorsList[deleteIndex];
        // delete s_ngoList[deleteIndex];

        uint256 amountToTransferToNgo = (msg.value - profitMade);
        if (msg.sender == address(0)) {
            revert Donar__InvalidAddress();
        }

        if (msg.sender == _toNgo) {
            revert Donar__CannotDonateToYourSelf();
        }

        if (_toNgo == address(0)) {
            revert Donar__InvalidAddress();
        }

        if (msg.value < i_ngoRegistrationFee) {
            revert Donar__NeedMoreMaticSent();
        }

        //10,"Donar","Don"

        donorId++;
        _donorIdToAddress[donorId] = msg.sender;
        _mint(msg.sender, (profitMade * 10**decimals()));
        _addressToDonorAmount[msg.sender] += msg.value;
        _addressToDonorId[msg.sender] = donorId;
        _donorProfit[msg.sender] += (profitMade * 10**decimals());
        _balances[_toNgo] += amountToTransferToNgo;
        _totalAccumulatedDonorFund[msg.sender] += (msg.value +
            (profitMade * 10**decimals()));
        _checkIfIhaveDonatedBefore[msg.sender] = true;

        individualDonorToDetail[msg.sender] = donorDetails(
            msg.sender,
            msg.value,
            profitMade
        );

        s_donorDetailsList.push(
            donorDetails(msg.sender, msg.value, profitMade)
        );
        require(_toNgo != address(0), "please use a valid address");
        (bool sucess, ) = payable(_toNgo).call{value: amountToTransferToNgo}(
            ""
        );
        require(sucess, "Transaction failed to execute");
        _NumberOfDonationsMade++;

        emit DonationMade(
            msg.sender,
            _toNgo,
            profitMade,
            amountToTransferToNgo
        );
    }

    /**
     * @dev This function get all transcation Records
     * @param  --------empty----------
     * @return The total list of transactionRecords
     */
    function getTransactionRecordsOfDonor()
        public
        view
        returns (donorDetails[] memory)
    {
        return s_donorDetailsList;
    }

   /**
    * @dev This function get the contract balance
    * @notice - This function can only be performed by the deployer of the smart contract
    * @param ------------------empty--------------
    * @return The balance of the Donar Smart Contract
    */
    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

   /**
    * @dev This function get the balance of Ngo and address to receive help
    * @param -Takes the address of the Ngo || or the address of the beneficairy from the ngo
    * @notice - address used to query on-Chain cannot be a zero address
    * @return The balance of the ngo or the ngo beneficiary
    */
    function getBalance(address owner) public view returns (uint256) {
        require(owner != address(0), "please use a valid address");
        return _balances[owner];
    }

    /**
    * @dev This function get the recent donations made by a donor
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return -The recent transaction made by the donor
    */
    function getDonorRecentTransaction(address owner)
        public
        view
        returns (donorDetails memory)
    {
        require(owner != address(0), "please use a valid address");
        return individualDonorToDetail[owner];
    }
    
    
    /**
    * @dev This function get the donation made by a donor and how much profit has been added
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return -The donation made by a donor and how much profit has been added
    */
    function getAmountDonarHasDonatedPlusProfit(address owner)
        public
        view
        returns (uint256)
    {
        require(owner != address(0), "please use a valid address");
        return _totalAccumulatedDonorFund[owner];
    }

      /**
    * @dev This function get the number of donors that exist 
    * @param  ---------------empty--------------------
    * @notice - a donor can exist multiple time in the array , and it can only be performed by the owner of the contract
    * @return -The number of donors that exist
    */
    function HowManyDonorExist() public view onlyOwner returns (uint256) {
        return s_donorsList.length;
    }
    /**
    * @dev This function get the donation status of a donor
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address 
    * @return - if the donor has donated before  donation status ? == true : false 
    */
    function checkIfIhaveDonatedBefore(address owner)
        public
        view
        returns (bool)
    {
        require(owner != address(0), "please use a valid address");
        return _checkIfIhaveDonatedBefore[owner];
    }
    /**
    * @dev This function get strictly the donor profit after a donations has been made
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return -The profit made by the donor, which will eventually be used to mint Donar Tokens
    */
    function checkDonorProfit(address owner) public view returns (uint256) {
        require(owner != address(0), "please use a valid address");
        return _donorProfit[owner];
    }
    
   /**
    * @dev This function get the profit accumulated by the Donar Company
    * @notice - 1. This function can only be performed by the deployer of the smart contract
    *           2. This function has the same implementation as getContractBalnce() function
    * @param ------------------empty--------------
    * @return The Profit acummulated by the Donar contract
    */
    function getDonarTotalProfit() public view onlyOwner returns (uint256) {
        return interestRate;
    }
     /**
    * @dev This function get the address present at a specified Id
    * @param -Takes the Id of the donor 
    * @return - The address present at a specified Id
    */
    function getDonorAddress(uint256 _Id)
        public
        view
        onlyOwner
        returns (address)
    {
        return _donorIdToAddress[_Id];
    }
    
      /**
    * @dev This function get the id present at a specified address
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return - The Id present at a specified address
    */
    function getDonorId(address owner) public view onlyOwner returns (uint256) {
        require(owner != address(0), "please use a valid address");
        return _addressToDonorId[owner];
    }
     
      /**
    * @dev This function get Number of donations that have been made
    * @param  --------------empty---------------------
    * @return - The Number of donations that have been made
    */
    function getNumberOfDonationSentToNgo() public view returns (uint256) {
        return _NumberOfDonationsMade;
    }
    
    /**
    * @dev This function get the number of Ngo that exist
    * @param   --------------empty---------------------
    * @return - The Number of Ngo that exists
    */
    function HowManyNgoExist() public view onlyOwner returns (uint256) {
        return s_ngoList.length;
    }
   
     /**
    * @dev This function get strictly the amount that has been donated by donor
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return - strictly the amount that has been donated by donor
    */
    function getDonorToAmountDonated(address owner)
        public
        view
        returns (uint256)
    {
        require(owner != address(0), "please use a valid address");
        return _addressToDonorAmount[owner];
    }

    /**
    * @dev This function get the number of donations made by donors
    * @param   --------------empty---------------------
    * @return - The Number of donations made by donor
    */
    function getNumberOfDonationsByDonorMade()
        public
        view
        onlyOwner
        returns (uint256)
    {
        return _NumberOfDonationsMade;
    }

    function NgoSendToHelpNeeded(
        address _ngo,
        uint256 amount,
        address _to
    ) public {
        if (_ngo == address(0)) {
            revert Donar__InvalidAddress();
        }

        if (amount <= 0) {
            revert Donar__InvalidAmount();
        }

        if (getBalance(_ngo) < amount) {
            revert Donar__InsuffientsFunds();
        }
        if (_to == address(0)) {
            revert Donar__InvalidAddress();
        }

        if (_to == _ngo) {
            revert Donar__InvalidAddress();
        }

        for (uint256 i = 0; i < s_donorsList.length; i++) {
            if (
                s_donorsList[i] == _ngo ||
                s_donorsList[i] == _to
            ) {
                revert Donar__InvalidAddress();
            }
        }

        for (uint256 i = 0; i < s_ngoList.length; i++) {
            if (s_ngoList[i] == _to) {
                revert Donar__InvalidAddress();
            }
        }
        if (allowDonationToNgo(_ngo)) {
            _balances[_ngo] -= amount;
            _balances[_to] += amount;
        }
        emit NgoDonatedToHelpMe(_ngo, amount, _to);
    }


       /**
    * @dev This function show the logic that allows withdrawal
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address can only be performed by the deployer of the contract
    * @return - Returns true if ngo exist in the lsit , returns false if Ngo does not exist in the list
    */
    function allowDonationToNgo(address _ngo) public onlyOwner view returns (bool) {
        for (uint256 i = 0; i < s_ngoList.length; i++) {
            if (s_ngoList[i] == _ngo) {
                return true;
            }
        }
        return false;
    }
    
       /**
    * @dev This function get number of donar tokens a donor has
    * @param -Takes the address of the donor
    * @notice - address used to query on-Chain cannot be a zero address
    * @return - number of donar tokens a donor has
    */
    function getHowManyDonarTokensYouHave(address owner)
        public
        view
        returns (uint256)
    {
        require(owner != address(0), "please use a valid address");
        uint256 TokenWorth = balanceOf(owner);
        uint256 decimalNumber = decimals();
        uint256 numberOfToken = ((TokenWorth * 1) / 10**decimalNumber);
        return numberOfToken;
    }

     /**
    * @dev This function get the least donation fee to be donated to Ngo
    * @param   --------------empty---------------------
    * @return - The least donation fee to be donated to Ngo 
    */
    function getDonorLeastFee() public view  returns (uint256) {
        return i_ngoRegistrationFee;
    }
   
       /**
    * @dev This function get the deployer address 
    * @param   --------------empty---------------------
    * @return - The deployer address 
    */
    function getDonarOwner() public view onlyOwner returns (address) {
        return i_owner;
    }
    

    // /** 
    // * 
    // * @dev This function allows The Donar company to withdraw from it funds
    // * @param -Takes the amount to be withdrawn
    // * @notice  ---------------conditions to satisfy before withdrawal by Donar Company-----------
    // *              1. amount specified to be withdrawn must not be lesser than or equal to zero
    // *              2. amount specified to be withdraw must not be greater than the contract balance
    // */
    function withdrawDonarProfitByCompany(uint256 amount) public onlyOwner {
        if(amount <= 0  || amount > address(this).balance){
            revert Donar__InsuffientsFunds();
        }
        require(i_owner != address(0), "please use a valid address");
        (bool sucess, ) = payable(i_owner).call{value: amount}(
            ""
        );
        require(sucess, "Transaction failed to execute");
        emit DonarProfiWithDrawn(i_owner);
    }


      /**
    * @dev This function get address at a particular position in the donor array
    * @param -Takes a position of the in the array 
    * @return - address at a particular position in the Donor array
    */
    function getDonorPositionInTheArray(uint256 _i) public view  returns (address) {
        return s_donorsList[_i];
    }

      /**
    * @dev This function get address at a particular position in the Ngo array
    * @param -Takes a position of the in the array 
    * @return - address at a particular position in the Ngo array
    */
    function getNgoPositionInTheArray(uint256 _i) public view  returns (address) {
        return s_ngoList[_i];
    }

    function getNgoVerificationStatus(address owner) public view returns(bool){
        require(owner != address(0), "please use a valid address");
        return _ngoVerificationStatus[owner];
    }




    //717000000000000wei   1 matic in wei
    //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    // 10,"Donar","Don"
    // Ngo1.address,"feed","i feed people"
}
