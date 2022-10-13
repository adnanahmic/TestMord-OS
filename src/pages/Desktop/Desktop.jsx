import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TaskBar from '../../components/TaskBar/TaskBar';
import MordMenu from '../../components/MordMenu/MordMenu';
import Program from '../Program/Program';
import InstalledApps from '../../config/apps';
import {
    selectAccountSettings,
    selectDefaultApps,
    selectTaskBarApps,
} from '../../redux/account/account.selectors';
import { loadAccount, saveAccount } from '../../redux/account/account.actions';
import { startNewProgram, terminateProgram } from '../../redux/memory/memory.action';
import { selectAppsInstances, selectProgramsData } from '../../redux/memory/memory.selectors';
import './Desktop.scss';
import Loading from '../../components/Loading/Loading';
import { logOut } from '../../redux/auth/auth.actions';

const Desktop = ({ activeUser }) => {
    const accountSettings = useSelector(selectAccountSettings);
    const dispatch = useDispatch();
    const [mordMenu, toggleMordMenu] = useState(false);
    const [opacity, updateOpacity] = useState(1);
    const [logoutMode, startLogoutMode] = useState(false);
    const style = {
        opacity,
        backgroundImage: `url(${process.env.PUBLIC_URL}"/images/${accountSettings.background}")`,
    };

    useEffect(() => dispatch(loadAccount(activeUser)), []);
    useEffect(() => {
        if (!opacity) {
            setTimeout(() => {
                startLogoutMode(true);
                updateOpacity(1);
                setTimeout(() => {
                    dispatch(saveAccount(activeUser));
                    dispatch(logOut());
                }, 4000);
            }, 400);
        }
    }, [opacity]);

    // programsData: { pId_1: programData, pId_2: programData }
    // appsInstances: { calculator: [pId_1, .., pId_k], calendar: [pId_1,..., pId_m] }
    // runningPrograms: [pId_1, pId_2, ...]
    const programsData = useSelector(selectProgramsData);
    const appsInstances = useSelector(selectAppsInstances);
    const runningPrograms = Object.keys(programsData);
    const [windows, updateWindows] = useState({ maxZIndex: 100, pId: null });
    const [minimized, updateMinimized] = useState({});

    // taskbarApps: [calculator, calendar, ...]
    const taskbarApps = useSelector(selectTaskBarApps);
    const taskbarAndOpenedApps = taskbarApps.concat(Object.keys(appsInstances));
    const taskbarAppsData = [...new Set(taskbarAndOpenedApps)].map((appId) => InstalledApps[appId]);

    // defaultApps
    const defaultApps = useSelector(selectDefaultApps);

    // bring activated window/program to the foreground
    const onClickProgramWindow = (pId) =>
        updateWindows(({ maxZIndex }) => ({ maxZIndex: maxZIndex + 1, pId }));

    // add a program to minimized state
    const onToggleMinimize = (pId, to) => {
        const newMinimized = {};
        newMinimized[pId] = to;
        updateMinimized(Object.assign(minimized, newMinimized));
    };

    // when program is selected from taskbar
    const onSelectFromTaskBar = (pId) => {
        onClickProgramWindow(pId);
        onToggleMinimize(pId, false);
    };

    // start a new program
    const onStartNewProgram = (app) => {
        toggleMordMenu(false);
        dispatch(startNewProgram(app));
    };

    // open a document from file explorer
    const onOpenDocument = (docId, name, ext = '*') => {
        const app = InstalledApps[defaultApps[ext] || defaultApps['*']];
        dispatch(startNewProgram(app, { docId, title: name }));
    };

    return (
        <div className="Desktop" style={style}>
            {logoutMode ? (
                <Loading message="Logging out" fadeInTime=".5s" />
            ) : (
                <>
                    {runningPrograms.map((pId) => (
                        <Program
                            key={pId}
                            app={programsData[pId]}
                            isMinimized={minimized[pId]}
                            zIndex={windows.pId === pId ? windows.maxZIndex : 'auto'}
                            onMinimize={(_pId) => onToggleMinimize(_pId, true)}
                            onTerminate={() => dispatch(terminateProgram(pId))}
                            onClickWindow={onClickProgramWindow}
                            onOpenDocument={onOpenDocument}
                        />
                    ))}

                    <MordMenu
                        user={activeUser}
                        hide={!mordMenu}
                        onLogout={() => updateOpacity(0)}
                        onProgramClick={(app) => onStartNewProgram(app)}
                    />

                    {/* <ContextMenu
                        listType="Desktop"
                        menuList={[
                            { label: "View", onClick: (...params) => console.error(...params), params: ["View"] },
                            { label: "Sort", onClick: (...params) => console.error(...params), params: ["Sort"] },
                            { label: "Hide Icons", onClick: (...params) => console.error(...params), params: ["Hide Icons"] },
                        ]}
                    /> */}
                    <TaskBar
                        apps={taskbarAppsData}
                        programs={appsInstances}
                        programsData={programsData}
                        onInstanceClick={(pId) => onSelectFromTaskBar(pId)}
                        onIconClick={(app) => onStartNewProgram(app)}
                        onMordClick={() => toggleMordMenu(!mordMenu)}
                        onCloseInstance={(pId) => dispatch(terminateProgram(pId))}
                    />
                </>
            )}
        </div>
    );
};

export default Desktop;
