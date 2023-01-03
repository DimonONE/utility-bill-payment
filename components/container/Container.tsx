import React, {ReactElement, useState, useEffect} from 'react';
import {Container as ContainerMUI} from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {navigate} from '@root/utils/constants';
import Link from 'next/link';
import UserInfo from '../userInfo';
import {useRouter} from 'next/router';
import {useGlobalState} from '@root/context/state';

type IProps = {
  children: ReactElement;
};

const Container: React.FC<IProps> = ({children}) => {
  const [userId, setUserId] = useGlobalState('userId');
  const [, setUserName] = useGlobalState('userName');
  const {pathname, ...router} = useRouter();
  const [open, setOpen] = useState(false);

  const navigations = navigate.map(nav => {
    const intertrt = {...nav, link: `${nav.link}?userId=${userId}`};
    return nav.key === 'internet' ? intertrt : nav;
  });

  const handleClick = (type?: 'close' | 'open') => {
    setOpen(prev => (type === 'close' ? false : !prev));
  };

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    if (userId) setUserId(userId);
    if (userName) setUserName(userName);
    if (
      (pathname !== '/auth' && pathname !== '/reg' && !userName) ||
      userName === 'undefined'
    ) {
      router.push('/auth');
    }
  }, []);

  return (
    <>
      <Button
        sx={{
          fontSize: '20px',
          fontWeight: 800,
          color: 'white',
          height: '80px',
          background: 'black',
          borderRadius: 0,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 65,
          transition: '.7s opacity',
          opacity: 0.4,

          '&:hover': {
            background: 'black',
            opacity: 1,
          },
        }}
        onClick={() => handleClick()}
      >
        {'>'}
      </Button>

      <ContainerMUI>
        <Drawer anchor="left" open={open} onClose={() => handleClick()}>
          <Box
            sx={{width: 250}}
            role="presentation"
            onClick={() => handleClick('close')}
            onKeyDown={() => handleClick('close')}
          >
            <List>
              {navigations.map(({Icon, ...nav}) => (
                <Link key={nav.key} href={nav.link}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{<Icon />}</ListItemIcon>
                      <ListItemText primary={nav.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Box>

          <UserInfo />
        </Drawer>
        {children}
      </ContainerMUI>
    </>
  );
};

export default Container;
