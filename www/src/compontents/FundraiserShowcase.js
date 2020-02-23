import React from 'react';
import { Flex, Box, Heading, Text, Link, Button } from 'rebass';

function FundraiserShowcase(props) {
  return (
      <Flex 
        justifyContent='center'>
            <Box
                my='30px'
                backgroundColor='white'
                sx={{
                    borderRadius: '0.316rem',
                }}
                py='20px'
                px={[ '5px', '30px']}
                sx ={{
                    boxShadow:'0 18px 48px rgba(0,0,0,0.075);'
                }}
                width={[1, 'auto']}
                maxWidth={800}
            >
                <Flex 
                p={2}
                justifyContent={'center'}
                alignItems='center'
                flexDirection='column'>
                    <Heading m={2}>{props.title}</Heading>
                    <Text m={2}>{props.description}</Text>
                    <Link href={"/fundraiser/" + props.address} m={2}><Button variant='primary' fontWeight={500}>Contribute</Button></Link>
                </Flex>
                
            </Box>
      </Flex>
  );
}

export default FundraiserShowcase;