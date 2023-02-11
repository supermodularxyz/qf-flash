import { ethers } from "hardhat";

import { expect } from "chai";
import { formatBytes32String, parseBytes32String } from "ethers/lib/utils";
import { configureRolesAndTranferTokens } from "../utils/prepareWallets";
import { createWallets } from "../utils/createWallets";

describe("QFToken", function () {
  async function deploy() {
    const signers = await ethers.getSigners();
    const QFToken = await ethers.getContractFactory("QFToken");
    const token = await QFToken.deploy();

    const wallets = createWallets(10, true).map((w) =>
      w.connect(ethers.provider)
    );

    const accounts = await configureRolesAndTranferTokens(
      wallets,
      token,
      signers[0],
      { ratio: 0.3, eth: "0.1" }
    );

    console.log(accounts);

    return { token, wallets };
  }

  it("should be possible for sender roles to send tokens to receivers", async () => {
    const {
      token,
      wallets: [sender, receiver],
    } = await deploy();

    await token.setRole(sender.address, 1);
    await token.setRole(receiver.address, 2);

    // Receivers can't send to Senders
    await expect(
      token.connect(receiver).transfer(sender.address, 10)
    ).to.be.revertedWith("Must fulfill roles");

    // Senders to Receivers is allowed
    await token.connect(sender).transfer(receiver.address, 10);

    expect(await token.balanceOf(sender.address)).to.eq(90);
    expect(await token.balanceOf(receiver.address)).to.eq(110);
  });

  it("should be possible to set ens name", async () => {
    const {
      token,
      wallets: [sender],
    } = await deploy();

    await expect(
      await token.connect(sender).setName(formatBytes32String("ens.eth"))
    ).to.emit(token, "SetName");

    expect(parseBytes32String(await token.getName(sender.address))).to.eq(
      "ens.eth"
    );
  });
});
