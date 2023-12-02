import react from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const mystyle={
    width: "100%",
    height: "100%",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    backgroundColor: 'black',
    color: 'white'
}
const typostyle={
    marginBottom: "20ox",
}
const AdminCard = (props) => {
  return (
    <Card variant="outlined" style={mystyle}>
      <CardContent>
        <Typography variant="h5" component="div" style={typostyle}>
         {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.description}
        </Typography>
        <Button variant="contained" color="primary">
            <Link to={props.link}>{props.name}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCard;


// const AdminCard=()=>{
// return(
//     <div>

//     </div>
// )
// }
// export default AdminCard;