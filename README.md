# Web3-Connect

**Easy way to connect users to Decentralized Applications.**

English | Ukrainian

## ✨ Features

- **Connection of Multiple Wallets and Accounts**: Enable your app users to link several wallets and multiple accounts inside each wallet simultaneously.
- **Support for Multiple Chains**: Enable users to easily switch between different networks and chains.
- **Wallet Management Center**: A persistent interface for managing wallet connections and networks, with a responsive version designed for mobile devices.
- **Real-time Notifications**: Receive immediate transaction notifications for all transaction states on the connected wallet addresses.
- **Standardization of Wallet Providers**: All wallet modules provide a provider that conforms to the specifications of [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102), [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) and [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain/5471) specifications.
- **Dynamic Loading**: To support multiple wallets in your app, you need many dependencies. Web3Connect loads a wallet and its dependencies dynamically only when the user selects it, resulting in minimal bandwidth usage.

## ☀️ License

[MIT](https://github.com/bee-io/web3-connect/blob/main/LICENSE)

## 🖥 Environment Support

* Angular `^15.0.0`
* Server-side Rendering


## 📦 Installation
**We recommend using `@angular/cli` to install**. It not only makes development easier, but also allows you to take advantage of the rich ecosystem of angular packages and tooling.

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add @b-ee/web3-connect
```

> More information about `@angular/cli` [here](https://github.com/angular/angular-cli).

You can also install `@b-ee/web3-connect` with npm or yarn

```bash
$ npm install @b-ee/web3-connect
$ yarn add @b-ee/web3-connect
```

## 🔨 Usage

Import the component modules you want to use into your `app.module.ts` file and [feature modules](https://angular.io/guide/feature-modules).

```ts
import {Web3ConnectModule} from "@b-ee/web3-connect";

@NgModule({
  imports: [ Web3ConnectModule ]
})
export class AppModule {
}
```

Then initialize in your app:

```ts
import {Init, injectedModule} from "@b-ee/web3-connect";

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

@Component({
  selector: 'app-root',
  template: `
     <web3-connect></web3-connect>
     <button (click)="connect()">Connect Wallet</button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private injected = injectedModule();

  private web3Connect = Init({
    wallets: [this.injected],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: MAINNET_RPC_URL
      }
    ]
  })

  async connect(): Promise<void> {
    const wallets = await this.web3Connect.connectWallet();
    console.log(wallets);
  }
}

```


## ⌨️ Development

```bash
$ git clone git@github.com:bee-io/web3-connect.git
$ cd web3-connect
$ yarn install
$ npm run demo
```

Browser would open automatically.

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/bee-io/web3-connect.git/pulls)

We welcome all contributions. You can submit any ideas as [pull requests](https://github.com/bee-io/web3-connect/pulls) or as [GitHub issues](https://github.com/bee-io/web3-connect/issues).


> If you're new to posting issues, we ask that you read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

![JetBrains](https://img.alicdn.com/tfs/TB1sSomo.z1gK0jSZLeXXb9kVXa-120-130.svg)


> We list some users here, if your company or product uses @b-ee/web3-connect, let us know [here](https://github.com/bee-io/web3-connect/issues)!

**Love @b-ee/web3-connect? Give our repo a star :star: :arrow_up:.**
