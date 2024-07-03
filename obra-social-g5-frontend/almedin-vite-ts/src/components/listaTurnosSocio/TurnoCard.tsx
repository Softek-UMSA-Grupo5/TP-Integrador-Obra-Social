import { Avatar, Button, CardActions, CardHeader, Collapse, Dialog, DialogActions, DialogTitle, IconButton, IconButtonProps, styled} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function TurnoCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PersonIcon />
          </Avatar>
        }
        title="Dr. Ignacio Felipe"
        titleTypographyProps={{fontWeight:"700", fontSize:"18px"}}
        subheader="Oftalmólogo"
        subheaderTypographyProps={{fontWeight:"500", fontSize:"16px"}}
      /> 
      <CardContent>
        <Typography color="text.secondary" variant="body2" sx={{ display:"flex", alignItems:"flex-start", gap:"4px" }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize:"medium" }} />2024-06-20 2:30 PM
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ display:"flex", alignItems:"flex-start", gap:"4px" }}>
          <LocalOfferOutlinedIcon sx={{ fontSize:"medium" }} />Completado
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color='error' onClick={handleClickOpen}>Cancelar</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Desea cancelar este turno?"}
          </DialogTitle>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Volver</Button>
            <Button variant="outlined" onClick={handleClose} autoFocus>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Button size="small" variant="outlined">Actualizar</Button>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="Ver mas"
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography color="text.secondary" variant="body2">Motivo de consulta:</Typography>
          <Typography paragraph>
            Control anual
          </Typography>
          <Typography color="text.secondary" variant="body2">Paciente:</Typography>
          <Typography paragraph>
            Fernando Carlos
          </Typography>
          <Button size="small" variant="outlined" color='success'>Descargar receta</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}