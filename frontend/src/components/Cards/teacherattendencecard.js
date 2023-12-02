// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// const imagePaths = [
//   'frontend/src/components/images/1pic.jpeg',
//   'frontend/src/components/images/2pic.jpeg',
//   'frontend/src/components/images/3pic.jpeg',
//   'frontend/src/components/images/4pic.jpeg',
//   'frontend/src/components/images/5pic.jpeg',
// ];



// const Studentcoursecard =(props) =>{
//     const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

// //     const assigncourse=async()=>{
// //       try {
// //         const data = await axios.get(
// //             `http://localhost:5000/api/courses/getassignedcoursetostudent/${student_id}`,
// //         )
// //         setstudentcourse(data.data.response)
// //         console.log(studentcourse);
// //                     // setLoading(false)
    
// //     } catch (error) {
// //         //alert(error)
// //     }
// // }
// const assignCourseToStudentURL = 'http://localhost:5000/api/course/assigncoursetostudent';

// // Data to be sent in the request body
// // const requestData = {
// //   student_id: props.student_id,
// //   course_id: props._id,
// // };

// // Make API call using Axios
// // github copilot give me useeffect so the page doent keep re rendering
// React.useEffect(() => {
//   // Your code here if you need to perform any side effects on mount
// }, []);

// const assigncoursetostudent = async (cc,ss) => {
//   const requestData = {
//     student_id: ss,
//     course_id: cc,
//   };
//   console.log(cc);
//   console.log(ss);
  
//   try {
//     const response = await axios.post(assignCourseToStudentURL, requestData);
//     console.log(response.data); // Handle the response as needed
//   } catch (error) {
//     console.error('Error assigning course to student:', error);
//   }
// };
    
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 140 }}
//         image={randomImagePath}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {props.name}
//         </Typography>
//         <Typography gutterBottom variant="h5" component="div">
//           {props._id}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {props.description}
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button variant="contained" color="primary" onClick={() => assigncoursetostudent(props._id, props.student_id)}>
//   Enroll
// </Button>

//         {/* //<Button size="small">Learn More</Button> */}
//       </CardActions>
//     </Card>
//   );
// }
// export default Studentcoursecard;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const imagePaths = [
  'frontend/src/components/images/1pic.jpeg',
  'frontend/src/components/images/2pic.jpeg',
  'frontend/src/components/images/3pic.jpeg',
  'frontend/src/components/images/4pic.jpeg',
  'frontend/src/components/images/5pic.jpeg',
];

const Attendencecard = (props) => {
  const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

  React.useEffect(() => {
    // Your code here if you need to perform any side effects on mount
  }, []);

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '12px',
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={randomImagePath} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
      <Button
  variant="contained"
  color="primary"
  onClick={() => navigate(`teacher/course-attendance/${props._id}`)}
>
  Go to course attendance
</Button>

      </CardActions>
    </Card>
  );
};

export default Attendencecard;
