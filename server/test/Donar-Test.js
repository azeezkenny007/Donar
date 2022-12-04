const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("Donar",()=>{
      const Symbol ="Don"
      const Name ="Donar"
      const LeastAmountToDonate = 10
      let DonarFactory,Donar,deployer,Ngo1,Ngo2,Ngo3,HelpMe1,HelpMe2,zeroAddress,DonorLeastFee
     beforeEach(async()=>{
       DonarFactory = await ethers.getContractFactory("Donar")
       Donar = await DonarFactory.deploy(LeastAmountToDonate,Name,Symbol)
       await Donar.deployed();
       DonorLeastFee = await Donar.getDonorLeastFee();
      [deployer,Ngo1,Ngo2,Ngo3,HelpMe1,HelpMe2] = await ethers.getSigners(); 
      zeroAddress = "0x0000000000000000000000000000000000000000"
     })

   describe("Constructor",()=>{
      it("check the least amount to donate is the money set",async()=>{
       const expectedValue = await Donar.getDonorLeastFee()
       assert.equal(expectedValue.toString(),10)
     })
      
     it("check the name set is equal token name",async()=>{
         const expectedValue = await Donar.name()
         assert.equal(expectedValue.toString(),Name )
     })

     it("check if the symbol set is equal to the used symbol ",async()=>{
        const expectedValue = await Donar.symbol()
        assert.equal(expectedValue,Symbol)
     })

     it("checks that the owner of the contract is the deployer",async()=>{
         const expectedValue = await Donar.getDonarOwner()
         expect(expectedValue).to.equal(deployer.address)
     })
       })  

     describe("Initial state of Donar contract",()=>{

    
  
        it("set the number of donations and ngo to zero",async()=>{
           const expectedValue = await Donar.getNumberOfDonationSentToNgo()
           const TotaldonationsMadeByDonor = await Donar.getNumberOfDonationSentToNgo()
           const TotaldonationsReceivedByNgo =  await Donar.getNumberOfDonationsByDonorMade()
           assert.equal(expectedValue.toString(),TotaldonationsMadeByDonor.toString())
           assert.equal(expectedValue.toString(),TotaldonationsReceivedByNgo.toString())
        })

       
     })

     describe("Function only Donar owner can perform",()=>{
         it("reverses if the action is not performed by te owner",async()=>{
          const connectedAccount = await Donar.connect(Ngo1)
          await expect(connectedAccount.getDonorLeastFee()).not.to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.allowDonationToNgo(Ngo2.address)).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.getDonarOwner()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.getContractBalance()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.HowManyDonorExist()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.getDonarTotalProfit()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.HowManyNgoExist()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
          await expect(connectedAccount.getNumberOfDonationsByDonorMade()).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
         
         })
     })

     describe("Functions of Donar Contract",()=>{
      it("check if your Balance of the contract is equal to the balance of the money accumulated from profit",async()=>{
           const profitAccumulated = await Donar.getDonarTotalProfit()
           const contractBalance = await Donar.getContractBalance()
           expect(profitAccumulated.toString()).to.equal(contractBalance.toString())
      })

      it("check that the balance or the interestRate accummulated is equal to zero",async()=>{
          const profitAccumulated = await Donar.getDonarTotalProfit()
          const contractBalance = await Donar.getContractBalance()
          expect(profitAccumulated.toString()).to.equal("0")
          expect(contractBalance.toString()).to.equal("0")
      })

      it("make sure the transaction records is empty on deployment",async()=>{
          const  expectedValue = await Donar.getTransactionRecordsOfDonor()
          assert.equal(expectedValue.length,0)
      })

      it("checks the donation status of the deployer of any of the user",async()=>{
          const expectedValue = await Donar.checkIfIhaveDonatedBefore(deployer.address)
          const expectedValue2 = await Donar.checkIfIhaveDonatedBefore(Ngo1.address)
          const expectedValue3 = await Donar.checkIfIhaveDonatedBefore(Ngo2.address)
          const expectedValue4 = await Donar.checkIfIhaveDonatedBefore(Ngo3.address)
          expect(expectedValue).to.equal(false)
          expect(expectedValue2).to.equal(false)
          expect(expectedValue3).to.equal(false)
          expect(expectedValue4).to.equal(false)
      })

      it("reverts if a zero address is provided",async()=>{
          await expect(Donar.donate(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getBalance(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getDonorRecentTransaction(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getAmountDonarHasDonatedPlusProfit(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.checkDonorProfit(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getDonorId(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getDonorToAmountDonated(zeroAddress)).to.be.revertedWithCustomError
          await expect(Donar.getHowManyDonarTokensYouHave(zeroAddress)).to.be.revertedWithCustomError
      })

      it("Returns zero in the array to show no ngo/donor has been registered",async()=>{
          const donorList = await Donar.HowManyDonorExist()
          const NgoList = await Donar.HowManyNgoExist()
          assert.equal(donorList,0)
          assert.equal(NgoList,0)
      })

      it("Reverts if donor donates to themselves",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        await expect(Donar.donate(deployer.address)).to.be.revertedWithCustomError(Donar,"Donar__NgoHaveNotRegistered")
      })

      it("Reverts if no money is sent in that transaction",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
         await expect(Donar.donate(Ngo1.address)).to.be.revertedWithCustomError(Donar,"Donar__NeedMoreMaticSent")
      })

      it("Reverts if the Ngo address is a zero address",async()=>{
         const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
         await expect(Donar.donate(zeroAddress)).to.be.revertedWithCustomError(Donar,"Donar__NgoHaveNotRegistered")
      })

      it("Reverts if the money sent in is lesser than the agreed donor amount",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          await expect(Donar.donate(Ngo1.address,{value:DonorLeastFee.toNumber() -  1})).to.be.revertedWithCustomError(Donar,"Donar__NeedMoreMaticSent")
      })

      it("Reverts if account2 tries to donor money to themselves",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
         await expect(Donar.connect(Ngo1).donate(Ngo1.address,{value:DonorLeastFee})).to.be.revertedWithCustomError(Donar,"Donar__CannotDonateToYourSelf")
      })

      it("reverts if the ngo address giving the money is address(0)",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(zeroAddress,"2",HelpMe1.address)).to.revertedWithCustomError(Donar,"Donar__InvalidAddress")
      })

      it("reverts if the address to be given is a zero address",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"2",zeroAddress)).to.revertedWithCustomError(Donar,"Donar__InvalidAddress")
      })

      it("reverts if the ngo address is in donor list",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(deployer.address,"0",zeroAddress)).to.revertedWithCustomError(Donar,"Donar__InvalidAmount")
      })

      
      it("reverts if an imposter is trying to withdraw",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
         await expect (Donar.connect(Ngo1).withdrawDonarProfitByCompany("1")).to.be.revertedWithCustomError(Donar,"Donar__onlyOwner")
      })

      it("reverts if the money to withdraw is more than the smart contract balance",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
       const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
       await expect (Donar.withdrawDonarProfitByCompany("2")).to.be.revertedWithCustomError(Donar,"Donar__InsuffientsFunds")
      })

      it("reverts if the address to get help is part part of donor list",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"2",deployer.address)).to.revertedWithCustomError(Donar,"Donar__InvalidAddress")
      })

      it("Reverts if the address used is part of the Ngo address",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"2",Ngo1.address)).to.revertedWithCustomError(Donar,"Donar__InvalidAddress")
      })

      it("Reverts if the amount specified by the ngo is more than ngo balance",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"20",HelpMe1.address)).to.revertedWithCustomError(Donar,"Donar__InsuffientsFunds")
      })

      it("reverts if no money is not in the contract",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        await expect (Donar.withdrawDonarProfitByCompany("0")).to.be.revertedWithCustomError(Donar,"Donar__InsuffientsFunds")
    })

      
 //yarn hardhat test --network localhost --grep 
      it("it allows you to donate to the Ngo",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const register2 = await Donar.registerNgo(Ngo2.address,"feed","i feed people")
        const register3 = await Donar.registerNgo(Ngo3.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
         const numberOfDonationsMadeToNgo = await Donar.getNumberOfDonationSentToNgo()
         const numberOfDonationsMadeByDonor = await Donar.getNumberOfDonationsByDonorMade()
         const getFirstAddressId = await Donar.getDonorId(deployer.address)
         const DonarProfit = await Donar.getDonarTotalProfit()
         const contractBalance = await Donar.getContractBalance()
         const DonorDonationStatus = await Donar.checkIfIhaveDonatedBefore(deployer.address)
         const HowManyTransactionHaveBeenToNgo = await Donar.HowManyDonorExist()
         const HowManyTransactionsHaveBeenByDonor = await Donar.HowManyNgoExist()
         const DonarDecimalPoints = await Donar.decimals()
         const numberOfDonarTokenHeld = await Donar.getHowManyDonarTokensYouHave(deployer.address)
         const deployerDonarToken = await Donar.balanceOf(deployer.address)
         const erc20TotalSupplyOfDonarToken = await Donar.totalSupply()
         const NgoBalance = await Donar.getBalance(Ngo1.address)
         const ethersNgoBalance = await ethers.provider.getBalance(Ngo1.address)
         expect(numberOfDonationsMadeByDonor.toString()).to.equal("1")
         expect(numberOfDonationsMadeToNgo.toString()).to.equal("1")
         expect(getFirstAddressId.toString()).to.equal("1")
         expect(HowManyTransactionHaveBeenToNgo.toString()).to.equal("1")
         expect(HowManyTransactionsHaveBeenByDonor.toString()).to.equal("3")
         assert.equal(DonarProfit.toString(),"1")
         assert.equal(contractBalance.toString(),"1")
         assert.equal(DonorDonationStatus,true)
         assert.equal(deployerDonarToken.toString(),"1000000000000000000")
         expect(DonarDecimalPoints.toString()).to.equal("18")
         expect(numberOfDonarTokenHeld.toString(),"1")
         expect(NgoBalance.toString()).to.equal("9")
         expect(erc20TotalSupplyOfDonarToken.toString()).to.equal("1000000000000000000")
      })
     //yarn hardhat test --network localhost --grep    
      it("allows the Donor make to donation two times",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const register2 = await Donar.registerNgo(Ngo2.address,"feed","i feed people")
        const register3 = await Donar.registerNgo(Ngo3.address,"feed","i feed people")
        for(let i =0; i<2 ; i++){
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        }
        const numberOfDonationsMadeToNgo = await Donar.getNumberOfDonationSentToNgo()
        const numberOfDonationsMadeByDonor = await Donar.getNumberOfDonationsByDonorMade()
        const getFirstAddressId = await Donar.getDonorId(deployer.address)
        const DonarProfit = await Donar.getDonarTotalProfit()
        const contractBalance = await Donar.getContractBalance()
        const DonorDonationStatus = await Donar.checkIfIhaveDonatedBefore(deployer.address)
        const HowManyTransactionHaveBeenToNgo = await Donar.HowManyDonorExist()
        const HowManyTransactionsHaveBeenByDonor = await Donar.HowManyNgoExist()
        const DonarDecimalPoints = await Donar.decimals()
        const numberOfDonarTokenHeld = await Donar.getHowManyDonarTokensYouHave(deployer.address)
        const deployerDonarToken = await Donar.balanceOf(deployer.address)
        const erc20TotalSupplyOfDonarToken = await Donar.totalSupply()
        const NgoBalance = await Donar.getBalance(Ngo1.address)
        const ethersNgoBalance = await ethers.provider.getBalance(Ngo1.address)
        expect(numberOfDonationsMadeByDonor.toString()).to.equal("2")
        expect(numberOfDonationsMadeToNgo.toString()).to.equal("2")
        expect(getFirstAddressId.toString()).to.equal("2")
        expect(HowManyTransactionHaveBeenToNgo.toString()).to.equal("2")
        expect(HowManyTransactionsHaveBeenByDonor.toString()).to.equal("3")
        assert.equal(DonarProfit.toString(),"2")
        assert.equal(contractBalance.toString(),"2")
        assert.equal(DonorDonationStatus,true)
        assert.equal(deployerDonarToken.toString(),"2000000000000000000")
        expect(DonarDecimalPoints.toString()).to.equal("18")
        expect(numberOfDonarTokenHeld.toString(),"2")
        expect(NgoBalance.toString()).to.equal("18")
        expect(erc20TotalSupplyOfDonarToken.toString()).to.equal("2000000000000000000")
      })

     //yarn hardhat test --network localhost --grep      
      it("Ensures the parameter passed used in the NgoSend function is the argument set",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const register2 = await Donar.registerNgo(Ngo2.address,"feed","i feed people")
        const register3 = await Donar.registerNgo(Ngo3.address,"feed","i feed people")
        const NgoInitialBalance = await Donar.getBalance(Ngo1.address)
        const addressToHelpInitialBalance = await Donar.getBalance(HelpMe1.address)
        const HelpMe2BalanceB4Tx = await Donar.getBalance(HelpMe2.address)
        const Ngo2BalanceB4Tx = await Donar.getBalance(Ngo2.address)
        const Ngo3BalanceB4Tx = await Donar.getBalance(Ngo3.address)
        

        assert(NgoInitialBalance.toString(),"0")
        assert(addressToHelpInitialBalance.toString(),"0")


        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation3 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation4 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation5 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation6 = await Donar.donate(Ngo2.address,{value:DonorLeastFee})
        const makeDonation7 = await Donar.donate(Ngo2.address,{value:DonorLeastFee})
        const makeDonation8 = await Donar.donate(Ngo2.address,{value:DonorLeastFee})
        const makeDonation9 = await Donar.donate(Ngo3.address,{value:DonorLeastFee})
        

        const Ngo2BalanceImmediatelyAfterDonation = await Donar.getBalance(Ngo2.address)
        const Ngo3BalanceImmediatelyAfterDonation = await Donar.getBalance(Ngo3.address)
        
        const NgoBalanceImeddiatelyAfterTransaction = await Donar.getBalance(Ngo1.address)
        assert(NgoBalanceImeddiatelyAfterTransaction.toString(),"16")

        const NgoSendToHelpNeeded = await Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe1.address)
        const NgoSendToHelpNeeded2 = await Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe1.address)
        const NgoSendToHelpNeeded3 = await Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe1.address)
        const NgoSendToHelpNeeded4 = await Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe2.address)
        const NgosendHelp=await Donar.NgoSendToHelpNeeded(Ngo1.address,"3",HelpMe1.address)
        const NgoSendToHelpNeeded5 = await Donar.NgoSendToHelpNeeded(Ngo2.address,"2",HelpMe2.address)
        const NgoSendToHelpNeeded6 = await Donar.NgoSendToHelpNeeded(Ngo2.address,"2",HelpMe2.address)
        const NgoSendToHelpNeeded7 = await Donar.NgoSendToHelpNeeded(Ngo2.address,"2",HelpMe2.address)
        const NgoSendToHelpNeeded8 = await Donar.NgoSendToHelpNeeded(Ngo3.address,"2",HelpMe2.address)

        const NgoBalanceAfterDonation = await Donar.getBalance(Ngo1.address)
        const Ngo2BalanceAfterDonationsWasMade = await Donar.getBalance(Ngo2.address)
        const Ngo3BalanceAfterDonationsWasMade = await Donar.getBalance(Ngo3.address)
        const addressToHelpBalanceAfterDonation = await Donar.getBalance(HelpMe1.address)
        const HelpMe2BalanceAfterTx = await Donar.getBalance(HelpMe2.address)

        console.log(addressToHelpInitialBalance.toString(),"The Helpme1 balance before tx 🚀")
        console.log(addressToHelpBalanceAfterDonation.toString(),"The HelpMe1 balance after tx 🚀")
        console.log(HelpMe2BalanceB4Tx.toString(),"The Helpme2 balance before tx ⚖")
        console.log(HelpMe2BalanceAfterTx.toString(),"The Helpme2 balance After tx ⚖")
        console.log(NgoInitialBalance.toString(),"The ngo1Balance before tx 🌌")
        console.log(NgoBalanceImeddiatelyAfterTransaction.toString(),"The ngo1balance immediately after tx 🌌")
        console.log(NgoBalanceAfterDonation.toString(),"The ngo1balance after donation has been made 🌌")
        console.log(Ngo2BalanceB4Tx.toString(),"The ngo2Balance before tx ✅")
        console.log(Ngo2BalanceImmediatelyAfterDonation.toString(),"The ngo2balance immediately after tx ✅")
        console.log(Ngo2BalanceAfterDonationsWasMade.toString(),"The ngo2balance after donation has been made ✅")

        console.log(Ngo3BalanceB4Tx.toString(),"The ngo3Balance before tx 🎃")
        console.log(Ngo3BalanceImmediatelyAfterDonation.toString(),"The ngo3balance immediately after tx 🎃")
        console.log(Ngo3BalanceAfterDonationsWasMade.toString(),"The ngo3balance after donation has been made 🎃")
       })

       it("reverts if zero amount is specified for ngo to send",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
         await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"0",HelpMe1.address)).to.be.revertedWithCustomError(Donar,"Donar__InvalidAmount")
       })

       //yarn hardhat test --network localhost --grep
       it("checks if i made donation before",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.connect(HelpMe1).donate(Ngo1.address,{value:DonorLeastFee})
        const deployerDonation = await Donar.checkIfIhaveDonatedBefore(deployer.address)
        const anotherDonation = await Donar.checkIfIhaveDonatedBefore(HelpMe1.address)
        assert.equal(deployerDonation,true)
        assert.equal(anotherDonation,true)
       })

       it("ensures the position of donor and ngo is set properly",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const donorPosition = await Donar.getDonorPositionInTheArray("0")
        const NgoPositon = await Donar.getNgoPositionInTheArray("0")
        expect(NgoPositon).to.equal(Ngo1.address)
        expect(donorPosition).to.equal(deployer.address)
       })
       //yarn hardhat test --network localhost --grep

       it("ensures a non-Ngo cannot give out funds",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const register2 = await Donar.registerNgo(Ngo2.address,"feed","i feed people")
        const register3 = await Donar.registerNgo(Ngo3.address,"feed","i feed people")
        const Ngo1InitialBalance = await Donar.getBalance(Ngo1.address)
        const Ngo2InitialBalance = await Donar.getBalance(Ngo2.address)

        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const make2Donation = await Donar.donate(Ngo2.address,{value:DonorLeastFee})
        const Ngo1BalanceImeddiatelyAfterTransaction = await Donar.getBalance(Ngo1.address)
        const Ngo2BalanceImeddiatelyAfterTransaction = await Donar.getBalance(Ngo2.address)
        
        console.log("the ngo1 initial balance is ",Ngo1InitialBalance.toString())
        console.log("the ngo1 balance after donation ",Ngo1BalanceImeddiatelyAfterTransaction.toString())
        console.log("the ngo2 initial balance is ",Ngo2InitialBalance.toString())
        console.log("the ngo1 balance after donation ",Ngo2BalanceImeddiatelyAfterTransaction.toString())

        await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"2",Ngo2.address)).to.be.revertedWithCustomError(Donar,"Donar__InvalidAddress")
       })
