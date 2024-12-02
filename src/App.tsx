import { invoke } from "@tauri-apps/api/core";
import '@mantine/core/styles.css';
import { Box, Button, MantineProvider, Text, createTheme } from '@mantine/core';
import React, { useEffect, useState } from "react";
import ListItem from "./components/ListItem";

const theme = createTheme({
  fontFamily: 'sans-serif',
  primaryColor: 'blue',
});

interface Block {
  zone_holder: string
  calls: {
    warning: string
    taunter: string
  }[]
}

type Player = 'SC' | 'LR' | 'AP' | 'LOO' | ''
function App() {
  const [block, setBlock] = useState<Block>();
  const [zone, setZone] = useState<Player>('SC');
  const [taunts, setTaunts] = useState<string[]>(['SC']);

  const getBlock = async () => {
    const block = await invoke("next_block");
    console.log(block);
    setBlock(block as Block);
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 6, height: '100vh', justifyContent: 'space-between' }}>
        <Box style={{ justifyContent: 'center', alignItems: 'center', padding: 12, gap: 12, display: 'flex', flexDirection: 'column' }}>
          <Text size="md" color={zone === block?.zone_holder ? 'red' : ''} style={{ textAlign: 'center' }}>
            {block?.zone_holder ?? 'NAN'}
          </Text>
          {block?.calls.map((val, i) => (
            <ListItem me={taunts} warning={val.warning} taunter={val.taunter} key={i} />
          ))}
        </Box>
        <Button variant="filled" onClick={getBlock} style={{ margin: 12 }}>
          Start
        </Button>
      </Box>
    </MantineProvider>
  );
}

export default App;
