import { HStack, Image, Switch, Text, useColorMode } from "@chakra-ui/react"
import logo from '../assets/logo.png'

function Navbar() {
  const {toggleColorMode, colorMode} = useColorMode();
  return (
    <HStack justifyContent={'space-between'} paddingX={5} alignItems={'center'}>
      <Image src={logo} boxSize={'80px'} margin={0}/>
       <Text margin={0}>React Query Practice</Text>
       <Switch colorScheme='green' isChecked={colorMode=="dark"} onChange={toggleColorMode}>Dark Mode</Switch>
    </HStack>
  )
}

export default Navbar