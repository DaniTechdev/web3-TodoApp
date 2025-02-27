import React from "react";

//Internal Import
import Style from "./Navbar.module.css";

const Navbar = ({ currentAccount, balance, connectWallet }) => {
  return (
    <div className={Style.container}>
      <p className={Style.todo}>TASK DAPP</p>
      <p className={Style.admin}>Admin</p>
      <p className={Style.achive}>Archive Messages</p>
      <p className={Style.achive}> Setting</p>

      {currentAccount ? (
        <>
          <p className={Style.account}>
            User Address: {currentAccount.slice(0, 15)}...
          </p>
          <p className={Style.balance}>Balance: {balance.slice(0, 6)}</p>
        </>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
