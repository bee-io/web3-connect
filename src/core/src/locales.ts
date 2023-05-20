import {state} from "./store";

export type Translation = {
  connect: {
    selectingWallet: {
      header: string,
      recommendedWalletsPart1: string,
      recommendedWalletsPart2: string,
      installWallet: string,
      agreement: {
        agree: string,
        terms: string,
        and: string,
        privacy: string;
      }
    },
    connectingWallet: {
      header: string,
      headerRejected: string,
      mainText: string,
      paragraph: string,
      previousConnection: string,
      rejectedText: string,
      rejectedCTA: string,
      primaryButton: string
    },
    connectedWallet: {
      header:string,
      mainText: string,
      dontHaveWalletText: string
    }
  },
  modals: {
    actionRequired: {
      heading: string,
      paragraph: string,
      linkText: string,
      buttonText: string,
    },
    switchChain: {
      heading: string,
      paragraph1: string,
      paragraph2: string,
    },
    confirmDisconnectAll: {
      heading: string,
      description:string,
      confirm:string,
      cancel: string,
    }
  },
  accountCenter: {
    connectAnotherWallet: string,
    disconnectAllWallets: string,
    currentNetwork:string,
    tokenListTitle:string,
    tokenListNoData: string;
    contactUs: string;
    tokenListIncluded: string,
    tokenListMore: string,
    appInfo: string,
    learnMore: string,
    gettingStartedGuide: string,
    smartContracts:string,
    explore:string,
    backToApp:string,
    poweredBy:string,
    addAccount:string,
    setPrimaryAccount:string,
    disconnectWallet:string,
    copyAddress:string,
    changeNetworkProcess:string,
    save:string,
  },
  notify: {
    transaction: {
      txRequest: string,
      nsfFail: string,
      txUnderpriced: string,
      txRepeat: string,
      txAwaitingApproval: string,
      txConfirmReminder: string,
      txSendFail:string,
      txSent: string,
      txStallPending: string,
      txStuck: string,
      txPool: string,
      txStallConfirmed: string,
      txSpeedUp: string,
      txCancel: string,
      txFailed: string,
      txConfirmed: string,
      txError: string,
      txReplaceError: string,
    },
    watched: {
      txPool:string,
      txSpeedUp: string,
      txCancel:string,
      txConfirmed: string,
      txFailed:string,
      txStuck:string,
    },
    time: {
      minutes: string,
      seconds: string,
    }
  }
}
export const beeWeb3ConnectLocales:{en:Translation, ukr:Translation} = {
  en:{
    connect: {
      selectingWallet: {
        header: "Available Wallets",
        recommendedWalletsPart1: "only supports",
        recommendedWalletsPart2: "on this platform. Please use or install one of the supported wallets to continue",
        installWallet: "You do not have any wallets installed that this app supports, please use a supported wallet",
        agreement: {
          agree: "I agree to the",
          terms: "Terms & Conditions",
          and: "and",
          privacy: "Privacy Policy"
        }
      },
      connectingWallet: {
        header: "Connecting to",
        headerRejected: "Connection Rejected",
        mainText: "Connecting...",
        paragraph: "Make sure to select all accounts that you want to grant access to.",
        previousConnection: "already has a pending connection request, please open the app to login and connect.",
        rejectedText: "Connection Rejected!",
        rejectedCTA: "Click here to try again",
        primaryButton: "Back to wallets"
      },
      connectedWallet: {
        header: "Connection Successful",
        mainText: "Connected",
        dontHaveWalletText: "I don't have a wallet"
      }
    },
    modals: {
      actionRequired: {
        heading: "Action required in",
        paragraph: "Please switch the active account in your wallet.",
        linkText: "Learn more.",
        buttonText: "Okay"
      },
      switchChain: {
        heading: "Switch Chain",
        paragraph1: "{app} requires that you switch your wallet to the {nextNetworkName} network to continue.",
        paragraph2: "*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet."
      },
      confirmDisconnectAll: {
        heading: "Disconnect all Wallets",
        description: "Are you sure that you would like to disconnect all your wallets?",
        confirm: "Confirm",
        cancel: "Cancel"
      }
    },
    accountCenter: {
      connectAnotherWallet: "Connect another Wallet",
      disconnectAllWallets: "Disconnect all Wallets",
      currentNetwork: "Current Network",
      tokenListTitle: "total balance",
      tokenListIncluded: "Included tokens",
      tokenListMore: "More tokens",
      tokenListNoData: "Sorry, token balances are not available for the current network, if you want to add,",
      contactUs: "contact us",
      appInfo: "App Info",
      learnMore: "Learn More",
      gettingStartedGuide: "Getting Started Guide",
      smartContracts: "Smart Contract(s)",
      explore: "Explore",
      backToApp: "Back to dapp",
      poweredBy: "powered by",
      addAccount: "Add Account",
      setPrimaryAccount: "Set Primary Account",
      disconnectWallet: "Disconnect Wallet",
      copyAddress: "Copy Wallet address",
      changeNetworkProcess: "switching...",
      save:"Save"
    },
    notify: {
      transaction: {
        txRequest: "Your transaction is waiting for you to confirm",
        nsfFail: "You have insufficient funds for this transaction",
        txUnderpriced: "The gas price for your transaction is too low, try a higher gas price",
        txRepeat: "This could be a repeat transaction",
        txAwaitingApproval: "You have a previous transaction waiting for you to confirm",
        txConfirmReminder: "Please confirm your transaction to continue",
        txSendFail: "You rejected the transaction",
        txSent: "Your transaction has been sent to the network",
        txStallPending: "Your transaction has stalled before it was sent, please try again",
        txStuck: "Your transaction is stuck due to a nonce gap",
        txPool: "Your transaction has started",
        txStallConfirmed: "Your transaction has stalled and hasn't been confirmed",
        txSpeedUp: "Your transaction has been sped up",
        txCancel: "Your transaction is being canceled",
        txFailed: "Your transaction has failed",
        txConfirmed: "Your transaction has succeeded",
        txError: "Oops something went wrong, please try again",
        txReplaceError: "There was an error replacing your transaction, please try again"
      },
      watched: {
        txPool: "Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txSpeedUp: "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up",
        txCancel: "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled",
        txConfirmed: "Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txFailed: "Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txStuck: "Your transaction is stuck due to a nonce gap"
      },
      time: {
        minutes: "min",
        seconds: "sec"
      }
    }
  },
  ukr: {
    connect: {
      selectingWallet: {
        header: "Доступні гаманці",
        recommendedWalletsPart1: "підтримує тільки",
        recommendedWalletsPart2: "на цій платформі. Будь ласка, використовуйте або встановіть один з підтримуваних гаманців, щоб продовжити",
        installWallet: "Ви не маєте жодного гаманця, який підтримує цю програму, будь ласка, використовуйте підтримуваний гаманець",
        agreement: {
          agree: "Я погоджуюся з",
          terms: "Умовами користування",
          and: "і",
          privacy: "Політикою конфіденційності"
        }
      },
      connectingWallet: {
        header: "Підключення до",
        headerRejected: "Підключення відхилено",
        mainText: "Підключення...",
        paragraph: "Переконайтеся, що ви вибрали всі рахунки, до яких ви хочете надати доступ.",
        previousConnection: "вже має запит на підключення, будь ласка, відкрийте програму, щоб увійти та підключитися.",
        rejectedText: "Підключення відхилено!",
        rejectedCTA: "Натисніть тут, щоб спробувати ще раз",
        primaryButton: "Назад до гаманців"
      },
      connectedWallet: {
        header: "Підключення успішне",
        mainText: "Підключено",
        dontHaveWalletText: "У мене немає гаманця"
      }
    },
    modals: {
      actionRequired: {
        heading: "Потрібна дія у {wallet}",
        paragraph: "Будь ласка, переключіть активний рахунок у своєму гаманці.",
        linkText: "Дізнатися більше.",
        buttonText: "Добре"
      },
      switchChain: {
        heading: "Переключити ланцюжок",
        paragraph1: "{app} вимагає переключення гаманця на мережу {nextNetworkName} для продовження роботи.",
        paragraph2: "*Деякі гаманці можуть не підтримувати зміну мережі. Якщо ви не можете змінити мережу в своєму гаманці, ви можете розглянути можливість переходу до іншого гаманця."
      },
      confirmDisconnectAll: {
        heading: "Відключити всі гаманці",
        description: "Ви впевнені, що хочете відключити всі свої гаманці?",
        confirm: "Підтвердити",
        cancel: "Скасувати"
      }
    },
    accountCenter: {
      connectAnotherWallet: "Підключити інший гаманець",
      disconnectAllWallets: "Відключити всі гаманці",
      currentNetwork: "Поточна мережа",
      tokenListTitle: "загальний баланс",
      tokenListNoData:'На жаль, баланс токенів недоступний для поточної мережі, якщо ви хочете додати,',
      contactUs:'зв\'яжіться з нами',
      tokenListIncluded: "Включені токени",
      tokenListMore: "Більше токенів",
      appInfo: "Інформація про додаток",
      learnMore: "Дізнатися більше",
      gettingStartedGuide: "Посібник з початку роботи",
      smartContracts: "Розумні контракти",
      explore: "Досліджувати",
      backToApp: "Назад до додатку",
      poweredBy: "за допомогою",
      addAccount: "Додати обліковий запис",
      setPrimaryAccount: "Встановити основний обліковий запис",
      disconnectWallet: "Відключити гаманець",
      copyAddress: "Скопіювати адресу гаманця",
      changeNetworkProcess: "перемикаємо...",
      save:"Зберегти"
    },
    notify: {
      transaction: {
        txRequest: "Ваша транзакція очікує на підтвердження",
        nsfFail: "У вас недостатньо коштів для цієї транзакції",
        txUnderpriced: "Ціна газу для вашої транзакції занадто низька, спробуйте встановити вищу ціну газу",
        txRepeat: "Це може бути повторною транзакцією",
        txAwaitingApproval: "У вас є попередня транзакція, яку потрібно підтвердити",
        txConfirmReminder: "Будь ласка, підтвердіть вашу транзакцію, щоб продовжити",
        txSendFail: "Ви відхилили транзакцію",
        txSent: "Ваша транзакція була відправлена до мережі",
        txStallPending: "Ваша транзакція зупинилась до того, як була відправлена, будь ласка, спробуйте ще раз",
        txStuck: "Ваша транзакція застрягла через проблему з nonce",
        txPool: "Ваша транзакція розпочалась",
        txStallConfirmed: "Ваша транзакція зупинилась і не була підтверджена",
        txSpeedUp: "Ваша транзакція була прискорена",
        txCancel: "Ваша транзакція скасовується",
        txFailed: "Ваша транзакція не вдалась",
        txConfirmed: "Ваша транзакція успішно виконана",
        txError: "Ой, щось пішло не так, спробуйте ще раз",
        txReplaceError: "Виникла помилка під час заміни вашої транзакції, будь ласка, спробуйте ще раз"
      },
      watched: {
        txPool: "Ваш обліковий запис {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txSpeedUp: "Транзакція на {formattedValue} {asset} {preposition} {counterpartyShortened} була прискорена",
        txCancel: "Транзакцію на {formattedValue} {asset} {preposition} {counterpartyShortened} скасовано",
        txConfirmed: "Ваш обліковий запис успішно {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txFailed: "Ваш обліковий запис не вдалося {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txStuck: "Ваша транзакція застрягла через розрив в номері"
      },
      time: {
        minutes: "мін.",
        seconds: "сек."
      }
    }
  }
}

export function getTranslations(): Translation {
  return beeWeb3ConnectLocales[state.get().locale]
}
