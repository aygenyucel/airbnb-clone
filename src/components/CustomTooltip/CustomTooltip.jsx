import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';


const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip { ...props} classes={{ popper: className }}/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FF385C',
      color: '#f9d9de',
      maxWidth: 220,
      fontSize: "0.8rem",
      // border: '1px solid #FF385C',
      padding:"10px",
      fontWeight: "600"
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: ' #FF385C'
    },
    
  }));

export default CustomTooltip