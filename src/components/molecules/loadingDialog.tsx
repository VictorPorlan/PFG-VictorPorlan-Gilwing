import { Typography } from "@material-ui/core";
import { Button, CircularProgress, Dialog } from "@mui/material";
import { FC } from "react";
import Plus from '@mui/icons-material/Check';

interface IProps {
  open: boolean;
  finished?: boolean;
  message?: string;
  onPress: () => void;
}

const LoadingDialog: FC<IProps> = ({ open, finished, message, onPress }) => {
  return (
    <Dialog open={open}>
      <Typography variant="h5" style={{ margin: "20px 20px 0px" }}>
        {message}
      </Typography>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
           {finished ?
            <Plus color="success" fontSize="large" style={{ margin: 25 }} />
           :<CircularProgress color="primary" style={{ margin: 25 }} />
        }
      </div>
      {
        finished &&
      <Button variant="contained" color="success" onClick={onPress}>
          Cerrar
      </Button>
      }
    </Dialog>
  );
};

export default LoadingDialog;
