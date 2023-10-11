import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Usage {
  usage?: "page" | "paper";
  size?: number;
}

const LoadingProgress = ({ usage, size }: Usage) => {
  return (
    <>
      {usage === "paper" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="secondary" size={size} />
        </Box>
      ) : (
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" size={72} />
        </Box>
      )}
    </>
  );
};

export default LoadingProgress;
