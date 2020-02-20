import React from 'react';
import { Flex, Box } from 'rebass';

function FormLayout(props) {
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
            >
                {props.children}
            </Box>
      </Flex>
  );
}

export default FormLayout;