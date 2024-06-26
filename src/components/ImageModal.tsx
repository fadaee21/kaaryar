import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  border: "2px solid lightgray",
  p: 0.5,
  outline: 0,
};

export default function ImageModal({ pic, open, handleClose }: any) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component={"img"}
            src={pic}
            sx={{
              width: 800,
              height: "100%",
              borderRadius: 2,
              margin: "auto",
              display: "block",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
