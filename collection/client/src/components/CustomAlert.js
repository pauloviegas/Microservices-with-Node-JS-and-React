// Base
import PropTypes from "prop-types";

// MUI
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";

const CustomAlert = ({ type, title, messages }) => {
  return (
    <Stack sx={{ width: "100%", mt: "2" }} spacing={2}>
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {messages &&
          messages.map((message) => (
            <Typography variant="subtitle1" gutterBottom key={message.message}>
              {message.message}
            </Typography>
          ))}
      </Alert>
    </Stack>
  );
};

CustomAlert.defaultProps = {
  type: "error",
  title: "Error",
  messages: "",
};

CustomAlert.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  messages: PropTypes.array,
};

export default CustomAlert;
