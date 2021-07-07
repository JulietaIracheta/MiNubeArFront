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
import { Link } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

export default function RecipeReviewCard({ unidad,descripcion, titulo, video }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const url = "http://localhost:60671/videos/" + video;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <ReactPlayer url={url} controls width="100%" height="12rem" style={{minHeight:"12rem"}} />
            <CardContent>
                <span>Unidad - {unidad}</span>
                <p className="font-weight-bold">{titulo}</p>
                <p>{descripcion}</p>
            </CardContent>
            <CardActions disableSpacing>
                <p className="color-docente font-weight-bold m-0">ACTIVIDAD</p>
                <div className="w-100 d-flex justify-content-end">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton>
                        <Link href="/crearactividades">  <AddIcon /></Link>

                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}
