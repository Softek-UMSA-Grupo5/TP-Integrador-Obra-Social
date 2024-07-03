import React, { useEffect, useState } from 'react';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { getAllConsultorios } from '../../assets/axios/ConsultorioApi';
import { deleteMedico, getAllMedicos } from '../../assets/axios/MedicoApi';
import MedicoCard from './MedicoCard';
import MedicoDetailModal from './MedicoDetailModal';
import { CircularProgress, Typography, Grid, Pagination, Card, CardHeader } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const MedicosList: React.FC = () => {
    const [medicos, setMedicos] = useState<MedicoResponseDto[]>([]);
    const [consultoriosData, setConsultoriosData] = useState<ConsultorioResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMedico, setSelectedMedico] = useState<MedicoResponseDto | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [medicosResponse, consultoriosResponse] = await Promise.all([
                    getAllMedicos(),
                    getAllConsultorios(),
                ]);
                setMedicos(medicosResponse);
                setConsultoriosData(consultoriosResponse);
            } catch (error) {
                setError('Error al obtener los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (medico: MedicoResponseDto) => {
        setSelectedMedico(medico);
    };

    const handleCloseModal = () => {
        setSelectedMedico(null);
    };

    const handleDelete = async () => {
        if (selectedMedico) {
            try {
                await deleteMedico(selectedMedico.id);
                const updatedMedicos = medicos.filter(medico => medico.id !== selectedMedico.id);
                setMedicos(updatedMedicos);
                setSelectedMedico(null);
            } catch (error) {
                console.error('Error al eliminar el médico:', error);
            }
        }
    };

    const handleEdit = async (updatedMedico: MedicoResponseDto) => {
        const updatedMedicos = medicos.map(medico =>
            medico.id === updatedMedico.id ? updatedMedico : medico
        );
        setMedicos(updatedMedicos);
        setSelectedMedico(updatedMedico); // Actualiza el estado del médico seleccionado para reflejar cambios en el modal
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Typography variant="body1" color="error">
                {error}
            </Typography>
        );
    }

    const indexOfLastMedico = currentPage * itemsPerPage;
    const indexOfFirstMedico = indexOfLastMedico - itemsPerPage;
    const currentMedicos = medicos.slice(indexOfFirstMedico, indexOfLastMedico);

    return (
        <Card sx={{ p: 3, boxShadow: 0 }}>
            <CardHeader title="Médicos" sx={{ textAlign: 'center' }} />
            <div>
                <Grid container spacing={2}>
                    {currentMedicos.map((medico) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={medico.id}>
                            <MedicoCard
                                medico={medico}
                                consultoriosData={consultoriosData}
                                onOpenModal={handleOpenModal}
                            />
                        </Grid>
                    ))}
                </Grid>
                {selectedMedico && (
                    <MedicoDetailModal
                        open={!!selectedMedico}
                        medico={selectedMedico}
                        onClose={handleCloseModal}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        consultoriosData={consultoriosData}
                    />
                )}
                <Pagination
                    count={Math.ceil(medicos.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
                />
            </div>
            <ToastContainer />
        </Card>
    );
};

export default MedicosList;
