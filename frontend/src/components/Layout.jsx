import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Container,
  ThemeProvider,
  GlobalStyles,
} from '@mui/material'

import Notification from './Notification.jsx'
import NavBar from './NavBar.jsx'

import getTheme from '../theme/index.js'
import useDarkMode from '../hooks/useDarkMode.js'
import { favoriteBlog, mostBlogs, mostLikes } from '../utils/index.js'

const Layout = ({ children }) => {
  const [themeMode, themeToggler, mountedComponent] = useDarkMode()
  const blogs = useSelector((state) => state.blogs)
  const favBlog = favoriteBlog(blogs)
  const popularBlogger = mostLikes(blogs)
  const activeBlogger = mostBlogs(blogs)

  return (
    <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: themeMode === 'light' ? '#f0f0f0' : '#303030',
          },
        }}
      />
      <NavBar />
      <Container>
        <Notification />
        <Grid container gap={1}>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Container>
              <Typography variant="h6" color="secondary" gutterBottom>
                Quote of the week
              </Typography>
              <Card sx={{ height: 200, mb: 2 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="body2">
                    You have power over your mind—not outside events. Realize
                    this, and you will find strength.
                  </Typography>
                  <Typography variant="caption">- Marcus Aurelius</Typography>
                </CardContent>
              </Card>
              <Typography variant="h6" color="secondary" gutterBottom>
                Favorite Blog
              </Typography>
              <Card sx={{ height: 120, mb: 2 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  {favBlog ? (
                    <>
                      <Typography variant="body2">
                        {`${favBlog.title} by ${favBlog.author} with ${favBlog.likes} likes`}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/blogs/${favBlog.id}`}
                        size="small"
                      >
                        View here
                      </Button>
                    </>
                  ) : (
                    'TBA'
                  )}
                </CardContent>
              </Card>
              <Typography variant="h6" color="secondary" gutterBottom>
                Top Bloggers
              </Typography>
              <Card sx={{ height: 180, mb: 2 }}>
                <CardContent>
                  <Typography color="secondary" variant="caption" gutterBottom>
                    Popular Blogger:
                  </Typography>
                  {popularBlogger ? (
                    <Typography variant="body2">{`${popularBlogger.author} with total of ${popularBlogger.likes} likes`}</Typography>
                  ) : (
                    'TBA'
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography color="secondary" variant="caption" gutterBottom>
                    Most Active Blogger:
                  </Typography>
                  {activeBlogger ? (
                    <Typography variant="body2">{`${activeBlogger.author} with total of ${activeBlogger.blogs} written blogs`}</Typography>
                  ) : (
                    'TBA'
                  )}
                </CardContent>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
