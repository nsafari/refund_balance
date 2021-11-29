import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } =
    await getNamedAccounts();


  console.log("Start [RefundBalance] contract deployment");
  const deployResult = await deploy("RefundBalance", {
    from: deployer,
    log: true,
  });
  console.log("Finish [RefundBalance] contract deployment");

  try {
    console.log("Start [RefundBalance] contract verification");
    await hre.run("verify:verify", {
      address: deployResult.address,
    });
    console.log("Finish [RefundBalance] contract verification");
  } catch (e) {
    if (e.message !== "[RefundBalance] contract source code already verified") {
      throw e;
    }
    console.log(e.message);
  }
};

export default func;
