import { useCallback, useEffect, useState } from 'react';
import './ContextMenu.scss';

const useContextMenu = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const handleContextMenu = useCallback(
        (event) => {
            console.error(event);
            event.preventDefault();
            event.stopPropagation();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint, setShow]
    );
    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);
    useEffect(() => {
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
        }
    });
    return { anchorPoint, show };
}

const ContextMenu = ({ menuList = [], listType, ...otherProps }) => {
    const { anchorPoint, show } = useContextMenu();
    return (
        <div className="context-menu-container">
            {show ? (
                <ul
                    className="context-menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x
                    }}
                >
                    {menuList?.map(
                        (item, index) => <li
                            key={`${listType}-${index}`}
                            onClick={(e) => item?.onClick?.(e, ...(item?.params || []))}
                        >
                            {item.label}
                        </li>
                    )}
                </ul>
            ) : (
                <> </>
            )}
        </div>
    );
}
export default ContextMenu;
export { useContextMenu };