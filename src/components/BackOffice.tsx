import React, { useState, useEffect } from 'react';
import ApiService from '../services/api.service.tsx';
import { API_ENDPOINTS } from '../constants/db.constants.tsx';
import { TextField, Button, Typography, Box, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';



const BackOffice = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      if (isLoggedIn) {
        const fetchUsers = async () => {
          try {
            const response = await ApiService.getInstance().get(API_ENDPOINTS.USERS.GET_ALL, {userName, password})
              setUsers(response.data);
          } catch (error) {
            setError('Error fetching users');
          }
        };
  
        fetchUsers();
      }
    }, [isLoggedIn]);
  
    const handleLogin = async () => {
      try {
        const response = await ApiService.getInstance().post(API_ENDPOINTS.ADMIN.LOGIN, {userName, password})
        if (response.data) {
          setIsLoggedIn(true);
        } else {
          setError('שם המשתמש או הסיסמה אינם נכונים');
        }
      } catch (error) {
        setError('Error logging in');
      }
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredUsers:any = users.filter((user) => {
      return Object.values(user).some((value:any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  //   <Box
    
  // >
  //   This Box uses MUI System props for quick customization.
  // </Box>
   
    if (!isLoggedIn) {
      return (
        <Box  height={200}
        width={300}
        my={4}
        display="center"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey', maxWidth: 300, margin: 'auto'}}>
            <TextField
                label="User name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleLogin} fullWidth>
                Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
    }
  
    return (
      <Box sx={{ margin: 5, textAlign: 'center', maxWidth: 1000 }}>
          <TextField
              type="text"
              label="חיפוש..."
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              margin="normal"
          />
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell sx={{ minWidth: '150px' }}>ביקורת לא טובה מהעבר</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}>ביקורת טובה מהעבר</TableCell>
                      <TableCell>תאריך יצירה</TableCell>
                      <TableCell>כתובת</TableCell>
                      <TableCell>דוא״ל</TableCell>
                      <TableCell>טלפון עם הודעות</TableCell>
                      <TableCell>טלפון עם ווצאפ</TableCell>
                      <TableCell>שם משפחה</TableCell>
                      <TableCell>שם פרטי</TableCell>
                      <TableCell>תעודת זהות</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {filteredUsers.map((user) => (
                      <TableRow key={user.id_number}>
                          <TableCell sx={{ minWidth: '150px' }}>{user.bad_feedback}</TableCell>
                          <TableCell sx={{ minWidth: '150px' }}>{user.good_feedback}</TableCell>
                          <TableCell sx={{ minWidth: '100px' }}>{new Date(user.created_at).toISOString().replace("T", " ").slice(0, -5)||''}</TableCell>
                          <TableCell>{user.address}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.sms_phone}</TableCell>
                          <TableCell>{user.whatsapp_phone}</TableCell>
                          <TableCell>{user.last_name}</TableCell>
                          <TableCell>{user.first_name}</TableCell>
                          <TableCell>{user.id_number}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </Box>
  );
};

  
export default BackOffice;
