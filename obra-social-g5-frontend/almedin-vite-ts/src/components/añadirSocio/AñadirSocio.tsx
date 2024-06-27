import React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
} from '@mui/material';
import { formatearFecha } from '../../assets/utils/formatearFecha';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AñadirSocio() {
    const [rows, setRows] = React.useState([1, 2, 3]);

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ bgcolor: 'background.paper', p: 6, boxShadow: 3, borderRadius: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: 2,
                        borderColor: 'gray.200',
                        pb: 4,
                    }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            textAlign: { xs: 'center', sm: 'left' },
                        }}>
                        Almedin
                    </Typography>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                            Registro de Socio
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' } }}>
                            Datos del Titular
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ textAlign: { xs: 'center', sm: 'right' }, mt: { xs: 1, sm: 0 } }}>
                            Fecha de Emisión: {formatearFecha(new Date())}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 4,
                        }}>
                        <TextField variant="outlined" fullWidth label="Nombre" />
                        <TextField variant="outlined" fullWidth label="Apellido" />
                        <TextField variant="outlined" fullWidth label="Fecha de Nacimiento" />
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 4,
                        }}>
                        <TextField variant="outlined" fullWidth label="C U I L/T" />
                        <TextField variant="outlined" fullWidth label="N° de Documento: DNI" />
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 4,
                        }}>
                        <TextField variant="outlined" fullWidth label="Teléfono" />
                        <TextField variant="outlined" fullWidth label="Email" />
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        Datos Grupo Familiar y Adherente
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Apellido/s</TableCell>
                                    <TableCell>Nombre/s</TableCell>
                                    <TableCell>DNI</TableCell>
                                    <TableCell>C U I L</TableCell>
                                    <TableCell>Fecha Nac.</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Parentesco</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row}>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField variant="outlined" sx={{ minWidth: 200 }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={() => setRows([...rows, rows.length])}>
                            <AddCircleIcon sx={{ fontSize: 30 }} />
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary">
                        Registrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
