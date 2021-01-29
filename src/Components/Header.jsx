import React from 'react';
import { observer } from 'mobx-react';
import MainStore from '../Stores/Main';
import './Header.scss';
import logo from '../logo.svg';
import mobxLogo from '../mobx.svg';

const Header = () => (
  <header className="App-header">
    <div className="logos-wrapper">
      <img src={logo} className="react-logo" alt="logo" />
      <img src={mobxLogo} className="mobx-logo" alt="logo" />
    </div>
    <h1>MobX Demo{MainStore.title ? `, ${MainStore.title}` : ''}</h1>
  </header>
)

export default observer(Header);
