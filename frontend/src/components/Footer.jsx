import React from 'react'
import { Typography, Link, Box } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        bgcolor: 'background.paper',
        height: 40,
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" color="primary">
        made with{' '}
        <span role="img" aria-label="Love">
          ❤️
        </span>{' '}
        by{' '}
        <Link
          href="https://github.com/srhqmp"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon sx={{ fontSize: 18, position: 'relative', top: 3 }} />{' '}
          srhqmp
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer
