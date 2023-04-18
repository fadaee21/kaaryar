import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  border: "2px solid lightgray",
  p: 4,
  outline:0
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
            alt="payment image"
            src={pic}
            sx={{ width: 600, height: "100%", borderRadius: 2 }}
          />
        </Box>
      </Modal>
    </div>
  );
}
