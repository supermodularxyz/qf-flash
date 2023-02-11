import { Wallet } from "ethers";

const testWallets = {
  sender: {
    "0x9C710D3e20692b25032204586c9dc7CcDa012Ab8":
      "mixture welcome improve stock noble size check obscure scrap cake immune bread",
    "0x331aF4cAc7d4086Cb56F4E5019f3C454Bb4114e8":
      "vacant dose violin august yellow want tonight bench myth act fame foil",
    "0xfa3Dc0a26B02f11Ac23eE3b391Eab64506D24c8D":
      "worry daring dinosaur walnut slender move nut mirror team harbor faint return",
  },
  receiver: {
    "0xe1e494B8CF4566C0EC9E06f3b68BfB0C7D670e49":
      "that actor crew give leopard blade cradle hazard priority favorite joke nurse",
    "0x1bc7100863B6A754C008A5C9d3cDF05f5Ee6F8EF":
      "audit end lucky profit gospel meadow pony notice gospel pond bulk review",
    "0xab85636D3f77B35F69C45d4FDDAc883A7d379307":
      "smart story picnic juice corn shock garment curious ankle twin digital raccoon",
    "0xf5EeC8dCE8896c5DB342Dd08A4D4FcBb14919e7A":
      "pig share nurse trust bid traffic simple vendor female stumble source post",
    "0x787C97D942Ece2F814Aa72957aC8A35996F6436E":
      "silk like mountain stairs curious suit giraffe memory ancient two define ready",
    "0xA7d32606Ba605c893F2Bd8bCC029ef76c5C829E2":
      "feel company ball special remove urge legend fish lesson hill dynamic mobile",
    "0xa2BEc0AF10c6b469E3991D61C7a8CaEB93501500":
      "ostrich attitude antique acid erode document screen gadget apology rule hub rural",
  },
};

const testWalletsArray = [
  ...Object.values(testWallets.sender),
  ...Object.values(testWallets.receiver),
];

export function createWallets(count: number, test = false) {
  console.log(`Creating ${count} ${test ? "test" : ""} wallets...`);
  return test
    ? testWalletsArray.map((m) => Wallet.fromMnemonic(m))
    : Array.from({ length: count })
        .fill(0)
        .map((_, i) => Wallet.createRandom());
}
