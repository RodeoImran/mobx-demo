import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import {Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InputIcon from '@material-ui/icons/Input';
import mainStore from '../Stores/Main';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const Main = ({ classes }) => {
  const [newItem, setNewItem] = useState('')
  return (
    <div className={classes.root} style={{ margin: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TextField
              style={{ minWidth: 450 }}
              error={mainStore.errors.title}
              label={mainStore.errors.title ? 'No stupid titles!': 'Additional Header Text'}
              onChange={(e) => mainStore.setTitle(e.target.value)}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>Modify slice...</p>
            <TextField label="New Item" style={{ marginRight: 10 }} onChange={(e) => setNewItem(e.target.value)}/>
            <Button variant="outlined"
                    style={{ marginRight: 10 }}
                    onClick={() => mainStore.modifyList(newItem)}>
              <InputIcon/>
            </Button>
            <Button color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => mainStore.increment()}>
              <AddIcon/>
            </Button>
            <Button color="secondary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => mainStore.decrement()}>
              <RemoveIcon/>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>Computed Slice ({mainStore.count} {mainStore.count !== 1 ? 'items' : 'item'}):</p>
            {mainStore.shownItems.length > 0 && <React.Fragment>
              <ul>
                {mainStore.shownItems.map(v => <li key={v}>{v}</li>)}
              </ul>
            </React.Fragment>}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <pre>
              {JSON.stringify(mainStore.serialize(), null, 2)}
            </pre>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(observer(Main));
