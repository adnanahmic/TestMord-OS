import React, { useState } from 'react';
import { VscMenu, VscFolder, VscSettingsGear } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';
import { RiShutDownLine } from 'react-icons/ri';

import InstalledApps from '../../config/apps';
import { getName } from '../../redux/auth/auth.user';
import './MordMenu.scss';

const MordMenuDrawer = React.memo(
  ({ user, onLogout, onLaunchApp }) => {
    const [drawer, toggleDrawer] = useState(false);

    return (
      <div className="MordMenu-account" active={drawer.toString()}>
        <div className="MordMenu-account-list MordMenu-account-nav">
          <div className="MordMenu-account-list-item">
            <div className="MordMenu-account-list-item-icon" onClick={() => toggleDrawer(!drawer)}>
              <VscMenu />
            </div>
            <div className="MordMenu-account-list-item-label">START</div>
          </div>
        </div>
        <div className="MordMenu-account-list">
          <div className="MordMenu-account-list-item">
            <div className="MordMenu-account-list-item-icon">
              <AiOutlineUser />
            </div>
            <div className="MordMenu-account-list-item-label">{getName(user)}</div>
          </div>
          <div
            className="MordMenu-account-list-item"
            onClick={() => onLaunchApp(InstalledApps.fsexplorer)}
          >
            <div className="MordMenu-account-list-item-icon">
              <VscFolder />
            </div>
            <div className="MordMenu-account-list-item-label">File Explorer</div>
          </div>
          <div
            className="MordMenu-account-list-item"
            onClick={() => onLaunchApp(InstalledApps.settings)}
          >
            <div className="MordMenu-account-list-item-icon">
              <VscSettingsGear />
            </div>
            <div className="MordMenu-account-list-item-label">Settings</div>
          </div>
          <div className="MordMenu-account-list-item" onClick={onLogout}>
            <div className="MordMenu-account-list-item-icon">
              <RiShutDownLine />
            </div>
            <div className="MordMenu-account-list-item-label">Log Off</div>
          </div>
        </div>
      </div>
    );
  },
  () => true
);

const MordMenuApps = React.memo(
  ({ onClick }) => {
    const Apps = ({ apps, category }) =>
      apps.map((app, i) => (
        <div
          key={category + i.toString()}
          onClick={() => onClick(app)}
          className="MordMenu-apps-category-list-item"
        >
          <div className="MordMenu-apps-category-list-item-icon">{app.icon()}</div>
          <div className="MordMenu-apps-category-list-item-label">{app.name}</div>
        </div>
      ));

    const Category = ({ category }) => (
      <div className="MordMenu-apps-category">
        {/* <div className="MordMenu-apps-category-header">{category.category}</div> */}
        <div className="MordMenu-apps-category-list">
          <Apps apps={category.apps} category={category.category} />
        </div>
      </div>
    );

    const smApps = [];
    const apps = Object.keys(InstalledApps).map((id) => InstalledApps[id]);
    [...new Set(apps.map((app) => app.name[0].toLowerCase()))].sort().forEach((c) => {
      smApps.push({
        category: c.toUpperCase(),
        apps: apps.filter((app) => app.name[0].toLowerCase() === c),
      });
    });

    return (
      <div className="MordMenu-apps">
        {smApps.map((cat) => (
          <Category category={cat} key={cat.category} />
        ))}
      </div>
    );
  },
  () => true
);

const MordMenu = React.memo(
  ({ user, hide, onLogout, onProgramClick }) => (
    <div className="MordMenu" style={{ bottom: hide ? '-512px' : '48px' }}>
      <MordMenuDrawer user={user} onLaunchApp={onProgramClick} onLogout={onLogout} />
      <MordMenuApps onClick={onProgramClick} />
    </div>
  ),
  (prevProps, nextProps) => prevProps.hide === nextProps.hide
);

export default MordMenu;
