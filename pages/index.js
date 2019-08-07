/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

import Head from '../components/head';
import Nav from '../components/nav';

import { Document, Page } from 'react-pdf';

import axios from 'axios';



require('dotenv').config()

const styles = theme => ({
  root: {
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
  },
  pdfDoc: {
    height: '95%'
  }
});

const GetTarget = ({onDocumentLoadSuccess, loadPageBatch, classes, pages}) => {
  const router = useRouter();

  const target = router.query.target;
  return <Document className={classes.pdfDoc}
          file={target}
          onLoadSuccess={onDocumentLoadSuccess}
        >
        {pages.map(
          (n, idx)=>{
          return <Page
          pageNumber={n}
          renderAnnotationLayer={false}
          onRenderSuccess={loadPageBatch}/>})}
  </Document>
};


class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      pages: [1]
    }
    console.log(props)
    this.loadPageBatch = this.loadPageBatch.bind(this)
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  loadPageBatch = (e) =>{
    if (this.state.pageNumber <= this.state.numPages){
        console.log("Loading next page...")
        this.setState({pages:[
          ...this.state.pages, this.state.pageNumber+1],
        pageNumber: this.state.pageNumber + 1
        })}
  }

  

  render() {
    const { classes } = this.props;

    return (<div className={classes.root}>
        <Head title="Viewing PDFs..." />
        <Grid container direction="column"
        alignItems="center" justify="stretch">
        <Grid item>
        <GetTarget classes={classes} loadPageBatch={this.loadPageBatch}
        onDocumentLoadSuccess={this.onDocumentLoadSuccess} pages={this.state.pages ? this.state.pages : []} />
        </Grid></Grid>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
