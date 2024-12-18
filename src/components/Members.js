import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../config';

const MemberTableMUI = () => {
    const [members, setMembers] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [qrCode, setQrCode] = useState('');
    const [url, setUrl] = useState('');

    const navigate = useNavigate();

    // Fetch the members data from the backend
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const generateQRCode = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/generate-qr/${id}`);
            setQrCode(response.data.qrCode);
            setUrl(response.data.url);
            setMemberId(id)
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    useEffect(()=>{
        if(memberId)
        downloadQRCode(memberId)
    }, [memberId])
    // Download the QR code as an image
    const downloadQRCode = (id) => {
        const canvas = document.getElementById(`qr-canvas-${id}`);
        const imageUrl = canvas.toDataURL('image/png');  // Convert canvas to image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `QR_Code_${id}.png`;  // Set download filename
        link.click();  // Trigger download
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Members</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>QR Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.id}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>
                                <Link to={`/member/${member.id}`}>
                                    <Button variant="contained" color="primary">
                                        View QR Code
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <QRCodeCanvas
                                        id={`qr-canvas-${member.id}`}
                                        value={`${baseUrl}/members/${member.id}`}
                                        size={100}
                                        hidden={true}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => generateQRCode(member.id)}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        Download QR Code
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default MemberTableMUI;
