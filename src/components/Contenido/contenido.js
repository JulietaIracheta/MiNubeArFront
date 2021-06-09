import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard({ descripcion, titulo, video }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const url="http://localhost:60671/videos/"+video;
    console.log(url);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <ReactPlayer url={url} controls width="100%" height="100%" />
            <CardContent>
                <p className="font-weight-bold">{titulo}</p>
                <p>{descripcion}</p>
            </CardContent>
            <CardActions disableSpacing>
                <p className="color-docente font-weight-bold">ACTIVIDAD</p>
                <IconButton aria-label="add to favorites" className="ml-auto">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <EditIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
