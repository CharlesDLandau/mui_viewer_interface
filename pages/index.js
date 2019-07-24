/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Head from '../components/head';
import Nav from '../components/nav';

import { Document, Page } from 'react-pdf';

import axios from 'axios';



require('dotenv').config()

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
  row: {
    marginTop: 60
  },
  papper: {
    paddingLeft: 20,
    paddingTop: 2,
    paddingBottom: 5
  },
  description: {
    marginTop: 25
  }
});

class Index extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    
  }
  render_target = () => {
    process.env.TARGET_URL
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Head title="Viewing PDFs..." />
        <Document
          file={"/static/test.pdf"}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
