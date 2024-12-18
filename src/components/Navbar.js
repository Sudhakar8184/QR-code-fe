import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const pages = [
    { name: "Home", id: "home" , link: ""},
    { name: "Member", id: "members" , link: "/members"},
  ];
const Navbar = () => {
    return (
        <AppBar>
        <Container>
          <Toolbar>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h6">Insurance Management</Typography>
              <Stack direction="row" gap={3}>
                {pages.map(page => (
                  <Link
                    key={page.id}
                    sx={{
                      color: { xs: "primary", sm: "white" },
                    }}
                    to={page.link}
                  >
                    {page.name}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Navbar;
