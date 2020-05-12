import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const TitleButton = withStyles({
  root: {
    cursor: "pointer",
    pointerEvent: "none",
    justifyContent: "unset",
    textTransform: 'none',
    padding: 7,
    wordBreak: "break-word",
    '&:hover': {
        backgroundColor: "inherit",
        borderColor: "inherit",
        boxShadow: "none",
      }
  },
})(Button);
export default TitleButton;