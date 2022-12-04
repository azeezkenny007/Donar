// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
const {ethers} = require('hardhat')
// global scope, and execute the script.
const Symbol ="Don"
const Name ="Donar"
const LeastAmountToDonate = 10


async function main() {
    const DonarFactory = await ethers.getContractFactory("Donar")
    const Donar = await DonarFactory.deploy(LeastAmountToDonate,Name,Symbol)
    await Donar.deployed()
    console.log("------------------------------------")
    console.log(`The contract was deployed to ${Donar.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
   process.exit(0)
}).catch((e) => {
  console.log(e);
  process.exit(1);
});
