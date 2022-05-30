import { Typography } from "@material-ui/core";
import { Button, Dialog } from "@mui/material";
import { FC } from "react";
import Error from '@mui/icons-material/Error';

interface IProps {
  error: boolean;
  title?: string;
  message: string;
  onPress?: () => void;
}

const LoadingDialog: FC<IProps> = ({ error, title, message, onPress }) => {
  return (
    <Dialog open={error}>
      <Typography variant="h4" style={{ margin: "20px 20px 0px", textAlign: "center" }}>
        {title}
      </Typography>
      <Typography variant="h6" style={{ margin: "20px 20px 0px", textAlign: "center" }}>
       <div dangerouslySetInnerHTML={{__html: message}}>
       </div>
      </Typography>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Error color="error" fontSize="large" style={{ margin: 25 }} />
      </div>
      {
      <Button variant="contained" color="error" onClick={onPress}>
          Cerrar
      </Button>
      }
    </Dialog>
  );
};

export default LoadingDialog;