import { invoke } from "@tauri-apps/api/core";
import { Box, Button, Checkbox, Input, MantineProvider, Select, Text, createTheme } from '@mantine/core';
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';

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

function App() {
  const [block, setBlock] = useState<Block>();
  const [zone, setZone] = useState<string>('');
  const [taunts, setTaunts] = useState<Set<string>>(new Set());
  const [started, setStarted] = useState(false);
  const [shortcut, setShortcut] = useState('A')

  const getBlock = async () => {
    const block = await invoke("next_block");
    setBlock(block as Block);
  }
  const reset = async () => {
    const block = await invoke("reset_game");
    setBlock(block as Block);
  }

  useEffect(() => {
    const doit = async () => {
      const tauriWindow = getCurrentWindow()

      tauriWindow.listen('tauri://resize', async () => {
        const isMaximized = await tauriWindow.isMaximized()
        if (isMaximized) {
          tauriWindow.setSize(new LogicalSize(300, 400))
          setStarted(false)
        }
      })
    }

    doit()
  }, [])

  const start = async () => {
    const tauriWindow = getCurrentWindow()
    tauriWindow.setSize(new LogicalSize(300, 300))

    await unregisterAll();
    register(['CmdOrControl+' + shortcut], (e) => {
      if (e.state === 'Released') {
        getBlock();
      }
    })

    reset()
    setStarted(true)
  }

  const handleZoneChange = (name: string, value: boolean) => {
    const newTaunts = new Set(taunts);
    if (value) {
      newTaunts.add(name);
    } else {
      newTaunts.delete(name);
    }
    setTaunts(newTaunts)
  }

  const handleShortcutChange = (val: string) => {
    const key = val.toUpperCase()
    const error = key === ''
    const newKey = error ? 'A' : key

    setShortcut(newKey)
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Box style={{ display: 'flex', flexDirection: 'column', padding: 12, height: '100vh', overflow: 'hidden' }}>
        <Text size="md" color={zone === block?.zone_holder ? 'red' : ''} style={{ textAlign: 'center' }}>
          {block?.zone_holder ?? 'NAN'}
        </Text>
        <Box style={{ justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 6, display: 'flex', flexDirection: 'column' }}>
          {block?.calls.map((val, i) => (
            <ListItem me={taunts} warning={val.warning} taunter={val.taunter} key={i} />
          ))}
        </Box>

        {!started &&
          <Box style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: 6, justifyContent: 'space-between', marginTop: 'auto' }}>
              <Checkbox size="sm" label="SC" onChange={val => handleZoneChange('SC', val.target.checked)} />
              <Checkbox size="sm" label="LR" onChange={val => handleZoneChange('LR', val.target.checked)} />
              <Checkbox size="sm" label="LOO" onChange={val => handleZoneChange('LOO', val.target.checked)} />
              <Checkbox size="sm" label="AP" onChange={val => handleZoneChange('AP', val.target.checked)} />
            </Box>
            <Select placeholder="Zone" data={['SC', 'LR', 'LOO', 'AP']} onChange={(val) => setZone(val ?? '')} size="xs" />
            <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around', gap: 12 }}>
              <Input maxLength={1} onChange={val => handleShortcutChange(val.target.value)} value={shortcut} placeholder='shortcut' size="xs" style={{ width: '100%' }} />
              <Button size="xs" style={{ width: '100%' }} variant="light" onClick={start} >
                Start
              </Button>
            </Box>
          </Box>
        }
      </Box>
    </MantineProvider >
  );
}

export default App;
