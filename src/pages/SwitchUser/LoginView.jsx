import React, { useEffect, useState } from 'react';
import { VscEye, VscArrowRight } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';
import { GiMorphBall } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { getName, getUsername } from '../../redux/auth/auth.user';
import Strings from '../../config/strings';
import BootLogo from '../../components/BootLogo/BootLogo';
import Button from '../../components/Button/Button';
import './LoginView.scss';

const LoginError = ({ error, onCancel }) => (
  <div className="LoginError">
    <span>{error.text}</span>
    <Button onClick={onCancel} classNames={['login-auth-error-button']} text="OK" />
  </div>
);

const LoginSuccess = ({name}) => (
  <div className="LoginSuccess">
    <BootLogo size="small" />
    <span>{Strings.SUCCESSFUL_LOGIN_WELCOME_TEXT(name)}</span>
  </div>
);

const LoginForm = ({ onSubmit }) => {
  const [isHiddenPassword, togglePasswordMode] = useState(true);
  const [password, updatePassword] = useState('');

  return (
    <div className="login-fields">
      {false && (
        <div className="login-fields-username">
          <input type="text" placeholder="User name" required />
        </div>
      )}

      <div className="login-fields-password">
        <input
          required
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && onSubmit(password)}
          type={isHiddenPassword ? 'password' : 'text'}
          placeholder="Password"
        />

        <div
          className="login-fields-password-eye"
          onMouseDown={() => togglePasswordMode(false)}
          onMouseUp={() => togglePasswordMode(true)}
        >
          <VscEye />
        </div>

        <div className="login-fields-password-arrow" onClick={() => onSubmit(password)}>
          <VscArrowRight />
        </div>
      </div>
    </div>
  );
};

const LoginView = ({ users, background, onLogin, authError, authSuccess }) => {
  const [selectedUser, changeSelectedUser] = useState(0);
  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}"/images/${background}")`,
  };
  const [showError, toggleShowError] = useState(authError);
  useEffect(() => toggleShowError(authError), [authError]);

  return (
    <>
      <div className="LoginScreen" style={styles} />
      <div className="PseudoLoginScreen">
        <div className="login-form">
          <div className="login-pfp">
            <GiMorphBall />
          </div>
          <div className="login-username">{users[selectedUser].name}</div>
          {showError ? (
            <LoginError error={authError} onCancel={() => toggleShowError(false)} />
          ) : authSuccess ? (
            <LoginSuccess name={users[selectedUser].name}/>
          ) : (
            <LoginForm onSubmit={(password) => onLogin(selectedUser, password)} />
          )}
          {!authSuccess && (
            <Link to="/newaccount" className="new-account-opt">
              {Strings.SIGNUP_LINK_LOGIN_VIEW}
            </Link>
          )}
        </div>

        {!authSuccess && users.length > 1 && (
          <div className="login-users-list">
            {users.map((user, ind) => (
              <li
                key={getUsername(user)}
                current={selectedUser === ind ? 1 : 0}
                className="login-users-list-item"
                onClick={() => changeSelectedUser(ind)}
              >
                <div className="login-users-list-item-pfp">
                  <AiOutlineUser />
                </div>
                <p>{getName(user)}</p>
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LoginView;
