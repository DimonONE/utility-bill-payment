import React from 'react';
import {NextPage} from 'next';
import {API_URL} from '../config';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import {useGlobalState} from '@root/context/state';

type IProps = {};

const UserInfo: NextPage<IProps> = () => {
  const [userName] = useGlobalState('userName');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        marginTop: 'auto',
      }}
    >
      {!!userName ? (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Avatar alt={userName} src="" />
          <Typography sx={{marginLeft: '10px'}}>{userName}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 800,
            color: 'white',
            background: 'black',
            borderRadius: 5,
            transition: '.7s opacity',
            opacity: 0.7,

            '&:hover': {
              background: 'black',
              opacity: 1,
            },
          }}
        >
          <Link href={'/auth'} style={{padding: '30px'}}>
            Увійти
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
