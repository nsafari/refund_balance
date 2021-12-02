import { ethers } from "hardhat";
import { getContractAddress } from "ethers/lib/utils";
import { expect } from "chai";
import { RefundBalance__factory } from "../artifacts/types";

describe("refund balance",async () => {

  let accountA, accountB;
  
  before(async () => {
    [accountA, accountB] = await ethers.getSigners();
  });

  it("Lose the eth", async () => {
  
    const transactionCount = await accountA.getTransactionCount();

    const futureAddress = getContractAddress({
      from: accountA.address,
      nonce: transactionCount,
    });

    console.log("future address", futureAddress);
    const tx = await accountB.sendTransaction({
      to: futureAddress,
      value: ethers.utils.parseEther("0.1"),
    });
    await tx.wait();
    expect(await ethers.provider.getBalance(futureAddress)).to.eq(ethers.utils.parseEther("0.1"));
  })
  
  it("Refund the ETH", async () => {

    const futureAddress = "PUT_THE_CONTRACT_ADDRESS_HERE";
    const refundContract =  new RefundBalance__factory(accountA).attach(futureAddress);
    const tx = await refundContract.withdrawBaseToken(accountB.address, ethers.utils.parseEther("0.1"));
    await tx.wait()
    expect(await ethers.provider.getBalance(futureAddress)).to.eq(ethers.utils.parseEther("0"));
  })
})
