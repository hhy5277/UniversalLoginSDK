import chai, {expect} from 'chai';
import {sendFunds, sendFundsParameters} from '../../src/dev/sendFunds';
import {providers, Wallet, utils} from 'ethers';
import {createMockProvider, getWallets, solidity} from 'ethereum-waffle';
import {NULL_PUBLIC_KEY, ETHER_NATIVE_TOKEN} from 'universal-login-commons';

chai.use(solidity);

describe('SendFunds', () => {
  let provider : providers.Provider;
  let wallet : Wallet;
  let args : sendFundsParameters;

  beforeEach(async () => {
    provider = createMockProvider();
    [wallet] = await getWallets(provider);
    args = {
      nodeUrl: '', 
      privateKey: wallet.privateKey, 
      to: NULL_PUBLIC_KEY, 
      amount: 1, 
      currency: ETHER_NATIVE_TOKEN.symbol, 
      provider: provider
    }
  });

  it('should send funds', async () => {
    await sendFunds(args);
    expect(await provider.getBalance(NULL_PUBLIC_KEY)).to.eq(utils.parseEther('1.0'));
  });

  it('should send large amount', async () => {
    const largeAmount = 123456789
    await sendFunds({...args, amount: largeAmount});
    expect(await provider.getBalance(NULL_PUBLIC_KEY)).to.eq(utils.parseEther(largeAmount.toString()));
  });

  it('should send decimal funds', async () => {
    const decimalAmount = 0.000000001234;
    await sendFunds({...args, amount: decimalAmount});
    expect(await provider.getBalance(NULL_PUBLIC_KEY)).to.eq(utils.parseEther(decimalAmount.toFixed(15)));
  });
});
