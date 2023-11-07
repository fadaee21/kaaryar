// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import React from "react";
// import { useLocation } from "react-router-dom";
// function ContextMenu({
//   children,
//   navigation,
// }: {
//   children: React.ReactNode;
//   navigation: number;
// }) {
//   const { pathname } = useLocation();
//   const [contextMenu, setContextMenu] = React.useState<{
//     mouseX: number;
//     mouseY: number;
//   } | null>(null);

//   const handleContextMenu = (event: React.MouseEvent) => {
//     event.preventDefault();
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6,
//           }
//         : null
//     );
//   };

//   const handleClose = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setContextMenu(null);
//   };
//   const handleNavigation = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     window.open(`${pathname}/${navigation}`, "_blank", "noopener noreferrer");
//     handleClose(e);
//   };

//   return (
//     <span onContextMenu={handleContextMenu}>
//       {children}
//       <Menu
//         open={contextMenu !== null}
//         onClose={handleClose}
//         anchorReference="anchorPosition"
//         anchorPosition={
//           contextMenu !== null
//             ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
//             : undefined
//         }
//       >
//         <MenuItem onClick={handleNavigation}>مشاهده در تب جدید</MenuItem>
//       </Menu>
//     </span>
//   );
// }
// export default ContextMenu;

const ContextMenu = () => {
  return <div>ContextMenu</div>;
};

export default ContextMenu;
