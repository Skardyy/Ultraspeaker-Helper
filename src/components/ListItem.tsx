import { Box, Card, Text } from "@mantine/core"

interface Props {
  warning: string
  taunter: string
  me: string[]
}

const Comp = ({ warning, taunter, me }: Props) => {
  const isMe = me.includes(taunter);
  return (
    <Card shadow="sm" radius="sm" withBorder style={{ borderColor: isMe ? 'red' : '', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 12 }}>
      <Text size="xs">{warning}</Text>
      <Text size="xs">{taunter}</Text>
    </Card>
  )
}

export default Comp;