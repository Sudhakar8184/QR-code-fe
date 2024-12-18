import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../config';

const MemberDetailsPage = () => {
    const { id } = useParams();  // Get member ID from the URL
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/members/${id}`);
                setMember(response.data); // Set member data in state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member details:', error);
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, [id]);

    if (loading) {
        return <Typography variant="h6" align="center">Loading member details...</Typography>;
    }

    if (!member) {
        return <Typography variant="h6" align="center">Member not found.</Typography>;
    }

    return (
       <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: {
            xs: '90%', // Small screens
            sm: 400,   // Medium screens
            md: 500,   // Larger screens
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Member Details
          </Typography>
          <Typography variant="h6" gutterBottom>
            ID: {member.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Name: {member.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {member.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {member.phone}
          </Typography>
        </CardContent>
      </Card>
    </Box>

    );
};

export default MemberDetailsPage;
