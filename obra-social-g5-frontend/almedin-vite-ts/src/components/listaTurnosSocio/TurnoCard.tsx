import {
    Avatar,
    Button,
    CardActions,
    CardHeader,
    Collapse,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    IconButton,
    IconButtonProps,
    styled,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TurnoMedicoEstadoEnum, TurnoMedicoResponse } from '../../assets/models/TurnoMedico';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { useUser } from '../../assets/contexts/UserContext';
import { cancelTurnoMedico } from '../../assets/axios/TurnoMedicoApi';

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

interface TurnoCard {
    turnoMedico: TurnoMedicoResponse;
    medico: MedicoResponseDto;
}

export default function TurnoCard({ turnoMedico, medico }: TurnoCard) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelarTurnoMedico = () => {
        cancelTurnoMedico(turnoMedico.codigo).then(() => setOpen(false));
    };

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    }
                    title={`Dr. ${medico.nombre}  ${medico.apellido}`}
                    titleTypographyProps={{ fontWeight: '700', fontSize: '18px' }}
                    subheader={medico.especialidad}
                    subheaderTypographyProps={{ fontWeight: '500', fontSize: '16px' }}
                />
                <CardContent>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 'medium' }} />
                        {turnoMedico.fecha + ' ' + turnoMedico.hora + ':' + turnoMedico.minutos}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                        <LocalOfferOutlinedIcon sx={{ fontSize: 'medium' }} />
                        {turnoMedico.estado}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        disabled={turnoMedico.estado !== TurnoMedicoEstadoEnum.PENDIENTE}
                        onClick={handleClickOpen}>
                        Cancelar
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {'¿Desea cancelar este turno?'}
                        </DialogTitle>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleClose}>
                                Volver
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleCancelarTurnoMedico}
                                autoFocus>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <ExpandMore
                        expand={expanded}
                        aria-expanded={expanded}
                        aria-label="Ver mas"
                        onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography color="text.secondary" variant="body2">
                            Motivo de consulta:
                        </Typography>
                        <Typography paragraph>{turnoMedico.motivoConsulta}</Typography>
                        <Typography color="text.secondary" variant="body2">
                            Paciente:
                        </Typography>
                        <Typography paragraph>
                            {user?.userData.nombre + ' ' + user?.userData.apellido}
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            disabled={turnoMedico.recetaMedicaId === 0 ? true : false}>
                            Descargar receta
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}