//yarn hardhat test --network localhost --grep
       it("ensures the details entered is properly stored",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const latestTransaction = await Donar.getDonorRecentTransaction(deployer.address)
        const {donor,amountDonated,profitGained} = latestTransaction
        assert.equal(donor,deployer.address)
        assert.equal(amountDonated.toString(),"10")
        assert.equal(profitGained.toString(),"1")
       })

       it("Ensures the first detail in the array is correct",async()=>{
          //yarn hardhat test --network localhost --grep
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const register1 = await Donar.registerNgo(Ngo2.address,"feed","i feed people")
        const register2 = await Donar.registerNgo(Ngo3.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.donate(Ngo2.address,{value:20})
        const makeDonation3 = await Donar.donate(Ngo3.address,{value:30})
        const numberOfDonorDetails = await Donar.getTransactionRecordsOfDonor()
        const {donor,amountDonated,profitGained} = numberOfDonorDetails[0]
        const {donor:donor2,amountDonated:amountForDonor2,profitGained:profitDonor2}=numberOfDonorDetails[1]
        const {donor:donor3,amountDonated:amountForDonor3,profitGained:profitDonor3}=numberOfDonorDetails[2]
        assert.equal(donor,deployer.address)
        assert.equal(amountDonated.toString(),"10")
        assert.equal(profitGained.toString(),"1")
        assert.equal(donor2,deployer.address)
        assert.equal(amountForDonor2.toString(),"20")
        assert.equal(profitDonor2.toString(),"2")
        assert.equal(donor3,deployer.address)
        assert.equal(amountForDonor3.toString(),"30")
        assert.equal(profitDonor3.toString(),"3")
       })

       it("Ensures the donor profit is correct",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const donorProfit = await Donar.checkDonorProfit(deployer.address)
        expect(donorProfit.toString()).to.equal("1000000000000000000")
       })

       //yarn hardhat test --network localhost --grep
       it("Ensures the donor profit is correct if a donation is made twice",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const donorProfit = await Donar.checkDonorProfit(deployer.address)
        expect(donorProfit.toString()).to.equal("2000000000000000000")
       })
      
       
     

       it("Ensures it reverts if a zero address is used",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
         await expect(Donar.checkDonorProfit(zeroAddress)).to.be.revertedWith("please use a valid address")
       })

       it('Ensures the number of details to have in the array equal to the number of donations made',async()=>{
        //yarn hardhat test --network localhost --grep
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation3 = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const latestTransaction = await Donar.getDonorRecentTransaction(deployer.address)
        const numberOfDonorDetails = await Donar.getTransactionRecordsOfDonor()
        const lengthOfDonorDetailsAfterDonations = numberOfDonorDetails.length
        const {donor,amountDonated,profitGained} = latestTransaction
        assert.equal(donor,deployer.address)
        assert.equal(amountDonated.toString(),"10")
        assert.equal(profitGained.toString(),"1")
        assert.equal(lengthOfDonorDetailsAfterDonations.toString(),"3")

       })

       it("Ensures the donor profit + the donar token recieved is correct",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const donationMoneyPlusProfit = await Donar.getAmountDonarHasDonatedPlusProfit(deployer.address)
        expect(donationMoneyPlusProfit.toString()).to.equal("1000000000000000010")

       })

       it("Ensures the money donated by the donor is correct",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const amountDonorHasDonated = await Donar.getDonorToAmountDonated(deployer.address)
        expect(amountDonorHasDonated.toString()).to.equal("10")
       })
       //yarn hardhat test --network localhost --grep

       it("Reverts if a donor is also part of an Ngo",async()=>{
        const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
        const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
        const makeDonation2 = await Donar.connect(HelpMe1).donate(Ngo1.address,{value:DonorLeastFee})
        await expect (Donar.donate(HelpMe1.address,{value:DonorLeastFee})).to.be.revertedWithCustomError(Donar,"Donar__NgoCannotBeDonor")
       })



     })

     describe("Events",()=>{
         it("Emit the donation event when a donor make contribution",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
            await expect(Donar.donate(Ngo1.address,{value:DonorLeastFee})).to.emit(Donar,"DonationMade")
         })

         it("Emit an Events when Ngo donates to an address that needs help",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
           const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
           await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"3",HelpMe1.address)).to.emit(Donar,"NgoDonatedToHelpMe")
         })

          //yarn hardhat test --network localhost --grep
         it("Ensures what parameter used is the parameter set",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
            const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
            const txReceipt = await makeDonation.wait(1)
            const {from,value,to} = txReceipt.events[0].args
            const {owner, ngo,profitMade,amountDonatedToNgo}  = txReceipt.events[1].args
            assert.equal(owner,deployer.address)
            assert.equal(ngo,Ngo1.address)
            assert.equal(profitMade.toString(),"1")
            assert.equal(amountDonatedToNgo.toString(),"9")
            assert.equal(from,zeroAddress)
            assert.equal(to,deployer.address)
            assert.equal(value.toString(),"1000000000000000000")
         })

         it("Emits an event when ngo makes a donation",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
          await expect (Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe1.address)).to.emit(Donar,"NgoDonatedToHelpMe")
         })

         it("Ensures the parameters matches the arguments when a donation is made",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
          const NgoDonations = await Donar.NgoSendToHelpNeeded(Ngo1.address,"2",HelpMe1.address)
          const txReceipt = await NgoDonations.wait(1)
          const {ngo,amount,to} = txReceipt.events[0].args
          assert.equal(ngo,Ngo1.address)
          assert.equal(amount.toString(),"2")
          assert.equal(to,HelpMe1.address)
         })
         //yarn hardhat test --network localhost --grep
          

         it("Emits an event anytime a withdraw is made by Donar company",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
          await expect (Donar.withdrawDonarProfitByCompany("1")).to.emit(Donar,"DonarProfiWithDrawn")
         })
         //yarn hardhat test --network localhost --grep//
      it("set the contract balance after money has been withdrawn from the smart contract",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
          const NgoProfitWithdrawal = await Donar.withdrawDonarProfitByCompany("1")
          const getDonarBalance = await Donar.getContractBalance()
          assert.equal(getDonarBalance.toString(),"0")
         })

         it("Ensures the parameter set is equal to the arguments recieved",async()=>{
          const register = await Donar.registerNgo(Ngo1.address,"feed","i feed people")
          const makeDonation = await Donar.donate(Ngo1.address,{value:DonorLeastFee})
          const NgoProfitWithdrawal = await Donar.withdrawDonarProfitByCompany("1")
          const txReceipt = await NgoProfitWithdrawal.wait(1)
          const {donarCompany} = await txReceipt.events[0].args
          expect(donarCompany).to.equal(deployer.address)
         })
         //yarn hardhat test --network localhost --grep

         
        

         
     })

    
})