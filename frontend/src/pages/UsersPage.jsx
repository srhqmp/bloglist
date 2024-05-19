import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, Typography, CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Face as FaceIcon } from '@mui/icons-material'

const UsersPage = () => {
  const users = useSelector((state) => state.users)

  const columns = [
    {
      field: 'id',
      headerName: '',
      renderCell: (params) => (
        <FaceIcon sx={{ position: 'relative', top: 6 }} />
      ),
      width: 10,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: (params) => (
        <Link to={`/users/${params.id}`}>{params.formattedValue}</Link>
      ),
    },
    {
      field: 'blogs',
      headerName: 'Blogs',
      width: 300,
      valueGetter: (value, row) => `${row.blogs.length}`,
    },
  ]

  return (
    <Container>
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Card>
        <CardContent>
          <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={users || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default UsersPage
