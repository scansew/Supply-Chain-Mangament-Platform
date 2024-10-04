import { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';

import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
  } from '@aws-amplify/ui-react';

function Companies({}) {
  const [count, setCount] = useState(0)

  return (
    <>
      
<Table
  caption=""
  highlightOnHover={true}
  variation="striped">
  <TableHead>
    <TableRow>
      <TableCell as="th">Name</TableCell>
      <TableCell as="th">Role</TableCell>
      <TableCell as="th">Email</TableCell>
      <TableCell as="th">Assign New Role</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Orange</TableCell>
      <TableCell>Nectarine</TableCell>
      <TableCell>Raspberry</TableCell>
      <TableCell>Raspberry</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Grapefruit</TableCell>
      <TableCell>Apricot</TableCell>
      <TableCell>Raspberry</TableCell>
      <TableCell>Blueberry</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Lime</TableCell>
      <TableCell>Peach</TableCell>
      <TableCell>Raspberry</TableCell>
      <TableCell>Strawberry</TableCell>
    </TableRow>
  </TableBody>
</Table>
  
    </>
  )
}

export default Companies;